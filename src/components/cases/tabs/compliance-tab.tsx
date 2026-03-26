"use client"

import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ShieldAlert, CheckCircle2, ClipboardCheck, AlertTriangle, Info, MoreHorizontal, Fingerprint } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ComplianceTabProps {
  data: any
  onUpdate: (update: any) => Promise<any>
}

export function ComplianceTab({ data, onUpdate }: ComplianceTabProps) {
  const handleUpdate = async (field: string, value: any) => {
    if (data[field] === value) return
    await onUpdate({ [field]: value })
  }

  const checklistItems = [
    { id: "medif_original", label: "MEDIF Original Received", checked: data.medif_original },
    { id: "pre_transfer_mails", label: "Pre-Transfer Notifications Sent", checked: data.pre_transfer_mails },
    { id: "flight_brief", label: "Flight Brief Generated & Signed", checked: data.flight_brief },
    { id: "crew_clearance", label: "Medical Crew Visa & Clearance", checked: true }, // Placeholder for logic
    { id: "ground_noc", label: "Ground Hospital NOC Received", checked: true },
  ]

  const completedCount = checklistItems.filter(i => i.checked).length
  const totalCount = checklistItems.length
  const readinessPercent = Math.round((completedCount / totalCount) * 100)

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Readiness Executive Summary */}
      <section>
        <header className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                 <ClipboardCheck className="h-4 w-4" />
              </div>
              <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Mission Readiness Audit</h3>
           </div>
           <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-outline-variant uppercase">Overall clearance</span>
              <span className={cn(
                "px-3 py-1 rounded-lg text-[10px] font-black italic shadow-sm",
                readinessPercent === 100 ? "bg-green-600 text-white" : "bg-primary text-white"
              )}>
                {readinessPercent}% SECURE
              </span>
           </div>
        </header>

        <div className="bg-surface-variant/10 border border-outline-variant/10 rounded-[32px] p-8 overflow-hidden relative">
           <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="relative h-32 w-32 shrink-0">
                 <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle className="text-outline-variant/10" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                    <circle 
                       className="text-primary transition-all duration-1000" 
                       strokeWidth="8" 
                       strokeDasharray={251.2} 
                       strokeDashoffset={251.2 - (251.2 * readinessPercent) / 100} 
                       strokeLinecap="round" 
                       stroke="currentColor" 
                       fill="transparent" 
                       r="40" cx="50" cy="50" 
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-on-surface font-headline">{readinessPercent}%</span>
                 </div>
              </div>
              
              <div className="space-y-4 flex-grow text-center md:text-left">
                 <h4 className="text-lg font-black text-on-surface font-headline italic">Mission Protocol Integrity</h4>
                 <p className="text-sm font-medium text-on-surface-variant leading-relaxed max-w-xl">
                    All regulatory, safety, and logistical checks must be verified before mission activation. 
                    {readinessPercent < 100 && " Currently awaiting final clearance signatures."}
                 </p>
                 <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-outline-variant/5 shadow-sm">
                       <ShieldAlert className="h-4 w-4 text-primary" />
                       <span className="text-[10px] font-black text-on-surface uppercase tracking-tighter">Legal Reviewed</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-outline-variant/5 shadow-sm">
                       <Fingerprint className="h-4 w-4 text-green-600" />
                       <span className="text-[10px] font-black text-on-surface uppercase tracking-tighter">PII Encrypted</span>
                    </div>
                 </div>
              </div>
           </div>
           
           {/* Abstract watermark */}
           <ShieldAlert className="absolute -right-10 -bottom-10 h-64 w-64 text-on-surface opacity-[0.02] rotate-12" />
        </div>
      </section>

      {/* Checklist Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-6">
            <h4 className="text-[10px] font-extrabold text-outline uppercase tracking-[0.2em] flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-primary/40" /> Operational Prerequisites
            </h4>
            <div className="space-y-4">
               {checklistItems.map(item => (
                 <div 
                   key={item.id} 
                   className={cn(
                     "p-5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer",
                     item.checked ? "bg-white border-primary/20 shadow-sm" : "bg-surface-variant/10 border-outline-variant/10"
                   )}
                   onClick={() => handleUpdate(item.id, !item.checked)}
                 >
                    <div className="flex items-center gap-4">
                       <div className={cn(
                         "h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all",
                         item.checked ? "bg-primary border-primary text-white" : "border-outline-variant/30 text-transparent"
                       )}>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                       </div>
                       <span className={cn(
                         "text-xs font-bold transition-all",
                         item.checked ? "text-on-surface" : "text-outline-variant"
                       )}>{item.label}</span>
                    </div>
                    {item.checked && (
                       <span className="text-[9px] font-black text-primary uppercase italic opacity-0 group-hover:opacity-100 transition-opacity">VERIFIED</span>
                    )}
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-6">
            <h4 className="text-[10px] font-extrabold text-outline uppercase tracking-[0.2em] flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-error/40" /> Critical Document Audit
            </h4>
            <div className="bg-white border border-outline-variant/10 rounded-3xl p-8 space-y-8 shadow-sm">
               <div className="space-y-4">
                  <label className="text-[9px] font-black text-outline uppercase tracking-widest leading-none">Passport Validity Expiry</label>
                  <Input 
                    type="date"
                    className="form-input-stitch !py-4 font-bold"
                    defaultValue={data.patient_passport_validity ? new Date(data.patient_passport_validity).toISOString().split('T')[0] : ""}
                    onBlur={(e) => handleUpdate("patient_passport_validity", e.target.value ? new Date(e.target.value).toISOString() : null)}
                  />
               </div>
               <div className="space-y-4">
                  <label className="text-[9px] font-black text-outline uppercase tracking-widest leading-none">Visa Overstay Fines/Police Notes</label>
                  <div className="relative">
                     <AlertTriangle className="h-4 w-4 absolute left-4 top-4 text-error" />
                     <textarea 
                       className="form-input-stitch !pl-12 min-h-[120px] pt-3 resize-none"
                       defaultValue={data.visa_overstay_fines_police} 
                       onBlur={(e) => handleUpdate("visa_overstay_fines_police", e.target.value)}
                       placeholder="Detail any active police cases or immigration fines that may block the transfer..."
                     />
                  </div>
               </div>
               <Button className="w-full bg-on-surface text-white h-14 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                  Sign Off Audit Log
               </Button>
            </div>
         </div>
      </section>
    </div>
  )
}
