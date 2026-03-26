import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { uploadDocument } from "@/lib/storage"
import { logAudit } from "@/lib/audit"

// POST /api/cases/[id]/documents
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const caseId = params.id

  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const documentType = formData.get("documentType") as string
    
    if (!file || !documentType) {
      return NextResponse.json({ error: "Missing file or document type" }, { status: 400 })
    }

    // 1. Upload to Supabase Storage
    const storagePath = await uploadDocument(caseId, file, file.name, documentType)

    // 2. Register in Database
    const document = await prisma.bluedot_case_document.create({
      data: {
        case_id: caseId,
        document_type: documentType,
        category: "patient", // Default or derived
        file_name: file.name,
        file_url: storagePath,
        file_size: file.size,
        mime_type: file.type,
        // uploaded_by could be added here if we have active session
      }
    })

    // 3. Log Audit
    await logAudit(caseId, null, "document_upload", "document", undefined, documentType, req)

    return NextResponse.json(document)
  } catch (error: any) {
    console.error("Error uploading document:", error)
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
  }
}
