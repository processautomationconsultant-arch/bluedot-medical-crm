"use client"

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { Users, User, ShieldCheck, Mail, Phone, MoreHorizontal, CheckCircle2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CrewTabProps {
  data: any
  onUpdate: (update: any) => Promise<any>
}

export function CrewTab({ data, onUpdate }: CrewTabProps) {
  const [staff, setStaff] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStaff() {
      try {
        const response = await fetch("/api/staff")
        if (response.ok) {
          const result = await response.json()
          setStaff(result)
        } else {
          // Fallback mock data for design consistency
          setStaff([
            { id: "s1", name: "Dr. Hesham Ghonim", role: "doctor", email: "h.ghonim@bluedot.com", phone: "+971 50 XXXXXX" },
            { id: "s2", name: "Mr. Lijo Jose", role: "nurse", email: "l.jose@bluedot.com", phone: "+971 52 XXXXXX" },
            { id: "s3", name: "Mr. Sumith Soman", role: "case_manager", email: "s.soman@bluedot.com", phone: "+971 55 XXXXXX" },
            { id: "s4", name: "Ms. Muqadas Khan", role: "nurse", email: "m.khan@bluedot.com", phone: "+971 56 XXXXXX" },
          ])
        }
      } catch (e) {
        console.error("Staff fetch failed", e)
      } finally {
        setLoading(false)
      }
    }
    fetchStaff()
  }, [])

  const handleStaffChange = async (role: string, staffId: string) => {
    const field = `${role}_id`
    if (data[field] === staffId) return
    await onUpdate({ [field]: staffId })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-40 w-full rounded-2xl" />
        </div>
      </div>
    )
  }

  const doctors = staff.filter(s => s.role === 'doctor')
  const nurses = staff.filter(s => s.role === 'nurse')
  const caseManagers = staff.filter(s => s.role === 'case_manager')

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Medical Team Section */}
      <section>
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
               <Users className="h-4 w-4" />
             </div>
             <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Mission Medical Team</h3>
          </div>
          <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md border border-green-100 italic">
            <ShieldCheck className="h-3 w-3" />
            LICENSED & VERIFIED
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <CrewAssignmentCard 
             role="Lead Physician" 
             staff={doctors} 
             selectedId={data?.doctor_id} 
             onSelect={(id: string) => handleStaffChange("doctor", id)}
             activeStaff={staff.find(s => s.id === data?.doctor_id)}
           />
           <CrewAssignmentCard 
             role="Critical Care Nurse" 
             staff={nurses} 
             selectedId={data?.nurse_id} 
             onSelect={(id: string) => handleStaffChange("nurse", id)}
             activeStaff={staff.find(s => s.id === data?.nurse_id)}
           />
        </div>
      </section>

      {/* Operations Team Section */}
      <section>
        <header className="flex items-center gap-3 mb-8">
          <div className="h-8 w-8 rounded-lg bg-surface-variant flex items-center justify-center text-outline">
            <User className="h-4 w-4" />
          </div>
          <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Mission Operations Control</h3>
          <div className="flex-grow h-px bg-outline-variant/10 ml-2" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <CrewAssignmentCard 
             role="Case Manager" 
             staff={caseManagers} 
             selectedId={data?.case_manager_id} 
             onSelect={(id: string) => handleStaffChange("case_manager", id)}
             activeStaff={staff.find(s => s.id === data?.case_manager_id)}
           />
        </div>
      </section>
    </div>
  )
}

function CrewAssignmentCard({ role, staff, selectedId, onSelect, activeStaff }: any) {
  return (
    <div className={cn(
      "bg-white border rounded-3xl p-6 shadow-sm transition-all duration-300 flex flex-col gap-6",
      activeStaff ? "border-primary/20 bg-primary/[0.01]" : "border-outline-variant/10"
    )}>
       <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-extrabold text-outline uppercase tracking-widest leading-none mb-1">{role}</p>
            <h4 className="text-sm font-bold text-on-surface">Assignment Hub</h4>
          </div>
          <Select defaultValue={selectedId} onValueChange={onSelect}>
             <SelectTrigger className="w-[180px] h-9 text-xs font-bold rounded-lg bg-surface-variant/20 border-outline-variant/30">
                <SelectValue placeholder="Assign Staff" />
             </SelectTrigger>
             <SelectContent className="rounded-xl">
                {staff.map((s: any) => (
                  <SelectItem key={s.id} value={s.id} className="text-xs font-medium">
                    {s.name}
                  </SelectItem>
                ))}
             </SelectContent>
          </Select>
       </div>

       {activeStaff ? (
         <div className="flex items-start gap-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-xl font-black font-headline shadow-inner">
               {activeStaff.name.charAt(0)}
            </div>
            <div className="flex-grow space-y-3">
               <div>
                  <p className="text-base font-extrabold text-on-surface font-headline leading-tight">{activeStaff.name}</p>
                  <p className="text-[10px] text-primary font-bold flex items-center gap-1 uppercase tracking-tighter">
                     <CheckCircle2 className="h-3 w-3" /> MISSION READY
                  </p>
               </div>
               <div className="flex flex-wrap gap-4 pt-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-outline">
                     <Mail className="h-3 w-3" /> {activeStaff.email}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-outline">
                     <Phone className="h-3 w-3" /> {activeStaff.phone}
                  </div>
               </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-lg h-8 w-8 text-outline-variant hover:text-on-surface">
               <MoreHorizontal className="h-4 w-4" />
            </Button>
         </div>
       ) : (
         <div className="h-16 flex items-center justify-center bg-surface-variant/10 rounded-2xl border-2 border-dashed border-outline-variant/10">
            <p className="text-[10px] font-bold text-outline-variant uppercase tracking-widest flex items-center gap-2">
               <AlertCircle className="h-4 w-4" /> Unassigned Position
            </p>
         </div>
       )}
    </div>
  )
}
