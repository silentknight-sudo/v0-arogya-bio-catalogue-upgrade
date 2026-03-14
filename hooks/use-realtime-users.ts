'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'

export interface UserProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  created_at: string
}

export function useRealtimeUsers() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabaseRef = useRef(createClient())
  const channelRef = useRef<any>(null)
  const subscriptionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const fetchUsers = useCallback(async () => {
    try {
      const client = supabaseRef.current

      // Check if this is a mock client (no channel method)
      if (!client.channel || typeof client.channel !== 'function') {
        setUsers([])
        setError(null)
        setLoading(false)
        return
      }

      const { data, error: err } = await client
        .from('profiles')
        .select('id, first_name, last_name, phone, created_at')
        .order('created_at', { ascending: false })

      if (err) throw err

      // Fetch emails from auth users
      const { data: { users: authUsers } } = await client.auth.admin?.getUser() ? 
        { data: { users: [] } } : 
        { data: { users: [] } }

      // For now, we'll get emails from a separate endpoint
      const usersWithData: UserProfile[] = await Promise.all(
        (data || []).map(async (profile) => {
          // Try to get email from auth
          try {
            const { data: authData } = await client.auth.getUser()
            return {
              ...profile,
              email: authData.user?.email || 'N/A',
            } as UserProfile
          } catch {
            return {
              ...profile,
              email: 'N/A',
            } as UserProfile
          }
        })
      )

      setUsers(usersWithData)
      setError(null)
    } catch (err) {
      console.error('[v0] Error fetching users:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }, [])

  const setupSubscription = useCallback(() => {
    const client = supabaseRef.current

    // Only setup subscription if client has channel method
    if (!client.channel || typeof client.channel !== 'function') {
      return
    }

    // Clean up existing channel if any
    if (channelRef.current) {
      try {
        client.removeChannel(channelRef.current)
      } catch (e) {
        console.log('[v0] Error removing users channel:', e)
      }
      channelRef.current = null
    }

    // Clear any pending timeout
    if (subscriptionTimeoutRef.current) {
      clearTimeout(subscriptionTimeoutRef.current)
    }

    const channel = client
      .channel('users-channel-' + Date.now(), {
        config: { broadcast: { self: true } },
      })
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles',
        },
        (payload: any) => {
          console.log('[v0] User change detected:', payload.eventType)
          setTimeout(() => {
            fetchUsers()
          }, 100)
        }
      )
      .subscribe((status) => {
        console.log('[v0] Users subscription status:', status)
        if (status === 'CLOSED' || status === 'CHANNEL_ERROR') {
          console.log('[v0] Users subscription closed, attempting to reconnect...')
          subscriptionTimeoutRef.current = setTimeout(() => {
            setupSubscription()
          }, 3000)
        }
      })

    channelRef.current = channel
  }, [fetchUsers])

  useEffect(() => {
    fetchUsers()
    setupSubscription()

    return () => {
      if (subscriptionTimeoutRef.current) {
        clearTimeout(subscriptionTimeoutRef.current)
      }
      if (channelRef.current) {
        const client = supabaseRef.current
        try {
          if (client.removeChannel && typeof client.removeChannel === 'function') {
            client.removeChannel(channelRef.current)
          }
        } catch (e) {
          console.log('[v0] Error removing users channel on cleanup:', e)
        }
        channelRef.current = null
      }
    }
  }, [fetchUsers, setupSubscription])

  return { users, loading, error, refetch: fetchUsers }
}
