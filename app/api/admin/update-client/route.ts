import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { clientId, balance, subscription } = await request.json()

    if (!clientId) {
      return NextResponse.json({ error: "Client ID is required" }, { status: 400 })
    }

    // Update client profile
    const { data: profile, error: updateError } = await supabase
      .from("profiles")
      .update({
        balance,
        subscription,
      })
      .eq("id", clientId)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: "Failed to update client" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      profile,
    })
  } catch (error) {
    console.error("[v0] Error updating client:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
