'use client'

import { createBrowserClient } from '@supabase/ssr'

let supabaseClientSingleton: any = null

export function createClient() {
  // Use singleton pattern to prevent multiple client instances
  if (supabaseClientSingleton) {
    return supabaseClientSingleton
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn(
      '[v0] Supabase credentials are not set. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.'
    )
    // Return a comprehensive mock client to prevent crashes during development
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
      from: () => ({
        select: () => ({
          data: [],
          error: null,
          then: (callback: any) => callback({ data: [], error: null }),
        }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null }),
      }),
      channel: () => ({
        on: function() { return this },
        subscribe: function() { return this },
      }),
      removeChannel: () => null,
    } as any
  }

  supabaseClientSingleton = createBrowserClient(url, key)
  return supabaseClientSingleton
}
