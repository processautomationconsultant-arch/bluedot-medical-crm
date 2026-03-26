"use client"

import { Plane, Clock, MapPin, Calendar, Ticket, AlertCircle, Plus, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FlightLogisticsTabProps {
  data: any
  onUpdate: (update: any) => Promise<any>
}

export function FlightLogisticsTab({ data, onUpdate }: FlightLogisticsTabProps) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Active Flight Segment */}
      <section>
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
               <Plane className="h-4 w-4" />
             </div>
             <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Active Flight Segment</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-primary">
              <Plus className="h-3 w-3 mr-1" /> Add Leg
            </Button>
          </div>
        </header>

        <div className="bg-white border border-outline-variant/10 rounded-3xl overflow-hidden shadow-sm">
           <div className="bg-primary/[0.02] px-8 py-6 border-b border-outline-variant/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="px-3 py-1 bg-primary text-white rounded text-[10px] font-black italic tracking-tighter">EK 201</div>
                 <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-on-surface">Emirates Airlines</span>
                    <span className="text-[10px] font-bold text-outline-variant">•</span>
                    <span className="text-sm font-medium text-on-surface-variant italic underline decoration-primary/30">Boeing 777-300ER</span>
                 </div>
              </div>
              <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[10px] font-extrabold uppercase border border-green-100">
                Confirmed / Ticketed
              </span>
           </div>

           <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
              <div className="md:col-span-5 flex items-center justify-between gap-6">
                 <div className="text-left space-y-1">
                    <p className="text-[9px] font-bold text-outline uppercase tracking-widest">Departure</p>
                    <h4 className="text-2xl font-black text-on-surface font-headline">DXB</h4>
                    <p className="text-[10px] font-bold text-on-surface-variant">Dubai Intl, UAE</p>
                    <div className="flex items-center gap-2 text-[10px] font-medium text-primary bg-primary/5 px-2 py-1 rounded w-fit mt-2">
                       <Clock className="h-3 w-3" /> 08:30 UTC
                    </div>
                 </div>
                 
                 <div className="flex-grow flex flex-col items-center gap-2 px-4">
                    <div className="w-full h-px bg-dashed border-t border-outline-variant/30 relative">
                       <Plane className="h-4 w-4 text-primary absolute left-1/2 -translate-x-1/2 -top-2 bg-white" />
                    </div>
                    <span className="text-[9px] font-bold text-outline uppercase tracking-tighter">7h 45m</span>
                 </div>

                 <div className="text-right space-y-1">
                    <p className="text-[9px] font-bold text-outline uppercase tracking-widest">Arrival</p>
                    <h4 className="text-2xl font-black text-on-surface font-headline">LHR</h4>
                    <p className="text-[10px] font-bold text-on-surface-variant">Heathrow, UK</p>
                    <div className="flex items-center gap-2 text-[10px] font-medium text-primary bg-primary/5 px-2 py-1 rounded w-fit ml-auto mt-2">
                       <Clock className="h-3 w-3" /> 16:15 UTC
                    </div>
                 </div>
              </div>

              <div className="md:col-span-1 border-r border-outline-variant/10 h-12 hidden md:block" />

              <div className="md:col-span-6 grid grid-cols-2 gap-8">
                 <div className="space-y-4">
                    <div className="space-y-1">
                       <span className="text-[9px] font-bold text-outline uppercase">Ticket / PNR</span>
                       <p className="text-sm font-bold text-on-surface flex items-center gap-2">
                          6X9B2K <Ticket className="h-3 w-3 text-outline-variant" />
                       </p>
                    </div>
                    <div className="space-y-1">
                       <span className="text-[9px] font-bold text-outline uppercase">Cabin Class</span>
                       <p className="text-sm font-bold text-on-surface">Medical Priority / J</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="space-y-1">
                       <span className="text-[9px] font-bold text-outline uppercase">Oxygen Setup</span>
                       <p className="text-sm font-bold text-primary">Airline Provided</p>
                    </div>
                    <div className="space-y-1">
                       <span className="text-[9px] font-bold text-outline uppercase">Stretcher Ref</span>
                       <p className="text-sm font-bold text-on-surface">STR-82910-BD</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Ground Support & Handling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <section className="space-y-6">
            <header className="flex items-center gap-3">
              <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Departure Handling</h3>
              <div className="flex-grow h-px bg-outline-variant/10" />
            </header>
            
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary">
                        <MapPin className="h-4 w-4" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-outline uppercase">Meeting Point</p>
                        <p className="text-sm font-bold text-on-surface">Terminal 3, VIP Lounge A</p>
                     </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/5">
                     <p className="text-[9px] font-bold text-outline-variant uppercase mb-1">Ambulance ETA</p>
                     <p className="text-sm font-bold text-primary">06:45 Local</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/5">
                     <p className="text-[9px] font-bold text-outline-variant uppercase mb-1">Attendant</p>
                     <p className="text-sm font-bold">Sumith (BD-AMC)</p>
                  </div>
               </div>
            </div>
         </section>

         <section className="space-y-6">
            <header className="flex items-center gap-3">
              <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Arrival & Tarmac</h3>
              <div className="flex-grow h-px bg-outline-variant/10" />
            </header>
            
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-primary">
                        <MapPin className="h-4 w-4" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-outline uppercase">Handover Zone</p>
                        <p className="text-sm font-bold text-on-surface">Aircraft Side (Airside Transfer)</p>
                     </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/5">
                     <p className="text-[9px] font-bold text-outline-variant uppercase mb-1">Ambulance Ref</p>
                     <p className="text-sm font-bold text-on-surface">BLUE-AMB-01</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/5">
                     <p className="text-[9px] font-bold text-outline-variant uppercase mb-1">Hospital Notification</p>
                     <p className="text-sm font-extrabold text-green-600">SENT / ACK</p>
                  </div>
               </div>
            </div>
         </section>
      </div>
    </div>
  )
}
