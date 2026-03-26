import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { CreateCaseSchema } from "@/lib/validations/cases"
import { logAudit } from "@/lib/audit"
import { encrypt } from "@/lib/encryption"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "50")
    
    // In a real app, we'd add authentication/RBAC check here
    
    const cases = await prisma.bluedot_transfer_case.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        is_archived: false
      },
      orderBy: [
        { urgency_priority: 'asc' },
        { planned_transfer_date: 'asc' }
      ]
    })
    
    const count = await prisma.bluedot_transfer_case.count({
      where: { is_archived: false }
    })
    
    return NextResponse.json({ data: cases, meta: { total: count, page, limit } })
  } catch (error) {
    console.error("[GET_CASES]", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validatedData = CreateCaseSchema.parse(body)
    
    // Encrypt sensitive fields before saving
    if (validatedData.patient_passport_number) {
      validatedData.patient_passport_number = encrypt(validatedData.patient_passport_number)
    }
    if (validatedData.patient_diagnosis) {
       validatedData.patient_diagnosis = encrypt(validatedData.patient_diagnosis)
    }

    // Auto generate case_id
    const currentYear = new Date().getFullYear();
    const caseCount = await prisma.bluedot_transfer_case.count()
    const caseIdStr = `BDC-${currentYear}-${String(caseCount + 1).padStart(3, '0')}`
    
    const newCase = await prisma.bluedot_transfer_case.create({
      data: {
        ...validatedData,
        case_id: caseIdStr,
        state: 'new',
        departure_port: { create: {} },
        arrival_port: { create: {} },
        amc: { create: {} },
        sending_facility: { create: {} },
        receiving_facility: { create: {} }
      }
    })

    await logAudit(
      newCase.id, 
      null, // Anonymous for now since no session
      'create', 
      undefined, 
      undefined, 
      undefined, 
      req
    )

    return NextResponse.json(newCase, { status: 201 })
  } catch (error) {
    console.error("[POST_CASES]", error)
    return new NextResponse("Invalid Request or Internal Error", { status: 400 })
  }
}
