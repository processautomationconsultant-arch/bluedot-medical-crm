import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { subDays, startOfMonth, endOfMonth } from "date-fns"

export async function GET() {
  try {
    const now = new Date()
    const thirtyDaysAgo = subDays(now, 30)

    // 1. Get counts by state
    const statusCounts = await prisma.bluedot_transfer_case.groupBy({
      by: ['state'],
      _count: true,
    })

    // 2. Get recent cases
    const recentCases = await prisma.bluedot_transfer_case.findMany({
      take: 5,
      orderBy: { create_date: 'desc' },
      select: {
        id: true,
        case_id: true,
        patient_name: true,
        state: true,
        create_date: true,
      }
    })

    // 3. Get financial overview (simplified for demo)
    const expenses = await prisma.bluedot_expense.findMany({
      where: {
        date: { gte: thirtyDaysAgo },
        is_archived: false,
      },
      select: {
        amount_aed: true,
        date: true,
        expense_type: true,
      }
    })

    // 4. Calculate KPIs
    const totalActive = statusCounts.filter(s => s.state === 'active').reduce((acc, s) => acc + s._count, 0)
    const totalNew = statusCounts.filter(s => s.state === 'new').reduce((acc, s) => acc + s._count, 0)
    
    // 5. Recent Audit Logs
    const recentLogs = await prisma.bluedot_case_log.findMany({
      take: 8,
      orderBy: { timestamp: 'desc' },
      select: {
        id: true,
        action: true,
        timestamp: true,
        case_id: true,
      }
    })

    return NextResponse.json({
      statusCounts: statusCounts.map(s => ({ name: s.state, value: s._count })),
      recentCases,
      recentLogs,
      kpis: {
        active: totalActive,
        new: totalNew,
        total: statusCounts.reduce((acc, s) => acc + s._count, 0)
      },
      expenses: expenses.map(e => ({ 
        date: e.date?.toISOString().split('T')[0], 
        amount: e.amount_aed,
        type: e.expense_type
      }))
    })
  } catch (error) {
    console.error("Dashboard stats error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
