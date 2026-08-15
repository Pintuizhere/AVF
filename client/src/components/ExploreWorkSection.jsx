"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";

export default function ExploreWorkSection() {
  const [activeTab, setActiveTab] = useState("ALL");

  const categories = [
    "ALL", "DOCUMENTARIES", "EVENTS", "COMMERCIALS", "PRODUCTS", "FOOD", "MODEL", "JEWELLERY", "REELS"
  ];

  const workItems = [
    { id: 1, title: "Documentaries", category: "DOCUMENTARIES", image: "/images/service-doc.jpg" },
    { id: 2, title: "Events", category: "EVENTS", image: "/images/bts-photo.jpg" },
    { id: 3, title: "Commercials", category: "COMMERCIALS", image: "/images/hero-bg.jpg" },
    { id: 4, title: "Products", category: "PRODUCTS", image: "/images/service-product.jpg" },
    { id: 5, title: "Food", category: "FOOD", image: "/images/service-food.jpg" },
    { id: 6, title: "Model", category: "MODEL", image: "/images/director.jpg" },
    { id: 7, title: "Jewellery", category: "JEWELLERY", image: "/images/services-bg.jpg" },
    { id: 8, title: "Reels", category: "REELS", image: "/images/about-hero-bg.jpg" },
  ];

  const filteredWork = activeTab === "ALL" ? workItems : workItems.filter(w => w.category === activeTab);

  return (
    <section className="relative bg-[#050505] text-white pt-32 pb-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-[1400px] flex flex-col items-center z-10 relative">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="font-script text-gold text-3xl mb-2">Let&apos;s Work</span>
          <h2 className="text-4xl md:text-5xl font-bebas uppercase tracking-wider text-white">
            Explore Our Work
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-16 w-full max-w-4xl border-b border-[#222] pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`text-[9px] font-bold tracking-[0.2em] uppercase px-4 py-2 transition-all ${
                activeTab === cat
                  ? "bg-gold text-black shadow-[0_0_10px_rgba(252,166,3,0.5)]"
                  : "text-neutral-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid wrapper with arrows */}
        <div className="relative w-full flex items-center">
          
          <button className="hidden md:flex absolute left-[-40px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-neutral-700 bg-black/50 items-center justify-center text-gold hover:bg-gold hover:text-black transition-colors z-20">
             <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Film Strip Gallery */}
          <div className="w-full overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-1 gap-y-4 w-full">
              {filteredWork.map((item) => (
                <div key={item.id} className="flex flex-col w-full group cursor-pointer relative bg-[#111]">
                  
                  {/* Top Film Holes */}
                  <div className="h-6 w-full flex items-center justify-around px-2 border-b border-[#222]">
                    {[...Array(8)].map((_, i) => (
                      <div key={`th-${i}`} className="w-2 h-3 bg-black rounded-sm border border-neutral-800" />
                    ))}
                  </div>

                  {/* Thumbnail Image Container */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black px-1 py-1">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                      
                      {/* Play Button */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-gold bg-black/50 backdrop-blur-sm flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(252,166,3,0.3)]">
                        <Play className="w-4 h-4 ml-1 fill-current" />
                      </div>
                    </div>
                  </div>

                  {/* Bottom Film Holes */}
                  <div className="h-6 w-full flex items-center justify-around px-2 border-t border-[#222]">
                    {[...Array(8)].map((_, i) => (
                      <div key={`bh-${i}`} className="w-2 h-3 bg-black rounded-sm border border-neutral-800" />
                    ))}
                  </div>

                  {/* Title Bar below film strip */}
                  <div className="py-3 flex justify-center bg-black w-full">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest group-hover:text-white transition-colors">
                      {item.title}
                    </span>
                  </div>

                </div>
              ))}
              {filteredWork.length === 0 && (
                <div className="col-span-full text-center py-20 text-neutral-500 font-mono text-sm">
                   NO REELS FOUND IN THIS CATEGORY.
                </div>
              )}
            </div>
          </div>

          <button className="hidden md:flex absolute right-[-40px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-neutral-700 bg-black/50 items-center justify-center text-gold hover:bg-gold hover:text-black transition-colors z-20">
             <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
