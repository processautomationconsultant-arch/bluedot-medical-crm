"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ArrowLeft, 
  FileDown, 
  Share2, 
  Archive, 
  CheckCircle2,
  Clock,
  ShieldCheck,
  MoreVertical,
  Activity,
  FileText,
  Users,
  Plane,
  Building2,
  AlertCircle,
  MessageSquare,
  CreditCard,
  ShieldAlert,
  ListChecks,
  BarChart3,
  MapPin,
  Headphones,
  Fingerprint,
  Info
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { useCase } from "@/hooks/use-case"
// I'll keep the existing tab components but wrap them in the new UI
import { PrimaryDataTab } from "@/components/cases/tabs/primary-data-tab"
import { MedicalAnalysisTab } from "@/components/cases/tabs/medical-analysis-tab"
import { FlightLogisticsTab } from "@/components/cases/tabs/flight-logistics-tab"
import { TimelineTab } from "@/components/cases/tabs/timeline-tab"
import { CrewTab } from "@/components/cases/tabs/crew-tab"
import { AMCTab } from "@/components/cases/tabs/amc-tab"
import { DeparturePortTab } from "@/components/cases/tabs/departure-tab"
import { ArrivalPortTab } from "@/components/cases/tabs/arrival-tab"
import { RelativeInfoTab } from "@/components/cases/tabs/relative-tab"
import { MEDetailsTab } from "@/components/cases/tabs/me-tab"
import { ComplianceTab } from "@/components/cases/tabs/compliance-tab"
import { DocumentsTab } from "@/components/cases/tabs/documents-tab"
import { ExpensesTab } from "@/components/cases/tabs/expenses-tab"
import { ActivityLogTab } from "@/components/cases/tabs/activity-log-tab"

const TABS = [
  { id: "primary", label: "Primary Data", icon: Info },
  { id: "medical", label: "Medical Analysis", icon: Activity },
  { id: "flight", label: "Flight Logistics", icon: Plane },
  { id: "crew", label: "Mission Crew", icon: Users },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "financials", label: "Financials", icon: CreditCard },
  { id: "timeline", label: "Mission Timeline", icon: Clock },
  { id: "ground_origin", label: "Departure Port", icon: Building2 },
  { id: "ground_dest", label: "Arrival Port", icon: MapPin },
  { id: "amc", label: "AMC Logistics", icon: Headphones },
  { id: "compliance", label: "Compliance & Safety", icon: ShieldCheck },
  { id: "activity", label: "System Audit", icon: Fingerprint },
]

const STATUS_STEPS = ["Draft", "Confirmed", "Scheduled", "In Transit", "Completed"]

export default function CaseDetailPage({ params }: { params: { id: string } }) {
  const { data, loading, updateCase } = useCase(params.id)
  const [activeTab, setActiveTab] = useState("primary")

  if (loading) {
    return (
      <div className="flex flex-col space-y-10 animate-pulse">
        <div className="flex items-center gap-6">
          <Skeleton className="h-12 w-12 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="grid grid-cols-12 gap-8">
           <div className="col-span-2 space-y-2">
              {[...Array(10)].map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
           </div>
           <div className="col-span-10">
              <Skeleton className="h-[600px] w-full rounded-3xl" />
           </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6">
        <div className="h-20 w-20 bg-surface-variant rounded-full flex items-center justify-center text-outline">
           <AlertCircle className="h-10 w-10" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-on-surface font-headline">Case Not Found</h2>
          <p className="text-on-surface-variant text-sm mt-2">The requested mission profile (ID: {params.id}) could not be located in the central desk.</p>
        </div>
        <Button asChild className="rounded-2xl px-10 py-6 font-bold">
          <Link href="/cases">Return to Command Center</Link>
        </Button>
      </div>
    )
  }

  const currentStatusIndex = STATUS_STEPS.indexOf(data.state.charAt(0).toUpperCase() + data.state.slice(1)) || 0

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header */}
      <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <Button variant="ghost" size="icon" asChild className="rounded-xl hover:bg-surface-variant/50">
            <Link href="/cases">
              <ArrowLeft className="h-5 w-5 text-on-surface" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tight text-on-surface font-headline">BDC-2026-042</h1>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-[10px] font-extrabold uppercase tracking-widest border border-primary/20">
                Active Transfer
              </span>
            </div>
            <p className="text-on-surface-variant text-sm font-medium flex items-center gap-2">
              Eleanor Vance <span className="text-outline-variant opacity-50">•</span> London (LHR) → New York (JFK)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="px-5 py-6 bg-surface-variant/20 border-outline-variant/30 text-on-surface rounded-xl font-bold flex items-center gap-2">
            <FileDown className="h-4 w-4" />
            Download Dossier
          </Button>
          <Button variant="outline" className="px-5 py-6 bg-surface-variant/20 border-outline-variant/30 text-on-surface rounded-xl font-bold flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share Access
          </Button>
          <Button className="px-6 py-6 bg-error text-white rounded-xl font-bold shadow-lg shadow-error/20 hover:bg-error/90 active:scale-95 transition-all flex items-center gap-2">
            <Archive className="h-4 w-4" />
            Close/Archive
          </Button>
        </div>
      </header>

      {/* Status Stepper */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-outline-variant/10 overflow-hidden relative">
        <div className="flex items-center justify-between relative z-10 px-4">
          {STATUS_STEPS.map((status, index) => {
            const isCompleted = index < currentStatusIndex
            const isCurrent = index === currentStatusIndex
            return (
              <div key={status} className="flex flex-col items-center gap-3 group">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isCompleted ? "bg-primary border-primary text-white" : 
                  isCurrent ? "bg-white border-primary text-primary shadow-lg shadow-primary/20 scale-110" : 
                  "bg-surface-variant border-outline-variant/30 text-outline-variant"
                )}>
                  {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <span className="text-sm font-bold">{index + 1}</span>}
                </div>
                <span className={cn(
                  "text-[10px] font-extrabold uppercase tracking-widest",
                  isCurrent ? "text-primary" : "text-outline"
                )}>{status}</span>
              </div>
            )
          })}
        </div>
        {/* Progress Line */}
        <div className="absolute top-[2.4rem] left-20 right-20 h-0.5 bg-surface-variant">
           <div 
             className="h-full bg-primary transition-all duration-700" 
             style={{ width: `${(currentStatusIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
           />
        </div>
      </div>

      {/* Main Content: Vertical Tabs Layout */}
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left Nav: 12 Tabs */}
        <nav className="col-span-12 lg:col-span-3 xl:col-span-2 space-y-2 bg-surface-container-low p-3 rounded-2xl border border-outline-variant/10">
          <p className="text-[10px] font-bold text-outline uppercase tracking-widest px-4 py-2 mt-2">Operational Modules</p>
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-white text-primary shadow-sm border-l-4 border-primary font-bold translate-x-1" 
                    : "text-on-surface-variant hover:bg-surface-variant/50 hover:translate-x-1 font-medium"
                )}
              >
                <tab.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-outline group-hover:text-primary")} />
                <span className="text-xs truncate">{tab.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Right Content: Active Tab Panel */}
        <main className="col-span-12 lg:col-span-9 xl:col-span-10">
          <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 border border-outline-variant/10 min-h-[600px] flex flex-col">
            <header className="px-8 py-6 border-b border-outline-variant/10 flex items-center justify-between">
               <div>
                 <h3 className="text-xl font-bold text-on-surface font-headline">{TABS.find(t => t.id === activeTab)?.label}</h3>
                 <p className="text-xs text-on-surface-variant font-medium mt-0.5">Mission Data Hub • Verified Stream</p>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-[10px] font-bold text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md border border-green-100">
                    <ShieldCheck className="h-3 w-3" />
                    LIVE SYNC
                 </span>
                 <Button variant="ghost" size="icon" className="rounded-xl">
                   <MoreVertical className="h-5 w-5 text-outline" />
                 </Button>
               </div>
            </header>
            
            <div className="p-8">
              {/* Conditional Tab Content Rendering */}
              {activeTab === "primary" && <PrimaryDataTab data={data} onUpdate={updateCase} />}
              {activeTab === "medical" && <MedicalAnalysisTab data={data} onUpdate={updateCase} />}
              {activeTab === "flight" && <FlightLogisticsTab data={data} onUpdate={updateCase} />}
              {activeTab === "crew" && <CrewTab data={data} onUpdate={updateCase} />}
              {activeTab === "documents" && <DocumentsTab data={data} onUpdate={updateCase} />}
              {activeTab === "financials" && <ExpensesTab data={data} onUpdate={updateCase} />}
              {activeTab === "timeline" && <TimelineTab timeline={data?.timeline || []} />}
              {activeTab === "ground_origin" && <DeparturePortTab data={data} onUpdate={updateCase} />}
              {activeTab === "ground_dest" && <ArrivalPortTab data={data} onUpdate={updateCase} />}
              {activeTab === "amc" && <AMCTab data={data} onUpdate={updateCase} />}
              {activeTab === "compliance" && <ComplianceTab data={data} onUpdate={updateCase} />}
              {activeTab === "activity" && <ActivityLogTab logs={data?.activity_logs || []} />}

              {/* Placeholder for new/unmapped tabs */}
              {!["primary", "medical", "flight", "crew", "documents", "financials", "timeline", "ground_origin", "ground_dest", "amc", "compliance", "activity"].includes(activeTab) && (
                 <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="h-24 w-24 bg-surface-variant/30 rounded-3xl flex items-center justify-center text-outline">
                       {(() => {
                         const Icon = TABS.find(t => t.id === activeTab)?.icon || Info
                         return <Icon className="h-10 w-10" />
                       })()}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-on-surface font-headline">{TABS.find(t => t.id === activeTab)?.label}</h3>
                      <p className="text-on-surface-variant text-sm font-medium max-w-sm mx-auto">
                        This module is being optimized for the Stitch design system. Data synchronization with Odoo is active.
                      </p>
                    </div>
                    <Button variant="outline" className="px-8 py-6 rounded-2xl font-bold border-outline-variant/30">Sync Now</Button>
                 </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function DataField({ label, value }: { label: string, value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-extrabold text-outline uppercase tracking-wider">{label}</p>
      <p className="text-sm font-bold text-on-surface">{value}</p>
    </div>
  )
}

function Info(props: any) { return <AlertCircle {...props} /> }
