'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useRealtimeKits() {
  const [kits, setKits] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchKits = async () => {
      try {
        const client = createClient()
        const { data, error: err } = await client
          .from('health_kits')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (err) throw err
        if (!mounted) return
        
        setKits(data || [])
        setError(null)
      } catch (err) {
        if (!mounted) return
        console.error('[v0] Error fetching kits:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch kits')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchKits()
    return () => { mounted = false }
  }, [])

  return { kits, loading, error }
}
