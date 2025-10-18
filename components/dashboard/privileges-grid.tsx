"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Film,
  Shield,
  Plane,
  Coffee,
  Calendar,
  Lock,
  Check,
  Percent,
  CreditCard,
  Headphones,
  Sparkles,
} from "lucide-react"
import { PrivilegeDetailDialog } from "./privilege-detail-dialog"

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
  icon?: string
}

interface UserPrivilege {
  privilege_id: string
  used_count: number
  last_used_at: string | null
  next_reset_at: string
  custom_limit?: number | null
}

interface PrivilegesGridProps {
  privileges: Privilege[]
  userPrivileges: UserPrivilege[]
  userGrade: string
  userSubscription: string
}

const iconMap: Record<string, any> = {
  film: Film,
  shield: Shield,
  plane: Plane,
  coffee: Coffee,
  calendar: Calendar,
  percent: Percent,
  card: CreditCard,
  headphones: Headphones,
  sparkles: Sparkles,
}

const gradeOrder = ["bronze", "silver", "gold", "diamond"]
const subscriptionOrder = ["none", "pro", "premium"]

export function PrivilegesGrid({ privileges, userPrivileges, userGrade, userSubscription }: PrivilegesGridProps) {
  const [selectedPrivilege, setSelectedPrivilege] = useState<Privilege | null>(null)
  const [filter, setFilter] = useState<"all" | "available" | "unavailable">("all")

  const isPrivilegeAvailable = (privilege: Privilege) => {
    const gradeIndex = gradeOrder.indexOf(userGrade)
    const requiredGradeIndex = gradeOrder.indexOf(privilege.required_grade)

    const hasRequiredGrade = gradeIndex >= requiredGradeIndex

    if (!privilege.required_subscription) {
      return hasRequiredGrade
    }

    const subIndex = subscriptionOrder.indexOf(userSubscription)
    const requiredSubIndex = subscriptionOrder.indexOf(privilege.required_subscription)

    return hasRequiredGrade && subIndex >= requiredSubIndex
  }

  const getPrivilegeUsage = (privilegeId: string) => {
    return userPrivileges.find((up) => up.privilege_id === privilegeId)
  }

  const filteredPrivileges = privileges.filter((privilege) => {
    if (filter === "all") return true
    const isAvailable = isPrivilegeAvailable(privilege)
    return filter === "available" ? isAvailable : !isAvailable
  })

  const categories = Array.from(new Set(filteredPrivileges.map((p) => p.category)))

  return (
    <>
      <div className="flex gap-2 mb-6">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-transparent"}
        >
          Все
        </Button>
        <Button
          variant={filter === "available" ? "default" : "outline"}
          onClick={() => setFilter("available")}
          className={filter === "available" ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-transparent"}
        >
          Доступные
        </Button>
        <Button
          variant={filter === "unavailable" ? "default" : "outline"}
          onClick={() => setFilter("unavailable")}
          className={
            filter === "unavailable" ? "bg-accent text-accent-foreground hover:bg-accent/90" : "bg-transparent"
          }
        >
          Недоступные
        </Button>
      </div>

      {categories.map((category) => {
        const categoryPrivileges = filteredPrivileges.filter((p) => p.category === category)

        if (categoryPrivileges.length === 0) return null

        return (
          <div key={category} className="mb-8">
            <h3 className="text-xl font-semibold mb-4 capitalize">{category}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryPrivileges.map((privilege) => {
                const isAvailable = isPrivilegeAvailable(privilege)
                const usage = getPrivilegeUsage(privilege.id)
                const Icon = iconMap[privilege.icon || "calendar"] || Calendar
                const effectiveLimit = usage?.custom_limit ?? privilege.limit_value
                const remaining = effectiveLimit - (usage?.used_count || 0)

                return (
                  <Card
                    key={privilege.id}
                    className={`p-5 cursor-pointer transition-all hover:shadow-lg hover:border-accent/50 ${!isAvailable ? "opacity-50" : ""} bg-card border-border/50`}
                    onClick={() => setSelectedPrivilege(privilege)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${isAvailable ? "bg-accent/10" : "bg-secondary"}`}>
                        <Icon className={`h-6 w-6 ${isAvailable ? "text-accent" : "text-muted-foreground"}`} />
                      </div>

                      {isAvailable ? (
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20">
                          <Check className="h-3 w-3 mr-1" />
                          Доступно
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-border/50 text-muted-foreground">
                          <Lock className="h-3 w-3 mr-1" />
                          Недоступно
                        </Badge>
                      )}
                    </div>

                    <h4 className="font-semibold text-lg mb-2">{privilege.name}</h4>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {privilege.description}
                    </p>

                    {isAvailable && usage && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Использовано</span>
                          <span className="font-medium">
                            {usage.used_count} / {effectiveLimit}
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent transition-all rounded-full"
                            style={{
                              width: `${Math.min((usage.used_count / effectiveLimit) * 100, 100)}%`,
                            }}
                          />
                        </div>
                        {remaining > 0 && <p className="text-xs text-muted-foreground mt-1">Осталось: {remaining}</p>}
                      </div>
                    )}

                    {!isAvailable && (
                      <div className="text-xs text-muted-foreground mb-4">
                        Требуется:{" "}
                        {privilege.required_grade.charAt(0).toUpperCase() + privilege.required_grade.slice(1)}
                        {privilege.required_subscription && ` + ${privilege.required_subscription}`}
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>
        )
      })}

      {selectedPrivilege && (
        <PrivilegeDetailDialog
          privilege={selectedPrivilege}
          usage={getPrivilegeUsage(selectedPrivilege.id)}
          isAvailable={isPrivilegeAvailable(selectedPrivilege)}
          onClose={() => setSelectedPrivilege(null)}
        />
      )}
    </>
  )
}
