"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const COLORS = {
  new: "#6366f1", // Indigo
  active: "#22c55e", // Green
  on_hold: "#f59e0b", // Amber
  cancelled: "#ef4444", // Red
  closed: "#94a3b8", // Slate
}

interface StatusChartProps {
  data: any[]
}

export function StatusChart({ data }: StatusChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader><CardTitle>Case Status Distribution</CardTitle></CardHeader>
        <CardContent className="flex items-center justify-center min-h-[300px] text-muted-foreground">
          No data available.
        </CardContent>
      </Card>
    )
  }

  const chartData = data.map(item => ({
    name: item.name.toUpperCase().replace('_', ' '),
    value: item.value,
    color: COLORS[item.name as keyof typeof COLORS] || "#cbd5e1"
  }))

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Case Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
