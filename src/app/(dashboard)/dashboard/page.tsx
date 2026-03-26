"use client"

import { useEffect, useState } from "react"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { StatusChart } from "@/components/dashboard/status-chart"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Download, RefreshCcw } from "lucide-react"

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/dashboard/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col space-y-8 p-1">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 w-full" />)}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="col-span-4 h-[400px]" />
          <Skeleton className="col-span-3 h-[400px]" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-8 p-1">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Mission Control</h2>
          <p className="text-muted-foreground">Welcome back. Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-2">
           <Button variant="outline" size="sm" onClick={fetchStats}>
             <RefreshCcw className="mr-2 h-4 w-4" /> Refresh
           </Button>
           <Button size="sm">
             <Download className="mr-2 h-4 w-4" /> Export Report
           </Button>
        </div>
      </div>

      <StatsCards stats={stats} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <RevenueChart data={stats?.expenses || []} />
        </div>
        <div className="col-span-3">
          <StatusChart data={stats?.statusCounts || []} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <div className="col-span-4">
           {/* Recent Activity */}
           <RecentActivity logs={stats?.recentLogs || []} />
        </div>
        <div className="col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Case Quick Links</CardTitle>
              <CardDescription>Recently updated missions.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  {(stats?.recentCases || []).map((c: any) => (
                    <div key={c.id} className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors border-b last:border-0 border-dashed">
                       <div className="flex flex-col">
                          <span className="text-sm font-bold uppercase">{c.case_id}</span>
                          <span className="text-xs text-muted-foreground">{c.patient_name}</span>
                       </div>
                       <Button variant="ghost" size="sm" asChild>
                         <a href={`/cases/${c.id}`}>View</a>
                       </Button>
                    </div>
                  ))}
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
