import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { startOfMonth, endOfMonth, addDays } from "date-fns"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const start = searchParams.get("start") || startOfMonth(new Date()).toISOString()
    const end = searchParams.get("end") || endOfMonth(new Date()).toISOString()

    const cases = await prisma.bluedot_transfer_case.findMany({
      where: {
        planned_transfer_date: {
          gte: new Date(start),
          lte: new Date(end),
        },
        is_archived: false,
      },
      include: {
        doctor: true,
        nurse: true,
      }
    })

    const events = cases.map(c => ({
      id: c.id,
      title: `${c.case_id} - ${c.patient_name}`,
      start: c.planned_transfer_date,
      // For now, assume 24h block or until ETA if available
      end: c.flight_eta || addDays(new Date(c.planned_transfer_date!), 1),
      extendedProps: {
        caseId: c.case_id,
        status: c.state,
        doctor: c.doctor?.name,
        nurse: c.nurse?.name,
      },
      // Color coding
      backgroundColor: c.state === 'active' ? '#22c55e' : c.state === 'new' ? '#6366f1' : '#94a3b8',
      borderColor: 'transparent',
    }))

    return NextResponse.json(events)
  } catch (error) {
    console.error("Calendar events error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
