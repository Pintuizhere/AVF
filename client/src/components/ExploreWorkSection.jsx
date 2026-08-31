"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";

export default function ExploreWorkSection() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [workItems, setWorkItems] = useState([]);
  const [categories, setCategories] = useState(["ALL"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/projects`);
        if (res.ok) {
          const data = await res.json();
          setWorkItems(data);
          
          // Extract unique categories
          const uniqueCats = ["ALL", ...new Set(data.map(item => item.category))];
          setCategories(uniqueCats);
        }
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  const filteredWork = activeTab === "ALL" ? workItems : workItems.filter(w => w.category === activeTab);

  return (
    <section className="relative bg-[#050505] text-white pt-16 md:pt-24 pb-16 md:pb-32 px-6 overflow-hidden">
      <div className="container mx-auto max-w-5xl flex flex-col items-center z-10 relative">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="font-script text-gold text-3xl mb-2">Let&apos;s Work</span>
          <h2 className="text-5xl md:text-6xl font-bebas uppercase tracking-wider text-white">
            EXPLORE OUR WORK
          </h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-6 mb-16 w-full max-w-5xl border-b border-[#222] pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 transition-all rounded-full ${
                activeTab === cat
                  ? "bg-gold text-black shadow-[0_0_15px_rgba(252,166,3,0.3)]"
                  : "text-neutral-500 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="w-full min-h-[300px] flex flex-col items-center">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-gold animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {filteredWork.slice(0, 6).map((item) => (
                <Link 
                  href={`/our-work/${item.slug || item._id}`} 
                  key={item._id} 
                  className="relative group w-full aspect-[4/3] p-2 bg-[#131313] cursor-pointer border border-neutral-800 rounded-sm flex flex-col justify-center shadow-[0_5px_20px_rgba(0,0,0,0.8)] hover:border-neutral-600 transition-colors duration-500"
                >
                  {/* Inner Frame */}
                  <div className="relative w-full h-full rounded-sm overflow-hidden bg-black border border-[#222] group-hover:border-neutral-700 transition-colors duration-500">
                    <Image
                      src={item.mediaUrl || "/images/services-bg.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-100 grayscale-[30%] group-hover:grayscale-0"
                    />
                    
                    {/* Gradient Overlay for Text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                    
                    {/* Text Content & Icon */}
                    <div className="absolute bottom-0 left-0 w-full p-4 md:p-5 flex items-end justify-between translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                      
                      {/* Left Side: Category and Title */}
                      <div className="flex flex-col gap-1 pr-4">
                        <span className="text-gold text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase">
                          {item.category} / {item.year || '2024'}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bebas tracking-wide text-white uppercase leading-[0.9] group-hover:text-gold transition-colors duration-500">
                          {item.title}
                        </h3>
                      </div>

                      {/* Right Side: Arrow Icon */}
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shrink-0 group-hover:bg-gold transition-colors duration-500 shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                        <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-black stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filteredWork.length === 0 && (
            <div className="w-full text-center py-20 text-neutral-500 font-mono text-sm uppercase">
               No projects found in this category.
            </div>
          )}

          {/* View All Work Button */}
          {!loading && filteredWork.length > 0 && (
            <div className="mt-16 flex justify-center w-full">
              <Link 
                href="/our-work"
                className="bg-gold text-black px-8 py-4 font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors flex items-center gap-3"
              >
                View All Work
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
