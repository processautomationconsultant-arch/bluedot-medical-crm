// Dropdown Constants mapped to Odoo enum values
export const ZONES = ['zone_1', 'zone_2', 'zone_3'] as const;
export const TRANSFER_TYPES = ['aa', 'me', 'ga', 'ta', 'cf'] as const;
export const TRANSFER_CLASSES = ['int', 'me', 'ext', 'ga', 'ta', 'stcr', 'bcwa', 'ecwa', 'fcwa'] as const;
export const CASE_STATES = ['new', 'active', 'on_hold', 'cancelled', 'closed'] as const;

export const URGENCY_TIERS = {
  OVERDUE: 1,
  CRITICAL: 2,
  URGENT: 3,
  ATTENTION: 4,
  UPCOMING: 5,
  PLANNED: 6
} as const;

export const ROLES = ['doctor', 'nurse', 'paramedic', 'case_manager', 'sales'] as const;

export const PATIENT_LOCATIONS = ['hospital', 'home', 'other'] as const;
export const DESTINATION_TYPES = ['hospital', 'home', 'airport', 'other'] as const;
export const SOURCES = ['doh', 'dha', 'bluedot', 'other'] as const;
export const PATIENT_GENDERS = ['male', 'female', 'other'] as const;
export const DOCUMENT_TYPES = [
  { id: 'medif', label: 'MEDIF', category: 'medical' },
  { id: 'passport', label: 'Passport', category: 'identity' },
  { id: 'visa', label: 'Visa', category: 'travel' },
  { id: 'ticket', label: 'Flight Ticket', category: 'travel' },
  { id: 'insurance', label: 'Insurance Case', category: 'billing' },
  { id: 'medical_report', label: 'Medical Report', category: 'medical' },
  { id: 'lab_results', label: 'Lab Results', category: 'medical' },
  { id: 'consent_form', label: 'Consent Form', category: 'legal' },
  { id: 'equipment_carrying_form', label: 'Equipment Form', category: 'logistics' },
  { id: 'flight_brief', label: 'Flight Brief', category: 'logistics' },
  { id: 'case_summary', label: 'Case Summary', category: 'medical' },
  { id: 'xray', label: 'X-Ray / Imaging', category: 'medical' },
  { id: 'discharge_summary', label: 'Discharge Summary', category: 'medical' },
  { id: 'physician_note', label: 'Physician Note', category: 'medical' },
  { id: 'id_front', label: 'ID Front', category: 'identity' },
  { id: 'id_back', label: 'ID Back', category: 'identity' },
  { id: 'vaccination_record', label: 'Vaccination', category: 'medical' },
  { id: 'covid_test', label: 'COVID Test', category: 'medical' },
  { id: 'police_clearance', label: 'Police Clearance', category: 'legal' },
  { id: 'ambulance_handover', label: 'Ambulance Handover', category: 'medical' },
  { id: 'hotel_voucher', label: 'Hotel Voucher', category: 'travel' },
  { id: 'visa_fine_receipt', label: 'Visa Fine Receipt', category: 'billing' },
  { id: 'other_medical', label: 'Other Medical', category: 'medical' },
  { id: 'other_travel', label: 'Other Travel', category: 'travel' },
] as const;
