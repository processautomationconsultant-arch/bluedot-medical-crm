"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Calendar, Download, Filter } from "lucide-react"

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await fetch("/api/analytics/summary")
        if (res.ok) {
          const result = await res.json()
          setData(result)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col space-y-8 p-1">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col space-y-8 p-1">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Intelligence & Insights</h2>
          <p className="text-muted-foreground">Self-serve analytics for medical assistance performance.</p>
        </div>
        <div className="flex items-center space-x-2">
           <Button variant="outline" size="sm">
             <Calendar className="mr-2 h-4 w-4" /> Last 6 Months
           </Button>
           <Button variant="outline" size="sm">
             <Filter className="mr-2 h-4 w-4" /> Filters
           </Button>
           <Button size="sm">
             <Download className="mr-2 h-4 w-4" /> Export Data
           </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Growth Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Monthly Case Volume</CardTitle>
            <CardDescription>Number of transfers initiated per month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.growthChart}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#2563eb" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#2563eb' }}
                    activeDot={{ r: 6 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Type */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Captured Expenses by Mission Type</CardTitle>
            <CardDescription>Distribution of mission costs across AA, ME, GA, etc.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.revenueChart}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    formatter={(val) => [`AED ${Number(val).toLocaleString()}`, 'Total Revenue']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Staff Utilization */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Staff Case Load (Top Doctors)</CardTitle>
            <CardDescription>Number of assigned missions per medical doctor.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.staffChart}>
                    <defs>
                      <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="cases" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorCases)" 
                      strokeWidth={3}
                    />
                  </AreaChart>
               </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
