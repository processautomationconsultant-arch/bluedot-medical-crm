"use client"

import { Activity, Thermometer, Droplets, Heart, AlertCircle, ShieldCheck, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MedicalAnalysisTabProps {
  data: any
  onUpdate: (update: any) => Promise<any>
}

export function MedicalAnalysisTab({ data, onUpdate }: MedicalAnalysisTabProps) {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Vitals Stream Dashboard */}
      <section>
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
               <Activity className="h-4 w-4" />
             </div>
             <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Live Vitals Stream</h3>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl font-bold h-8 text-[10px] uppercase tracking-wider bg-surface-variant/20">
            Log New Vitals
          </Button>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <VitalCard icon={Heart} label="Heart Rate" value="82" unit="BPM" status="stable" />
           <VitalCard icon={Activity} label="Blood Pressure" value="128/84" unit="mmHg" status="stable" />
           <VitalCard icon={Droplets} label="SpO2" value="96" unit="%" status="warning" />
           <VitalCard icon={Thermometer} label="Temperature" value="37.2" unit="°C" status="stable" />
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Clinical Assessment */}
        <section className="space-y-6">
          <header className="flex items-center gap-3">
            <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Clinical Assessment</h3>
            <div className="flex-grow h-px bg-outline-variant/10" />
          </header>
          
          <div className="bg-white border border-outline-variant/10 rounded-3xl p-8 shadow-sm space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-outline uppercase">Patient Condition Overview</label>
              <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
                Patient is hemodynamically stable but requires continuous monitoring. Responsive and oriented. Recent ECG shows occasional PVCs.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-outline-variant/5">
               <div className="space-y-1">
                 <span className="text-[9px] font-bold text-outline uppercase">Care Level</span>
                 <p className="text-sm font-bold text-primary">ICU / High Intensity</p>
               </div>
               <div className="space-y-1">
                 <span className="text-[9px] font-bold text-outline uppercase">Mobility</span>
                 <p className="text-sm font-bold text-on-surface">Stretcher Restricted</p>
               </div>
            </div>
          </div>
        </section>

        {/* Medication Log */}
        <section className="space-y-6">
          <header className="flex items-center justify-between">
            <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Medication Log</h3>
            <span className="text-[10px] font-bold text-primary flex items-center gap-1 cursor-pointer hover:underline">
              <Plus className="h-3 w-3" /> ADD ENTRY
            </span>
          </header>

          <div className="flex flex-col gap-3">
             <MedItem name="Amiodarone" dosage="150mg" freq="12h" next="14:30" />
             <MedItem name="Enoxaparin" dosage="40mg" freq="24h" next="20:00" completed />
             <MedItem name="Normal Saline" dosage="500ml" freq="Continuous" next="Ongoing" active />
          </div>
        </section>
      </div>

      {/* Oxygen & Equipment */}
      <section className="bg-surface-variant/20 rounded-3xl p-8 border border-outline-variant/10">
         <header className="flex items-center gap-3 mb-8">
           <AlertCircle className="h-5 w-5 text-primary" />
           <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Equipment & Oxygen Specs</h3>
         </header>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-2">
               <span className="text-[9px] font-bold text-outline uppercase">O2 Requirement</span>
               <p className="text-lg font-bold text-on-surface font-headline">4 Liters / min</p>
               <p className="text-[10px] text-on-surface-variant font-medium">Via Nasal Cannula</p>
            </div>
            <div className="space-y-2">
               <span className="text-[9px] font-bold text-outline uppercase">Monitor Specs</span>
               <p className="text-lg font-bold text-on-surface font-headline">Zoll X Series</p>
               <p className="text-[10px] text-on-surface-variant font-medium">Full Telemetry Streaming</p>
            </div>
            <div className="space-y-2">
               <span className="text-[9px] font-bold text-outline uppercase">Ventilator</span>
               <p className="text-lg font-bold text-outline-variant font-headline italic">Not Required</p>
            </div>
         </div>
      </section>
    </div>
  )
}

function VitalCard({ icon: Icon, label, value, unit, status }: any) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-outline-variant/10 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
         <div className={cn(
           "h-10 w-10 rounded-xl flex items-center justify-center",
           status === "warning" ? "bg-error/10 text-error" : "bg-primary/5 text-primary"
         )}>
           <Icon className="h-5 w-5" />
         </div>
         {status === "warning" && <AlertCircle className="h-4 w-4 text-error" />}
      </div>
      <div>
         <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">{label}</p>
         <div className="flex items-baseline gap-1">
           <span className="text-2xl font-bold text-on-surface font-headline">{value}</span>
           <span className="text-[10px] font-bold text-outline-variant uppercase">{unit}</span>
         </div>
      </div>
    </div>
  )
}

function MedItem({ name, dosage, freq, next, completed, active }: any) {
  return (
    <div className={cn(
      "flex items-center justify-between p-4 rounded-xl border transition-all",
      active ? "bg-primary/5 border-primary/20 shadow-sm" : 
      completed ? "bg-surface-variant/10 border-outline-variant/10 opacity-60" : 
      "bg-white border-outline-variant/10"
    )}>
      <div className="flex items-center gap-4">
         <div className={cn(
           "h-8 w-8 rounded-lg flex items-center justify-center",
           completed ? "bg-green-100 text-green-600" : "bg-surface-variant text-outline"
         )}>
           {completed ? <ShieldCheck className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
         </div>
         <div>
           <p className="text-sm font-bold text-on-surface">{name}</p>
           <p className="text-[10px] text-outline-variant font-medium">{dosage} • {freq}</p>
         </div>
      </div>
      <div className="text-right">
        <p className="text-[9px] font-bold text-outline uppercase">Next Dose</p>
        <p className="text-sm font-bold text-on-surface">{next}</p>
      </div>
    </div>
  )
}
