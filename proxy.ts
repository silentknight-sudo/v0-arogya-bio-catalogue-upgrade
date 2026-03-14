import { updateSession } from "@/lib/supabase/proxy"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const pathname = requestUrl.pathname

  // Admin route protection - check for admin session cookie
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    try {
      // Get admin session from cookies
      const adminCookie = request.cookies.get("admin_session")
      
      console.log("[v0] Proxy checking admin route:", pathname)
      console.log("[v0] Admin cookie exists:", !!adminCookie?.value)

      // Allow if valid admin session exists
      if (!adminCookie?.value) {
        console.log("[v0] No admin session, redirecting to login")
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }

      console.log("[v0] Admin session valid, allowing access")
      return await updateSession(request)
    } catch (error) {
      console.error("[v0] Proxy admin check error:", error)
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // Handle Supabase session updates for all other routes
  return await updateSession(request)
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
