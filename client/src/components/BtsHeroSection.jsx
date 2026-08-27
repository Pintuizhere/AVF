import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BtsHeroSection() {
  return (
    <section className="relative h-[100dvh] w-full pt-20 pb-8 flex flex-col justify-center bg-black overflow-hidden border-b-[1px] border-neutral-900">
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
      <div className="absolute top-28 md:top-32 left-4 md:left-8 w-6 md:w-8 h-6 md:h-8 border-t-2 border-l-2 border-neutral-600 z-20" />
      <div className="absolute bottom-8 left-4 md:left-8 w-6 md:w-8 h-6 md:h-8 border-b-2 border-l-2 border-neutral-600 z-20" />
      <div className="absolute top-28 md:top-32 right-4 md:right-8 w-6 md:w-8 h-6 md:h-8 border-t-2 border-r-2 border-neutral-600 z-20" />
      <div className="absolute bottom-8 right-4 md:right-8 w-6 md:w-8 h-6 md:h-8 border-b-2 border-r-2 border-neutral-600 z-20" />

      {/* REC Indicator */}
      <div className="absolute top-36 md:top-40 right-8 md:right-12 flex items-center gap-2 text-red-600 font-mono text-xs md:text-sm z-20">
        <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
        <span className="tracking-widest font-bold">REC</span>
      </div>

      {/* Side measurement marks */}
      <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20 opacity-40">
        {[...Array(20)].map((_, i) => (
          <div key={`tick-${i}`} className={`w-2 md:w-3 h-[1px] bg-white ${i % 5 === 0 ? 'w-4 md:w-5' : ''} ${i > 15 ? 'bg-red-600' : ''}`} />
        ))}
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10 flex flex-col mt-4 md:mt-8">
        <div className="max-w-3xl flex flex-col items-start gap-2 md:gap-3">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-script text-gold -rotate-2 ml-2 md:ml-4">
            Behind The Scenes
          </h2>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bebas uppercase tracking-tighter leading-[0.85] text-white">
            REAL MOMENTS,<br />
            RAW ENERGY.
          </h1>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-script text-gold -rotate-2 ml-4 md:ml-8 mt-1 md:mt-2">
            That&apos;s Where The Story Begins.
          </h3>

          <p className="text-xs md:text-sm font-medium tracking-wide text-neutral-400 leading-relaxed max-w-sm md:max-w-md mt-4 md:mt-6">
            A glimpse into the hustle, the teamwork<br/>
            and the passion that goes behind<br/>
            every frame.
          </p>

          <Link href="#gallery" className="mt-6 md:mt-8 bg-gold hover:bg-white text-black px-4 md:px-6 py-2 md:py-3 font-bold text-[10px] md:text-xs uppercase tracking-widest flex items-center gap-3 transition-colors shadow-[0_0_15px_rgba(252,166,3,0.3)]">
            EXPLORE BTS GALLERY
            <ArrowRight className="w-3 md:w-4 h-3 md:h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
