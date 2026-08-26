"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function WorkCategoryRow({ title, projects }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  const totalPages = Math.ceil((projects?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = projects?.slice(startIndex, startIndex + itemsPerPage) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="border-b border-neutral-900 bg-black">
      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {currentProjects.map((project, index) => {
            // Generate a simple slug from the title if it doesn't exist
            const slug = project.slug || project.title.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link 
                href={`/our-work/${slug}`}
                key={index} 
                className="relative group w-full aspect-[4/3] p-2 md:p-3 bg-[#131313] cursor-pointer border border-neutral-800 rounded-sm flex flex-col justify-center shadow-[0_5px_20px_rgba(0,0,0,0.8)] hover:border-neutral-600 transition-colors duration-500"
              >
                {/* Film Strip Holes Top */}
                <div 
                  className="absolute top-1 md:top-1.5 left-0 right-0 h-2 md:h-2.5 w-full opacity-100"
                  style={{ 
                    backgroundImage: "radial-gradient(circle, #000 2.5px, transparent 3px)", 
                    backgroundSize: "14px 100%",
                    backgroundPosition: "center"
                  }}
                />
                
                {/* Film Strip Holes Bottom */}
                <div 
                  className="absolute bottom-1 md:bottom-1.5 left-0 right-0 h-2 md:h-2.5 w-full opacity-100"
                  style={{ 
                    backgroundImage: "radial-gradient(circle, #000 2.5px, transparent 3px)", 
                    backgroundSize: "14px 100%",
                    backgroundPosition: "center"
                  }}
                />

                {/* Inner Frame */}
                <div className="relative w-full h-full rounded-sm overflow-hidden bg-black border border-[#222] mt-2 mb-2 group-hover:border-neutral-700 transition-colors duration-500">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale-[30%] group-hover:grayscale-0"
                  />
                  
                  {/* Gradient Overlay for Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Text Content & Icon */}
                  <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    
                    {/* Left Side: Category and Title */}
                    <div className="flex flex-col gap-1 md:gap-1.5 pr-4">
                      <span className="text-gold text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase">
                        {project.categoryTitle || title || 'PROJECT'} / 2024
                      </span>
                      <h3 className="text-[26px] md:text-[32px] font-bebas tracking-wide text-white uppercase leading-[0.9] group-hover:text-gold transition-colors duration-500">
                        {project.title}
                      </h3>
                    </div>

                    {/* Right Side: Arrow Icon */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors duration-500 shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-black stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-2">
            <button 
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-gold disabled:opacity-50 disabled:hover:border-neutral-800 disabled:hover:text-neutral-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 px-2 md:px-4">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                    currentPage === i + 1 
                      ? "bg-gold text-black shadow-[0_0_15px_rgba(252,166,3,0.3)] border border-gold" 
                      : "border border-neutral-800 text-neutral-400 hover:border-gold hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button 
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-gold disabled:opacity-50 disabled:hover:border-neutral-800 disabled:hover:text-neutral-400 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
