import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth"; // Unused and causing type errors v5 beta
import prisma from "@/lib/prisma";
import { encrypt, decrypt } from "@/lib/encryption";
import { logAudit } from "@/lib/audit";
import { getDocumentUrl } from "@/lib/storage";

// GET /api/cases/[id]
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const caseData = await prisma.bluedot_transfer_case.findUnique({
      where: { id },
      include: {
        doctor: true,
        nurse: true,
        case_manager: true,
        sales_executive: true,
        departure_port: true,
        arrival_port: true,
        amc: {
          include: {
            booked_by: true,
          },
        },
        sending_facility: true,
        receiving_facility: true,
        documents: {
          where: { is_archived: false },
          orderBy: { upload_date: "desc" },
        },
        expenses: {
          where: { is_archived: false },
          orderBy: { date: "desc" },
        },
        timeline: {
          orderBy: { timestamp: "desc" },
        },
        logs: {
          orderBy: { timestamp: "desc" },
          take: 50,
        },
      },
    });

    if (!caseData) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    // Decrypt sensitive fields
    const decryptedCase = {
      ...caseData,
      patient_passport_number: caseData.patient_passport_number ? decrypt(caseData.patient_passport_number) : null,
      patient_diagnosis: caseData.patient_diagnosis ? decrypt(caseData.patient_diagnosis) : null,
      relative_contact_number: caseData.relative_contact_number ? decrypt(caseData.relative_contact_number) : null,
      departure_port: caseData.departure_port ? {
        ...caseData.departure_port,
        co_passenger_contact: caseData.departure_port.co_passenger_contact ? decrypt(caseData.departure_port.co_passenger_contact) : null,
      } : null,
      // Generate signed URLs for documents
      documents: await Promise.all((caseData.documents || []).map(async (doc) => ({
        ...doc,
        view_url: await getDocumentUrl(doc.file_url).catch(() => null)
      })))
    };

    return NextResponse.json(decryptedCase);
  } catch (error) {
    console.error("Error fetching case:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT /api/cases/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const body = await req.json();

  try {
    // 1. Get current data for audit logging
    const currentData = await prisma.bluedot_transfer_case.findUnique({
      where: { id },
      include: {
        departure_port: true,
        arrival_port: true,
        amc: true,
        sending_facility: true,
        receiving_facility: true,
      }
    });

    if (!currentData) {
      return NextResponse.json({ error: "Case not found" }, { status: 404 });
    }

    // 2. Extract and encrypt sensitive fields from body
    const updateData: any = { ...body };
    
    // Encrypt main case fields
    if (updateData.patient_passport_number) updateData.patient_passport_number = encrypt(updateData.patient_passport_number);
    if (updateData.patient_diagnosis) updateData.patient_diagnosis = encrypt(updateData.patient_diagnosis);
    if (updateData.relative_contact_number) updateData.relative_contact_number = encrypt(updateData.relative_contact_number);

    // Separating nested relation updates
    const { departure_port, arrival_port, amc, sending_facility, receiving_facility, ...mainCaseUpdate } = updateData;

    // 3. Perform update in transaction
    const updatedCase = await prisma.$transaction(async (tx) => {
      // Update main case
      const updated = await tx.bluedot_transfer_case.update({
        where: { id },
        data: {
          ...mainCaseUpdate,
          // Update related records if provided
          departure_port: departure_port ? {
            update: {
              ...departure_port,
              co_passenger_contact: departure_port.co_passenger_contact ? encrypt(departure_port.co_passenger_contact) : undefined,
            }
          } : undefined,
          arrival_port: arrival_port ? { update: arrival_port } : undefined,
          amc: amc ? { update: amc } : undefined,
          sending_facility: sending_facility ? { update: sending_facility } : undefined,
          receiving_facility: receiving_facility ? { update: receiving_facility } : undefined,
        },
        include: {
          departure_port: true,
          arrival_port: true,
          amc: true,
          sending_facility: true,
          receiving_facility: true,
        }
      });

      return updated;
    });

    // 4. Log Audit (Simplified for now - can be expanded to check each field)
    // In a real app, I'd compare currentData and updateData to log specific field changes.
    // For now, I'll log a general 'update' action.
    await logAudit(id, null, "update", "case_detail", undefined, undefined, req);

    return NextResponse.json(updatedCase);
  } catch (error) {
    console.error("Error updating case:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
