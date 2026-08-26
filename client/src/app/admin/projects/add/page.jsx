"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, UploadCloud, ChevronLeft, ChevronRight, Settings2 } from "lucide-react";

const CATEGORIES = [
  "DOCUMENTARIES", "EVENTS", "COMMERCIALS", "PRODUCTS", 
  "FOOD", "MODEL PHOTOGRAPHY", "JEWELLERY", "REELS"
];

export default function AdminAddProjectWYSIWYG() {
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    category: "PHOTOGRAPHY",
    year: new Date().getFullYear().toString(),
    brief: "",
    iso: "800",
    aperture: "2.8",
    fps: "24"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Resize textarea automatically
  const handleTextareaChange = (e) => {
    handleInputChange(e);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-gold selection:text-black">
      
      {/* Floating Action Bar (Admin Controls) */}
      <div className="sticky top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a1a1a] p-4 flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="w-10 h-10 rounded-full bg-[#111] border border-[#222] flex items-center justify-center text-neutral-400 hover:text-white hover:border-gold transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="hidden md:flex flex-col">
            <span className="text-xs text-gold font-bold uppercase tracking-widest">Live Editor</span>
            <span className="text-sm font-bold text-white">Add New Project</span>
          </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-gold hover:bg-gold/90 text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors shadow-[0_0_15px_rgba(252,166,3,0.3)] hover:shadow-[0_0_20px_rgba(252,166,3,0.5)]">
          <Save className="w-4 h-4 stroke-[2]" /> Publish Project
        </button>
      </div>

      {/* Main Preview Area */}
      <div className="relative w-full max-w-screen-2xl mx-auto pb-32 overflow-hidden">
        
        {/* Camera Metadata Pill (Top Center) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#111] border border-[#222] border-t-0 rounded-b-xl px-6 py-2 flex items-center gap-4 text-[10px] font-mono text-neutral-500 shadow-xl z-10 group">
          <Settings2 className="w-3 h-3 text-gold absolute -left-6 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-2">
            <span>ISO</span>
            <input type="text" name="iso" value={formData.iso} onChange={handleInputChange} className="w-10 bg-transparent text-white focus:outline-none focus:text-gold text-center border-b border-transparent focus:border-gold/50" />
          </div>
          <span className="text-[#333]">-</span>
          <div className="flex items-center gap-2">
            <span>F/</span>
            <input type="text" name="aperture" value={formData.aperture} onChange={handleInputChange} className="w-8 bg-transparent text-white focus:outline-none focus:text-gold text-center border-b border-transparent focus:border-gold/50" />
          </div>
          <span className="text-[#333]">-</span>
          <div className="flex items-center gap-2">
            <input type="text" name="fps" value={formData.fps} onChange={handleInputChange} className="w-6 bg-transparent text-white focus:outline-none focus:text-gold text-center border-b border-transparent focus:border-gold/50" />
            <span>FPS</span>
          </div>
        </div>

        {/* 1. Header & Metadata Section */}
        <section className="container mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-8 md:pb-12 relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
            
            {/* Main Title Area */}
            <div className="flex flex-col max-w-4xl w-full group relative">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6 opacity-80 hover:opacity-100 transition-opacity">
                <div className="h-[2px] w-8 md:w-12 bg-gold" />
                <div className="flex items-center gap-2 text-[9px] md:text-xs font-bold tracking-[0.3em] uppercase text-gold">
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="bg-transparent appearance-none focus:outline-none focus:text-white border-b border-transparent focus:border-gold/50 cursor-pointer"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat} className="bg-black text-white">{cat}</option>
                    ))}
                  </select>
                  <span>—</span>
                  <input 
                    type="text" 
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-12 bg-transparent focus:outline-none focus:text-white border-b border-transparent focus:border-gold/50" 
                  />
                </div>
              </div>
              
              {/* Massive Title Input */}
              <textarea
                name="title"
                value={formData.title}
                onChange={handleTextareaChange}
                placeholder="ENTER PROJECT TITLE"
                rows={2}
                className="w-full bg-transparent border-none text-5xl sm:text-6xl md:text-8xl lg:text-[110px] font-bebas tracking-wide uppercase leading-[0.85] text-white focus:outline-none focus:ring-0 resize-none placeholder:text-neutral-800"
              />
              <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                <div className="w-1.5 h-16 bg-gold rounded-full" />
              </div>
            </div>

            {/* Minimal Metadata Grid (Client) */}
            <div className="flex flex-col gap-1 shrink-0 w-full md:w-auto border-t md:border-t-0 border-neutral-900 pt-8 md:pt-0 group relative">
              <span className="text-[9px] text-neutral-500 font-bold tracking-widest uppercase">Client</span>
              <input 
                type="text"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                placeholder="CLIENT NAME"
                className="bg-transparent border-none text-sm md:text-base font-bold uppercase text-white focus:outline-none focus:text-gold placeholder:text-neutral-700 w-full md:w-48"
              />
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                <div className="w-1.5 h-6 bg-gold rounded-full" />
              </div>
            </div>

          </div>
        </section>

        {/* 2. Massive Image Section (Viewfinder Card Style) */}
        <section className="container mx-auto px-4 sm:px-6 md:px-12 pb-16 md:pb-32">
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] p-3 md:p-6 bg-[#0a0a0a] flex flex-col justify-center shadow-[0_10px_40px_rgba(0,0,0,0.8)] group cursor-pointer hover:bg-[#0f0f0f] transition-colors border border-transparent hover:border-[#222]">
            
            {/* 4 Viewfinder Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 md:w-16 md:h-16 border-t-[1.5px] border-l-[1.5px] border-gold transition-all duration-700 opacity-50 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:-translate-y-1" />
            <div className="absolute top-0 right-0 w-8 h-8 md:w-16 md:h-16 border-t-[1.5px] border-r-[1.5px] border-gold transition-all duration-700 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
            <div className="absolute bottom-0 left-0 w-8 h-8 md:w-16 md:h-16 border-b-[1.5px] border-l-[1.5px] border-gold transition-all duration-700 opacity-50 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:translate-y-1" />
            <div className="absolute bottom-0 right-0 w-8 h-8 md:w-16 md:h-16 border-b-[1.5px] border-r-[1.5px] border-gold transition-all duration-700 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1" />

            {/* Inner Frame - Upload Zone */}
            <div className="relative w-full h-full overflow-hidden bg-black border border-[#222] flex flex-col items-center justify-center border-dashed group-hover:border-gold/50 transition-colors">
              
              <div className="flex flex-col items-center gap-4 z-10 p-8 text-center bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 group-hover:border-gold/20 transition-all">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(252,166,3,0.2)]">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xl font-bold text-white uppercase tracking-wider">Upload Master Image</span>
                  <span className="text-xs text-neutral-400 font-mono">Drag and drop, or click to browse</span>
                </div>
              </div>

              {/* Fake Navigation Arrows just for visual aesthetic of the gallery */}
              <div className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-neutral-600 opacity-30">
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 stroke-[1.5]" />
              </div>
              <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-neutral-600 opacity-30">
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 stroke-[1.5]" />
              </div>

              {/* Fake Pagination Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-30">
                <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                <div className="w-2 h-2 rounded-full bg-neutral-600" />
                <div className="w-2 h-2 rounded-full bg-neutral-600" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Project Overview Section */}
        <section className="pt-12 pb-6 md:py-32 container mx-auto px-6 md:px-12 border-t border-neutral-900 group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 relative">
            
            <div className="lg:col-span-4 flex flex-col">
              <div className="sticky top-32">
                <span className="text-gold text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
                  Overview
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas tracking-wide uppercase text-white mb-8">
                  About The Project<span className="text-gold">.</span>
                </h2>
                <div className="w-16 h-[1px] bg-gold" />
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col relative">
              <div className="absolute -left-8 top-0 h-full w-1 bg-gold rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity hidden lg:block" />
              
              <textarea
                name="brief"
                value={formData.brief}
                onChange={handleTextareaChange}
                placeholder="Start writing the project overview..."
                rows={4}
                className="w-full bg-transparent border-none text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-300 leading-[1.8] md:leading-[1.9] font-light max-w-4xl focus:outline-none focus:text-white resize-none placeholder:text-neutral-700"
              />
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
