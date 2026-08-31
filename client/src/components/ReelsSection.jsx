"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, ArrowRight } from "lucide-react";
import StatsSection from "./StatsSection";

export default function ReelsSection() {
  const scrollContainerRef = useRef(null);
  const [reelsData, setReelsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/shorts`);
      const data = await res.json();
      setReelsData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (loading) return null; // or a skeleton
  if (reelsData.length === 0) return null;

  return (
    <section className="bg-black pt-20 text-white border-b border-white/5 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 max-w-5xl mb-8 md:mb-10 relative z-10 flex flex-row justify-between items-end gap-4">
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

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-8 overflow-x-auto pb-12 pt-2 md:pt-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 scroll-pl-6 md:scroll-pl-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {reelsData.map((reel, index) => {
            const content = (
              <>
                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 z-0 bg-neutral-900">
                  <img 
                    src={reel.src} 
                    alt={reel.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                  />
                </div>

                {/* Gradient Overlays for better text legibility */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/90"></div>
                <div className="absolute inset-0 z-10 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>

                {/* Center Play Button for videos */}
                {reel.type === 'video' && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:border-gold hover:text-black">
                      <Play className="w-6 h-6 ml-1 fill-current" />
                    </div>
                  </div>
                )}

                {/* Bottom Content Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-2 block drop-shadow-md">
                    {reel.category}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-white leading-tight drop-shadow-lg mb-2">
                    {reel.title}
                  </h3>
                </div>
              </>
            );

            const className = "relative flex-none w-[240px] sm:w-[280px] md:w-[320px] aspect-[9/16] rounded-xl md:rounded-2xl overflow-hidden group snap-start cursor-pointer border border-white/10 hover:border-gold/50 transition-all duration-500 shadow-xl hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] block";
            const uniqueKey = reel._id ? `${reel._id}-${index}` : `reel-${index}`;

            if (reel.url) {
              return (
                <Link key={uniqueKey} href={reel.url} target="_blank" className={className}>
                  {content}
                </Link>
              );
            }

            return (
              <div key={uniqueKey} className={className}>
                {content}
              </div>
            );
          })}
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
