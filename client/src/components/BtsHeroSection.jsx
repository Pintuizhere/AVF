import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BtsHeroSection() {
  return (
    <section className="relative min-h-[100dvh] pt-32 pb-16 flex flex-col justify-center bg-black overflow-hidden border-b-[1px] border-neutral-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services-bg.jpg" // Using available placeholder
          alt="BTS Background"
          fill
          className="object-cover opacity-50 object-right"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay z-10" />
      </div>

      {/* Frame corners */}
      <div className="absolute top-24 left-10 w-8 h-8 border-t-2 border-l-2 border-neutral-600 z-20" />
      <div className="absolute bottom-24 left-10 w-8 h-8 border-b-2 border-l-2 border-neutral-600 z-20" />
      <div className="absolute top-24 right-10 w-8 h-8 border-t-2 border-r-2 border-neutral-600 z-20" />
      <div className="absolute bottom-24 right-10 w-8 h-8 border-b-2 border-r-2 border-neutral-600 z-20" />

      {/* Camera HUD Elements */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center gap-6 text-neutral-400 font-mono text-[10px] uppercase tracking-widest z-20 bg-black/50 px-6 py-2 rounded-full border border-neutral-800 shadow-md">
        <span>ISO 800</span>
        <span className="w-1 h-1 rounded-full bg-gold"></span>
        <span>F/2.8</span>
        <span className="w-1 h-1 rounded-full bg-gold"></span>
        <span>24FPS</span>
      </div>

      {/* REC Indicator */}
      <div className="absolute top-24 right-12 flex items-center gap-2 text-red-600 font-mono text-sm z-20">
        <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
        <span className="tracking-widest font-bold">REC</span>
      </div>

      {/* Side measurement marks */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20 opacity-40">
        {[...Array(20)].map((_, i) => (
          <div key={`tick-${i}`} className={`w-3 h-[1px] bg-white ${i % 5 === 0 ? 'w-5' : ''} ${i > 15 ? 'bg-red-600' : ''}`} />
        ))}
      </div>

      <div className="container mx-auto px-12 md:px-16 relative z-10 flex flex-col gap-10 mt-12">
        <div className="max-w-3xl flex flex-col items-start gap-3">
          <h2 className="text-4xl md:text-5xl font-script text-gold -rotate-2 ml-4">
            Behind The Scenes
          </h2>
          
          <h1 className="text-6xl md:text-8xl font-bebas uppercase tracking-tighter leading-[0.85] text-white">
            REAL MOMENTS,<br />
            RAW ENERGY.
          </h1>

          <h3 className="text-3xl md:text-4xl font-script text-gold -rotate-2 ml-8 mt-2">
            That&apos;s Where The Story Begins.
          </h3>

          <p className="text-sm font-medium tracking-wide text-neutral-400 leading-relaxed max-w-md mt-6">
            A glimpse into the hustle, the teamwork<br/>
            and the passion that goes behind<br/>
            every frame.
          </p>

          <Link href="#gallery" className="mt-8 bg-gold hover:bg-white text-black px-6 py-3 font-bold text-xs uppercase tracking-widest flex items-center gap-4 transition-colors shadow-[0_0_15px_rgba(252,166,3,0.3)]">
            EXPLORE BTS GALLERY
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
