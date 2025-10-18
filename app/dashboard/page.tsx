import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PrivilegesGrid } from "@/components/dashboard/privileges-grid"
import { GradeCard } from "@/components/dashboard/grade-card"

export default async function DashboardPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/auth/login")
  }

  // Fetch user profile with grade and subscription
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/auth/login")
  }

  // Fetch all privileges
  const { data: allPrivileges } = await supabase.from("privileges").select("*").order("category", { ascending: true })

  // Fetch user's privilege usage
  const { data: userPrivileges } = await supabase.from("user_privileges").select("*").eq("user_id", user.id)

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader profile={profile} />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <GradeCard profile={profile} />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Ваши привилегии</h2>
          <PrivilegesGrid
            privileges={allPrivileges || []}
            userPrivileges={userPrivileges || []}
            userGrade={profile.grade}
            userSubscription={profile.subscription}
          />
        </div>
      </main>
    </div>
  )
}
