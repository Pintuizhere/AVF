import Image from "next/image";

export default function DirectorNoteSection() {
  return (
    <section className="relative bg-[#0a0a0a] text-white py-32 px-6 overflow-hidden">
      
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 relative">
        
        {/* Left: Text Content */}
        <div className="flex flex-col items-start z-10">
          <span className="font-bebas text-gold text-lg tracking-widest uppercase mb-4">A Note From Our Director</span>
          <h2 className="text-5xl md:text-7xl font-bebas uppercase tracking-wider leading-tight mb-4 text-white font-bold">
            Akash Verma
          </h2>
          <h3 className="font-script text-gold text-3xl md:text-4xl mb-8 -rotate-1">
            Director. Filmmaker. Dreamer.
          </h3>
          <p className="text-neutral-300 leading-relaxed mb-10 max-w-lg font-medium text-sm">
            For me, filmmaking is not just about cameras and editing. 
            It&apos;s about people, emotions and moments that stay forever. 
            I believe in creating visuals that are honest, raw and real. 
            Every frame we create is a promise—to tell your story 
            with authenticity and passion.
          </p>
          
          {/* Signature */}
          <div className="flex flex-col items-start mt-4">
            <span className="font-script text-gold text-4xl -rotate-2 mb-2">Akash Verma</span>
            <span className="font-bebas tracking-[0.2em] uppercase text-xs text-neutral-400">Founder & Director</span>
          </div>
        </div>

        {/* Right: Director Photo with Film Strip Border */}
        <div className="relative h-[600px] w-full flex items-center justify-center">
          
          <div className="relative w-full max-w-md aspect-[4/5] bg-black p-4 pb-4 shadow-2xl rotate-2">
            
            {/* Film strip edge markings */}
            <div className="absolute top-0 bottom-0 left-2 flex flex-col justify-between py-8">
              {[...Array(12)].map((_, i) => (
                <div key={`l-${i}`} className="w-2 h-3 bg-neutral-900 border border-neutral-800 rounded-sm" />
              ))}
            </div>
            <div className="absolute top-0 bottom-0 right-2 flex flex-col justify-between py-8">
              {[...Array(12)].map((_, i) => (
                <div key={`r-${i}`} className="w-2 h-3 bg-neutral-900 border border-neutral-800 rounded-sm" />
              ))}
            </div>
            
            {/* Some film text */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-neutral-500 font-mono tracking-widest">
              KODAK PORTRA 400
            </div>
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 rotate-90 text-[10px] text-neutral-500 font-mono tracking-widest">
              KODAK PORTRA 400
            </div>

            <div className="w-full h-full bg-neutral-800 relative overflow-hidden ml-4 w-[calc(100%-2rem)]">
               <Image
                 src="/images/director.jpg"
                 alt="Akash Verma - Director"
                 fill
                 className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
               />
               <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Tape elements for realism */}
            <div className="absolute -top-4 -right-8 w-24 h-8 bg-white/10 backdrop-blur-md rotate-[15deg] shadow-sm z-20" />
            <div className="absolute -bottom-4 -left-8 w-20 h-8 bg-white/10 backdrop-blur-md -rotate-[10deg] shadow-sm z-20" />

          </div>
        </div>
        
      </div>
    </section>
  );
}
