"use client";

import { useState } from "react";

export default function ClientsSection() {
  // Using SimpleIcons API with default brand colors to avoid AdBlockers blocking clearbit
  const brands = [
    { name: "Google", src: "https://cdn.simpleicons.org/google" },
    { name: "Netflix", src: "https://cdn.simpleicons.org/netflix" },
    { name: "CocaCola", src: "https://cdn.simpleicons.org/coca-cola" },
    { name: "Nike", src: "https://cdn.simpleicons.org/nike" },
    { name: "Samsung", src: "https://cdn.simpleicons.org/samsung" },
    { name: "Amazon", src: "https://cdn.simpleicons.org/amazon" },
    { name: "Puma", src: "https://cdn.simpleicons.org/puma" },
    { name: "TEDx", src: "https://cdn.simpleicons.org/ted" },
  ];

  return (
    <section className="bg-[#e9e6dc] text-black py-10 border-y-[6px] border-dotted border-[#111] overflow-hidden">
      <div className="container mx-auto max-w-7xl px-6">
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
              className="flex items-center justify-around gap-12 md:gap-20 px-6 md:px-10 w-max"
            >
              {brands.map((brand, i) => (
                <div 
                  key={`${setIndex}-${i}`} 
                  className="flex-none group/logo"
                >
                  <div className="w-16 sm:w-20 md:w-24 h-8 sm:h-10 md:h-12 relative flex items-center justify-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ease-out cursor-pointer">
                    <img 
                      src={brand.src} 
                      alt={brand.name} 
                      className="max-w-full max-h-full object-contain mix-blend-multiply"
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
          animation: marquee 35s linear infinite;
        }
      `}} />
    </section>
  );
}
