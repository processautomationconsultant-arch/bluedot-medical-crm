import { z } from 'zod';
import { ZONES, TRANSFER_TYPES, TRANSFER_CLASSES, SOURCES, PATIENT_GENDERS, DESTINATION_TYPES, PATIENT_LOCATIONS } from '../constants';

export const CreateCaseSchema = z.object({
  patient_name: z.string().min(1, 'Patient name is required'),
  patient_age: z.number().int().positive().optional().nullable(),
  patient_gender: z.enum(PATIENT_GENDERS).optional().nullable(),
  patient_nationality: z.string().optional().nullable(),
  patient_passport_number: z.string().optional().nullable(),
  patient_diagnosis: z.string().optional().nullable(),
  patient_location: z.enum(PATIENT_LOCATIONS).optional().nullable(),
  patient_address: z.string().optional().nullable(),

  zone: z.enum(ZONES),
  transfer_type: z.enum(TRANSFER_TYPES),
  transfer_class: z.enum(TRANSFER_CLASSES).optional().nullable(),
  source: z.enum(SOURCES).optional().nullable(),
  planned_transfer_date: z.date().optional().nullable(),

  origin_country: z.string().optional().nullable(),
  origin_city: z.string().optional().nullable(),
  destination_country: z.string().optional().nullable(),
  destination_city: z.string().optional().nullable(),
  destination_address: z.string().optional().nullable(),
  destination_type: z.enum(DESTINATION_TYPES).optional().nullable(),

  airlines: z.string().optional().nullable(),
  flight_number: z.string().optional().nullable(),
  flight_etd: z.date().optional().nullable(),
  flight_eta: z.date().optional().nullable(),

  doctor_id: z.string().optional().nullable(),
  nurse_id: z.string().optional().nullable(),
  case_manager_id: z.string().optional().nullable(),
  sales_executive_id: z.string().optional().nullable(),
  remarks: z.string().optional().nullable(),
});

export type CreateCaseFormValues = z.infer<typeof CreateCaseSchema>;
