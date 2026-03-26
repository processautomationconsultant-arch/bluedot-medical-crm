"use client"

import { useState, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"

export default function CalendarPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/calendar/events")
        if (response.ok) {
          const data = await response.json()
          setEvents(data)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchEvents()
  }, [])

  const handleEventClick = (info: any) => {
    router.push(`/cases/${info.event.id}`)
  }

  return (
    <div className="flex flex-col space-y-4 p-1">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Mission Schedule</h2>
      </div>

      <Card className="min-h-[700px]">
        <CardContent className="p-4">
          {loading ? (
            <Skeleton className="h-[600px] w-full" />
          ) : (
            <div className="calendar-container">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={events}
                eventClick={handleEventClick}
                height="auto"
                themeSystem="standard"
                eventTimeFormat={{
                  hour: "2-digit",
                  minute: "2-digit",
                  meridiem: false,
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <style jsx global>{`
        .fc {
          --fc-border-color: #e2e8f0;
          --fc-button-bg-color: #ffffff;
          --fc-button-border-color: #e2e8f0;
          --fc-button-text-color: #0f172a;
          --fc-button-hover-bg-color: #f8fafc;
          --fc-button-active-bg-color: #f1f5f9;
          --fc-today-bg-color: #f8fafc;
          font-family: inherit;
        }
        .fc .fc-button-primary:not(:disabled).fc-button-active, 
        .fc .fc-button-primary:not(:disabled):active {
          background-color: #0f172a;
          color: white;
        }
        .fc-event {
          cursor: pointer;
          font-size: 0.8rem;
          padding: 2px 4px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}
