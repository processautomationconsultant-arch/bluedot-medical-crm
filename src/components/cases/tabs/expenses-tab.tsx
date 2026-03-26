"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, Receipt, Trash2, CreditCard, PieChart, TrendingUp, AlertCircle, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExpensesTabProps {
  data: any
  onUpdate: (update: any) => Promise<any>
}

export function ExpensesTab({ data, onUpdate }: ExpensesTabProps) {
  const expenses = data?.expenses || []
  const total = expenses.reduce((acc: number, e: any) => acc + (e.amount_aed || 0), 0)
  const paid = expenses.filter((e: any) => e.status === 'paid').reduce((acc: number, e: any) => acc + (e.amount_aed || 0), 0)
  const balance = total - paid

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Financial Executive Dashboard */}
      <section>
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
             <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
               <TrendingUp className="h-4 w-4" />
             </div>
             <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Mission Ledger Overview</h3>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl font-bold h-10 px-6 border-outline-variant/30 bg-surface-variant/20 gap-2">
            <Receipt className="h-4 w-4" /> Download Statement
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <FinancialCard label="Projected Total" value={total} currency="AED" icon={CreditCard} />
           <FinancialCard label="Settled Amount" value={paid} currency="AED" icon={ShieldCheck} status="success" />
           <FinancialCard label="Outstanding Balance" value={balance} currency="AED" icon={AlertCircle} status="warning" />
        </div>
      </section>

      {/* Expense Detail Ledger */}
      <section className="space-y-6">
        <header className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <PieChart className="h-4 w-4 text-outline" />
              <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Activity Ledger</h3>
           </div>
           <Button className="bg-primary text-white px-6 py-2 rounded-xl h-10 font-bold text-[10px] uppercase tracking-widest gap-2 shadow-md">
             <PlusCircle className="h-4 w-4" /> Log Expenditure
           </Button>
        </header>

        <div className="bg-white border border-outline-variant/10 rounded-3xl overflow-hidden shadow-sm">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-surface-variant/10 border-b border-outline-variant/5">
                       <th className="px-8 py-5 text-[10px] font-extrabold text-outline uppercase tracking-wider">Reference / Type</th>
                       <th className="px-8 py-5 text-[10px] font-extrabold text-outline uppercase tracking-wider">Financial Descriptor</th>
                       <th className="px-8 py-5 text-[10px] font-extrabold text-outline uppercase tracking-wider text-right">Value (AED)</th>
                       <th className="px-8 py-5 text-[10px] font-extrabold text-outline uppercase tracking-wider text-center">Audit</th>
                       <th className="px-8 py-5 text-[10px] font-extrabold text-outline uppercase tracking-wider"></th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-outline-variant/5">
                    {expenses.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center">
                           <div className="flex flex-col items-center gap-3 opacity-40">
                              <Receipt className="h-10 w-10 text-outline-variant" />
                              <p className="text-sm font-bold text-outline-variant uppercase tracking-widest">No entries recorded</p>
                           </div>
                        </td>
                      </tr>
                    ) : (
                      expenses.map((exp: any) => (
                        <tr key={exp.id} className="group hover:bg-primary/[0.01] transition-colors">
                           <td className="px-8 py-6">
                              <div className="flex flex-col">
                                 <span className="text-[9px] font-black text-primary uppercase tracking-tighter mb-1">{exp.expense_type.replace('_', ' ')}</span>
                                 <span className="text-[10px] font-bold text-on-surface uppercase">{exp.expense_category}</span>
                              </div>
                           </td>
                           <td className="px-8 py-6">
                              <p className="text-sm font-bold text-on-surface leading-tight">{exp.description}</p>
                              <p className="text-[10px] text-outline-variant font-medium mt-1">Ref: EXP-{exp.id.slice(0, 8)}</p>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <span className="text-base font-black text-on-surface font-headline italic">{(exp.amount_aed || 0).toLocaleString()}</span>
                           </td>
                           <td className="px-8 py-6 text-center">
                              {exp.status === 'paid' ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 rounded-lg text-[9px] font-black uppercase border border-green-100">
                                   <ShieldCheck className="h-3 w-3" /> VERIFIED
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[9px] font-black uppercase border border-amber-100">
                                   <AlertCircle className="h-3 w-3" /> PENDING
                                </span>
                              )}
                           </td>
                           <td className="px-8 py-6 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-error/10 hover:text-error transition-all">
                                 <Trash2 className="h-4 w-4" />
                              </Button>
                           </td>
                        </tr>
                      ))
                    )}
                 </tbody>
              </table>
           </div>
        </div>
      </section>
    </div>
  )
}

function FinancialCard({ label, value, currency, icon: Icon, status }: any) {
  return (
    <div className={cn(
      "bg-white p-8 rounded-[32px] border transition-all shadow-sm flex flex-col gap-6",
      status === "warning" ? "border-error/20 bg-error/[0.01]" : 
      status === "success" ? "border-green-600/20 bg-green-50/10" : 
      "border-outline-variant/10"
    )}>
       <div className="flex items-center justify-between">
          <div className={cn(
            "h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner",
            status === "warning" ? "bg-error/10 text-error" : 
            status === "success" ? "bg-green-100 text-green-600" : 
            "bg-primary/5 text-primary"
          )}>
            <Icon className="h-6 w-6" />
          </div>
          <TrendingUp className="h-4 w-4 text-outline-variant" />
       </div>
       <div>
          <p className="text-[10px] font-extrabold text-outline uppercase tracking-[0.2em] mb-2">{label}</p>
          <div className="flex items-baseline gap-2">
             <span className="text-3xl font-black text-on-surface font-headline">{value.toLocaleString()}</span>
             <span className="text-xs font-bold text-outline uppercase">{currency}</span>
          </div>
       </div>
    </div>
  )
}
