import Image from "next/image";

export default function BtsCtaSection() {
  return (
    <section className="relative w-full bg-[#eae3d5] py-24 z-30 shadow-[0_-15px_30px_rgba(0,0,0,0.8)] border-y-2 border-dashed border-[#b38f51]/40 overflow-hidden">
      {/* Texture */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-multiply" />
      
      {/* Rough Edge Top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black opacity-10 blur-[2px]" />
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHBvbHlnb24gZmlsbD0iI2VhZTNkNSIgcG9pbnRzPSIwLDAgOCwwIDgsOCAwLDggIi8+Cgk8cG9seWdvbiBmaWxsPSIjMGQwZDBkIiBwb2ludHM9IjAsMCA0LDQgOCwwICIvPgo8L3N2Zz4=')] opacity-30 -translate-y-[2px]" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left: Film Rolls */}
          <div className="md:col-span-3 flex justify-center md:justify-start relative h-48 w-full">
            {/* We'll use a placeholder or stylized div if we don't have the exact image */}
            <div className="relative w-40 h-40 transform -rotate-12 hover:rotate-0 transition-transform duration-500">
               <Image
                 src="/images/services-bg.jpg" // Placeholder for film rolls
                 alt="Film Rolls"
                 fill
                 className="object-cover rounded-md shadow-2xl filter sepia-[0.3]"
               />
               <div className="absolute inset-0 border-4 border-dashed border-black/40 rounded-md pointer-events-none" />
            </div>
            {/* Second roll behind */}
            <div className="absolute left-20 top-4 w-32 h-32 transform rotate-6 opacity-80 z-[-1]">
               <Image
                 src="/images/hero-bg.jpg"
                 alt="Film Rolls"
                 fill
                 className="object-cover rounded-md shadow-lg filter grayscale"
               />
            </div>
          </div>

          {/* Center: Quote */}
          <div className="md:col-span-6 flex flex-col items-center text-center px-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-script text-black leading-snug font-medium">
              Behind every great film<br/>
              is a team that believes<br/>
              in the <span className="text-[#9a763c] font-bold">impossible.</span>
            </h2>
          </div>

          {/* Right: Taped Note */}
          <div className="md:col-span-3 flex justify-center md:justify-end">
            <div 
              className="relative w-48 h-48 bg-[#f5f1e6] text-black shadow-xl flex flex-col items-center justify-center rotate-6 transform hover:rotate-2 transition-transform duration-500 border border-neutral-300"
            >
               {/* Tape top-left */}
               <div className="absolute -top-2 -left-2 w-12 h-5 bg-[#c2b49d]/80 shadow-sm backdrop-blur-md transform -rotate-[20deg]" />
               {/* Tape bottom-right */}
               <div className="absolute -bottom-2 -right-2 w-12 h-5 bg-[#c2b49d]/80 shadow-sm backdrop-blur-md transform -rotate-[25deg]" />
               
               <div className="absolute inset-0 bg-noise opacity-20 mix-blend-multiply pointer-events-none" />
               
               <span className="font-script text-2xl -rotate-2 mt-2">Lights.</span>
               <span className="font-script text-2xl -rotate-2 mt-1">Camera.</span>
               <span className="font-script text-3xl font-bold -rotate-2 mt-2">AVF.</span>
               
               {/* Rough edges effect */}
               <div className="absolute top-0 left-0 w-full h-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHBvbHlnb24gZmlsbD0iI2Y1ZjFlNiIgcG9pbnRzPSIwLDAgOCwwIDgsOCAwLDggIi8+Cgk8cG9seWdvbiBmaWxsPSIjY2NjIiBwb2ludHM9IjAsMCA0LDQgOCwwICIvPgo8L3N2Zz4=')] opacity-50 -translate-y-[2px]" />
            </div>
          </div>

        </div>
      </div>

      {/* Rough Edge Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHBvbHlnb24gZmlsbD0iI2VhZTNkNSIgcG9pbnRzPSIwLDggOCw4IDgsMCAwLDAgIi8+Cgk8cG9seWdvbiBmaWxsPSIjMGQwZDBkIiBwb2ludHM9IjAsOCA0LDQgOCw4ICIvPgo8L3N2Zz4=')] opacity-30 translate-y-[2px]" />
    </section>
  );
}
