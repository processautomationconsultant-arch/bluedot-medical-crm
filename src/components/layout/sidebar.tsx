"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart3, 
  Calendar, 
  Settings, 
  Users, 
  FileText, 
  Activity, 
  ClipboardList 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard as DashboardIcon, 
  Stethoscope as CaseIcon, 
  Plane as FlightIcon, 
  Users as TeamIcon, 
  Archive as ArchiveIcon,
  Plus as PlusIcon,
  Settings as SettingsIcon,
  HelpCircle as SupportIcon
} from "lucide-react"

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: DashboardIcon },
  { name: 'Active Cases', href: '/cases', icon: CaseIcon },
  { name: 'Flight Logistics', href: '/logistics', icon: FlightIcon },
  { name: 'Medical Teams', href: '/teams', icon: TeamIcon },
  { name: 'Archive', href: '/archive', icon: ArchiveIcon },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 pt-20 bg-surface border-r border-outline-variant/20 hidden xl:flex flex-col py-4 gap-2 z-40">
      {/* Sidebar Brand Header */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-bold text-primary font-headline">Operations Command</h3>
        <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Clinical Desk Alpha</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 transition-all duration-200 rounded-lg group",
                isActive 
                  ? "bg-white text-primary shadow-sm rounded-l-xl border-l-4 border-primary font-semibold translate-x-1" 
                  : "text-on-surface-variant hover:bg-surface-variant/50 hover:translate-x-1 font-medium"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-outline group-hover:text-primary")} />
              <span className="text-sm">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Sidebar Footer Actions */}
      <div className="px-4 py-4 mt-auto space-y-4">
        <Button className="w-full bg-gradient-to-r from-primary to-primary-container text-white py-6 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 text-sm flex items-center justify-center gap-2">
          <PlusIcon className="h-4 w-4" />
          New Medical Case
        </Button>

        <div className="pt-4 border-t border-outline-variant/30 space-y-1">
          <Link 
            href="/settings" 
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant/50 transition-all rounded-lg text-sm font-medium"
          >
            <SettingsIcon className="h-5 w-5 text-outline" />
            <span>Settings</span>
          </Link>
          <Link 
            href="/support" 
            className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant/50 transition-all rounded-lg text-sm font-medium"
          >
            <SupportIcon className="h-5 w-5 text-outline" />
            <span>Support</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}
