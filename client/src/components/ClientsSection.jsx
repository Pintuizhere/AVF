"use client";

import { useState, useEffect, useRef } from "react";

export default function ClientsSection() {
  const [brands, setBrands] = useState([]);
  const [heading, setHeading] = useState("Our Clients");
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsRes, settingsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/clients?t=` + Date.now()),
          fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/settings?t=` + Date.now())
        ]);
        
        if (brandsRes.ok) {
          const brandsData = await brandsRes.json();
          setBrands(brandsData);
        }

        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          if (settingsData.clientsSectionHeading) {
            setHeading(settingsData.clientsSectionHeading);
          }
        }
      } catch (err) {
        console.error("Failed to load client data", err);
      }
    };
    fetchData();
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
  // 4 repetitions per block is safe and prevents mobile memory stacking
  const repeatedBrands = Array(4).fill(brands).flat();

  return (
    <section className="bg-[#e9e6dc] text-black py-10 border-y-[6px] border-dotted border-[#111] overflow-hidden">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="flex justify-center mb-10">
          <h3 className="font-bold text-sm sm:text-base tracking-[0.2em] uppercase bg-[#fbbf24] px-4 py-2 text-black shadow-sm">
            {heading}
          </h3>
        </div>
      </div>
        
      {/* Infinite Marquee / Swipeable Container */}
      <div 
        ref={scrollRef}
        className="flex w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="flex w-max">
          {/* Render the brand list twice for seamless infinite scrolling */}
          {[1, 2].map((setIndex) => (
            <div 
              key={setIndex}
              className="flex items-center gap-6 md:gap-12 pr-6 md:pr-12 w-max flex-nowrap"
            >
              {repeatedBrands.map((brand, i) => (
                <div 
                  key={`${setIndex}-${i}`} 
                  className="flex-none"
                >
                  <div className="w-20 sm:w-28 md:w-40 h-10 sm:h-14 md:h-20 relative flex items-center justify-center hover:scale-110 transition-all duration-300 ease-out cursor-pointer overflow-hidden">
                    <img 
                      src={brand.logoUrl} 
                      alt={brand.name} 
                      className="max-w-full max-h-full object-contain transition-transform duration-300"
                      style={{ transform: `scale(${brand.zoom || 1.0})` }}
                      loading="lazy"
                      suppressHydrationWarning={true}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'block';
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
