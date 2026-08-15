import Link from "next/link";
import { CircleDot } from "lucide-react";

export default function Navbar() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[96%] max-w-[1400px] z-50">
      {/* Main Camera Body Frame */}
      <header className="relative w-full h-[88px] rounded-[24px] bg-[#0A0A0A] border border-[#2C2C2C] shadow-[0_20px_40px_rgba(0,0,0,0.8),_inset_0_2px_4px_rgba(255,255,255,0.1),_inset_0_-4px_10px_rgba(0,0,0,0.5)] flex items-center justify-between px-2 overflow-visible">

        {/* Metallic Gradient Texture Overlay */}
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-[#232323] to-[#0f0f0f] opacity-80 pointer-events-none" />

        {/* Subtle noise/metal texture */}
        <div className="absolute inset-0 rounded-[24px] bg-noise opacity-10 pointer-events-none mix-blend-overlay" />

        {/* Left Side: Camera Lens & Logo */}
        <div className="relative z-10 flex items-center gap-6 pl-2">
          {/* Big Lens Element */}
          <div className="w-[72px] h-[72px] rounded-full border-4 border-[#1a1a1a] bg-black shadow-[inset_0_4px_15px_rgba(0,0,0,1),_0_2px_5px_rgba(255,255,255,0.05)] flex items-center justify-center relative overflow-hidden">
            {/* Lens reflections */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.1),transparent,rgba(255,255,255,0.1),transparent)] opacity-50" />
            <div className="absolute top-2 left-2 w-10 h-10 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-[2px]" />
            <div className="w-10 h-10 rounded-full border border-[#333] bg-[#050505] relative flex items-center justify-center shadow-inner">
              <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-green-900/40 to-blue-900/40 border border-white/5" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="AVF Logo" className="h-15 w-auto object-contain drop-shadow-[0_2px_2px_rgba(0,0,0,1)]" />
          </div>
        </div>

        {/* Center: Navigation Panel */}
        <nav className="relative z-10 hidden md:flex items-center gap-2 px-8 h-[56px] bg-black/40 border border-[#1a1a1a] rounded-[16px] shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
          {[
            { name: "Home", href: "#home", active: true },
            { name: "About Us", href: "#about" },
            { name: "Services", href: "#services" },
            { name: "Our Work", href: "#work" },
            { name: "BTS", href: "#bts" },
            { name: "Contact Us", href: "#contact" }
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-montserrat font-semibold text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-sm transition-all duration-300 ${link.active
                  ? "bg-[#FCA603] text-black shadow-[0_0_15px_rgba(252,166,3,0.4)]"
                  : "text-white hover:text-[#FCA603]"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side: Camera Dial */}
        <div className="relative z-10 pr-2">
          <div className="w-[64px] h-[64px] rounded-full bg-[#111] border-2 border-[#222] shadow-[inset_0_4px_10px_rgba(255,255,255,0.05),_0_4px_10px_rgba(0,0,0,0.8)] relative flex items-center justify-center cursor-pointer group">
            {/* Ridges around dial */}
            <div className="absolute inset-1 rounded-full border-2 border-[#333] border-dashed opacity-50 group-hover:rotate-12 transition-transform duration-500" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent mix-blend-overlay" />
            <div className="w-1.5 h-4 bg-[#FCA603] absolute top-2 rounded-full shadow-[0_0_5px_rgba(252,166,3,0.5)]" />

            {/* Center button */}
            <div className="w-6 h-6 rounded-full bg-black shadow-inner border border-[#333] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#222]" />
            </div>
          </div>
        </div>

        {/* Screw heads details */}
        <div className="absolute top-3 left-[140px] w-1.5 h-1.5 rounded-full bg-[#111] border border-[#333] z-10 shadow-inner flex items-center justify-center">
          <div className="w-1 h-[0.5px] bg-[#444] rotate-45" />
        </div>
        <div className="absolute top-3 right-[100px] w-1.5 h-1.5 rounded-full bg-[#111] border border-[#333] z-10 shadow-inner flex items-center justify-center">
          <div className="w-1 h-[0.5px] bg-[#444] -rotate-12" />
        </div>
        <div className="absolute bottom-3 left-[140px] w-1.5 h-1.5 rounded-full bg-[#111] border border-[#333] z-10 shadow-inner flex items-center justify-center">
          <div className="w-1 h-[0.5px] bg-[#444] rotate-90" />
        </div>
      </header>

      {/* Hanging HUD Panel (ISO / f-stop / FPS) */}
      <div className="absolute -bottom-[22px] left-1/2 -translate-x-1/2 z-0">
        <div className="bg-[#151515] border border-[#2c2c2c] border-t-0 rounded-b-lg px-8 py-1.5 flex items-center gap-6 shadow-[0_10px_20px_rgba(0,0,0,0.8)] relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent rounded-b-lg pointer-events-none" />
          <span className="font-montserrat font-semibold text-[9px] tracking-[0.2em] text-[#888] uppercase relative z-10">ISO 800</span>
          <div className="w-1 h-1 rounded-full bg-[#333] relative z-10" />
          <span className="font-montserrat font-semibold text-[9px] tracking-[0.2em] text-[#888] uppercase relative z-10">f/2.8</span>
          <div className="w-1 h-1 rounded-full bg-[#333] relative z-10" />
          <span className="font-montserrat font-semibold text-[9px] tracking-[0.2em] text-[#888] uppercase relative z-10">24FPS</span>
        </div>
      </div>

    </div>
  );
}
