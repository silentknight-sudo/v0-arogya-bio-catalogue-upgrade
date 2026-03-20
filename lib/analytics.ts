// Advanced Analytics Tracking Configuration for ArogyaBio

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Initialize Google Analytics 4
export const initializeGoogleAnalytics = () => {
  if (typeof window !== 'undefined' && GA_TRACKING_ID) {
    // Load GA script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    document.head.appendChild(script)

    // Initialize dataLayer
    ;(window as any).dataLayer = (window as any).dataLayer || []
    function gtag(...args: any[]) {
      ;(window as any).dataLayer.push(arguments)
    }
    ;(window as any).gtag = gtag
    gtag('js', new Date())
    gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
    })
  }
}

// Track Page Views
export const trackPageView = (path: string, title: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    })
  }
}

// Track Events
export const trackEvent = (
  eventName: string,
  eventData: {
    category?: string
    label?: string
    value?: number
    [key: string]: any
  }
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', eventName, eventData)
  }
}

// Track E-commerce Events
export const trackAddToCart = (product: {
  id: string
  name: string
  price: number
  category: string
  quantity: number
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'add_to_cart', {
      currency: 'INR',
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: product.quantity,
        },
      ],
    })
  }
}

export const trackRemoveFromCart = (product: {
  id: string
  name: string
  price: number
  category: string
  quantity: number
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'remove_from_cart', {
      currency: 'INR',
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: product.quantity,
        },
      ],
    })
  }
}

export const trackPurchase = (order: {
  id: string
  value: number
  tax: number
  shipping: number
  items: Array<{
    id: string
    name: string
    price: number
    category: string
    quantity: number
  }>
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'purchase', {
      transaction_id: order.id,
      value: order.value,
      tax: order.tax,
      shipping: order.shipping,
      currency: 'INR',
      items: order.items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        item_category: item.category,
        price: item.price,
        quantity: item.quantity,
      })),
    })
  }
}

// Track User Engagement
export const trackScroll = (percentage: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'scroll_depth', {
      scroll_percentage: percentage,
    })
  }
}

export const trackTimeOnPage = (seconds: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'time_on_page', {
      duration: seconds,
    })
  }
}

export const trackSearch = (searchTerm: string, resultCount: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'search', {
      search_term: searchTerm,
      result_count: resultCount,
    })
  }
}

// Track User Actions
export const trackSignup = (method: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'sign_up', {
      method: method, // 'phone_otp', 'email', 'google', etc.
    })
  }
}

export const trackLogin = (method: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'login', {
      method: method,
    })
  }
}

export const trackViewItem = (product: {
  id: string
  name: string
  price: number
  category: string
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'view_item', {
      currency: 'INR',
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
        },
      ],
    })
  }
}

export const trackViewItemList = (products: Array<{
  id: string
  name: string
  price: number
  category: string
}>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', 'view_item_list', {
      currency: 'INR',
      items: products.map((product) => ({
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
      })),
    })
  }
}
