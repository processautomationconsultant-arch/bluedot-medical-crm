"use client"

import { 
  Users, 
  Activity, 
  Clock, 
  AlertTriangle, 
  Phone, 
  MoreVertical, 
  Search,
  ArrowRight,
  Wifi,
  Activity as ECGIcon,
  ShoppingBag,
  Timer
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">
            Good morning, Dr. Henderson
          </h1>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-error-container text-error border border-error/10">
              <span className="w-2 h-2 rounded-full bg-error mr-2 animate-pulse"></span>
              4 URGENT ALERTS
            </span>
            <span className="text-outline text-sm font-medium">
              Wednesday, Oct 25 • Shift Desk B
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl font-bold text-sm bg-surface-variant/20 border-outline-variant/30 text-on-surface hover:bg-surface-variant/40">
            Export Shift Report
          </Button>
          <Button className="rounded-xl font-bold text-sm bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
            Emergency Broadcast
          </Button>
        </div>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Metrics Bar */}
        <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Active Cases" value="12" trend="+2 today" icon={Activity} />
          <MetricCard title="Pending Labs" value="04" trend="Updated 5m ago" icon={Search} />
          <MetricCard title="On Call Status" value="ACTIVE" statusIndicator="bg-green-500" icon={Phone} valueColor="text-green-600" />
          <MetricCard title="Avg Response" value="14" unit="min" icon={Timer} />
        </div>

        {/* Primary Alert Zone */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Featured STAT ALERT */}
          <div className="relative overflow-hidden bg-white rounded-2xl shadow-xl border border-error/10 p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center group">
            <div className="absolute top-0 left-0 w-2 h-full bg-error"></div>
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-error-container flex items-center justify-center">
              <AlertTriangle className="text-error h-8 w-8" />
            </div>
            <div className="flex-grow text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <span className="text-error font-extrabold tracking-widest text-[10px] uppercase">STAT ALERT</span>
                <span className="text-outline text-[10px] font-bold uppercase">• Priority 1</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface mb-2 font-headline">
                Patient #8291: Critical Tachycardia
              </h2>
              <p className="text-on-surface-variant text-sm leading-relaxed max-w-md font-medium">
                Immediate physician review required for Room 402-B. Heart rate sustained above 145bpm for 8 minutes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button className="bg-primary text-on-primary px-8 py-6 rounded-xl font-bold text-sm shadow-md hover:brightness-110 active:scale-95 transition-all">
                Review Case Details
              </Button>
              <Button size="icon" variant="outline" className="p-6 bg-surface-container-low text-primary rounded-xl hover:bg-surface-container-high border-none">
                <Phone className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Lab Queue */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="px-6 py-5 flex items-center justify-between border-b border-outline-variant/10">
              <h3 className="font-headline font-bold text-on-surface flex items-center gap-2">
                <Activity className="text-primary h-5 w-5" />
                Lab Queue
              </h3>
              <Button variant="link" className="text-primary text-xs font-bold hover:no-underline">View All</Button>
            </div>
            <div className="divide-y divide-outline-variant/10">
               <QueueItem name="John Doe" detail="Hematology • Panel B" wait="12m" status="Processing" statusColor="primary" initial="JD" />
               <QueueItem name="Sarah Smith" detail="Cardiac • Trop-T" wait="45m" status="High Priority" statusColor="error" initial="SS" />
            </div>
          </div>
        </div>

        {/* Secondary Info Panel */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Shift Info Card */}
          <div className="bg-primary-container text-white p-8 rounded-2xl shadow-xl relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <h4 className="text-on-primary-container text-[10px] font-extrabold uppercase tracking-[0.2em] mb-6">Next Shift</h4>
            <div className="flex items-center gap-5 mb-8">
              <Clock className="h-10 w-10 text-on-primary-container" />
              <div>
                <p className="text-3xl font-extrabold font-headline leading-tight">14:00 - 22:00</p>
                <p className="text-on-primary-container text-xs font-semibold opacity-80">Medical Center East • Hall A</p>
              </div>
            </div>
            <Button className="w-full py-6 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-sm font-bold transition-colors border border-white/10">
              Acknowledge Shift
            </Button>
          </div>

          {/* Inventory Notice */}
          <div className="bg-white p-7 rounded-2xl shadow-sm border-l-4 border-tertiary border border-outline-variant/5">
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-tertiary font-bold text-[10px] uppercase tracking-widest mb-1">Inventory Notice</p>
                <h4 className="text-xl font-bold text-on-surface font-headline leading-none">Restock Meds</h4>
              </div>
              <div className="p-2 bg-tertiary/10 rounded-lg">
                <ShoppingBag className="h-5 w-5 text-tertiary" />
              </div>
            </div>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed font-medium">
              Critical shortage detected for <span className="font-bold text-on-surface">Epinephrine 1mg</span> and surgical supplies in Sector 4.
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold text-outline uppercase tracking-wider">3 items low</span>
              <button className="text-primary text-sm font-extrabold flex items-center gap-1 group">
                Open Supply Log
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Medical Insights (Mini Bento) */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 bg-white p-6 rounded-2xl border border-outline-variant/10 shadow-sm">
              <p className="text-[10px] font-extrabold text-outline uppercase tracking-widest mb-4">Patient Satisfaction</p>
              <div className="flex items-center gap-4">
                <Progress value={94} className="h-2 flex-grow" />
                <span className="text-sm font-extrabold text-on-surface">94%</span>
              </div>
            </div>
            <InsightItem icon={Wifi} label="Live Vitals" value="100%" />
            <InsightItem icon={ECGIcon} label="Tele-Health" value="02" />
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, trend, unit, icon: Icon, statusIndicator, valueColor = "text-on-surface" }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/10 hover:shadow-md transition-all">
      <p className="text-[10px] text-outline font-extrabold uppercase tracking-widest mb-2">{title}</p>
      <div className="flex items-baseline gap-2">
        <span className={cn("text-3xl font-extrabold font-headline", valueColor)}>{value}</span>
        {unit && <span className="text-sm font-bold text-on-surface-variant lowercase">{unit}</span>}
        {trend && <span className="text-[10px] text-green-600 font-bold ml-auto">{trend}</span>}
        {statusIndicator && <span className={cn("w-2 h-2 rounded-full animate-pulse ml-auto", statusIndicator)}></span>}
      </div>
    </div>
  )
}

function QueueItem({ name, detail, wait, status, statusColor, initial }: any) {
  return (
    <div className="px-6 py-5 flex items-center justify-between hover:bg-surface-container-low transition-colors group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-surface-variant/30 flex items-center justify-center text-on-surface font-extrabold text-xs border border-outline-variant/20">
          {initial}
        </div>
        <div>
          <p className="text-sm font-bold text-on-surface">{name}</p>
          <p className="text-xs text-on-surface-variant font-medium">{detail}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden sm:block text-right">
          <p className="text-[10px] text-outline font-bold uppercase tracking-wider">Wait Time</p>
          <p className="text-sm font-extrabold text-on-surface">{wait}</p>
        </div>
        <span className={cn(
          "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest",
          statusColor === 'primary' ? 'bg-primary/10 text-primary' : 'bg-error-container text-error'
        )}>
          {status}
        </span>
        <Button variant="ghost" size="icon" className="text-outline opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function InsightItem({ icon: Icon, label, value }: any) {
  return (
    <div className="bg-surface-container-low p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-2 border border-outline-variant/5">
      <Icon className="h-5 w-5 text-primary" />
      <p className="text-[10px] font-bold text-outline uppercase tracking-wider">{label}</p>
      <p className="text-xl font-extrabold font-headline text-on-surface">{value}</p>
    </div>
  )
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
