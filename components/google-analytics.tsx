'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView, initializeGoogleAnalytics } from '@/lib/analytics'

export function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize GA on mount
    initializeGoogleAnalytics()
  }, [])

  useEffect(() => {
    // Track page views
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    trackPageView(url, document.title)
  }, [pathname, searchParams])

  return null
}
