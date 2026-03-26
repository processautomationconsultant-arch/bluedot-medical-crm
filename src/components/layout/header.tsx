"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Search, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UserNav } from "./user-nav"
import { cn } from "@/lib/utils"

export function Header() {
  const pathname = usePathname()

  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Case Management", href: "/cases" },
    { name: "Logistics", href: "/logistics" },
    { name: "Reports", href: "/reports" },
  ]

  return (
    <header className="fixed top-0 w-full z-50 glass-effect border-b border-outline-variant/20 shadow-sm">
      <div className="flex items-center justify-between px-6 h-16 w-full max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-on-surface font-headline">Bluedot Medical</span>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors pb-2 border-b-2",
                    isActive 
                      ? "text-primary border-primary font-semibold" 
                      : "text-on-surface-variant border-transparent hover:text-on-surface"
                  )}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline h-4 w-4" />
            <Input
              type="text"
              placeholder="Quick search cases..."
              className="bg-surface-container-low pl-10 pr-4 py-2 h-9 rounded-full border-none focus-visible:ring-2 focus-visible:ring-primary/20 text-sm w-64"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative text-on-surface-variant hover:bg-surface-variant/50">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-white"></span>
            </Button>
            
            <Button variant="ghost" size="icon" className="text-on-surface-variant hover:bg-surface-variant/50">
              <HelpCircle className="h-5 w-5" />
            </Button>

            <div className="h-8 w-8 ml-2">
              <UserNav />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
