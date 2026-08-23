import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AboutHeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-24 flex items-center bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/about-hero-bg.jpg"
          alt="Cinematic Camera Operator"
          fill
          className="object-cover opacity-60 object-right"
          priority
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      </div>

      {/* REC Indicator */}
      <div className="absolute top-32 right-12 flex items-center gap-2 text-red-500 font-mono text-sm z-20">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        <span className="tracking-widest font-bold">REC</span>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl flex flex-col items-start gap-6">
          <span className="font-bebas text-gold text-xl tracking-widest uppercase mb-2 font-bold">
            About AVF
          </span>
          
          <h1 className="text-6xl md:text-8xl font-bebas uppercase tracking-tighter leading-[0.9] text-white">
            Stories That<br />
            Stay <span className="text-gold">Forever.</span>
          </h1>

          <p className="text-sm font-semibold tracking-wide text-neutral-300 leading-loose max-w-lg mt-4 border-l-2 border-gold pl-4">
            AVF Productions is a creative production house driven by passion, purpose and a relentless pursuit of visual excellence.
            <br/><br/>
            We don&apos;t just make videos, we create emotions that last a lifetime.
          </p>

          <button className="mt-8 bg-[#b38f51] hover:bg-[#cba25c] text-black px-8 py-4 font-bold text-xs uppercase tracking-widest flex items-center gap-4 transition-colors">
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </section>
  );
}
