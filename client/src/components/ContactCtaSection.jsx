import Image from "next/image";

export default function ContactCtaSection() {
  return (
    <section className="relative w-full bg-[#eae3d5] py-20 z-30 shadow-[0_-15px_30px_rgba(0,0,0,0.8)] border-y-2 border-dashed border-[#b38f51]/40 overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-multiply" />
      
      {/* Rough Edge Top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black opacity-10 blur-[2px]" />
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHBvbHlnb24gZmlsbD0iI2VhZTNkNSIgcG9pbnRzPSIwLDAgOCwwIDgsOCAwLDggIi8+Cgk8cG9seWdvbiBmaWxsPSIjMGQwZDBkIiBwb2ludHM9IjAsMCA0LDQgOCwwICIvPgo8L3N2Zz4=')] opacity-30 -translate-y-[2px]" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Taped Note & Lens */}
          <div className="md:col-span-4 flex justify-center md:justify-start items-center relative h-64">
            
            {/* Camera Lens Image */}
            <div className="absolute -left-12 bottom-0 w-56 h-56 rounded-full overflow-hidden filter drop-shadow-2xl z-0">
               <Image
                 src="/images/hero-bg.jpg" // Placeholder lens
                 alt="Camera Lens"
                 fill
                 className="object-cover object-left-bottom mix-blend-luminosity opacity-90"
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-[#eae3d5]/30" />
            </div>

            {/* Taped Note */}
            <div 
              className="relative left-24 w-40 h-40 bg-[#f5f1e6] text-black shadow-xl flex flex-col items-center justify-center -rotate-12 transform hover:rotate-0 transition-transform duration-500 border border-neutral-300 z-10"
            >
               {/* Tape top-left */}
               <div className="absolute -top-2 -left-2 w-10 h-4 bg-[#c2b49d]/80 shadow-sm backdrop-blur-md transform -rotate-12" />
               {/* Tape top-right */}
               <div className="absolute -top-3 right-0 w-12 h-5 bg-[#c2b49d]/80 shadow-sm backdrop-blur-md transform rotate-45" />
               
               <div className="absolute inset-0 bg-noise opacity-20 mix-blend-multiply pointer-events-none" />
               
               <span className="font-script text-xl -rotate-2 mt-2">Lights.</span>
               <span className="font-script text-xl -rotate-2 mt-1">Camera.</span>
               <span className="font-script text-2xl font-bold -rotate-2 mt-2">AVF.</span>
               
               {/* Rough edges effect */}
               <div className="absolute top-0 left-0 w-full h-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHBvbHlnb24gZmlsbD0iI2Y1ZjFlNiIgcG9pbnRzPSIwLDAgOCwwIDgsOCAwLDggIi8+Cgk8cG9seWdvbiBmaWxsPSIjY2NjIiBwb2ludHM9IjAsMCA0LDQgOCwwICIvPgo8L3N2Zz4=')] opacity-50 -translate-y-[2px]" />
            </div>
            
          </div>

          {/* Center: Quote */}
          <div className="md:col-span-5 flex flex-col items-center text-center px-4 relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-script text-black leading-snug font-medium mb-4">
              "Great films start with a conversation.<br/>
              Let&apos;s start yours today."
            </h2>
            {/* Hand-drawn underline */}
            <div className="w-64 h-1 bg-gold rounded-full shadow-[0_0_10px_rgba(252,166,3,0.3)] transform -rotate-2" />
          </div>

          {/* Right: Film Rolls */}
          <div className="md:col-span-3 flex justify-center md:justify-end relative h-48 w-full mt-12 md:mt-0">
            <div className="relative w-48 h-48 transform rotate-12 hover:-rotate-6 transition-transform duration-500">
               <Image
                 src="/images/services-bg.jpg" // Placeholder for film rolls
                 alt="Film Rolls"
                 fill
                 className="object-cover rounded-md shadow-2xl filter sepia-[0.3]"
               />
               <div className="absolute inset-0 border-4 border-dashed border-black/40 rounded-md pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
