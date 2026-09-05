import { Target, Heart, Star, Eye } from "lucide-react";
import Image from "next/image";

export default function PhilosophySection() {
  return (
    <section className="relative bg-black text-white py-12 lg:py-32 px-4 md:px-6 overflow-hidden w-full">
      
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900/40 via-black to-black opacity-60 z-0 pointer-events-none" />
      <div className="absolute top-1/4 -right-1/4 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gold/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center z-10 relative">
        
        {/* Left: Text Content */}
        <div className="flex flex-col items-start z-10 w-full">
          <div className="flex items-center gap-4 mb-4 md:mb-6">
            <div className="h-[2px] w-8 md:w-12 bg-gold" />
            <span className="font-bebas text-gold text-base md:text-lg tracking-widest uppercase">
              Our Core Ethos
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bebas uppercase tracking-wider leading-tight mb-6 md:mb-8 font-bold drop-shadow-lg">
            Our Philosophy
          </h2>
          
          <p className="text-neutral-400 leading-relaxed mb-10 md:mb-16 max-w-lg font-medium text-base md:text-lg border-l-2 border-gold/30 pl-4 md:pl-6">
            We believe in storytelling that&apos;s true, visuals that speak and content that creates real impact. Every project is an opportunity to craft something legendary.
          </p>
          
          {/* Values Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 w-full max-w-xl mx-auto sm:mx-0">
            {/* Value 1 */}
            <div className="flex flex-col items-center justify-center text-center group cursor-pointer">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-neutral-800 bg-neutral-900/50 flex items-center justify-center mb-3 md:mb-4 relative overflow-hidden group-hover:border-gold transition-all duration-500 shadow-[0_0_0_rgba(252,166,3,0)] group-hover:shadow-[0_0_20px_rgba(252,166,3,0.3)]">
                <div className="absolute inset-0 bg-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <Target className="w-6 h-6 md:w-8 md:h-8 stroke-[1.5] text-gold group-hover:text-black relative z-10 transition-colors duration-500" />
              </div>
              <span className="text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-widest group-hover:text-gold transition-colors duration-300">Authenticity</span>
            </div>
            
            {/* Value 2 */}
            <div className="flex flex-col items-center justify-center text-center group cursor-pointer">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-neutral-800 bg-neutral-900/50 flex items-center justify-center mb-3 md:mb-4 relative overflow-hidden group-hover:border-gold transition-all duration-500 shadow-[0_0_0_rgba(252,166,3,0)] group-hover:shadow-[0_0_20px_rgba(252,166,3,0.3)]">
                <div className="absolute inset-0 bg-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <Heart className="w-6 h-6 md:w-8 md:h-8 stroke-[1.5] text-gold group-hover:text-black relative z-10 transition-colors duration-500" />
              </div>
              <span className="text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-widest group-hover:text-gold transition-colors duration-300">Passion</span>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col items-center justify-center text-center group cursor-pointer">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-neutral-800 bg-neutral-900/50 flex items-center justify-center mb-3 md:mb-4 relative overflow-hidden group-hover:border-gold transition-all duration-500 shadow-[0_0_0_rgba(252,166,3,0)] group-hover:shadow-[0_0_20px_rgba(252,166,3,0.3)]">
                <div className="absolute inset-0 bg-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <Star className="w-6 h-6 md:w-8 md:h-8 stroke-[1.5] text-gold group-hover:text-black relative z-10 transition-colors duration-500" />
              </div>
              <span className="text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-widest group-hover:text-gold transition-colors duration-300">Impact</span>
            </div>

            {/* Value 4 */}
            <div className="flex flex-col items-center justify-center text-center group cursor-pointer">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-neutral-800 bg-neutral-900/50 flex items-center justify-center mb-3 md:mb-4 relative overflow-hidden group-hover:border-gold transition-all duration-500 shadow-[0_0_0_rgba(252,166,3,0)] group-hover:shadow-[0_0_20px_rgba(252,166,3,0.3)]">
                <div className="absolute inset-0 bg-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                <Eye className="w-6 h-6 md:w-8 md:h-8 stroke-[1.5] text-gold group-hover:text-black relative z-10 transition-colors duration-500" />
              </div>
              <span className="text-[10px] md:text-[11px] font-bold text-neutral-400 uppercase tracking-widest group-hover:text-gold transition-colors duration-300">Vision</span>
            </div>
          </div>
        </div>

        {/* Right: Scattered Photos (Dark Theme Edition) */}
        <div className="relative h-[250px] sm:h-[350px] lg:h-[600px] w-full flex items-center justify-center max-w-full">
          
          {/* Back subtle photo frame */}
          <div className="hidden md:block absolute top-4 md:top-12 right-4 md:right-12 w-40 sm:w-56 md:w-64 aspect-[4/3] bg-neutral-900 p-1 md:p-2 shadow-2xl rotate-[10deg] border border-neutral-800 opacity-60 hover:opacity-100 hover:rotate-[15deg] transition-all duration-700">
             <div className="w-full h-full bg-black relative">
               <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
             </div>
          </div>

          {/* Main front photo (BTS) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[85%] md:w-[110%] lg:w-[130%] aspect-[16/9] bg-neutral-900 p-1 md:p-2 shadow-[0_30px_60px_rgba(0,0,0,0.8)] -rotate-3 border border-neutral-800 z-10 group hover:rotate-0 hover:scale-[1.02] transition-all duration-700">
            <div className="w-full h-full bg-black relative overflow-hidden">
               <Image
                 src="/images/bts-photo.jpg"
                 alt="Behind the scenes film crew"
                 fill
                 className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale-0 md:grayscale group-hover:grayscale-0"
               />
               {/* Vignette */}
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(0,0,0,0.8)_100%)] pointer-events-none" />
            </div>
            

          </div>
          
          {/* Tape elements for realism */}
          <div className="hidden md:block absolute -top-2 md:-top-4 right-1/4 w-12 md:w-20 h-4 md:h-8 bg-neutral-800/80 backdrop-blur-sm rotate-[30deg] shadow-lg border border-neutral-700/50 z-20" />
          <div className="hidden md:block absolute top-1/4 -right-4 md:-right-8 w-10 md:w-16 h-3 md:h-6 bg-neutral-800/80 backdrop-blur-sm rotate-[-45deg] shadow-lg border border-neutral-700/50 z-20" />
          
          {/* Circular Stamp (Gold version) */}
          <div className="absolute -bottom-6 md:-bottom-12 -right-2 sm:-right-4 md:-right-8 w-16 h-16 sm:w-24 sm:h-24 md:w-40 md:h-40 border-[1px] border-gold/30 rounded-full flex items-center justify-center opacity-40 rotate-12 z-0 pointer-events-none animate-[spin_60s_linear_infinite]">
            <div className="w-12 h-12 sm:w-20 sm:h-20 md:w-36 md:h-36 border-[1px] border-gold/30 rounded-full flex items-center justify-center">
               <span className="font-bebas text-gold/60 tracking-[0.1em] sm:tracking-[0.2em] md:tracking-[0.4em] uppercase text-[6px] sm:text-[8px] md:text-xs text-center w-10 sm:w-16 md:w-24 leading-tight">
                  Authentic <br/> Visuals
               </span>
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
}
