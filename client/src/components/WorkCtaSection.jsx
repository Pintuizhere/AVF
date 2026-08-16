import Image from "next/image";
import { ArrowRight, Film, Star, Clock, CheckCircle } from "lucide-react";

export default function WorkCtaSection() {
  return (
    <section className="relative bg-[#0d0d0d] text-white py-24 overflow-hidden border-t border-neutral-900">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-900/40 via-transparent to-transparent z-0" />

      <div className="container mx-auto max-w-7xl px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Camera Lens Graphic & Torn Paper */}
          <div className="lg:col-span-5 relative h-[300px] flex items-center justify-start">
            
            {/* Camera Lens Image */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full overflow-hidden filter drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-neutral-800">
               <Image
                 src="/images/hero-bg.jpg" // A placeholder lens
                 alt="Camera Lens"
                 fill
                 className="object-cover object-center mix-blend-luminosity opacity-80"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
            </div>

            {/* Torn Paper Note */}
            <div 
              className="absolute left-40 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#ebe4d8] text-black shadow-2xl flex flex-col items-center justify-center -rotate-6 transform hover:rotate-0 transition-transform duration-500 z-10 overflow-visible"
            >
               {/* Tape top-left */}
               <div className="absolute -top-2 -left-2 w-12 h-5 bg-orange-900/10 shadow-sm backdrop-blur-md transform -rotate-12" />
               {/* Tape top-right */}
               <div className="absolute -top-4 right-2 w-14 h-5 bg-orange-900/10 shadow-sm backdrop-blur-md transform rotate-[25deg]" />
               
               <div className="absolute inset-0 bg-noise opacity-20 mix-blend-multiply pointer-events-none" />
               
               <span className="font-script text-2xl -rotate-2 mt-2">Lights.</span>
               <span className="font-script text-2xl -rotate-2 mt-1">Camera.</span>
               <span className="font-script text-3xl font-bold -rotate-2 mt-2">AVF.</span>
               
               {/* Rough edges effect (css trick) */}
               <div className="absolute top-0 left-0 w-full h-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHBvbHlnb24gZmlsbD0iI2ViZTRkOCIgcG9pbnRzPSIwLDAgOCwwIDgsOCAwLDggIi8+Cgk8cG9seWdvbiBmaWxsPSIjMGQwZDBkIiBwb2ludHM9IjAsMCA0LDQgOCwwICIvPgo8L3N2Zz4=')] opacity-0" />
            </div>
            
          </div>

          {/* Center: CTA Text */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-center text-left lg:text-center">
            <span className="font-script text-3xl mb-2 font-bold text-gold">Let&apos;s Create</span>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-bebas uppercase tracking-widest leading-[0.9] mb-8 text-white">
              Something<br/>
              <span className="text-gold">Extraordinary</span><br/>
              Together
            </h2>
            
            <button className="bg-gold hover:bg-white text-black px-8 py-4 font-bold text-xs uppercase tracking-widest flex items-center gap-4 transition-colors shadow-[0_0_20px_rgba(252,166,3,0.2)]">
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Benefits List */}
          <div className="lg:col-span-3 flex flex-col gap-6 lg:pl-12">
            {[
              { icon: Film, text: "Creative Storytelling" },
              { icon: Star, text: "High Quality Production" },
              { icon: Clock, text: "On-time Delivery" },
              { icon: CheckCircle, text: "End-to-end Support" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-gold flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-colors">
                  <item.icon className="w-4 h-4 stroke-[1.5]" />
                </div>
                <span className="text-sm font-medium text-neutral-300 tracking-wide group-hover:text-white transition-colors">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
