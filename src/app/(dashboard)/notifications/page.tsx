"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bell, CheckCircle2, AlertCircle, Info, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/notifications")
      if (res.ok) {
        const data = await res.json()
        setNotifications(data.notifications)
      }
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch("/api/notifications", {
        method: "PATCH",
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n))
      }
    } catch (err) {
      toast.error("Failed to mark notification as read")
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <div className="flex flex-col space-y-4 p-1">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
        <Button variant="ghost" size="sm" onClick={fetchNotifications}>Refresh</Button>
      </div>

      <div className="grid gap-4 max-w-4xl">
        {loading ? (
          [1, 2, 3].map(i => <Card key={i} className="animate-pulse h-24" />)
        ) : notifications.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground border rounded-lg bg-muted/20">
             <Bell className="h-10 w-10 mx-auto mb-4 opacity-20" />
             <p>No notifications yet.</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <Card key={notif.id} className={`${!notif.is_read ? 'border-primary/20 bg-primary/5' : 'bg-card'}`}>
              <CardContent className="p-4 flex items-start gap-4">
                 <div className={`mt-1 p-2 rounded-full ${!notif.is_read ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                    <Bell className="h-4 w-4" />
                 </div>
                 <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                       <h4 className="font-bold text-sm tracking-tight">{notif.title}</h4>
                       <span className="text-[10px] text-muted-foreground">{formatDistanceToNow(new Date(notif.timestamp), { addSuffix: true })}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{notif.message}</p>
                    <div className="flex items-center gap-4 mt-2">
                       {!notif.is_read && (
                         <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={() => markAsRead(notif.id)}>
                           Mark as read
                         </Button>
                       )}
                       {notif.case_id && (
                         <Button variant="link" size="sm" className="p-0 h-auto text-xs text-primary" asChild>
                           <a href={`/cases/${notif.case_id}`}>View Case</a>
                         </Button>
                       )}
                    </div>
                 </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
