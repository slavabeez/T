import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")

    if (!clientId) {
      return NextResponse.json({ error: "Client ID is required" }, { status: 400 })
    }

    // Fetch client's privilege usage
    const { data: privileges, error: privilegesError } = await supabase
      .from("user_privileges")
      .select("*, privileges(*)")
      .eq("user_id", clientId)

    if (privilegesError) {
      return NextResponse.json({ error: "Failed to fetch privileges" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      privileges,
    })
  } catch (error) {
    console.error("[v0] Error fetching client privileges:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
