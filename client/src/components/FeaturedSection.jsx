"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Link from "next/link";

export default function FeaturedSection() {
  const scrollContainerRef = useRef(null);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/featured");
      const data = await res.json();
      setFeaturedItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 1.5 : scrollLeft + clientWidth / 1.5;
      scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (loading) return null; // Or a subtle skeleton
  if (featuredItems.length === 0) return null;

  return (
    <section className="bg-black py-16 text-white relative border-b border-white/5">
      <div className="container mx-auto px-6 max-w-5xl mb-8 flex justify-between items-end">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">Featured</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-black transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-black transition-all"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative group">
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-10 pt-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 scroll-pl-6 md:scroll-pl-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featuredItems.map((item) => (
            <Link 
              href={item.url ? item.url : "#"} 
              target={item.url ? "_blank" : "_self"}
              key={item._id} 
              className="relative flex-none w-[85vw] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] aspect-[16/9] rounded-xl overflow-hidden group/card snap-start cursor-pointer border border-neutral-800/50 hover:border-gold/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-gold/5 block"
            >
              <div className="absolute inset-0 z-0 bg-neutral-900">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-0" />

              {/* Play Button Overlay for video type */}
              {item.type === 'video' && (
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[2px]">
                  <div className="w-16 h-16 rounded-full border border-white/20 bg-white/10 flex items-center justify-center group-hover/card:bg-gold group-hover/card:border-gold group-hover/card:text-black transition-all duration-300 shadow-2xl scale-90 group-hover/card:scale-100">
                    <Play className="w-6 h-6 ml-1 fill-current" />
                  </div>
                </div>
              )}

              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                <div className="transform translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-2 block shadow-black drop-shadow-md">
                    {item.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-lg">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}
