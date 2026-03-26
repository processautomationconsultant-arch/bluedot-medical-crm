"use client"

import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { MessageSquare, Phone, FileText, CheckCircle2, History, User, Clock } from "lucide-react"

interface TimelineTabProps {
  timeline: any[]
}

export function TimelineTab({ timeline }: TimelineTabProps) {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 animate-in fade-in duration-700">
        <div className="h-20 w-20 bg-surface-variant/30 rounded-3xl flex items-center justify-center text-outline-variant">
           <History className="h-10 w-10" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-on-surface font-headline">No Activity Logs</h3>
          <p className="text-on-surface-variant text-base font-medium">Mission coordination logs will appear here as they are generated.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      <header className="flex items-center gap-3">
         <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
           <Clock className="h-4 w-4" />
         </div>
         <h3 className="text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Live Mission Activity</h3>
      </header>

      <div className="relative pl-8 space-y-12 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-primary/20 before:via-outline-variant/10 before:to-transparent">
        {timeline.map((item, index) => (
          <div key={item.id || index} className="relative group">
            {/* Timeline Node */}
            <div className={cn(
              "absolute -left-[31px] top-1 h-8 w-8 rounded-xl flex items-center justify-center bg-white shadow-sm border transition-all group-hover:scale-110",
              item.entry_type === 'note' ? "text-primary border-primary/20" :
              item.entry_type === 'call' ? "text-green-600 border-green-200" :
              item.entry_type === 'document' ? "text-amber-600 border-amber-200" :
              "text-outline border-outline-variant/20"
            )}>
              {(() => {
                switch(item.entry_type) {
                  case 'note': return <MessageSquare className="h-4 w-4" />
                  case 'call': return <Phone className="h-4 w-4" />
                  case 'document': return <FileText className="h-4 w-4" />
                  case 'status': return <CheckCircle2 className="h-4 w-4" />
                  default: return <User className="h-4 w-4" />
                }
              })()}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-black text-on-surface uppercase tracking-tighter italic">
                     {item.entry_type === 'status' ? "SYS" : (item.user_name || "MEMBER")}
                   </span>
                   <span className="h-1 w-1 bg-outline-variant rounded-full" />
                   <span className="text-[10px] font-bold text-outline-variant uppercase">
                     {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                   </span>
                </div>
              </div>
              
              <div className="bg-white border border-outline-variant/10 p-5 rounded-2xl shadow-sm group-hover:shadow-md transition-all">
                <p className="text-sm font-medium text-on-surface-variant leading-relaxed">
                  {item.content}
                </p>
                {item.metadata && (
                  <div className="mt-4 pt-4 border-t border-outline-variant/5 flex gap-4">
                     {item.metadata.duration && (
                       <span className="text-[10px] font-bold text-outline uppercase">Duration: {item.metadata.duration}</span>
                     )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
