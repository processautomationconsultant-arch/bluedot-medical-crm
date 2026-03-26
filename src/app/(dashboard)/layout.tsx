import { ReactNode } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { MobileNav } from "@/components/layout/mobile-nav"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      {/* Top Header - Fixed */}
      <Header />
      
      <div className="flex">
        {/* Desktop Sidebar - Fixed Left */}
        <Sidebar />
        
        {/* Main Content Area - Padded by Header and Sidebar */}
        <main className="flex-1 xl:ml-64 pt-16 min-h-screen bg-surface">
          <div className="max-w-screen-2xl mx-auto p-6 lg:p-10 pb-24 md:pb-10">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation - Fixed Bottom */}
      <MobileNav />
    </div>
  )
}
