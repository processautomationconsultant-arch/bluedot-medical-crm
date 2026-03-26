import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { subMonths, startOfMonth, endOfMonth, format } from "date-fns"

export async function GET() {
  try {
    const now = new Date()
    const sixMonthsAgo = subMonths(now, 6)

    // 1. Monthly growth (last 6 months)
    const cases = await prisma.bluedot_transfer_case.findMany({
      where: {
        create_date: { gte: sixMonthsAgo }
      },
      select: {
        create_date: true,
        transfer_type: true,
      }
    })

    const monthlyData: Record<string, number> = {}
    for (let i = 0; i < 6; i++) {
      const month = format(subMonths(now, i), "MMM yy")
      monthlyData[month] = 0
    }

    cases.forEach(c => {
      const month = format(c.create_date, "MMM yy")
      if (monthlyData[month] !== undefined) monthlyData[month]++
    })

    const growthChart = Object.entries(monthlyData)
      .map(([name, total]) => ({ name, total }))
      .reverse()

    // 2. Revenue by type
    const expenses = await prisma.bluedot_expense.findMany({
      where: { is_archived: false },
      include: {
        case: {
          select: { transfer_type: true }
        }
      }
    })

    const typeRevenue: Record<string, number> = {}
    expenses.forEach(e => {
      const type = e.case?.transfer_type || 'Unknown'
      typeRevenue[type] = (typeRevenue[type] || 0) + e.amount_aed
    })

    const revenueChart = Object.entries(typeRevenue).map(([name, value]) => ({ name, value }))

    // 3. Staff Utilization (Case count per doctor/nurse)
    const doctors = await prisma.bluedot_staff.findMany({
      where: { role: 'doctor' },
      include: {
        doctor_cases: { select: { id: true } }
      }
    })

    const staffChart = doctors.map(d => ({
      name: d.name,
      cases: d.doctor_cases.length
    })).sort((a, b) => b.cases - a.cases).slice(0, 5)

    return NextResponse.json({
      growthChart,
      revenueChart,
      staffChart
    })
  } catch (error) {
    console.error("Analytics API error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
