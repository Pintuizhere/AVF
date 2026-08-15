import { ArrowRight, Film } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-black pt-24 pb-12 overflow-hidden border-t border-white/10 text-white">
      {/* Background cinematic elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-50 z-0 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left: Lens element */}
        <div className="hidden md:flex w-64 h-64 border-4 border-neutral-800 rounded-full items-center justify-center -ml-16 bg-neutral-950 relative shadow-2xl">
           <div className="absolute inset-0 rounded-full border-t border-white/5" />
           <div className="w-48 h-48 border-8 border-black rounded-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-black relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
              <div className="w-24 h-24 rounded-full bg-black border-2 border-neutral-700 relative flex items-center justify-center shadow-inner">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-green-900/20 to-blue-900/20 border border-white/5" />
              </div>
           </div>
        </div>

        {/* Center: CTA */}
        <div className="flex-1 flex flex-col items-center text-center">
          <span className="font-script text-gold text-3xl mb-4 font-bold">Let's Create</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
            Something Extraordinary<br />Together
          </h2>
          <button className="bg-gold text-black px-8 py-4 font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors flex items-center gap-3">
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Paper Note / Film roll */}
        <div className="relative w-64 h-64 hidden md:flex items-center justify-center">
           <div className="absolute -left-8 top-12 z-0 opacity-40">
             <Film className="w-32 h-32 text-neutral-600 -rotate-12" />
           </div>
           
           <div className="w-48 aspect-square bg-[#f5f0e6] text-black p-6 shadow-xl rotate-6 z-10 relative border border-neutral-300 flex flex-col justify-center">
             <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/60 backdrop-blur-sm -rotate-2 shadow-sm" />
             <p className="font-script text-3xl leading-snug">
               Lights,<br />
               Camera,<br />
               AVF.
             </p>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 mt-24 flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-neutral-500 text-xs tracking-wider">
        <p>&copy; {new Date().getFullYear()} AVF Akash Verma Film Products. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0 uppercase font-bold text-[10px]">
          <a href="#" className="hover:text-gold transition-colors">Instagram</a>
          <a href="#" className="hover:text-gold transition-colors">Vimeo</a>
          <a href="#" className="hover:text-gold transition-colors">YouTube</a>
          <a href="#" className="hover:text-gold transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
