import { differenceInHours, isBefore, isAfter } from "date-fns"

export type UrgencyTier = {
  label: string
  color: string
  priority: number
  icon?: string
}

export const URGENCY_TIERS: Record<string, UrgencyTier> = {
  CRITICAL: { label: "CRITICAL", color: "bg-red-600", priority: 1, icon: "🔴" },
  URGENT: { label: "URGENT", color: "bg-orange-500", priority: 2, icon: "🟠" },
  ATTENTION: { label: "ATTENTION", color: "bg-yellow-500", priority: 3, icon: "🟡" },
  UPCOMING: { label: "UPCOMING", color: "bg-blue-500", priority: 4, icon: "🔵" },
  PLANNED: { label: "PLANNED", color: "bg-gray-400", priority: 5, icon: "⚪" },
  OVERDUE: { label: "OVERDUE", color: "bg-black", priority: 0, icon: "⬛" },
}

export function getUrgencyTier(plannedDate: Date | string | null | undefined, state?: string): UrgencyTier {
  if (!plannedDate) return URGENCY_TIERS.PLANNED
  
  const now = new Date()
  const date = new Date(plannedDate)
  
  // If state is terminal (closed, cancelled), it's not urgent
  if (state === 'closed' || state === 'cancelled') return URGENCY_TIERS.PLANNED

  if (isBefore(date, now)) {
    return URGENCY_TIERS.OVERDUE
  }

  const hoursToTransfer = differenceInHours(date, now)

  if (hoursToTransfer < 6) return URGENCY_TIERS.CRITICAL
  if (hoursToTransfer < 24) return URGENCY_TIERS.URGENT
  if (hoursToTransfer < 48) return URGENCY_TIERS.ATTENTION
  if (hoursToTransfer < 72) return URGENCY_TIERS.UPCOMING
  
  return URGENCY_TIERS.PLANNED
}

export function getUrgencyColor(tier: UrgencyTier): string {
  return tier.color
}
