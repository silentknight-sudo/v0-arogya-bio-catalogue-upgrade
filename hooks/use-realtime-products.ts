'use client';

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function useRealtimeProducts() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchProducts = async () => {
      try {
        const client = createClient()
        const { data, error: err } = await client
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })

        if (err) throw err
        if (!mounted) return
        
        setProducts(data || [])
        setError(null)
      } catch (err) {
        if (!mounted) return
        console.error('[v0] Error fetching products:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch products')
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchProducts()
    return () => { mounted = false }
  }, [])

  return { products, loading, error }
}
