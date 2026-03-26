"use client"

import { format } from "date-fns"
import { History, Fingerprint, Database, ArrowRight, User, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface ActivityLogTabProps {
  logs: any[]
}

export function ActivityLogTab({ logs }: ActivityLogTabProps) {
  if (!logs || logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 animate-in fade-in duration-700">
        <div className="h-20 w-20 bg-surface-variant/30 rounded-3xl flex items-center justify-center text-outline-variant">
           <Database className="h-10 w-10" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-on-surface font-headline">No System Mutations</h3>
          <p className="text-on-surface-variant text-base font-medium">Audit logs will appear as data is modified by the command team.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="flex items-center justify-between">
         <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
               <Fingerprint className="h-4 w-4" />
            </div>
            <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Data Integrity Audit Log</h3>
         </div>
         <span className="text-[10px] font-black text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-md border border-green-100 italic">
            <ShieldCheck className="h-3 w-3" /> IMMUTABLE RECORD
         </span>
      </header>

      <div className="bg-white border border-outline-variant/10 rounded-3xl overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-surface-variant/10 border-b border-outline-variant/5 text-outline">
                     <th className="px-8 py-5 text-[10px] font-extrabold uppercase tracking-wider">Timestamp</th>
                     <th className="px-8 py-5 text-[10px] font-extrabold uppercase tracking-wider">Action / Operator</th>
                     <th className="px-8 py-5 text-[10px] font-extrabold uppercase tracking-wider">Mutation Field</th>
                     <th className="px-8 py-5 text-[10px] font-extrabold uppercase tracking-wider">State Change</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-outline-variant/5">
                  {logs.map((log) => (
                    <tr key={log.id} className="group hover:bg-primary/[0.01] transition-colors">
                       <td className="px-8 py-6">
                          <div className="flex flex-col">
                             <span className="text-[10px] font-black text-on-surface font-headline italic tracking-tighter">
                                {format(new Date(log.timestamp), "MMM d, HH:mm")}
                             </span>
                             <span className="text-[9px] font-bold text-outline-variant uppercase">
                                {format(new Date(log.timestamp), "eeee")}
                             </span>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                             <div className="h-8 w-8 rounded-lg bg-surface-variant/20 flex items-center justify-center text-outline">
                                <User className="h-4 w-4" />
                             </div>
                             <div className="flex flex-col">
                                <span className={cn(
                                  "text-[9px] font-black uppercase tracking-widest",
                                  log.action === 'create' ? "text-green-600" : 
                                  log.action === 'delete' ? "text-error" : "text-primary"
                                )}>
                                   {log.action.replace('_', ' ')}
                                </span>
                                <span className="text-[10px] font-bold text-on-surface uppercase">{log.user_name || "SYSTEM"}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-8 py-6">
                          <code className="px-2 py-1 bg-surface-variant/20 rounded text-[10px] font-black text-on-surface-variant uppercase tracking-tighter">
                             {log.field_changed || "RECORD_EVENT"}
                          </code>
                       </td>
                       <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                             <span className="text-[10px] font-bold text-outline-variant truncate max-w-[120px] italic">
                                {log.old_value || "NULL"}
                             </span>
                             <ArrowRight className="h-3 w-3 text-outline-variant opacity-30" />
                             <span className="text-[10px] font-black text-primary truncate max-w-[120px]">
                                {log.new_value || "SET"}
                             </span>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  )
}
