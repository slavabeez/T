"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Client {
  id: string
  full_name: string
  email: string
  phone: string
  balance: number
  grade: string
  subscription: string
}

interface EditClientDialogProps {
  client: Client
  onClose: () => void
}

export function EditClientDialog({ client, onClose }: EditClientDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    balance: client.balance,
    subscription: client.subscription,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/admin/update-client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientId: client.id,
          balance: formData.balance,
          subscription: formData.subscription,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update client")
      }

      toast.success("Клиент обновлен!", {
        description: `Грейд автоматически обновлен до ${data.profile.grade.toUpperCase()}`,
      })

      onClose()
      router.refresh()
    } catch (error) {
      console.error("[v0] Error updating client:", error)
      toast.error("Ошибка при обновлении клиента")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать клиента</DialogTitle>
          <DialogDescription>{client.full_name}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="balance">Баланс (₽)</Label>
            <Input
              id="balance"
              type="number"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })}
              required
            />
            <p className="text-xs text-muted-foreground">Грейд будет автоматически пересчитан на основе баланса</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subscription">Подписка</Label>
            <Select
              value={formData.subscription}
              onValueChange={(value) => setFormData({ ...formData, subscription: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Без подписки</SelectItem>
                <SelectItem value="pro">T-Pro</SelectItem>
                <SelectItem value="premium">T-Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Отмена
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-tinkoff text-black hover:bg-tinkoff/90">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Сохранение...
                </>
              ) : (
                "Сохранить"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
