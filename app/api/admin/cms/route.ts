import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    console.log("[v0] API GET /admin/cms called")

    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient({ roleOverride: "admin" })

    // Fetch all CMS settings
    const { data: settings, error } = await supabase
      .from("cms_settings")
      .select("*")
      .order("section, key")

    if (error) {
      console.error("[v0] CMS API: Error fetching settings:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] CMS API: Fetched", settings?.length || 0, "settings")

    return NextResponse.json({ settings }, { status: 200 })
  } catch (error) {
    console.error("[v0] CMS API GET: Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    console.log("[v0] API POST /admin/cms called")

    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { key, value, section } = body

    if (!key || value === undefined || !section) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient({ roleOverride: "admin" })

    console.log("[v0] CMS API: Creating new setting", key, "in section", section)

    // Insert new setting
    const { data, error } = await supabase
      .from("cms_settings")
      .insert({
        key,
        value: { value },
        section,
      })
      .select()

    if (error) {
      console.error("[v0] CMS API: Error creating setting:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ setting: data?.[0] }, { status: 201 })
  } catch (error) {
    console.error("[v0] CMS API POST: Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    console.log("[v0] API PATCH /admin/cms called")

    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { id, key, value, section } = body

    if (!id || key === undefined) {
      return NextResponse.json({ error: "Missing id or key" }, { status: 400 })
    }

    const supabase = await createClient({ roleOverride: "admin" })

    console.log("[v0] CMS API: Updating setting", id)

    const updateData: any = {}
    if (key !== undefined) updateData.key = key
    if (value !== undefined) updateData.value = { value }
    if (section !== undefined) updateData.section = section

    const { data, error } = await supabase
      .from("cms_settings")
      .update(updateData)
      .eq("id", id)
      .select()

    if (error) {
      console.error("[v0] CMS API: Error updating setting:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] CMS API: Setting updated successfully")

    return NextResponse.json({ setting: data?.[0] }, { status: 200 })
  } catch (error) {
    console.error("[v0] CMS API PATCH: Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const adminCookie = cookieStore.get("admin_session")?.value

    console.log("[v0] API DELETE /admin/cms called")

    if (!adminCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 })
    }

    const supabase = await createClient({ roleOverride: "admin" })

    console.log("[v0] CMS API: Deleting setting", id)

    const { error } = await supabase
      .from("cms_settings")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("[v0] CMS API: Error deleting setting:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] CMS API: Setting deleted successfully")

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("[v0] CMS API DELETE: Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
