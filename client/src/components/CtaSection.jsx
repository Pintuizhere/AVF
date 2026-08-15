import { ArrowRight, Send } from "lucide-react";
import Image from "next/image";

export default function CtaSection() {
  return (
    <section className="relative bg-[#ebe4d8] text-black py-24 px-6 overflow-hidden">
      
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10 relative">
        
        {/* Left: Call to Action */}
        <div className="flex items-start gap-6 z-10">
          <div className="hidden md:flex mt-2">
            <Send className="w-12 h-12 text-black stroke-[1]" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-script text-3xl mb-2 font-bold">Let&apos;s create</span>
            <h2 className="text-4xl md:text-5xl font-bebas uppercase tracking-wider leading-none mb-8">
              Something Extraordinary<br/>Together
            </h2>
            
            <button className="bg-[#b38f51] hover:bg-[#cba25c] text-black px-8 py-4 font-bold text-xs uppercase tracking-widest flex items-center gap-4 transition-colors">
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Graphics & Script */}
        <div className="relative h-[250px] w-full flex items-center justify-end z-10 opacity-80 mt-12 lg:mt-0">
          
          <div className="flex flex-col items-end mr-8 md:mr-24 relative z-20">
            <span className="font-script text-3xl md:text-4xl -rotate-6">Lights.</span>
            <span className="font-script text-3xl md:text-4xl -rotate-6 mt-1">Camera.</span>
            <span className="font-script text-4xl md:text-5xl font-bold -rotate-6 mt-2 ml-4">AVF.</span>
          </div>

          <div className="absolute right-0 bottom-0 w-64 h-64 opacity-50 contrast-125">
             {/* Using the hero background cropped to show some lenses if we don't have a specific lens image */}
             <div className="w-full h-full relative rounded-full overflow-hidden filter grayscale blur-[1px]">
               <Image
                 src="/images/hero-bg.jpg"
                 alt="Camera Lenses"
                 fill
                 className="object-cover object-right-bottom"
               />
             </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
