"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function ClientsSection({ initialData }) {
  const [brands, setBrands] = useState(initialData?.clients || []);
  const [heading, setHeading] = useState(initialData?.settings?.clientsSectionHeading || "Our Clients");
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // We already have the initial data from the Server Component
    // No need to fetch on client side on mount for SEO and performance
  }, []);

  useEffect(() => {
    let animationId;
    const scrollContainer = scrollRef.current;

    const scroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += 1;
        
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft -= scrollContainer.scrollWidth / 2;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    if (brands.length > 0) {
      animationId = requestAnimationFrame(scroll);
    }
    
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, brands]);

  if (brands.length === 0) return null;

  // Render enough brands to fill the screen, but avoid excessive DOM nodes
  // 2 repetitions per block is safer for mobile performance
  const repeatedBrands = Array(2).fill(brands).flat();

  return (
    <section className="bg-[#f8f9fa] text-black py-2 md:py-3 overflow-hidden">
      <div className="container mx-auto max-w-[1400px] px-6 mb-2 md:mb-4">
        <div className="flex justify-start">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-[#fbbf24]"></div>
            <h3 className="font-extrabold text-sm sm:text-base tracking-[0.2em] uppercase text-black">
              Our <span className="bg-[#fbbf24] text-black px-3 py-1 ml-1 shadow-sm skew-x-[-10deg] inline-block"><span className="skew-x-[10deg] inline-block">Clients</span></span>
            </h3>
          </div>
        </div>
      </div>
        
      {/* Infinite Marquee / Swipeable Container */}
      <div 
        ref={scrollRef}
        className="flex w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="flex w-max pb-0">
          {/* Render the brand list twice for seamless infinite scrolling */}
          {[1, 2].map((setIndex) => (
            <div 
              key={setIndex}
              className="flex items-start gap-3 md:gap-5 pr-3 md:pr-5 w-max flex-nowrap"
            >
              {repeatedBrands.map((brand, i) => (
                <div 
                  key={`${setIndex}-${i}`} 
                  className="flex-none flex flex-col items-center gap-2 md:gap-3 w-[65px] sm:w-[85px] md:w-[95px]"
                >
                  <div className="w-full aspect-square bg-white rounded-lg md:rounded-xl shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] border border-gray-100/50 flex items-center justify-center p-2 sm:p-3 hover:shadow-md transition-shadow cursor-pointer overflow-hidden">
                    <Image
                      src={brand.logoUrl} 
                      alt={brand.name}
                      width={120}
                      height={120}
                      className="max-w-full max-h-full object-contain"
                      style={{ transform: `scale(${brand.zoom || 1.0})` }}
                      suppressHydrationWarning={true}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextElementSibling) {
                          e.target.nextElementSibling.style.display = 'block';
                        }
                      }}
                    />
                    <span 
                      className="hidden text-sm md:text-base font-black uppercase tracking-tighter text-black/60"
                      style={{ display: 'none' }}
                    >
                      {brand.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
