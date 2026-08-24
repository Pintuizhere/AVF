import { Target, Heart, Star, Eye } from "lucide-react";
import Image from "next/image";

export default function PhilosophySection() {
  return (
    <section className="relative bg-[#f5f0e6] text-black py-32 px-6 border-y-[6px] border-dotted border-[#111] overflow-hidden">
      
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 relative">
        
        {/* Left: Text Content */}
        <div className="flex flex-col items-start z-10">
          <h2 className="text-5xl md:text-6xl font-bebas uppercase tracking-wider leading-tight mb-6 font-bold">
            Our Philosophy
          </h2>
          <p className="text-neutral-700 leading-relaxed mb-12 max-w-md font-medium text-lg">
            We believe in storytelling that&apos;s true, visuals that speak and content that creates real impact.
          </p>
          
          {/* Values Grid */}
          <div className="grid grid-cols-4 gap-4 md:gap-8 w-full max-w-lg">
            {/* Value 1 */}
            <div className="flex flex-col items-center justify-center text-center group">
              <div className="w-16 h-16 rounded-full border border-neutral-300 flex items-center justify-center mb-3 group-hover:border-black transition-colors group-hover:bg-black group-hover:text-white">
                <Target className="w-6 h-6 stroke-[1.5]" />
              </div>
              <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest group-hover:text-black transition-colors">Authenticity</span>
            </div>
            
            {/* Value 2 */}
            <div className="flex flex-col items-center justify-center text-center group">
              <div className="w-16 h-16 rounded-full border border-neutral-300 flex items-center justify-center mb-3 group-hover:border-black transition-colors group-hover:bg-black group-hover:text-white">
                <Heart className="w-6 h-6 stroke-[1.5]" />
              </div>
              <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest group-hover:text-black transition-colors">Passion</span>
            </div>

            {/* Value 3 */}
            <div className="flex flex-col items-center justify-center text-center group">
              <div className="w-16 h-16 rounded-full border border-neutral-300 flex items-center justify-center mb-3 group-hover:border-black transition-colors group-hover:bg-black group-hover:text-white">
                <Star className="w-6 h-6 stroke-[1.5]" />
              </div>
              <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest group-hover:text-black transition-colors">Impact</span>
            </div>

            {/* Value 4 */}
            <div className="flex flex-col items-center justify-center text-center group">
              <div className="w-16 h-16 rounded-full border border-neutral-300 flex items-center justify-center mb-3 group-hover:border-black transition-colors group-hover:bg-black group-hover:text-white">
                <Eye className="w-6 h-6 stroke-[1.5]" />
              </div>
              <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest group-hover:text-black transition-colors">Vision</span>
            </div>
          </div>
        </div>

        {/* Right: Scattered Photos */}
        <div className="relative h-[500px] w-full flex items-center justify-center">
          
          {/* Back subtle photo / tear */}
          <div className="absolute top-8 right-8 w-64 aspect-[4/3] bg-white p-2 shadow-lg rotate-[15deg] opacity-70 border border-neutral-300">
             <div className="w-full h-full bg-neutral-200"></div>
          </div>

          {/* Main front photo (BTS) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] md:w-[120%] aspect-[16/9] bg-white p-3 shadow-2xl -rotate-2 border border-neutral-200 z-10">
            <div className="w-full h-full bg-neutral-900 relative overflow-hidden grayscale contrast-125">
               <Image
                 src="/images/bts-photo.jpg"
                 alt="Behind the scenes film crew"
                 fill
                 className="object-cover"
               />
            </div>
            
            {/* Overlay Script Text Box */}
            <div className="absolute -bottom-10 -left-6 bg-black text-gold p-6 shadow-xl -rotate-[5deg] z-20">
              <p className="font-script text-3xl leading-snug">
                Real stories.<br/>Real people.<br/>Real impact.
              </p>
            </div>
          </div>
          
          {/* Tape element */}
          <div className="absolute top-4 right-1/4 w-16 h-6 bg-white/50 backdrop-blur-sm rotate-45 shadow-sm z-20" />
          
          {/* Circular Stamp */}
          <div className="absolute -bottom-8 -right-4 w-32 h-32 border-2 border-neutral-300/40 rounded-full flex items-center justify-center opacity-60 rotate-12 z-0 pointer-events-none">
            <div className="w-28 h-28 border border-neutral-300/40 rounded-full flex items-center justify-center">
               <span className="font-bebas text-neutral-400 tracking-[0.3em] uppercase text-xs text-center w-24">
                  Authentic <br/> Visuals
               </span>
            </div>
          </div>

        </div>
        
      </div>
    </section>
  );
}
