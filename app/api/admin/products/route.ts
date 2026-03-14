import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    // Verify admin session
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    console.log("[v0] Admin products API GET called")
    console.log("[v0] Admin cookie present:", !!adminCookie)

    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const offset = (page - 1) * limit

    console.log("[v0] Admin products API: Fetching with pagination", { page, limit, offset })

    // Use service role for admin access
    const supabase = await createClient({ roleOverride: "admin" })

    // Build the query
    let query = supabase.from("products").select("*", { count: "exact" })

    // Apply ordering and pagination
    query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1)

    console.log("[v0] Admin products API: Executing query...")
    const { data: products, error, count } = await query

    if (error) {
      console.error("[v0] Admin products API: Error fetching products:", error.message)
      return NextResponse.json(
        { error: "Failed to fetch products", details: error.message },
        { status: 500 }
      )
    }

    console.log("[v0] Admin products API: Found", products?.length || 0, "products, total count:", count)

    return NextResponse.json(
      {
        products: products || [],
        count: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Admin products API: CATCH error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      {
        error: "Internal server error",
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    console.log("[v0] Admin products API POST called")

    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, category, price, description, benefits, usage, stock_quantity, image_url } = body

    // Validation
    if (!name || !category || price === undefined || stock_quantity === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient({ roleOverride: "admin" })

    console.log("[v0] Creating new product:", name)

    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        category,
        price: Number(price),
        description: description || "",
        benefits: Array.isArray(benefits) ? benefits : [benefits || ""],
        usage: usage || "",
        stock_quantity: Number(stock_quantity),
        image_url: image_url || null,
      })
      .select()

    if (error) {
      console.error("[v0] Error creating product:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Product created successfully")

    return NextResponse.json({ product: data?.[0] }, { status: 201 })
  } catch (error) {
    console.error("[v0] Admin products API POST error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    console.log("[v0] Admin products API PATCH called")

    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 })
    }

    // Convert numeric fields
    if (updateData.price !== undefined) updateData.price = Number(updateData.price)
    if (updateData.stock_quantity !== undefined) updateData.stock_quantity = Number(updateData.stock_quantity)

    const supabase = await createClient({ roleOverride: "admin" })

    console.log("[v0] Updating product:", id)

    const { data, error } = await supabase
      .from("products")
      .update(updateData)
      .eq("id", id)
      .select()

    if (error) {
      console.error("[v0] Error updating product:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Product updated successfully")

    return NextResponse.json({ product: data?.[0] }, { status: 200 })
  } catch (error) {
    console.error("[v0] Admin products API PATCH error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    console.log("[v0] Admin products API DELETE called")

    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing product id" }, { status: 400 })
    }

    const supabase = await createClient({ roleOverride: "admin" })

    console.log("[v0] Deleting product:", id)

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("[v0] Error deleting product:", error.message)
      
      // Check if it's a foreign key constraint error
      if (error.message && error.message.includes("foreign key constraint")) {
        return NextResponse.json(
          {
            error: "Cannot delete product",
            details: "This product has been used in orders and cannot be deleted. Consider archiving it instead.",
            code: "FOREIGN_KEY_CONSTRAINT"
          },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    console.log("[v0] Product deleted successfully")

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[v0] Admin products API DELETE error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
