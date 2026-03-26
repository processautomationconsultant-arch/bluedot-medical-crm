"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { MapPin, Truck, Phone, Hospital, Home, Plane, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ArrivalPortTabProps {
  data: any
  onUpdate: (update: any) => Promise<any>
}

export function ArrivalPortTab({ data, onUpdate }: ArrivalPortTabProps) {
  const ap = data?.arrival_port || {}

  const handleUpdate = async (field: string, value: any) => {
    if (ap[field] === value) return
    await onUpdate({
      arrival_port: {
        ...ap,
        [field]: value
      }
    })
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Destination Identity Section */}
      <section>
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
               <MapPin className="h-4 w-4" />
             </div>
             <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Destination Ground Node</h3>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-primary text-white rounded-lg text-[10px] font-black italic tracking-tighter shadow-sm">ARR-NODE</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-2">
              <label className="text-[10px] font-bold text-outline uppercase tracking-wider">Destination Category</label>
              <Select defaultValue={ap.destination} onValueChange={(v) => handleUpdate("destination", v)}>
                 <SelectTrigger className="form-input-stitch !py-4">
                    <SelectValue placeholder="Select Destination Type" />
                 </SelectTrigger>
                 <SelectContent className="rounded-xl">
                    <SelectItem value="hospital">
                       <div className="flex items-center gap-2">
                          <Hospital className="h-4 w-4" /> <span>Hospital / Medical Center</span>
                       </div>
                    </SelectItem>
                    <SelectItem value="home">
                       <div className="flex items-center gap-2">
                          <Home className="h-4 w-4" /> <span>Private Residence</span>
                       </div>
                    </SelectItem>
                    <SelectItem value="airport">
                       <div className="flex items-center gap-2">
                          <Plane className="h-4 w-4" /> <span>Airport / Connection</span>
                       </div>
                    </SelectItem>
                 </SelectContent>
              </Select>
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-bold text-outline uppercase tracking-wider">Exact Handover Address</label>
              <Input 
                className="form-input-stitch"
                defaultValue={ap.destination_address}
                onBlur={(e) => handleUpdate("destination_address", e.target.value)}
                placeholder="Hospital Wing / Room Number"
              />
           </div>
        </div>
      </section>

      {/* Handover Protocols Section */}
      <section className="bg-primary/[0.02] rounded-3xl p-8 border border-primary/10">
         <header className="flex items-center gap-3 mb-8">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Handover & Tarmac Protocols</h3>
         </header>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProtocolCard label="Tarmac Access" status="Confirmed" icon={CheckCircle2} color="text-green-600" />
            <ProtocolCard label="Hospital NOC" status="Received" icon={CheckCircle2} color="text-green-600" />
            <ProtocolCard label="Customs Clearance" status="In Progress" icon={AlertCircle} color="text-amber-600" />
         </div>
      </section>

      {/* Arrival Ambulance Dispatch Section */}
      <section>
        <header className="flex items-center justify-between mb-8">
           <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-outline" />
              <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Arrival Dispatch Coordination</h3>
           </div>
           <div className="flex items-center gap-3 bg-surface-variant/20 px-4 py-2 rounded-2xl border border-outline-variant/10">
              <span className="text-[10px] font-bold text-on-surface uppercase">Ambulance Required</span>
              <Switch 
                checked={ap.ambulance_required} 
                onCheckedChange={(v: boolean) => handleUpdate("ambulance_required", v)}
              />
           </div>
        </header>

        <div className={cn(
          "transition-all duration-500 overflow-hidden",
          ap.ambulance_required ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
           <div className="bg-white border border-primary/20 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row gap-10 items-center">
              <div className="h-24 w-24 bg-primary/5 rounded-full flex items-center justify-center text-primary shrink-0 shadow-inner">
                 <Truck className="h-10 w-10" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-outline uppercase tracking-widest leading-none">Arrival Provider</label>
                    <Input 
                      className="form-input-stitch !py-4"
                      defaultValue={ap.ambulance_provider} 
                      onBlur={(e) => handleUpdate("ambulance_provider", e.target.value)} 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[9px] font-black text-outline uppercase tracking-widest leading-none">Dispatcher Phone</label>
                    <div className="relative">
                       <Phone className="h-3 w-3 absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                       <Input 
                         className="form-input-stitch !py-4 !pl-8"
                         defaultValue={ap.ambulance_provider_phone} 
                         onBlur={(e) => handleUpdate("ambulance_provider_phone", e.target.value)} 
                       />
                    </div>
                 </div>
                 <div className="flex items-center justify-end">
                    <Button variant="ghost" className="rounded-xl border border-outline-variant/20 text-on-surface font-bold text-[10px] tracking-widest uppercase px-6 h-10">
                      Sync ETA
                    </Button>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}

function ProtocolCard({ label, status, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-outline-variant/5 shadow-sm space-y-3">
       <span className="text-[9px] font-bold text-outline uppercase tracking-widest">{label}</span>
       <div className="flex items-center justify-between">
          <p className={cn("text-xs font-black uppercase tracking-tighter", color)}>{status}</p>
          <Icon className={cn("h-4 w-4", color)} />
       </div>
    </div>
  )
}
