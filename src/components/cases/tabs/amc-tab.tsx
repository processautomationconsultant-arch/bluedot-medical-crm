"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plane, User, Clock, CreditCard, CheckCircle2, AlertCircle, Calendar, ShieldCheck, Headphones } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AMCTabProps {
  data: any
  onUpdate: (update: any) => Promise<any>
}

export function AMCTab({ data, onUpdate }: AMCTabProps) {
  const amc = data?.amc || {}

  const handleUpdate = async (field: string, value: any) => {
    if (amc[field] === value) return
    await onUpdate({
      amc: {
        ...amc,
        [field]: value
      }
    })
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* AMC Executive Control */}
      <section>
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
               <Headphones className="h-4 w-4" />
             </div>
             <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Air Ambulance Coordination</h3>
          </div>
          <div className="flex gap-2">
            <span className={cn(
              "px-3 py-1 rounded-lg text-[10px] font-black italic tracking-tighter shadow-sm",
              amc.status === 'completed' ? "bg-green-600 text-white" : "bg-primary text-white"
            )}>
              {amc.status?.toUpperCase() || "NOT INITIALIZED"}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
               <label className="text-[10px] font-extrabold text-outline uppercase tracking-wider">Service Status</label>
               <Select defaultValue={amc.status} onValueChange={(v) => handleUpdate("status", v)}>
                 <SelectTrigger className="form-input-stitch !py-6 font-bold">
                   <SelectValue placeholder="Select Status" />
                 </SelectTrigger>
                 <SelectContent className="rounded-xl">
                    <SelectItem value="not_required">NOT REQUIRED</SelectItem>
                    <SelectItem value="pending">PENDING ACTIVATION</SelectItem>
                    <SelectItem value="booked">CONFIRMED / BOOKED</SelectItem>
                    <SelectItem value="completed">MISSION COMPLETED</SelectItem>
                 </SelectContent>
               </Select>
            </div>
            <div className="space-y-4">
               <label className="text-[10px] font-extrabold text-outline uppercase tracking-wider">Scheduled Service Date</label>
               <div className="relative">
                  <Calendar className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                  <Input 
                    type="date"
                    className="form-input-stitch !pl-12 !py-6 font-bold"
                    defaultValue={amc.booked_date ? new Date(amc.booked_date).toISOString().split('T')[0] : ""}
                    onBlur={(e) => handleUpdate("booked_date", e.target.value ? new Date(e.target.value).toISOString() : null)}
                  />
               </div>
            </div>
            <div className="space-y-4">
               <label className="text-[10px] font-extrabold text-outline uppercase tracking-wider">Booking Channel</label>
               <Input 
                 className="form-input-stitch !py-6 font-medium"
                 defaultValue={amc.booked_through}
                 onBlur={(e) => handleUpdate("booked_through", e.target.value)}
                 placeholder="e.g. Flight Support Int"
               />
            </div>
        </div>
      </section>

      {/* Assignment & Financials */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Team Assignment */}
         <div className="bg-surface-variant/20 rounded-3xl p-8 border border-outline-variant/10 space-y-8">
            <header className="flex items-center gap-3">
               <User className="h-5 w-5 text-primary" />
               <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Service Personnel</h3>
            </header>
            
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[9px] font-black text-outline uppercase tracking-widest">Designated AMC Attendant</label>
                  <Input 
                    className="form-input-stitch bg-white"
                    defaultValue={amc.amc_attendant}
                    onBlur={(e) => handleUpdate("amc_attendant", e.target.value)}
                    placeholder="Enter attendant name"
                  />
               </div>
               <div className="p-5 bg-white rounded-2xl border border-outline-variant/5 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                        <Clock className="h-5 w-5" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-on-surface uppercase tracking-tight">On-Call Duty</p>
                        <p className="text-[9px] font-bold text-outline-variant uppercase">Standby Status</p>
                     </div>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-green-600 animate-pulse" />
               </div>
            </div>
         </div>

         {/* Financial Oversight */}
         <div className="bg-white border border-outline-variant/10 rounded-3xl p-8 space-y-8 shadow-sm relative overflow-hidden">
            <header className="flex items-center gap-3">
               <CreditCard className="h-5 w-5 text-on-surface" />
               <h3 className="text-[10px] font-bold text-on-surface uppercase tracking-[0.2em]">Service Expenditure</h3>
            </header>

            <div className="grid grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[9px] font-black text-outline uppercase tracking-widest">Agreed Charges</label>
                  <div className="relative">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-primary">AED</span>
                     <Input 
                       type="number"
                       className="form-input-stitch !pl-12 !py-6 text-xl font-headline font-black italic"
                       defaultValue={amc.amc_charges}
                       onBlur={(e) => handleUpdate("amc_charges", parseFloat(e.target.value))}
                     />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[9px] font-black text-outline uppercase tracking-widest">Settled Amount</label>
                  <div className="relative">
                     <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-green-600">AED</span>
                     <Input 
                       type="number"
                       className="form-input-stitch !pl-12 !py-6 text-xl font-headline font-black italic border-green-600/20 text-green-600"
                       defaultValue={amc.payment}
                       onBlur={(e) => handleUpdate("payment", parseFloat(e.target.value))}
                     />
                  </div>
               </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/5">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-[10px] font-bold text-outline uppercase">Settlement Progress</span>
                   <span className="text-[10px] font-black text-on-surface">{Math.round((amc.payment / amc.amc_charges) * 100 || 0)}%</span>
                </div>
                <div className="h-2 w-full bg-surface-variant/30 rounded-full overflow-hidden">
                   <div 
                     className="h-full bg-green-600 transition-all duration-1000" 
                     style={{ width: `${Math.min(100, (amc.payment / amc.amc_charges) * 100 || 0)}%` }} 
                   />
                </div>
            </div>

            <ShieldCheck className="absolute -right-6 -bottom-6 h-32 w-32 text-on-surface opacity-[0.03] -rotate-12" />
         </div>
      </section>
    </div>
  )
}
