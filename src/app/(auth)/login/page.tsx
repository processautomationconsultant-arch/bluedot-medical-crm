"use client"

import Link from "next/link"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side: Hero Area (Desktop Only) */}
      <section className="hidden md:flex md:w-[60%] medical-pattern relative items-center justify-center overflow-hidden p-12">
        {/* Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          <div className="bg-white/10 backdrop-blur-xl p-10 border border-white/20 shadow-2xl rounded-2xl">
            <img 
              alt="Bluedot Logo" 
              className="h-24 w-auto object-contain" 
              src="https://lh3.googleusercontent.com/aida/ADBb0ugnG2ctFE7j0wHQUP2ObbveINvKeiqEBFOUKEdtyHfbrdoRgeRuFrLYCMUnD5bPgFpEAZ2D05-4DvsQWaPTecu9tGIbjVEq7ph2OVIlZL19V73_HlY_kcaQbMuW6shnp-4qZhsmUvGB3QWL8w2mkWV_h0T4EPkcW6SUhToO9R6oaf9QkBPWU8-_IIX93-ppLV7dPzve3otd3XMSRvYVju5oNN8DitTIE257yaz9cefealxAGxNAVlec8ecymuXZ-cBBJeMGbTQ3vg"
            />
          </div>
          
          <div className="space-y-4">
            <h1 className="font-headline text-3xl text-on-primary-container font-bold tracking-tight">
              Medical Transfer Management System
            </h1>
            <p className="text-white/70 text-base max-w-lg mx-auto leading-relaxed font-light">
              Precision logistics for high-stakes medical operations. 
              Integrated tracking, patient records, and emergency dispatch.
            </p>
          </div>
        </div>

        {/* Decorative Glow */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-container/30 rounded-full blur-[100px]"></div>
      </section>

      {/* Right Side: Login Form */}
      <section className="flex-1 flex flex-col justify-center items-center px-6 py-12 md:px-16 lg:px-24 bg-surface">
        {/* Mobile Header */}
        <div className="md:hidden mb-12 flex flex-col items-center">
            <img 
              alt="Bluedot Logo" 
              className="h-14 w-auto object-contain mb-4" 
              src="https://lh3.googleusercontent.com/aida/ADBb0ugnG2ctFE7j0wHQUP2ObbveINvKeiqEBFOUKEdtyHfbrdoRgeRuFrLYCMUnD5bPgFpEAZ2D05-4DvsQWaPTecu9tGIbjVEq7ph2OVIlZL19V73_HlY_kcaQbMuW6shnp-4qZhsmUvGB3QWL8w2mkWV_h0T4EPkcW6SUhToO9R6oaf9QkBPWU8-_IIX93-ppLV7dPzve3otd3XMSRvYVju5oNN8DitTIE257yaz9cefealxAGxNAVlec8ecymuXZ-cBBJeMGbTQ3vg"
            />
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">
              Medical Transfer Management
            </p>
        </div>

        <div className="w-full max-w-md space-y-10">
          <div className="space-y-2">
            <h2 className="text-[28px] font-bold text-on-surface leading-tight font-headline">
              Welcome back
            </h2>
            <p className="text-sm text-on-surface-variant font-medium">
              Sign in to your account
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest" htmlFor="email">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <Input 
                  className="pl-11 py-6 bg-surface-container-low border-outline-variant/30 rounded-xl focus:ring-primary/20 transition-all text-sm" 
                  id="email" 
                  name="email" 
                  placeholder="operator@bluedot.med" 
                  type="email" 
                  required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-widest" htmlFor="password">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <Input 
                  className="pl-11 pr-11 py-6 bg-surface-container-low border-outline-variant/30 rounded-xl focus:ring-primary/20 transition-all text-sm" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  type={showPassword ? "text" : "password"} 
                  required 
                />
                <button 
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-on-surface-variant transition-colors" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember-me" className="border-outline-variant" />
                <label className="text-sm text-on-surface-variant cursor-pointer" htmlFor="remember-me">
                  Remember me
                </label>
              </div>
              <Link className="text-sm font-bold text-primary hover:text-primary-container transition-colors" href="#">
                Forgot password?
              </Link>
            </div>

            <Button className="w-full py-7 rounded-xl text-sm font-bold bg-primary-container hover:bg-primary transition-all shadow-lg shadow-primary/10 active:scale-[0.98]" type="submit">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-on-surface-variant">
            Don't have an account? {" "}
            <Link className="font-bold text-primary hover:text-primary-container transition-colors underline-offset-4 hover:underline" href="#">
              Request access
            </Link>
          </p>
        </div>

        <footer className="mt-auto pt-16 text-center">
            <p className="text-[11px] font-bold text-outline tracking-wider">
              Bluedot Medical Assistance © 2026
            </p>
            <div className="flex gap-6 mt-4 justify-center">
              <Link className="text-[10px] font-medium text-outline hover:text-on-surface transition-colors" href="#">Privacy Policy</Link>
              <Link className="text-[10px] font-medium text-outline hover:text-on-surface transition-colors" href="#">Terms of Service</Link>
              <Link className="text-[10px] font-medium text-outline hover:text-on-surface transition-colors" href="#">Support</Link>
            </div>
        </footer>
      </section>

      {/* Visual Polish */}
      <div className="fixed top-0 right-0 -z-10 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] pointer-events-none"></div>
    </main>
  )
}
