"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Client {
  id: string
  full_name: string
  email: string
  phone: string
  balance: number
  grade: string
  subscription: string
}

interface ViewClientDialogProps {
  client: Client
  onClose: () => void
}

interface UserPrivilege {
  privilege_id: string
  used_count: number
  last_used_at: string | null
  next_reset_at: string
  privileges: {
    name: string
    limit_value: number
    category: string
  }
}

export function ViewClientDialog({ client, onClose }: ViewClientDialogProps) {
  const [privileges, setPrivileges] = useState<UserPrivilege[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPrivileges = async () => {
      try {
        const response = await fetch(`/api/admin/client-privileges?clientId=${client.id}`)
        const data = await response.json()

        if (response.ok) {
          setPrivileges(data.privileges || [])
        }
      } catch (error) {
        console.error("[v0] Error fetching privileges:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPrivileges()
  }, [client.id])

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Информация о клиенте</DialogTitle>
          <DialogDescription>{client.full_name}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{client.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Телефон</p>
              <p className="font-medium">{client.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Баланс</p>
              <p className="font-medium">{client.balance.toLocaleString("ru-RU")} ₽</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Грейд</p>
              <Badge variant="secondary">{client.grade.toUpperCase()}</Badge>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Использование привилегий</h4>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : privileges.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">Привилегии еще не использовались</p>
            ) : (
              <div className="rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Привилегия</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Использовано</TableHead>
                      <TableHead>Последнее использование</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {privileges.map((priv) => (
                      <TableRow key={priv.privilege_id}>
                        <TableCell className="font-medium">{priv.privileges.name}</TableCell>
                        <TableCell className="capitalize">{priv.privileges.category}</TableCell>
                        <TableCell>
                          {priv.used_count} / {priv.privileges.limit_value}
                        </TableCell>
                        <TableCell>
                          {priv.last_used_at
                            ? new Date(priv.last_used_at).toLocaleDateString("ru-RU")
                            : "Не использовалась"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
