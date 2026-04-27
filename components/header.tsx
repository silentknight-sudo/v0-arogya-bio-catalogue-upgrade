"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, Heart, User, ShoppingBag, Search, Menu, X, LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [cartCount, setCartCount] = useState(0)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        const { data } = await supabase.from("cart_items").select("quantity").eq("user_id", user.id)

        if (data) {
          const total = data.reduce((sum, item) => sum + item.quantity, 0)
          setCartCount(total)
        }
      }
    }

    fetchUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      fetchUser()
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push("/")
    router.refresh()
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
  }

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Catalogue", href: "/catalogue" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top Bar */}
      <div className="container mx-auto px-3 sm:px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 md:gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <img 
              src="/arogya-bio-logo.jpg" 
              alt="ArogyaBio Logo"
              className="w-8 md:w-12 h-8 md:h-12 object-contain"
            />
            <h1 className="text-lg md:text-2xl font-bold text-primary hidden sm:block">ArogyaBio</h1>
          </Link>

          {/* Search - Hidden on mobile, visible on md+ */}
          <div className="hidden lg:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-3 md:px-4 py-2 rounded-lg border border-border bg-secondary/30 text-sm md:text-base text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 md:w-5 h-4 md:h-5 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1 md:gap-4 flex-shrink-0">
            {/* Wishlist - Hidden on mobile */}
            <button className="hidden sm:p-2 hover:bg-secondary rounded-lg transition-colors md:flex items-center justify-center w-10 h-10">
              <Heart className="w-5 h-5 text-foreground" />
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative flex-shrink-0">
              <button className="p-2 md:p-2 hover:bg-secondary rounded-lg transition-colors flex items-center justify-center w-10 h-10 md:w-auto">
                <ShoppingCart className="w-5 md:w-5 h-5 md:h-5 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>
            </Link>

            {/* User Menu - Desktop */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <>
                  <Link href="/profile" title="My Profile">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors w-10 h-10 flex items-center justify-center">
                      <User className="w-5 h-5 text-foreground" />
                    </button>
                  </Link>
                  <Link href="/profile/orders" title="My Orders">
                    <button className="p-2 hover:bg-secondary rounded-lg transition-colors w-10 h-10 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-foreground" />
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors w-10 h-10 flex items-center justify-center text-red-600"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <Link href="/auth/login">
                  <button className="p-2 hover:bg-secondary rounded-lg transition-colors w-10 h-10 flex items-center justify-center">
                    <User className="w-5 h-5 text-foreground" />
                  </button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors w-10 h-10 flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar for Mobile - Below main bar */}
        <div className="lg:hidden mt-3 mb-2">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-2 rounded-lg border border-border bg-secondary/30 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Navigation Menu - Desktop */}
      <nav className="hidden md:flex border-t border-border/50 bg-background/50">
        <div className="container mx-auto px-4 flex">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className="flex-1 px-4 py-3 text-center text-foreground text-sm font-medium hover:text-primary hover:bg-primary/5 transition-all border-b-2 border-transparent hover:border-b-2 hover:border-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu - Slide Down */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-border/50 bg-background animate-in slide-in-from-top-2">
          <div className="container mx-auto px-3 py-3 space-y-1">
            {/* Navigation Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-foreground text-sm font-medium hover:text-primary hover:bg-primary/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile User Section */}
            {user && (
              <>
                <div className="border-t border-border/50 my-3 pt-3">
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground text-sm font-medium hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link
                    href="/profile/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground text-sm font-medium hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 text-sm font-medium hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            )}

            {!user && (
              <div className="border-t border-border/50 my-3 pt-3">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-primary text-sm font-semibold bg-primary/10 text-center hover:bg-primary/20 transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
