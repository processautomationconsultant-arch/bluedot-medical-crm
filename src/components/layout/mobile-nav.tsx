"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Stethoscope, 
  Plane, 
  Users, 
  Plus 
} from "lucide-react"
import { cn } from "@/lib/utils"

const mainNav = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Cases', href: '/cases', icon: Stethoscope },
  { name: 'Logistics', href: '/logistics', icon: Plane },
  { name: 'Teams', href: '/teams', icon: Users },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 w-full glass-effect border-t border-outline-variant/20 z-50 flex items-center justify-around py-3">
        {mainNav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors duration-200",
                isActive ? "text-primary" : "text-outline hover:text-on-surface-variant"
              )}
            >
              <item.icon className={cn("h-6 w-6", isActive && "fill-primary/10")} />
              <span className="text-[10px] font-bold uppercase tracking-tight">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Contextual FAB for Mobile */}
      <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center md:hidden z-50 active:scale-95 transition-transform">
        <Plus className="h-8 w-8" />
      </button>
    </>
  )
}
