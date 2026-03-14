import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          },
        },
      }
    )

    // Fetch products
    const { data: products } = await supabase
      .from("products")
      .select("*")
      .order("category", { ascending: true })

    // Fetch health kits
    const { data: kits } = await supabase
      .from("health_kits")
      .select("*")
      .eq("is_active", true)
      .order("price", { ascending: false })

    return NextResponse.json({
      products: products || [],
      kits: kits || [],
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Error fetching catalogue data:", error)
    return NextResponse.json(
      { error: "Failed to fetch catalogue data" },
      { status: 500 }
    )
  }
}
