"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"
import { Activity, Upload, CheckCircle, FileUp, ShieldCheck } from "lucide-react"

interface RecentActivityProps {
  logs: any[]
}

const ACTION_ICONS = {
  document_upload: Upload,
  document_view: ShieldCheck,
  status_change: CheckCircle,
  create: FileUp,
  update: Activity,
}

export function RecentActivity({ logs }: RecentActivityProps) {
  if (!logs || logs.length === 0) {
    return (
      <Card className="h-full">
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent className="text-center py-10 text-muted-foreground">
          No recent activity logs.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Live feed of CRM operations.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {logs.map((log) => {
            const Icon = ACTION_ICONS[log.action as keyof typeof ACTION_ICONS] || Activity
            return (
              <div key={log.id} className="flex items-start gap-4">
                <div className="mt-0.5 rounded-full border p-1.5 bg-muted/50">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium leading-none">
                    <span className="capitalize">{log.action.replace('_', ' ')}</span> on Case 
                    <span className="text-primary ml-1 font-bold">{log.case_id?.slice(-6).toUpperCase()}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
