"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[96%] max-w-[1400px] z-50">
      {/* Main Camera Body Frame */}
      <header className="relative w-full h-[88px] rounded-[24px] bg-[#0A0A0A] border border-[#2C2C2C] shadow-[0_20px_40px_rgba(0,0,0,0.8),_inset_0_2px_4px_rgba(255,255,255,0.1),_inset_0_-4px_10px_rgba(0,0,0,0.5)] flex items-center justify-between px-2 overflow-visible">

        {/* Metallic Gradient Texture Overlay */}
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-[#232323] to-[#0f0f0f] opacity-80 pointer-events-none" />

        {/* Subtle noise/metal texture */}
        <div className="absolute inset-0 rounded-[24px] bg-noise opacity-10 pointer-events-none mix-blend-overlay" />

        {/* Left Side: Camera Lens & Logo */}
        <div className="relative z-10 flex items-center gap-6 pl-2">

          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="AVF Logo" className="h-[70px] w-auto object-contain drop-shadow-[0_2px_2px_rgba(0,0,0,1)]" />
          </div>
        </div>

        {/* Center: Navigation Panel */}
        <nav className="relative z-10 hidden md:flex items-center gap-4 px-2 h-[56px] bg-[#111111] border border-[#1f1f1f] rounded-[16px] shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]">
          {[
            { name: "Home", href: "/" },
            { name: "About Us", href: "/about" },
            { name: "Services", href: "/services" },
            { name: "Our Work", href: "/our-work" },
            { name: "BTS", href: "/bts" }
          ].map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`font-montserrat font-bold text-[11px] tracking-[0.15em] uppercase px-7 py-2.5 rounded-[10px] transition-all duration-300 ${isActive
                    ? "bg-[#FCA603] text-black shadow-[0_0_20px_rgba(252,166,3,0.3)]"
                    : "text-white hover:text-[#FCA603]"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Contact Button (Desktop) & Hamburger (Mobile) */}
        <div className="relative z-10 pr-2 flex items-center gap-4">
          <div className="hidden md:flex p-2 bg-[#151515] border border-[#252525] rounded-[24px] shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)]">
            <Link
              href="/contact"
              className="font-montserrat font-bold text-[11px] tracking-[0.2em] uppercase px-5 py-3.5 rounded-[16px] bg-[#FCA603] text-black shadow-[0_0_25px_rgba(252,166,3,0.3)] hover:shadow-[0_0_35px_rgba(252,166,3,0.5)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden w-12 h-12 flex items-center justify-center text-white hover:text-[#FCA603] transition-colors bg-black/40 border border-[#1a1a1a] rounded-xl shadow-inner"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </header>

      {/* Hanging HUD Panel (ISO / f-stop / FPS) */}
      <div className="absolute top-[88px] left-1/2 -translate-x-1/2 z-0">
        <div className="bg-[#151515] border border-[#2c2c2c] border-t-0 rounded-b-lg px-8 py-1.5 flex items-center gap-6 shadow-[0_10px_20px_rgba(0,0,0,0.8)] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent rounded-b-lg pointer-events-none" />
          
          {/* Left Flare */}
          <div className="absolute -top-[1px] -left-[12px] w-[13px] h-[13px] overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[26px] h-[26px] bg-transparent rounded-tr-[13px] border border-[#2c2c2c] shadow-[0_0_0_13px_#151515]" />
          </div>

          {/* Right Flare */}
          <div className="absolute -top-[1px] -right-[12px] w-[13px] h-[13px] overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-[26px] h-[26px] bg-transparent rounded-tl-[13px] border border-[#2c2c2c] shadow-[0_0_0_13px_#151515]" />
          </div>
          <span className="font-montserrat font-semibold text-[9px] tracking-[0.2em] text-[#888] uppercase relative z-10">ISO 800</span>
          <div className="w-1 h-1 rounded-full bg-[#333] relative z-10" />
          <span className="font-montserrat font-semibold text-[9px] tracking-[0.2em] text-[#888] uppercase relative z-10">f/2.8</span>
          <div className="w-1 h-1 rounded-full bg-[#333] relative z-10" />
          <span className="font-montserrat font-semibold text-[9px] tracking-[0.2em] text-[#888] uppercase relative z-10">24FPS</span>
        </div>
      </div>

    </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
}
