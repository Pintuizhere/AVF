"use client";

import { useState, useEffect } from "react";

export default function ClientsSection() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/clients?t=` + Date.now());
        const data = await res.json();
        setBrands(data);
      } catch (err) {
        console.error("Failed to load client logos", err);
      }
    };
    fetchBrands();
  }, []);

  if (brands.length === 0) return null;

  const repeatedBrands = Array(10).fill(brands).flat();

  return (
    <section className="bg-[#e9e6dc] text-black py-10 border-y-[6px] border-dotted border-[#111] overflow-hidden">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="flex justify-center mb-10">
          <h3 className="font-bold text-sm sm:text-base tracking-[0.2em] uppercase bg-[#fbbf24] px-4 py-2 text-black shadow-sm">
            Trusted By Amazing Brands
          </h3>
        </div>
      </div>
        
      {/* Infinite Marquee Container */}
      <div className="flex w-full overflow-hidden group">
        <div className="flex w-max animate-marquee">
          {/* Render the brand list twice for seamless infinite scrolling */}
          {[1, 2].map((setIndex) => (
            <div 
              key={setIndex}
              className="flex items-center justify-around gap-6 md:gap-10 px-4 md:px-6 w-max"
            >
              {repeatedBrands.map((brand, i) => (
                <div 
                  key={`${setIndex}-${i}`} 
                  className="flex-none group/logo"
                >
                  <div className="w-16 sm:w-20 md:w-24 h-8 sm:h-10 md:h-12 relative flex items-center justify-center hover:scale-110 transition-all duration-300 ease-out cursor-pointer overflow-hidden">
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
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 350s linear infinite;
        }
      `}} />
    </section>
  );
}
