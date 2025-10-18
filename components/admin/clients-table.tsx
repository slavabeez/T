"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye } from "lucide-react"
import { EditClientDialog } from "./edit-client-dialog"
import { ViewClientDialog } from "./view-client-dialog"

interface Client {
  id: string
  full_name: string
  email: string
  phone: string
  balance: number
  grade: string
  subscription: string
  created_at: string
}

interface ClientsTableProps {
  clients: Client[]
}

const gradeColors = {
  bronze: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
  silver: "bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-300",
  gold: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",
  diamond: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
}

const subscriptionLabels = {
  none: "Нет",
  pro: "T-Pro",
  premium: "T-Premium",
}

export function ClientsTable({ clients }: ClientsTableProps) {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [viewClient, setViewClient] = useState<Client | null>(null)

  return (
    <>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ФИО</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Баланс</TableHead>
              <TableHead>Грейд</TableHead>
              <TableHead>Подписка</TableHead>
              <TableHead className="text-right">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.full_name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>{client.balance.toLocaleString("ru-RU")} ₽</TableCell>
                <TableCell>
                  <Badge className={gradeColors[client.grade as keyof typeof gradeColors]} variant="secondary">
                    {client.grade.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {subscriptionLabels[client.subscription as keyof typeof subscriptionLabels]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setViewClient(client)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedClient(client)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedClient && <EditClientDialog client={selectedClient} onClose={() => setSelectedClient(null)} />}

      {viewClient && <ViewClientDialog client={viewClient} onClose={() => setViewClient(null)} />}
    </>
  )
}
