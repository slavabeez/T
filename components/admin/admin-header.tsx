"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function AdminHeader() {
  const router = useRouter()

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Админ-панель</h1>
              <p className="text-sm text-muted-foreground">Управление системой привилегий</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-tinkoff/10 border border-tinkoff">
              <span className="text-sm font-medium text-tinkoff">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
