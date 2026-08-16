"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Lock, Mail, EyeOff, Eye, ShieldCheck, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <main className="relative min-h-screen w-full bg-black flex flex-col justify-between overflow-x-hidden text-white font-sans">
      
      {/* Background with Camera Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg" // Using hero-bg as requested
          alt="Admin Background"
          fill
          className="object-cover opacity-40 object-center filter grayscale-[30%] contrast-125"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90" />
        <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none mix-blend-overlay" />
      </div>

      {/* Frame Corner Brackets */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-[1px] border-l-[1px] border-neutral-500 z-10 opacity-50" />
      <div className="absolute bottom-32 left-8 w-12 h-12 border-b-[1px] border-l-[1px] border-neutral-500 z-10 opacity-50" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-[1px] border-r-[1px] border-neutral-500 z-10 opacity-50" />
      <div className="absolute bottom-32 right-8 w-12 h-12 border-b-[1px] border-r-[1px] border-neutral-500 z-10 opacity-50" />

      {/* Desktop Header */}
      <header className="hidden md:flex absolute top-0 left-0 w-full z-30 items-center justify-between px-8 md:px-16 pt-8">
        <Link href="/">
          <img src="/logo.png" alt="AVF Logo" className="h-10 w-auto object-contain" />
        </Link>
        <span className="font-script text-gold text-2xl -rotate-2 drop-shadow-md">
          Lights. Camera. AVF.
        </span>
      </header>

      {/* Main Content (Centered Login Card) */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 my-auto">
        
        {/* Mobile Logo */}
        <Link href="/" className="md:hidden mb-10 mt-2 z-30 flex justify-center">
          <img src="/logo.png" alt="AVF Logo" className="h-12 w-auto object-contain drop-shadow-lg" />
        </Link>

        {/* Card Container */}
        <div className="relative w-full max-w-md bg-[#0a0a0a] rounded-sm shadow-2xl border border-[#222] p-6 pb-10 md:p-10 md:pb-12">
          
          {/* Torn Paper Label (Absolute Top Center) */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-48 h-14 bg-[#ebe4d8] shadow-[0_5px_15px_rgba(0,0,0,0.5)] flex items-center justify-center z-30">
            <div className="absolute inset-0 bg-noise opacity-30 mix-blend-multiply pointer-events-none" />
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/40 backdrop-blur-sm shadow-sm rotate-2" />
            
            <span className="font-bebas text-black text-3xl tracking-widest mt-1">ADMIN LOGIN</span>
            
            {/* Rough edge trick on paper */}
            <div className="absolute -bottom-1 left-0 w-full h-[6px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHBvbHlnb24gZmlsbD0iI2ViZTRkOCIgcG9pbnRzPSIwLDAgOCwwIDgsOCAwLDggIi8+Cgk8cG9seWdvbiBmaWxsPSIjMGEwYTBhIiBwb2ludHM9IjAsMCA0LDQgOCwwICIvPgo8L3N2Zz4=')] opacity-100" />
          </div>

          <div className="flex flex-col items-center mt-6 mb-8 text-center">
            <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center text-gold mb-4 shadow-[0_0_15px_rgba(252,166,3,0.15)]">
              <Lock className="w-5 h-5 stroke-[1.5]" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Welcome Back!</h1>
            <p className="text-xs text-neutral-400 font-medium">Please login to access your dashboard</p>
          </div>

          <form className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-white tracking-wide">Email Address</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                  <Mail className="w-4 h-4 stroke-[1.5]" />
                </div>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-[#111] border border-neutral-800 rounded-sm pl-11 pr-4 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold text-white tracking-wide">Password</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                  <Lock className="w-4 h-4 stroke-[1.5]" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password" 
                  className="w-full bg-[#111] border border-neutral-800 rounded-sm pl-11 pr-12 py-3.5 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold transition-colors"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                >
                  {showPassword ? <Eye className="w-4 h-4 stroke-[1.5]" /> : <EyeOff className="w-4 h-4 stroke-[1.5]" />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between mt-1 mb-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${
                  rememberMe ? 'border-gold bg-gold/10' : 'border-neutral-600 bg-[#111] group-hover:border-gold'
                }`}>
                   <div className={`w-2 h-2 bg-gold transition-opacity ${
                     rememberMe ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                   }`} />
                </div>
                <span className={`text-[11px] font-medium transition-colors ${
                  rememberMe ? 'text-gold' : 'text-white group-hover:text-gold'
                }`}>Remember Me</span>
              </label>
              
              <a href="#" className="text-[11px] font-medium text-gold hover:text-white transition-colors">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button 
              type="button"
              className="w-full bg-[#cfa25c] hover:bg-gold text-black py-3.5 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 transition-colors shadow-lg"
            >
              LOGIN
              <ArrowRight className="w-4 h-4 stroke-[2]" />
            </button>
          </form>

          {/* Copyright Text */}
          <p className="text-center text-[10px] text-neutral-500 mt-8 mb-2">
            © 2026 <span className="text-gold">AVF</span> Akash Verma Film Products. All Rights Reserved.
          </p>

          {/* White torn edge effect at the bottom of the card */}
          <div className="absolute -bottom-1 left-0 w-full h-[4px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHBvbHlnb24gZmlsbD0iI2RiZDFjZSIgcG9pbnRzPSIwLDggOCw4IDgsMCAwLDAgIi8+Cgk8cG9seWdvbiBmaWxsPSIjMGEwYTBhIiBwb2ludHM9IjAsOCA0LDQgOCw4ICIvPgo8L3N2Zz4=')] opacity-80" />
        </div>
      </div>


    </main>
  );
}
