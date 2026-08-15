import { ArrowRight, Camera } from "lucide-react";
import Image from "next/image";

export default function ServicesCtaSection() {
  return (
    <section className="relative bg-[#fdfbf7] text-black py-24 px-6 overflow-hidden">
      
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 relative">
        
        {/* Left: Call to Action */}
        <div className="flex items-center gap-8 z-10">
          
          <div className="hidden md:block relative w-48 h-48">
             {/* Using an icon and placeholder to mimic the camera/film roll graphic */}
             <div className="absolute inset-0 bg-neutral-900 rounded-full flex items-center justify-center shadow-2xl rotate-12">
               <Camera className="w-20 h-20 text-neutral-400 stroke-[1]" />
               {/* Film roll piece */}
               <div className="absolute -bottom-4 -right-4 w-16 h-24 bg-gold rounded-sm border-y-8 border-dashed border-black shadow-lg rotate-12 flex items-center justify-center">
                 <div className="w-12 h-16 bg-black opacity-80" />
               </div>
             </div>
          </div>

          <div className="flex flex-col items-start">
            <span className="font-script text-3xl mb-2 font-bold text-gold">Let&apos;s Create</span>
            <h2 className="text-4xl md:text-5xl font-bebas uppercase tracking-wider leading-none mb-6">
              Something Extraordinary<br/>Together
            </h2>
            <p className="text-sm font-medium text-neutral-600 mb-8">
              Have a project in mind?
            </p>
            
            <button className="bg-[#b38f51] hover:bg-[#cba25c] text-black px-8 py-4 font-bold text-xs uppercase tracking-widest flex items-center gap-4 transition-colors shadow-lg">
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Graphics & Script */}
        <div className="relative h-[250px] w-full flex items-center justify-end z-10 opacity-90 mt-12 lg:mt-0">
          
          {/* Paper note */}
          <div className="absolute top-10 right-32 md:right-48 w-40 h-40 bg-[#ebe4d8] shadow-md -rotate-6 flex flex-col items-center justify-center border border-neutral-300">
             <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-10 h-6 bg-white/40 backdrop-blur-sm shadow-sm" />
             <span className="font-script text-2xl">Lights.</span>
             <span className="font-script text-2xl mt-1">Camera.</span>
             <span className="font-script text-3xl font-bold mt-2">AVF.</span>
          </div>

          <div className="absolute right-[-40px] bottom-[-40px] w-80 h-80 opacity-90 contrast-125 z-20">
             <div className="w-full h-full relative rounded-full overflow-hidden filter grayscale drop-shadow-2xl">
               <Image
                 src="/images/hero-bg.jpg"
                 alt="Camera Lenses"
                 fill
                 className="object-cover object-bottom"
               />
               <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0)_40%,rgba(253,251,247,1)_100%)]" />
             </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
