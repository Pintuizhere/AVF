"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function WorkGridContainer({ customCategories = [], projects = [] }) {
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const categories = [
    { id: "all", label: "All Work" },
    ...customCategories.map(cat => ({
      id: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      label: cat,
      original: cat
    }))
  ];

  // Filter projects based on active tab
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => {
        const catId = p.category?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        return catId === activeTab;
      });

  const totalPages = Math.ceil((filteredProjects?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects?.slice(startIndex, startIndex + itemsPerPage) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to the top of the grid
    const element = document.getElementById("work-grid");
    if (element) {
      const offset = 100; // Adjust based on your header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleTabChange = (catId) => {
    setActiveTab(catId);
    setCurrentPage(1); // Reset to first page when filtering
  };

  return (
    <div className="flex flex-col" id="all-work">
      {/* Category Navigation */}
      <div className="w-full bg-[#f5f0e6] z-30 relative pt-1 pb-1">
        <div className="w-full border-y-[6px] border-dotted border-[#111] py-8">
          <div className="container mx-auto px-6 max-w-[1400px]">
            <div className="flex items-center justify-start xl:justify-center gap-8 md:gap-12 overflow-x-auto scrollbar-hide whitespace-nowrap pb-2 pt-2 -mx-6 px-6 xl:mx-0 xl:px-0">
              {categories.map((cat) => (
                <button 
                  key={cat.id} 
                  onClick={() => handleTabChange(cat.id)}
                  className={`font-montserrat text-[10px] md:text-[11px] tracking-[0.2em] font-bold uppercase transition-all duration-300 flex-shrink-0 ${
                    activeTab === cat.id 
                      ? 'bg-[#FCA603] text-black px-6 py-2.5 rounded-full shadow-[0_4px_10px_rgba(252,166,3,0.3)] hover:shadow-[0_6px_15px_rgba(252,166,3,0.5)] hover:-translate-y-0.5'
                      : 'text-neutral-800 hover:text-black hover:-translate-y-0.5'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="border-b border-neutral-900 bg-black min-h-screen pb-24 pt-16" id="work-grid">
        <div className="container mx-auto px-6 md:px-12">
          {filteredProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {currentProjects.map((project, index) => {
                  const identifier = project.slug || project._id;
                  return (
                    <Link 
                      href={`/our-work/${identifier}`}
                      key={index} 
                      className="relative group w-full aspect-[4/3] p-2 md:p-3 bg-[#131313] cursor-pointer border border-neutral-800 rounded-sm flex flex-col justify-center shadow-[0_5px_20px_rgba(0,0,0,0.8)] hover:border-neutral-600 transition-colors duration-500"
                    >
                      {/* Inner Frame */}
                      <div className="relative w-full h-full rounded-sm overflow-hidden bg-black border border-[#222] group-hover:border-neutral-700 transition-colors duration-500">
                        <Image
                          src={project.image || project.mediaUrl}
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
                              {project.category || project.categoryTitle || 'PROJECT'} / {project.year || "2024"}
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
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-gold disabled:opacity-50 disabled:hover:border-neutral-800 disabled:hover:text-neutral-400 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center gap-2 px-2 md:px-4">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
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
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-gold disabled:opacity-50 disabled:hover:border-neutral-800 disabled:hover:text-neutral-400 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-32 flex justify-center text-neutral-500">
              No projects found. Add some from the admin dashboard!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
