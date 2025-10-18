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

    const { clientId, privilegeId, newLimit } = await request.json()

    if (!clientId || !privilegeId || newLimit === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user privilege record exists
    const { data: existingPrivilege } = await supabase
      .from("user_privileges")
      .select("*")
      .eq("user_id", clientId)
      .eq("privilege_id", privilegeId)
      .single()

    if (existingPrivilege) {
      // Update existing record with custom limit
      const { data: updatedPrivilege, error: updateError } = await supabase
        .from("user_privileges")
        .update({
          custom_limit: newLimit,
        })
        .eq("user_id", clientId)
        .eq("privilege_id", privilegeId)
        .select()
        .single()

      if (updateError) {
        return NextResponse.json({ error: "Failed to update privilege limit" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        privilege: updatedPrivilege,
      })
    } else {
      // Create new record with custom limit
      const { data: newPrivilege, error: createError } = await supabase
        .from("user_privileges")
        .insert({
          user_id: clientId,
          privilege_id: privilegeId,
          used_count: 0,
          custom_limit: newLimit,
        })
        .select()
        .single()

      if (createError) {
        return NextResponse.json({ error: "Failed to create privilege record" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        privilege: newPrivilege,
      })
    }
  } catch (error) {
    console.error("[v0] Error updating privilege limit:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
