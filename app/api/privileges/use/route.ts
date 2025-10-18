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

    const { privilegeId } = await request.json()

    if (!privilegeId) {
      return NextResponse.json({ error: "Privilege ID is required" }, { status: 400 })
    }

    // Get privilege details
    const { data: privilege, error: privilegeError } = await supabase
      .from("privileges")
      .select("*")
      .eq("id", privilegeId)
      .single()

    if (privilegeError || !privilege) {
      return NextResponse.json({ error: "Privilege not found" }, { status: 404 })
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (profileError || !profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    // Check if user has required grade and subscription
    const gradeOrder = ["bronze", "silver", "gold", "diamond"]
    const subscriptionOrder = ["none", "pro", "premium"]

    const userGradeIndex = gradeOrder.indexOf(profile.grade)
    const requiredGradeIndex = gradeOrder.indexOf(privilege.required_grade)

    if (userGradeIndex < requiredGradeIndex) {
      return NextResponse.json({ error: "Insufficient grade" }, { status: 403 })
    }

    if (privilege.required_subscription) {
      const userSubIndex = subscriptionOrder.indexOf(profile.subscription)
      const requiredSubIndex = subscriptionOrder.indexOf(privilege.required_subscription)

      if (userSubIndex < requiredSubIndex) {
        return NextResponse.json({ error: "Subscription required" }, { status: 403 })
      }
    }

    // Get or create user privilege record
    let { data: userPrivilege, error: userPrivilegeError } = await supabase
      .from("user_privileges")
      .select("*")
      .eq("user_id", user.id)
      .eq("privilege_id", privilegeId)
      .single()

    if (userPrivilegeError && userPrivilegeError.code !== "PGRST116") {
      return NextResponse.json({ error: "Failed to fetch user privilege" }, { status: 500 })
    }

    // If no record exists, it will be created by the trigger
    if (!userPrivilege) {
      // Create initial record
      const { data: newUserPrivilege, error: createError } = await supabase
        .from("user_privileges")
        .insert({
          user_id: user.id,
          privilege_id: privilegeId,
          used_count: 0,
        })
        .select()
        .single()

      if (createError) {
        return NextResponse.json({ error: "Failed to create user privilege" }, { status: 500 })
      }

      userPrivilege = newUserPrivilege
    }

    // Check if limit is reached
    if (userPrivilege.used_count >= privilege.limit_value) {
      return NextResponse.json({ error: "Privilege limit reached" }, { status: 403 })
    }

    // Increment usage count
    const { data: updatedPrivilege, error: updateError } = await supabase
      .from("user_privileges")
      .update({
        used_count: userPrivilege.used_count + 1,
        last_used_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)
      .eq("privilege_id", privilegeId)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json({ error: "Failed to update privilege usage" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      privilege: updatedPrivilege,
      remaining: privilege.limit_value - updatedPrivilege.used_count,
    })
  } catch (error) {
    console.error("[v0] Error using privilege:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
