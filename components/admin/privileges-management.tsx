"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Privilege {
  id: string
  name: string
  category: string
  limit_value: number
}

interface Client {
  id: string
  full_name: string
  email: string
}

interface PrivilegesManagementProps {
  privileges: Privilege[]
  clients: Client[]
}

export function PrivilegesManagement({ privileges, clients }: PrivilegesManagementProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    clientId: "",
    privilegeId: "",
    newLimit: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.clientId || !formData.privilegeId) {
      toast.error("Выберите клиента и привилегию")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/update-privilege-limit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: formData.clientId,
          privilegeId: formData.privilegeId,
          newLimit: formData.newLimit,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update privilege limit")
      }

      toast.success("Лимит привилегии обновлен!")

      setFormData({
        clientId: "",
        privilegeId: "",
        newLimit: 0,
      })

      router.refresh()
    } catch (error) {
      console.error("[v0] Error updating privilege limit:", error)
      toast.error("Ошибка при обновлении лимита")
    } finally {
      setIsLoading(false)
    }
  }

  const selectedPrivilege = privileges.find((p) => p.id === formData.privilegeId)

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Управление привилегиями клиентов</h3>
        <p className="text-sm text-muted-foreground">
          Измените количество доступных использований привилегии для конкретного клиента
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="client">Клиент</Label>
          <Select value={formData.clientId} onValueChange={(value) => setFormData({ ...formData, clientId: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите клиента" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.full_name} ({client.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="privilege">Привилегия</Label>
          <Select
            value={formData.privilegeId}
            onValueChange={(value) => setFormData({ ...formData, privilegeId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите привилегию" />
            </SelectTrigger>
            <SelectContent>
              {privileges.map((privilege) => (
                <SelectItem key={privilege.id} value={privilege.id}>
                  {privilege.name} ({privilege.category})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedPrivilege && (
          <div className="p-3 bg-muted rounded-lg text-sm">
            <p className="text-muted-foreground">
              Стандартный лимит: <span className="font-medium text-foreground">{selectedPrivilege.limit_value}</span>
            </p>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="newLimit">Новый лимит</Label>
          <Input
            id="newLimit"
            type="number"
            min="0"
            value={formData.newLimit}
            onChange={(e) => setFormData({ ...formData, newLimit: Number(e.target.value) })}
            placeholder="Введите новый лимит"
            required
          />
          <p className="text-xs text-muted-foreground">Установите 0, чтобы полностью закрыть доступ к привилегии</p>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full bg-tinkoff text-black hover:bg-tinkoff/90">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Обновление...
            </>
          ) : (
            "Обновить лимит"
          )}
        </Button>
      </form>
    </Card>
  )
}
