import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const staff = await prisma.bluedot_staff.findMany({
      where: { is_active: true },
      orderBy: { name: "asc" },
    })

    return NextResponse.json(staff)
  } catch (error) {
    console.error("Error fetching staff:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
