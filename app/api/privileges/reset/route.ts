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

    // Get all user privileges that need reset
    const { data: userPrivileges, error: fetchError } = await supabase
      .from("user_privileges")
      .select("*, privileges(*)")
      .eq("user_id", user.id)

    if (fetchError) {
      return NextResponse.json({ error: "Failed to fetch privileges" }, { status: 500 })
    }

    const now = new Date()
    const privilegesToReset = userPrivileges?.filter((up) => {
      const nextReset = new Date(up.next_reset_at)
      return nextReset <= now
    })

    if (!privilegesToReset || privilegesToReset.length === 0) {
      return NextResponse.json({ message: "No privileges to reset", count: 0 })
    }

    // Reset privileges
    const resetPromises = privilegesToReset.map((up) => {
      const privilege = up.privileges
      const nextResetDate = new Date()

      switch (privilege.reset_period) {
        case "daily":
          nextResetDate.setDate(nextResetDate.getDate() + 1)
          break
        case "weekly":
          nextResetDate.setDate(nextResetDate.getDate() + 7)
          break
        case "monthly":
          nextResetDate.setMonth(nextResetDate.getMonth() + 1)
          break
        case "yearly":
          nextResetDate.setFullYear(nextResetDate.getFullYear() + 1)
          break
        default:
          return null
      }

      return supabase
        .from("user_privileges")
        .update({
          used_count: 0,
          next_reset_at: nextResetDate.toISOString(),
        })
        .eq("user_id", user.id)
        .eq("privilege_id", up.privilege_id)
    })

    await Promise.all(resetPromises.filter(Boolean))

    return NextResponse.json({
      success: true,
      message: "Privileges reset successfully",
      count: privilegesToReset.length,
    })
  } catch (error) {
    console.error("[v0] Error resetting privileges:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
