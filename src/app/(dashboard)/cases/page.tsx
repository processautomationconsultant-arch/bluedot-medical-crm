"use client"

import { 
  PlusCircle, 
  Search, 
  Filter, 
  FileOutput, 
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  AlertCircle,
  Zap,
  Pause,
  Plane,
  Stethoscope,
  Headset,
  X
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function CasesPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface font-headline">Case Management</h1>
          <p className="text-on-surface-variant text-sm font-medium mt-1">Real-time overview of ongoing medical assistance missions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2 px-5 py-6 bg-surface-variant/20 border-outline-variant/30 text-on-surface rounded-xl font-bold transition-all hover:bg-surface-variant/40">
            <FileOutput className="h-5 w-5" />
            Export List
          </Button>
          <Button className="flex items-center gap-2 px-6 py-6 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95">
            <PlusCircle className="h-5 w-5" />
            New Case
          </Button>
        </div>
      </header>

      {/* Tonal Workspace - Filters & Stats */}
      <section className="bg-surface-container-low rounded-2xl p-6 space-y-6 shadow-sm border border-outline-variant/10">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <StatusTab label="All Cases" count={193} active />
          <StatusTab label="Active" count={47} countColor="text-primary" />
          <StatusTab label="New" count={12} countColor="text-primary" />
          <StatusTab label="On Hold" count={5} countColor="text-primary" />
          <StatusTab label="Closed" count={120} countColor="text-primary" />
        </div>

        {/* Advanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-6 border-t border-outline-variant/20">
          <FilterSelect label="Operational Zone" placeholder="All Global Zones" />
          <FilterSelect label="Transfer Type" placeholder="All Types" />
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Date Range</label>
            <div className="relative">
              <Input 
                className="bg-white border-none rounded-xl text-sm py-6 px-4 pr-10 focus:ring-2 focus:ring-primary/20 shadow-sm" 
                value="Mar 01 - Mar 31, 2024" 
                readOnly
              />
              <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-outline h-4 w-4" />
            </div>
          </div>
          <div className="flex items-end">
            <Button variant="ghost" className="w-full py-6 text-primary font-bold text-sm hover:bg-primary/5 rounded-xl transition-colors flex items-center justify-center gap-2">
              <X className="h-4 w-4" />
              Reset All Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Cases Table - High Focus Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-surface-container-low/50 border-b border-outline-variant/10">
                <th className="py-5 pl-6 pr-4 w-10">
                  <Checkbox className="rounded-md border-outline-variant" />
                </th>
                <TableHeader label="Case ID" />
                <TableHeader label="Patient Name" />
                <TableHeader label="Status" />
                <TableHeader label="Date" />
                <TableHeader label="Type" />
                <TableHeader label="Zone" />
                <TableHeader label="Route" />
                <TableHeader label="Doctor" />
                <th className="py-5 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              <CaseRow 
                id="BDC-2026-042" 
                patient="Eleanor Vance" 
                status="Urgent" 
                statusType="error" 
                date="May 12, 2024" 
                type="AA" 
                zone="EMEA-C" 
                route="LHR → JFK" 
                doctor="Dr. Kapoor" 
                doctorInitial="AK"
              />
              <CaseRow 
                id="BDC-2026-039" 
                patient="Marcus Thorne" 
                status="Active" 
                statusType="success" 
                date="May 11, 2024" 
                type="GA" 
                zone="APAC-N" 
                route="SIN → SYD" 
                doctor="Dr. Dubois" 
                doctorInitial="JD"
              />
              <CaseRow 
                id="BDC-2026-038" 
                patient="Sofia Al-Farsi" 
                status="On-Hold" 
                statusType="warning" 
                date="May 10, 2024" 
                type="ME" 
                zone="AMER-S" 
                route="GRU → MIA" 
                doctor="Dr. Hoffman" 
                doctorInitial="LH"
              />
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-5 bg-surface-container-low/30 border-t border-outline-variant/10 flex items-center justify-between">
          <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Showing 1 to 10 of 193 cases</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" disabled className="h-10 w-10 rounded-xl">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button className="h-10 w-10 rounded-xl bg-primary text-white font-bold text-xs">1</Button>
            <Button variant="ghost" className="h-10 w-10 rounded-xl font-bold text-xs text-on-surface-variant hover:bg-surface-variant">2</Button>
            <Button variant="ghost" className="h-10 w-10 rounded-xl font-bold text-xs text-on-surface-variant hover:bg-surface-variant">3</Button>
            <span className="px-2 text-outline text-xs font-bold">...</span>
            <Button variant="ghost" className="h-10 w-10 rounded-xl font-bold text-xs text-on-surface-variant hover:bg-surface-variant">20</Button>
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-surface-variant">
              <ChevronRight className="h-5 w-5 text-on-surface-variant" />
            </Button>
          </div>
        </div>
      </div>

      {/* Bento Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard icon={Plane} label="In-Transit Missions" value="24" color="primary" />
        <SummaryCard icon={Stethoscope} label="Team Deployments" value="18" color="tertiary" />
        <SummaryCard icon={Headset} label="Pending Requests" value="12" color="secondary" />
      </div>
    </div>
  )
}

function StatusTab({ label, count, active, countColor = "text-on-surface-variant" }: any) {
  return (
    <button className={cn(
      "px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm",
      active ? "bg-primary text-white" : "bg-white text-on-surface-variant hover:bg-surface-variant/50"
    )}>
      {label} <span className={cn("ml-1.5 opacity-70", active ? "text-white/80" : countColor)}>{count}</span>
    </button>
  )
}

function FilterSelect({ label, placeholder }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-outline uppercase tracking-widest">{label}</label>
      <Select>
        <SelectTrigger className="w-full bg-white border-none rounded-xl py-6 px-4 shadow-sm focus:ring-2 focus:ring-primary/20 text-sm font-medium">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="rounded-xl border-outline-variant/20 shadow-xl overflow-hidden">
          <SelectItem value="all">{placeholder}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function TableHeader({ label }: any) {
  return (
    <th className="py-5 px-4 font-headline text-[10px] font-bold text-outline uppercase tracking-[0.2em]">{label}</th>
  )
}

function CaseRow({ id, patient, status, statusType, date, type, zone, route, doctor, doctorInitial }: any) {
  const statusStyles: any = {
    error: "bg-error-container text-error border-error",
    success: "bg-green-50 text-green-700 border-green-500",
    warning: "bg-amber-50 text-amber-700 border-amber-500",
  }
  
  const statusIcon: any = {
    error: <AlertCircle className="h-3.5 w-3.5" />,
    success: <Zap className="h-3.5 w-3.5" />,
    warning: <Pause className="h-3.5 w-3.5" />,
  }

  return (
    <tr className="group hover:bg-surface-container-low transition-colors">
      <td className="py-5 pl-6 pr-4">
        <Checkbox className="rounded-md border-outline-variant" />
      </td>
      <td className="py-5 px-4 text-sm font-bold text-primary">{id}</td>
      <td className="py-5 px-4 text-sm font-bold text-on-surface">{patient}</td>
      <td className="py-5 px-4">
        <span className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-widest border-l-2",
          statusStyles[statusType]
        )}>
          {statusIcon[statusType]}
          {status}
        </span>
      </td>
      <td className="py-5 px-4 text-sm font-medium text-on-surface-variant">{date}</td>
      <td className="py-5 px-4">
        <span className="px-2.5 py-1 bg-surface-variant text-on-surface-variant rounded-md text-[10px] font-extrabold uppercase tracking-wider border border-outline-variant/20">
          {type}
        </span>
      </td>
      <td className="py-5 px-4 text-sm font-medium text-on-surface-variant">{zone}</td>
      <td className="py-5 px-4 text-sm font-bold text-on-surface tracking-tight">{route}</td>
      <td className="py-5 px-4">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-full bg-surface-container-high border border-outline-variant/20 text-[10px] flex items-center justify-center font-extrabold text-on-surface">
            {doctorInitial}
          </div>
          <span className="text-sm font-bold text-on-surface-variant">{doctor}</span>
        </div>
      </td>
      <td className="py-5 pl-4 pr-6 text-right">
        <Button variant="ghost" size="icon" className="text-outline opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </td>
    </tr>
  )
}

function SummaryCard({ icon: Icon, label, value, color }: any) {
  const colors: any = {
    primary: "bg-primary/10 text-primary",
    tertiary: "bg-tertiary/10 text-tertiary",
    secondary: "bg-secondary/10 text-secondary",
  }
  
  return (
    <div className="bg-surface-container-low rounded-2xl p-7 border border-outline-variant/10 flex items-center gap-5 shadow-sm hover:shadow-md transition-shadow">
      <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-inner", colors[color])}>
        <Icon className="h-7 w-7" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-outline tracking-widest uppercase mb-1">{label}</p>
        <h4 className="text-3xl font-extrabold text-on-surface font-headline leading-tight">{value}</h4>
      </div>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
