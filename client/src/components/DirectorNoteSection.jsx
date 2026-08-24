import Image from "next/image";

export default function DirectorNoteSection() {
  return (
    <section className="relative bg-[#0a0a0a] text-white pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 md:px-6 overflow-hidden w-full mt-12 md:mt-0">
      
      <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-16 items-center z-10 relative">
        
        {/* Mobile Badge (Only visible on small screens, appears above photo) */}
        <div className="w-full flex lg:hidden order-1 z-20 justify-center mb-2">
          <span className="font-bebas bg-gold text-black text-lg tracking-widest uppercase px-4 py-1.5 shadow-md">
            A Note From Our Founder
          </span>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full lg:w-1/2 order-2 lg:order-1 mt-4 lg:mt-0">
          {/* Desktop Badge */}
          <span className="hidden lg:inline-block font-bebas bg-gold text-black text-lg tracking-widest uppercase mb-6 px-4 py-1.5 shadow-md">
            A Note From Our Founder
          </span>
          
          <h2 className="text-5xl md:text-7xl font-bebas uppercase tracking-wider leading-tight mb-2 md:mb-4 text-white font-bold text-center lg:text-left">
            Akash Verma
          </h2>
          <h3 className="font-script text-gold text-3xl md:text-4xl mb-6 md:mb-8 -rotate-1 text-center lg:text-left">
            Founder. Filmmaker. Dreamer.
          </h3>
          <p className="text-neutral-300 leading-relaxed mb-4 lg:mb-10 max-w-lg font-medium text-sm md:text-base text-center lg:text-left">
            For me, filmmaking is not just about cameras and editing. 
            It&apos;s about people, emotions and moments that stay forever. 
            I believe in creating visuals that are honest, raw and real. 
            Every frame we create is a promise—to tell your story 
            with authenticity and passion.
          </p>
          
          {/* Desktop Signature */}
          <div className="hidden lg:flex flex-col items-start mt-4">
            <span className="font-script text-gold text-4xl -rotate-2 mb-2">Akash Verma</span>
            <span className="font-bebas tracking-[0.2em] uppercase text-xs text-neutral-400">Founder</span>
          </div>
        </div>

        {/* Right: Director Photo with Film Strip Border */}
        <div className="relative h-[400px] md:h-[600px] w-full lg:w-1/2 flex items-center justify-center order-3 lg:order-2 mt-8 lg:mt-0">
          
          <div className="relative w-[85%] sm:w-full max-w-md aspect-[4/5] bg-black p-3 md:p-4 pb-3 md:pb-4 shadow-2xl rotate-2">
            
            {/* Film strip edge markings */}
            <div className="absolute top-0 bottom-0 left-1 md:left-2 flex flex-col justify-between py-6 md:py-8">
              {[...Array(12)].map((_, i) => (
                <div key={`l-${i}`} className="w-1.5 md:w-2 h-2.5 md:h-3 bg-neutral-900 border border-neutral-800 rounded-sm" />
              ))}
            </div>
            <div className="absolute top-0 bottom-0 right-1 md:right-2 flex flex-col justify-between py-6 md:py-8">
              {[...Array(12)].map((_, i) => (
                <div key={`r-${i}`} className="w-1.5 md:w-2 h-2.5 md:h-3 bg-neutral-900 border border-neutral-800 rounded-sm" />
              ))}
            </div>
            
            {/* Some film text */}
            <div className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] md:text-[10px] text-neutral-500 font-mono tracking-widest hidden sm:block">
              KODAK PORTRA 400
            </div>
            <div className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 rotate-90 text-[8px] md:text-[10px] text-neutral-500 font-mono tracking-widest hidden sm:block">
              KODAK PORTRA 400
            </div>

            <div className="w-full h-full bg-neutral-800 relative overflow-hidden ml-3 md:ml-4 w-[calc(100%-1.5rem)] md:w-[calc(100%-2rem)]">
               <Image
                 src="/images/director.jpg"
                 alt="Akash Verma - Founder"
                 fill
                 className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Tape elements for realism */}
            <div className="absolute -top-2 md:-top-4 -right-4 md:-right-8 w-16 md:w-24 h-6 md:h-8 bg-white/10 backdrop-blur-md rotate-[15deg] shadow-sm z-20" />
            <div className="absolute -bottom-2 md:-bottom-4 -left-4 md:-left-8 w-14 md:w-20 h-6 md:h-8 bg-white/10 backdrop-blur-md -rotate-[10deg] shadow-sm z-20" />

          </div>
        </div>

        {/* Mobile Signature */}
        <div className="w-full flex lg:hidden flex-col items-center justify-center order-4 z-10 mt-10">
          <span className="font-script text-gold text-4xl md:text-5xl -rotate-2 mb-2">Akash Verma</span>
          <span className="font-bebas tracking-[0.2em] uppercase text-xs md:text-sm text-neutral-400">Founder</span>
        </div>
        
      </div>
    </section>
  );
}
