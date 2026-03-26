"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  ArrowLeft, 
  Save, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Stethoscope,
  Plane,
  Users,
  Info,
  ShieldCheck
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const STEPS = [
  { id: "context", title: "Transfer Context", icon: Info },
  { id: "patient", title: "Patient Data", icon: ShieldCheck },
  { id: "medical", title: "Medical Specs", icon: Stethoscope },
  { id: "logistics", title: "Logistics", icon: Plane },
]

export default function CreateCaseWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const progress = ((currentStep + 1) / STEPS.length) * 100

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Wizard Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="rounded-xl hover:bg-surface-variant/50">
            <Link href="/cases">
              <ArrowLeft className="h-5 w-5 text-on-surface" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-on-surface font-headline">New Medical Case</h1>
            <p className="text-on-surface-variant text-sm font-medium">Mission Initialization Protocol • Central Desk</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="px-5 py-6 bg-surface-variant/20 border-outline-variant/30 text-on-surface rounded-xl font-bold">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <div className="hidden lg:flex flex-col items-end px-4 border-l border-outline-variant/20">
            <span className="text-[10px] font-bold text-outline uppercase tracking-widest">Case Security</span>
            <span className="text-xs font-bold text-green-600 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" />
              AES-256 Encrypted
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-10">
        {/* Step Indicator Sidebar */}
        <aside className="col-span-12 lg:col-span-3 space-y-8">
          <nav className="flex flex-col gap-2">
            {STEPS.map((step, index) => {
              const isActive = currentStep === index
              const isCompleted = currentStep > index
              return (
                <div 
                  key={step.id}
                  className={cn(
                    "relative flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                    isActive ? "bg-white shadow-lg shadow-primary/5 border border-primary/10" : "opacity-60"
                  )}
                >
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                    isActive ? "bg-primary text-white" : isCompleted ? "bg-green-100 text-green-600" : "bg-surface-variant text-outline"
                  )}>
                    {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-outline uppercase tracking-widest leading-none mb-1">Step 0{index + 1}</p>
                    <p className={cn("text-sm font-extrabold", isActive ? "text-on-surface" : "text-outline-variant")}>{step.title}</p>
                  </div>
                  {isActive && <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-primary" />}
                </div>
              )
            })}
          </nav>

          <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 hidden lg:block">
            <h4 className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-4">
              <AlertCircle className="h-4 w-4" />
              Guidelines
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
              Ensure all clinical documentation is verified before proceeding to Stage 04. Flight logistics require a 12h lead time for Zone 01 missions.
            </p>
          </div>
        </aside>

        {/* Main Form Area */}
        <main className="col-span-12 lg:col-span-9 space-y-6">
          <div className="bg-white rounded-3xl shadow-xl shadow-primary/5 border border-outline-variant/10 overflow-hidden flex flex-col min-h-[500px]">
            <Progress value={progress} className="h-1 rounded-none bg-surface-variant" />
            
            <div className="flex-grow p-8 md:p-12">
              <div className="max-w-2xl">
                {currentStep === 0 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h2 className="text-2xl font-bold text-on-surface font-headline mb-2">Transfer Context</h2>
                      <p className="text-on-surface-variant text-sm font-medium">Define the core parameters of this medical assistance mission.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormGroup label="Mission Urgency" required>
                        <Select>
                          <SelectTrigger className="form-input-stitch">
                            <SelectValue placeholder="Select Priority" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-outline-variant/20 shadow-xl">
                            <SelectItem value="low">Standard Priority</SelectItem>
                            <SelectItem value="med">High Priority</SelectItem>
                            <SelectItem value="stat">STAT / Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormGroup>

                      <FormGroup label="Operational Zone" required>
                        <Select>
                          <SelectTrigger className="form-input-stitch">
                            <SelectValue placeholder="Select Zone" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="emea">EMEA (Europe, Mid East, Africa)</SelectItem>
                            <SelectItem value="amer">AMER (Americas)</SelectItem>
                            <SelectItem value="apac">APAC (Asia Pacific)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormGroup>

                      <FormGroup label="Transfer Methodology" className="col-span-full">
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                           <MethodCard icon={Plane} title="Air Ambulance" sub="Commercial / Dedicated Jet" active />
                           <MethodCard icon={Stethoscope} title="Medical Escort" sub="Commercial Support" />
                           <MethodCard icon={Users} title="Ground Assist" sub="Tarmac / Hospital Transfer" />
                         </div>
                      </FormGroup>
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div>
                      <h2 className="text-2xl font-bold text-on-surface font-headline mb-2 text-primary flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6" />
                        Patient Data
                      </h2>
                      <p className="text-on-surface-variant text-sm font-medium">All fields in this section are encrypted at-rest using AES-256 for PII protection.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormGroup label="Full Legal Name" required className="col-span-full">
                        <Input className="form-input-stitch" placeholder="As seen on passport" />
                      </FormGroup>
                      <FormGroup label="Passport Number" required>
                        <Input className="form-input-stitch" placeholder="X00000000" />
                      </FormGroup>
                      <FormGroup label="Nationality" required>
                        <Input className="form-input-stitch" placeholder="Search country..." />
                      </FormGroup>
                      <FormGroup label="Date of Birth" required>
                        <Input className="form-input-stitch" type="date" />
                      </FormGroup>
                      <FormGroup label="Gender" required>
                        <Select>
                          <SelectTrigger className="form-input-stitch">
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectItem value="m">Male</SelectItem>
                            <SelectItem value="f">Female</SelectItem>
                            <SelectItem value="o">Other / Non-disclosed</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormGroup>
                    </div>
                  </div>
                )}

                {/* Placeholder for steps 2 and 3 - following same pattern */}
                {currentStep > 1 && (() => {
                  const StepIcon = STEPS[currentStep].icon
                  return (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                      <div className="h-20 w-20 rounded-full bg-surface-variant flex items-center justify-center text-outline">
                        <StepIcon className="h-10 w-10" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-on-surface font-headline">{STEPS[currentStep].title}</h3>
                        <p className="text-on-surface-variant text-sm max-w-xs">Further details for {STEPS[currentStep].id} are being initialized...</p>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>

            <footer className="px-8 py-6 bg-surface-container-low/50 border-t border-outline-variant/10 flex items-center justify-between">
              <Button 
                variant="ghost" 
                onClick={prevStep} 
                className={cn("px-8 py-6 rounded-2xl font-bold text-sm text-on-surface-variant transition-all hover:bg-surface-variant/50", currentStep === 0 && "opacity-0 pointer-events-none")}
              >
                <ChevronLeft className="mr-2 h-5 w-5" />
                Back to Stage 0{currentStep}
              </Button>
              <Button 
                onClick={nextStep} 
                className="px-10 py-6 bg-primary text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                {currentStep === STEPS.length - 1 ? "Initialize Case" : "Next Segment"}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </footer>
          </div>
        </main>
      </div>
    </div>
  )
}

function FormGroup({ label, children, required, className }: any) {
  return (
    <div className={cn("space-y-3", className)}>
      <label className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] flex items-center gap-1">
        {label}
        {required && <span className="text-error text-sm">*</span>}
      </label>
      {children}
    </div>
  )
}

function MethodCard({ icon: Icon, title, sub, active }: any) {
  return (
    <div className={cn(
      "flex flex-col gap-4 p-5 rounded-2xl border-2 transition-all cursor-pointer group",
      active ? "bg-primary/5 border-primary shadow-sm" : "bg-white border-outline-variant/10 hover:border-primary/30"
    )}>
      <div className={cn(
        "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
        active ? "bg-primary text-white" : "bg-surface-variant text-outline group-hover:bg-primary/10 group-hover:text-primary"
      )}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className={cn("text-sm font-extrabold", active ? "text-primary" : "text-on-surface")}>{title}</p>
        <p className="text-[10px] text-outline-variant font-medium leading-none mt-1">{sub}</p>
      </div>
    </div>
  )
}
