"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PATIENT_GENDERS, ZONES, TRANSFER_TYPES, TRANSFER_CLASSES, SOURCES, PATIENT_LOCATIONS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { ShieldCheck, User, Globe, Activity, MapPin } from "lucide-react"

interface PrimaryDataTabProps {
  data: any
  onUpdate: (update: any) => Promise<any>
}

export function PrimaryDataTab({ data, onUpdate }: PrimaryDataTabProps) {
  const handleBlur = async (field: string, value: any) => {
    if (data[field] === value) return
    await onUpdate({ [field]: value })
  }

  const handleSelectChange = async (field: string, value: string) => {
    if (data[field] === value) return
    await onUpdate({ [field]: value })
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Patient Identity Section */}
      <section>
        <header className="flex items-center gap-3 mb-6">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <User className="h-4 w-4" />
          </div>
          <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Patient Identity & PII</h3>
          <div className="flex-grow h-px bg-outline-variant/10 ml-2" />
          <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 opacity-70">
            <ShieldCheck className="h-3 w-3" />
            ENCRYPTED
          </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FormGroup label="Full Legal Name" className="md:col-span-2">
            <Input 
              className="form-input-stitch"
              defaultValue={data?.patient_name} 
              onBlur={(e) => handleBlur("patient_name", e.target.value)}
            />
          </FormGroup>
          <FormGroup label="Patient Sex">
            <Select defaultValue={data?.patient_gender} onValueChange={(v) => handleSelectChange("patient_gender", v)}>
              <SelectTrigger className="form-input-stitch">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {PATIENT_GENDERS.map(g => <SelectItem key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormGroup>
          <FormGroup label="Date of Birth">
             <Input 
               type="date"
               className="form-input-stitch"
               defaultValue={data?.patient_dob} 
               onBlur={(e) => handleBlur("patient_dob", e.target.value)}
             />
          </FormGroup>
          <FormGroup label="Passport / ID">
            <Input 
              className="form-input-stitch"
              defaultValue={data?.patient_passport_number} 
              onBlur={(e) => handleBlur("patient_passport_number", e.target.value)}
            />
          </FormGroup>
          <FormGroup label="Nationality / CIT">
            <Input 
              className="form-input-stitch"
              defaultValue={data?.patient_nationality} 
              onBlur={(e) => handleBlur("patient_nationality", e.target.value)}
            />
          </FormGroup>
        </div>
      </section>

      {/* Clinical Context Section */}
      <section>
        <header className="flex items-center gap-3 mb-6">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Activity className="h-4 w-4" />
          </div>
          <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Clinical Context</h3>
          <div className="flex-grow h-px bg-outline-variant/10 ml-2" />
        </header>

        <div className="grid grid-cols-1 gap-8">
          <FormGroup label="Primary Diagnosis / Reason for Transfer">
            <textarea 
              className="w-full bg-surface-variant/20 border-outline-variant/30 rounded-2xl p-6 font-bold text-on-surface focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all min-h-[120px]"
              defaultValue={data?.patient_diagnosis} 
              onBlur={(e) => handleBlur("patient_diagnosis", e.target.value)}
            />
          </FormGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <FormGroup label="Current Care Facility">
               <Input 
                 className="form-input-stitch"
                 defaultValue={data?.patient_address} 
                 onBlur={(e) => handleBlur("patient_address", e.target.value)}
                 placeholder="Hospital / Residence"
               />
             </FormGroup>
             <FormGroup label="Care Level Required">
                <Select defaultValue={data?.patient_location} onValueChange={(v) => handleSelectChange("patient_location", v)}>
                  <SelectTrigger className="form-input-stitch">
                    <SelectValue placeholder="Select Intensity" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {PATIENT_LOCATIONS.map(l => <SelectItem key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</SelectItem>)}
                  </SelectContent>
                </Select>
             </FormGroup>
          </div>
        </div>
      </section>

      {/* Mission Parameters Section */}
      <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
        <header className="flex items-center gap-3 mb-8">
          <div className="h-8 w-8 rounded-lg bg-primary text-white flex items-center justify-center">
            <Globe className="h-4 w-4" />
          </div>
          <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Mission Parameters</h3>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FormGroup label="Operational Zone">
            <Select defaultValue={data?.zone} onValueChange={(v) => handleSelectChange("zone", v)}>
              <SelectTrigger className="bg-white border-outline-variant/20 rounded-xl px-4 py-6 font-bold text-on-surface">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {ZONES.map(z => <SelectItem key={z} value={z}>{z.replace('_', ' ').toUpperCase()}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormGroup>
          <FormGroup label="Transfer Class">
            <Select defaultValue={data?.transfer_type} onValueChange={(v) => handleSelectChange("transfer_type", v)}>
              <SelectTrigger className="bg-white border-outline-variant/20 rounded-xl px-4 py-6 font-bold text-on-surface">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {TRANSFER_TYPES.map(t => <SelectItem key={t} value={t}>{t.toUpperCase()}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormGroup>
          <FormGroup label="Inquiry Source">
            <Select defaultValue={data?.source} onValueChange={(v) => handleSelectChange("source", v)}>
              <SelectTrigger className="bg-white border-outline-variant/20 rounded-xl px-4 py-6 font-bold text-on-surface">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {SOURCES.map(s => <SelectItem key={s} value={s}>{s.toUpperCase()}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
           <div className="space-y-4">
              <label className="text-[9px] font-extrabold text-primary uppercase tracking-widest flex items-center gap-2">
                <MapPin className="h-3 w-3" /> Origin Node
              </label>
              <div className="grid grid-cols-2 gap-4">
                 <Input className="bg-white border-outline-variant/20 rounded-xl px-4 py-6 font-bold" placeholder="Country" defaultValue={data?.origin_country} onBlur={(e) => handleBlur("origin_country", e.target.value)} />
                 <Input className="bg-white border-outline-variant/20 rounded-xl px-4 py-6 font-bold" placeholder="City" defaultValue={data?.origin_city} onBlur={(e) => handleBlur("origin_city", e.target.value)} />
              </div>
           </div>
           <div className="space-y-4">
              <label className="text-[9px] font-extrabold text-primary uppercase tracking-widest flex items-center gap-2">
                <MapPin className="h-3 w-3" /> Destination Node
              </label>
              <div className="grid grid-cols-2 gap-4">
                 <Input className="bg-white border-outline-variant/20 rounded-xl px-4 py-6 font-bold" placeholder="Country" defaultValue={data?.destination_country} onBlur={(e) => handleBlur("destination_country", e.target.value)} />
                 <Input className="bg-white border-outline-variant/20 rounded-xl px-4 py-6 font-bold" placeholder="City" defaultValue={data?.destination_city} onBlur={(e) => handleBlur("destination_city", e.target.value)} />
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}

function FormGroup({ label, children, className }: { label: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <label className="text-[10px] font-bold text-outline uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}
