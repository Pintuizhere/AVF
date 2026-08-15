import { ArrowRight, Image as ImageIcon } from "lucide-react";

export default function WhoWeAreSection() {
  return (
    <section id="about" className="relative bg-[#f5f0e6] text-black py-32 px-6">
      <div className="paper-edge-top" />
      
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Scattered Photos / Polaroids */}
        <div className="relative h-[500px] w-full flex items-center justify-center">
          {/* Back photo */}
          <div className="absolute top-10 left-10 w-64 aspect-[4/5] bg-white p-4 pb-16 shadow-xl -rotate-12 flex flex-col grayscale opacity-80 border border-neutral-200">
            <div className="flex-1 bg-neutral-200 flex items-center justify-center border border-neutral-300">
               <ImageIcon className="w-12 h-12 text-neutral-400" />
            </div>
          </div>
          
          {/* Main front photo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 aspect-square bg-white p-4 pb-20 shadow-2xl rotate-3 border border-neutral-200 z-10">
            <div className="w-full h-full bg-neutral-900 flex items-center justify-center rounded-sm overflow-hidden relative border-4 border-black/10 shadow-inner">
               <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0.8)_100%)] z-10" />
               {/* Simulating a lens center in the photo */}
               <div className="w-32 h-32 rounded-full border-[12px] border-neutral-800 flex items-center justify-center bg-black relative z-0">
                  <div className="w-16 h-16 rounded-full border-4 border-neutral-600 bg-neutral-900" />
               </div>
            </div>
            <div className="absolute bottom-6 left-6 font-script text-2xl text-neutral-800 -rotate-2">
              AVF - Behind every frame
            </div>
            <div className="absolute bottom-1 right-6 font-script text-2xl text-neutral-800 -rotate-2">
              is a vision
            </div>
          </div>
          
          {/* Tape elements for realism */}
          <div className="absolute top-1/4 left-1/4 w-16 h-6 bg-white/40 backdrop-blur-sm -rotate-45 shadow-sm" />
          <div className="absolute bottom-1/4 right-1/4 w-12 h-4 bg-white/40 backdrop-blur-sm rotate-12 shadow-sm z-20" />
        </div>

        {/* Right: Text Content */}
        <div className="flex flex-col items-start z-10">
          <span className="font-script text-gold text-4xl mb-4 font-bold">Who We Are</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-8">
            Passionate Filmmakers,<br />
            Storytellers &<br />
            Visual Artists
          </h2>
          <p className="text-neutral-700 leading-relaxed mb-10 max-w-lg font-medium">
            AVF Akash Verma Film Products is a creative production house
            dedicated to delivering powerful visual storytelling. From concept
            to screen, we craft cinematic content that connects, inspires and
            leaves a lasting impression.
          </p>
          
          {/* Brush stroke style button */}
          <button className="relative group overflow-hidden bg-black text-white px-8 py-4 font-bold text-xs uppercase tracking-widest flex items-center gap-4 hover:bg-neutral-800 transition-colors">
            {/* The SVG could be a true brush stroke, but using CSS styling for now */}
            <span className="relative z-10 flex items-center gap-3">
              Know More About Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </span>
          </button>
        </div>
        
      </div>

      <div className="paper-edge-bottom" />
    </section>
  );
}
