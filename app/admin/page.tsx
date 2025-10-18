import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { ClientsTable } from "@/components/admin/clients-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PrivilegesManagement } from "@/components/admin/privileges-management"

export default async function AdminPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/auth/login")
  }

  // Fetch all profiles
  const { data: profiles } = await supabase.from("profiles").select("*").order("created_at", { ascending: false })

  // Fetch all privileges
  const { data: privileges } = await supabase.from("privileges").select("*").order("category", { ascending: true })

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Панель администратора</h1>
          <p className="text-muted-foreground">Управление клиентами и привилегиями</p>
        </div>

        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList>
            <TabsTrigger value="clients">Клиенты</TabsTrigger>
            <TabsTrigger value="privileges">Привилегии</TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-4">
            <ClientsTable clients={profiles || []} />
          </TabsContent>

          <TabsContent value="privileges" className="space-y-4">
            <PrivilegesManagement privileges={privileges || []} clients={profiles || []} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
