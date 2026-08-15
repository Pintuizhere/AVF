import { Play, BatteryMedium } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen pt-24 pb-12 flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Cinematic Camera Setup"
          fill
          className="object-cover opacity-80"
          priority
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
      </div>
      <div className="absolute top-28 left-8 w-16 h-16 border-t-2 border-l-2 border-white/30" />
      <div className="absolute top-28 right-8 w-16 h-16 border-t-2 border-r-2 border-white/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/30" />

      {/* REC Indicator */}
      <div className="absolute top-32 right-12 flex items-center gap-2 text-red-500 font-mono text-sm">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        <span className="tracking-widest font-bold">REC</span>
      </div>

      {/* Audio meter bars mockup */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-60 z-20 hidden md:flex">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`h-1 w-6 ${i > 15 ? 'bg-red-500' : i > 10 ? 'bg-yellow-500' : 'bg-white'}`} />
        ))}
      </div>


      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col items-start gap-8">
          <div className="flex flex-col">
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] text-white">
              We Don&apos;t Just<br />
              Create Videos,
            </h1>
            <h2 className="text-5xl md:text-7xl font-script text-gold mt-2 -rotate-2 font-bold">
              We Tell Stories.
            </h2>
          </div>

          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-neutral-300 leading-loose max-w-sm border-l border-gold pl-4">
            Cinematic Visuals. Powerful Stories.<br />Timeless Impact.
          </p>

          <div className="flex items-center gap-8 mt-4">
            <button className="bg-gold text-black px-8 py-4 text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors flex items-center gap-2">
              View Our Work
              <Play className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-3 text-gold hover:text-white transition-colors group">
              <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center group-hover:border-white transition-colors">
                <Play className="w-4 h-4" />
              </div>
              <span className="font-script text-3xl font-bold">Play Reel</span>
            </button>
          </div>
        </div>

        {/* Right Content - Empty to let background show */}
        <div className="hidden lg:block relative h-[400px] w-full"></div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-8 left-12 flex items-center gap-2 text-neutral-400">
        <BatteryMedium className="w-6 h-6" />
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-sm tracking-[0.2em]">
        00:00:12:05
      </div>
    </section>
  );
}
