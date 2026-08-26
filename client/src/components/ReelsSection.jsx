"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, ArrowRight } from "lucide-react";
import StatsSection from "./StatsSection";

const reelsData = [
  {
    id: 1,
    title: "Monitor Nonstop",
    category: "Productivity",
    views: "1.2M",
    image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Guarantees",
    category: "Business",
    views: "854K",
    image: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "On Demand",
    category: "Tech",
    views: "2.1M",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Tech Review",
    category: "Gadgets",
    views: "500K",
    image: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Studio Setup",
    category: "Behind the Scenes",
    views: "3.4M",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Creative Process",
    category: "Vlog",
    views: "920K",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "The Vision",
    category: "Cinematic",
    views: "1.5M",
    image: "https://images.unsplash.com/photo-1533422902779-babd4a46a6f6?q=80&w=600&auto=format&fit=crop",
  }
];

export default function ReelsSection() {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-black pt-20 text-white border-b border-white/5 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 mb-8 md:mb-10 relative z-10 flex flex-row justify-between items-end gap-4">
        <div>
          <span className="text-gold text-sm font-bold tracking-widest uppercase mb-1 md:mb-2 block">Featured Work</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Shorts</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/work" className="hidden md:flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-white hover:text-gold transition-colors group">
            View All
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="flex gap-2 md:gap-3 md:ml-4 md:border-l md:border-white/10 md:pl-6">
            <button 
              onClick={() => scroll("left")}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-black transition-all group shrink-0"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-1" />
            </button>
            <button 
              onClick={() => scroll("right")}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-black transition-all group shrink-0"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-8 overflow-x-auto pb-12 pt-2 md:pt-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 scroll-pl-6 md:scroll-pl-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reelsData.map((reel) => (
            <div 
              key={reel.id} 
              className="relative flex-none w-[240px] sm:w-[280px] md:w-[320px] aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden group snap-start cursor-pointer border border-white/10 hover:border-gold/50 transition-all duration-500 shadow-xl hover:shadow-[0_0_40px_rgba(255,215,0,0.15)]"
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 z-0 bg-neutral-900">
                <img 
                  src={reel.image} 
                  alt={reel.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  loading="lazy"
                />
              </div>

              {/* Gradient Overlays for better text legibility */}
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/90"></div>
              <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

              {/* Center Play Button */}
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:border-gold hover:text-black">
                  <Play className="w-6 h-6 ml-1 fill-current" />
                </div>
              </div>

              {/* Bottom Content Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-2 block drop-shadow-md">
                  {reel.category}
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white leading-tight drop-shadow-lg mb-2">
                  {reel.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View All Button */}
      <div className="flex md:hidden justify-center mt-2 mb-12 relative z-10 px-6">
        <Link 
          href="/work" 
          className="w-full py-4 rounded-full border border-white/20 flex items-center justify-center gap-2 text-sm font-bold tracking-wider uppercase text-white bg-neutral-900/50 hover:bg-white hover:text-black transition-all group"
        >
          View All Work
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <StatsSection />

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}
