import prisma from './prisma';
import type { NextRequest } from 'next/server';

export async function logAudit(
  caseId: string | null,
  userId: string | null,
  action: 'create' | 'update' | 'status_change' | 'document_upload' | 'document_view' | 'document_download' | 'login' | 'export' | 'bulk_action',
  fieldChanged?: string,
  oldValue?: string,
  newValue?: string,
  req?: NextRequest
) {
  let ipAddress = 'unknown';
  let userAgent = 'unknown';

  if (req) {
    ipAddress = req.headers.get('x-forwarded-for')?.split(',')[0] || req.headers.get('x-real-ip') || 'unknown';
    userAgent = req.headers.get('user-agent') || 'unknown';
  }

  await prisma.bluedot_case_log.create({
    data: {
      case_id: caseId,
      user_id: userId,
      action,
      field_changed: fieldChanged,
      old_value: oldValue,
      new_value: newValue,
      ip_address: ipAddress,
      user_agent: userAgent,
    },
  });
}
