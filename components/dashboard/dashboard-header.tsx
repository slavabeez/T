"use client"

import { Button } from "@/components/ui/button"
import { LogOut, Bell, RefreshCw } from "lucide-react"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"

interface DashboardHeaderProps {
  profile: {
    full_name: string
    email: string
    grade: string
    subscription: string
  }
}

export function DashboardHeader({ profile }: DashboardHeaderProps) {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [isResetting, setIsResetting] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const handleResetPrivileges = async () => {
    setIsResetting(true)

    try {
      const response = await fetch("/api/privileges/reset", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset privileges")
      }

      if (data.count > 0) {
        toast.success("Привилегии обновлены!", {
          description: `Обновлено привилегий: ${data.count}`,
        })
        router.refresh()
      } else {
        toast.info("Нет привилегий для обновления")
      }
    } catch (error) {
      console.error("[v0] Error resetting privileges:", error)
      toast.error("Ошибка при обновлении привилегий")
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
                <span className="font-bold text-accent-foreground text-lg">Т</span>
              </div>
              <span className="font-bold text-xl">Т-Банк</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/dashboard" className="text-foreground hover:text-accent transition-colors font-medium">
                Главная
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Платежи
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Переводы
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Карты
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Вклады
              </Link>
              <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                Админ
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleResetPrivileges}
              disabled={isResetting}
              className="hover:bg-accent/10"
            >
              <RefreshCw className={`h-5 w-5 ${isResetting ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-accent/10">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="hover:bg-accent/10">
              <LogOut className="h-5 w-5" />
            </Button>
            <div className="hidden md:flex items-center gap-3 ml-2 pl-3 border-l border-border/50">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center">
                <span className="text-sm font-bold text-accent-foreground">{profile.full_name.charAt(0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
