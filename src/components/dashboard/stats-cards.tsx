"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, AlertCircle, FileText, CheckCircle2 } from "lucide-react"

interface StatsCardsProps {
  stats: any
}

export function StatsCards({ stats }: StatsCardsProps) {
  const kpis = stats?.kpis || { active: 0, new: 0, total: 0 }

  const cards = [
    {
      title: "Active Cases",
      value: kpis.active.toString(),
      description: "Ongoing medical transfers",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "New Requests",
      value: kpis.new.toString(),
      description: "Awaiting initial review",
      icon: AlertCircle,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      title: "Total Missions",
      value: kpis.total.toString(),
      description: "Life-to-date transfers",
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      title: "Pending Docs",
      value: "14", // Mocked for now
      description: "Awaiting clearance",
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div className={`rounded-md p-2 ${card.bg}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
