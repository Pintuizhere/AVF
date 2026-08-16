"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";

export default function WorkCategoryRow({ 
  icon, 
  title, 
  description, 
  projects 
}) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="border-b border-neutral-900 bg-black">
      <div className="container mx-auto px-6 md:px-12 py-12 flex flex-col lg:flex-row gap-8 lg:gap-12">
        
        {/* Left Side: Category Info */}
        <div className="w-full lg:w-1/4 flex flex-col items-start gap-4 shrink-0">
          <div className="p-3 border border-neutral-800 rounded-md bg-neutral-950 text-gold mb-2">
            {icon}
          </div>
          
          <h3 className="text-2xl font-bebas tracking-wider uppercase text-white">
            {title}
          </h3>
          
          <p className="text-xs text-neutral-400 leading-relaxed font-medium pr-4">
            {description}
          </p>
          
          <Link 
            href={`/our-work#${title.toLowerCase()}`}
            className="mt-4 text-gold text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 group hover:text-white transition-colors"
          >
            VIEW MORE
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>

        {/* Right Side: Projects Scroll */}
        <div className="w-full lg:w-3/4 relative flex items-center">
          
          {/* Scroll Left Button */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 z-10 -ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/80 border border-neutral-800 text-neutral-400 hover:text-white hover:border-gold hover:bg-black transition-all"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex w-full overflow-x-auto gap-6 scrollbar-hide py-4 px-6 snap-x snap-mandatory"
          >
            
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="relative group w-[240px] md:w-[280px] shrink-0 aspect-[16/10] rounded-sm overflow-hidden bg-neutral-900 cursor-pointer snap-start border border-neutral-800"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                
                {/* Gradient Overlay for Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                
                {/* Title & Play Icon */}
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-3">
                  {/* Small Play Button */}
                  <div className="w-5 h-5 rounded-full border border-gold flex items-center justify-center shrink-0">
                    <Play className="w-2 h-2 text-gold fill-current ml-[1px]" />
                  </div>
                  <h4 className="text-xs font-bold text-neutral-200 tracking-wide truncate group-hover:text-gold transition-colors">
                    {project.title}
                  </h4>
                </div>
              </div>
            ))}
            
            {/* View More Circle at end of list */}
            <div className="relative group w-[120px] shrink-0 flex flex-col items-center justify-center gap-4 cursor-pointer snap-start">
              <div className="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 group-hover:border-gold group-hover:text-gold transition-colors">
                <ChevronRight className="w-5 h-5 stroke-[1.5]" />
              </div>
              <span className="text-[10px] font-bold text-gold tracking-widest uppercase group-hover:text-white transition-colors">
                VIEW MORE →
              </span>
            </div>
          </div>

          {/* Scroll Right Button */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 z-10 -mr-4 w-8 h-8 flex items-center justify-center rounded-full bg-gold text-black hover:bg-white transition-all shadow-[0_0_15px_rgba(252,166,3,0.3)]"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          
        </div>
      </div>
    </div>
  );
}
