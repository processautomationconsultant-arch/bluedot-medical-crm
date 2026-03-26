"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { MapPin, ShieldCheck, Truck, Phone, User, AlertCircle, Globe, MoreHorizontal, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface DeparturePortTabProps {
  data: any
  onUpdate: (update: any) => Promise<any>
}

export function DeparturePortTab({ data, onUpdate }: DeparturePortTabProps) {
  const dp = data?.departure_port || {}

  const handleUpdate = async (field: string, value: any) => {
    if (dp[field] === value) return
    await onUpdate({
      departure_port: {
        ...dp,
        [field]: value
      }
    })
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Node Identity Section */}
      <section>
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
               <MapPin className="h-4 w-4" />
             </div>
             <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Origin Ground Node</h3>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-primary text-white rounded-lg text-[10px] font-black italic tracking-tighter shadow-sm">DEP-NODE</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-bold text-outline uppercase tracking-wider">Departure Port / Hospital Name</label>
              <Input 
                className="form-input-stitch"
                defaultValue={dp.departure_port}
                onBlur={(e) => handleUpdate("departure_port", e.target.value)}
                placeholder="Name of facility or airport"
              />
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-bold text-outline uppercase tracking-wider">Ground Transfer Type</label>
              <Input 
                className="form-input-stitch"
                defaultValue={dp.ground_transfer_type} 
                onBlur={(e) => handleUpdate("ground_transfer_type", e.target.value)} 
                placeholder="e.g. ALS Ambulance"
              />
           </div>
        </div>
      </section>

      {/* Clearance & Security Section */}
      <section className="bg-surface-variant/20 rounded-3xl p-8 border border-outline-variant/10">
         <header className="flex items-center gap-3 mb-8">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Clearance & Security Desk</h3>
         </header>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
               <label className="text-[10px] font-extrabold text-outline uppercase">Passport Validation</label>
               <Select defaultValue={dp.passport_status} onValueChange={(v) => handleUpdate("passport_status", v)}>
                 <SelectTrigger className="bg-white border-outline-variant/20 rounded-xl px-4 py-6 font-bold">
                   <SelectValue />
                 </SelectTrigger>
                 <SelectContent className="rounded-xl">
                   <SelectItem value="valid">VALID / HELD</SelectItem>
                   <SelectItem value="expired">EXPIRED</SelectItem>
                   <SelectItem value="pending">PENDING PICKUP</SelectItem>
                 </SelectContent>
               </Select>
            </div>
            <div className="space-y-4">
               <label className="text-[10px] font-extrabold text-outline uppercase">Visa Status</label>
               <Select defaultValue={dp.visa_status} onValueChange={(v) => handleUpdate("visa_status", v)}>
                 <SelectTrigger className="bg-white border-outline-variant/20 rounded-xl px-4 py-6 font-bold">
                   <SelectValue />
                 </SelectTrigger>
                 <SelectContent className="rounded-xl">
                   <SelectItem value="valid">VALID / GRANTED</SelectItem>
                   <SelectItem value="overstay">POTENTIAL OVERSTAY</SelectItem>
                   <SelectItem value="not_required">NOT REQUIRED</SelectItem>
                 </SelectContent>
               </Select>
            </div>
            <div className="space-y-4">
               <label className="text-[10px] font-extrabold text-outline uppercase">Police Clearance</label>
               <Select defaultValue={dp.police_case} onValueChange={(v) => handleUpdate("police_case", v)}>
                 <SelectTrigger className="bg-white border-outline-variant/20 rounded-xl px-4 py-6 font-bold">
                   <SelectValue />
                 </SelectTrigger>
                 <SelectContent className="rounded-xl">
                   <SelectItem value="none">NO ACTIVE CASES</SelectItem>
                   <SelectItem value="active">ACTIVE / BLOCKED</SelectItem>
                   <SelectItem value="cleared">CLEARED / NOC</SelectItem>
                 </SelectContent>
               </Select>
            </div>
         </div>
      </section>

      {/* Ambulance Dispatch Section */}
      <section>
        <header className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-outline" />
              <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Ambulance Dispatch</h3>
           </div>
           <div className="flex items-center gap-3 bg-surface-variant/20 px-4 py-2 rounded-2xl border border-outline-variant/10">
              <span className="text-[10px] font-bold text-on-surface uppercase">Dispatch Required</span>
              <Switch 
                checked={dp.ambulance_required} 
                onCheckedChange={(v: boolean) => handleUpdate("ambulance_required", v)}
              />
           </div>
        </header>

        <div className={cn(
          "transition-all duration-500 overflow-hidden",
          dp.ambulance_required ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
           <div className="bg-white border border-primary/20 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-10 items-center">
              <div className="h-24 w-24 bg-primary/5 rounded-full flex items-center justify-center text-primary shrink-0 shadow-inner">
                 <Truck className="h-10 w-10" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-outline uppercase tracking-widest leading-none">Provider Agency</label>
                    <Input 
                      className="form-input-stitch !py-4"
                      defaultValue={dp.ambulance_provider} 
                      onBlur={(e) => handleUpdate("ambulance_provider", e.target.value)} 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-outline uppercase tracking-widest leading-none">Contact Number</label>
                    <div className="relative">
                       <Phone className="h-3 w-3 absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                       <Input 
                         className="form-input-stitch !py-4 !pl-8"
                         defaultValue={dp.ambulance_provider_phone} 
                         onBlur={(e) => handleUpdate("ambulance_provider_phone", e.target.value)} 
                       />
                    </div>
                 </div>
                 <div className="flex items-center justify-end">
                    <Button variant="outline" className="rounded-xl border-dashed border-primary/30 text-primary font-bold text-[10px] tracking-widest uppercase px-6">
                      Verify Dispatch
                    </Button>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}
