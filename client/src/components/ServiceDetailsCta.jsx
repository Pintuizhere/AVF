import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function ServiceDetailsCta() {
  return (
    <section className="relative w-full py-24 bg-black text-white overflow-hidden mt-8">
      {/* Texture Overlay */}
      <div className="bg-noise absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none z-10" />

      {/* Large Lens Background Image */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20 pointer-events-none z-0">
        <Image 
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop" 
          alt="Camera Lens"
          fill
          className="object-cover rounded-full filter grayscale mix-blend-screen"
        />
        {/* Soft fade out for the lens */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/50 to-black rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-script text-gold mb-4 leading-tight">
            Have a story to tell?
          </h2>
          
          <h3 className="text-4xl md:text-6xl font-bebas mb-10 tracking-wider">
            LET'S CREATE SOMETHING IMPACTFUL TOGETHER.
          </h3>

          <Link 
            href="/contact" 
            className="inline-flex items-center gap-3 bg-gold text-black px-8 py-4 font-bold tracking-wider hover:bg-white transition-colors duration-300 group"
          >
            START YOUR PROJECT
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      
      {/* Bottom Torn Paper Edge for transitioning back to off-white if needed, but in image it goes to off-white Related works */}
      <div 
        className="absolute bottom-0 left-0 w-full h-8 -mb-8 z-20"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 40' preserveAspectRatio='none'%3E%3Cpath d='M0,0 C150,20 300,0 450,25 C600,0 750,30 900,5 C1050,25 1200,0 1200,0 L1200,40 L0,40 Z' fill='%23f4f1ea'/%3E%3C/svg%3E\")",
          backgroundSize: '100% 100%'
        }}
      />
    </section>
  );
}
