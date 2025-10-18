"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Lock, Check, Clock, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Privilege {
  id: string
  name: string
  description: string
  category: string
  required_grade: string
  required_subscription: string | null
  limit_type: string
  limit_value: number
  reset_period: string
}

interface UserPrivilege {
  used_count: number
  last_used_at: string | null
  next_reset_at: string
  custom_limit?: number | null
}

interface PrivilegeDetailDialogProps {
  privilege: Privilege
  usage?: UserPrivilege
  isAvailable: boolean
  onClose: () => void
}

const resetPeriodLabels: Record<string, string> = {
  daily: "Ежедневно",
  weekly: "Еженедельно",
  monthly: "Ежемесячно",
  yearly: "Ежегодно",
  once: "Один раз",
}

const gradeLabels: Record<string, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  diamond: "Diamond",
}

const subscriptionLabels: Record<string, string> = {
  pro: "T-Pro",
  premium: "T-Premium",
}

export function PrivilegeDetailDialog({ privilege, usage, isAvailable, onClose }: PrivilegeDetailDialogProps) {
  const [isUsing, setIsUsing] = useState(false)
  const router = useRouter()

  const effectiveLimit = usage?.custom_limit ?? privilege.limit_value
  const remaining = effectiveLimit - (usage?.used_count || 0)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const handleUsePrivilege = async () => {
    setIsUsing(true)

    try {
      const response = await fetch("/api/privileges/use", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          privilegeId: privilege.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to use privilege")
      }

      toast.success("Привилегия успешно использована!", {
        description: `Осталось использований: ${data.remaining}`,
      })

      onClose()
      router.refresh()
    } catch (error) {
      console.error("[v0] Error using privilege:", error)
      toast.error("Ошибка", {
        description: error instanceof Error ? error.message : "Не удалось использовать привилегию",
      })
    } finally {
      setIsUsing(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-start justify-between mb-2">
            <DialogTitle className="text-2xl">{privilege.name}</DialogTitle>
            {isAvailable ? (
              <Badge className="bg-tinkoff text-black hover:bg-tinkoff/90">
                <Check className="h-3 w-3 mr-1" />
                Доступно
              </Badge>
            ) : (
              <Badge variant="secondary">
                <Lock className="h-3 w-3 mr-1" />
                Недоступно
              </Badge>
            )}
          </div>
          <DialogDescription className="text-base">{privilege.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <h4 className="font-semibold mb-3">Требования</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Грейд: {gradeLabels[privilege.required_grade]}</Badge>
              {privilege.required_subscription && (
                <Badge variant="outline">Подписка: {subscriptionLabels[privilege.required_subscription]}</Badge>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Лимиты использования</h4>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Доступно</span>
                <span className="font-medium">
                  {effectiveLimit} {privilege.limit_type === "count" ? "раз" : "₽"}
                  {usage?.custom_limit !== null && usage?.custom_limit !== undefined && (
                    <span className="text-xs text-tinkoff ml-2">(установлено администратором)</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Период обновления</span>
                <span className="font-medium">{resetPeriodLabels[privilege.reset_period]}</span>
              </div>
            </div>
          </div>

          {isAvailable && usage && (
            <div>
              <h4 className="font-semibold mb-3">Ваше использование</h4>
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Использовано</span>
                  <span className="font-medium">
                    {usage.used_count} / {effectiveLimit}
                  </span>
                </div>

                <div className="h-3 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-tinkoff transition-all"
                    style={{
                      width: `${(usage.used_count / effectiveLimit) * 100}%`,
                    }}
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                  <Clock className="h-4 w-4" />
                  <span>Обновление: {formatDate(usage.next_reset_at)}</span>
                </div>

                {usage.last_used_at && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Последнее использование: {formatDate(usage.last_used_at)}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {!isAvailable && (
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Эта привилегия станет доступна при повышении грейда до {gradeLabels[privilege.required_grade]}
                {privilege.required_subscription &&
                  ` и подключении подписки ${subscriptionLabels[privilege.required_subscription]}`}
                .
              </p>
            </div>
          )}

          <Button
            className="w-full bg-tinkoff text-black hover:bg-tinkoff/90"
            disabled={!isAvailable || remaining <= 0 || isUsing}
            onClick={handleUsePrivilege}
          >
            {isUsing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Использование...
              </>
            ) : !isAvailable ? (
              "Недоступно"
            ) : remaining <= 0 ? (
              "Лимит исчерпан"
            ) : (
              "Использовать привилегию"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
