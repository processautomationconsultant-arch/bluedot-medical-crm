import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const notifications = await prisma.bluedot_notification.findMany({
      take: 20,
      orderBy: { timestamp: 'desc' },
    })

    const unreadCount = await prisma.bluedot_notification.count({
      where: { is_read: false }
    })

    return NextResponse.json({ notifications, unreadCount })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const { id } = await req.json()
    await prisma.bluedot_notification.update({
      where: { id },
      data: { is_read: true }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
