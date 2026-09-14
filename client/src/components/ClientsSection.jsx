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
    <section className="bg-[#f8f9fa] text-black py-16 overflow-hidden">
      <div className="container mx-auto max-w-[1400px] px-6 mb-10">
        <div className="flex justify-start mb-10">
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
        className="flex w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="flex w-max pb-6">
          {/* Render the brand list twice for seamless infinite scrolling */}
          {[1, 2].map((setIndex) => (
            <div 
              key={setIndex}
              className="flex items-start gap-4 md:gap-8 pr-4 md:pr-8 w-max flex-nowrap"
            >
              {repeatedBrands.map((brand, i) => (
                <div 
                  key={`${setIndex}-${i}`} 
                  className="flex-none flex flex-col items-center gap-4 w-[100px] sm:w-[130px] md:w-[150px]"
                >
                  <div className="w-full aspect-square bg-white rounded-2xl md:rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100/50 flex items-center justify-center p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                    <img 
                      src={brand.logoUrl} 
                      alt={brand.name} 
                      className="max-w-full max-h-full object-contain"
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
