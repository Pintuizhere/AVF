"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, Clapperboard, Film, Users, Globe } from "lucide-react";

export default function AboutStorySection() {
  const [stats, setStats] = useState({
    stat1_num: "7", stat1_label: "Years Of Experience",
    stat2_num: "250", stat2_label: "Projects Completed",
    stat3_num: "150", stat3_label: "Happy Clients",
    stat4_num: "10", stat4_label: "Industries Served",
  });

  useEffect(() => {
    const loadStats = () => {
      const storedAbout = localStorage.getItem("avf_about_stats");
      if (storedAbout) {
        setStats(JSON.parse(storedAbout));
      }
    };
    
    loadStats();
    window.addEventListener("storage", loadStats);
    return () => window.removeEventListener("storage", loadStats);
  }, []);

  return (
    <section id="story" className="relative bg-[#f5f0e6] text-black py-20 lg:py-32 px-4 md:px-6 border-y-[6px] border-dotted border-[#111] overflow-hidden w-full">
      
      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Scattered Photos / Polaroids */}
        <div className="relative h-[350px] md:h-[500px] w-full flex items-center justify-center">
          {/* Back photo */}
          <div className="absolute top-4 md:top-10 left-4 md:left-10 w-48 md:w-64 aspect-[4/5] bg-white p-2 md:p-4 pb-12 md:pb-16 shadow-xl -rotate-12 flex flex-col grayscale opacity-80 border border-neutral-200">
            <div className="flex-1 bg-neutral-200 flex items-center justify-center border border-neutral-300">
               <ImageIcon className="w-8 h-8 md:w-12 md:h-12 text-neutral-400" />
            </div>
          </div>
          
          {/* Main front photo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-80 aspect-square bg-white p-2 md:p-4 pb-16 md:pb-20 shadow-2xl rotate-3 border border-neutral-200 z-10">
            <div className="w-full h-full bg-neutral-900 flex items-center justify-center rounded-sm overflow-hidden relative border-4 border-black/10 shadow-inner">
               <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(0,0,0,0.8)_100%)] z-10" />
               {/* Simulating a lens center in the photo */}
               <div className="w-32 h-32 rounded-full border-[12px] border-neutral-800 flex items-center justify-center bg-black relative z-0">
                  <div className="w-16 h-16 rounded-full border-4 border-neutral-600 bg-neutral-900" />
               </div>
            </div>
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 font-script text-lg md:text-2xl text-neutral-800 -rotate-2">
              AVF - Behind every frame
            </div>
            <div className="absolute bottom-1 right-4 md:right-6 font-script text-lg md:text-2xl text-neutral-800 -rotate-2">
              is a vision
            </div>
          </div>
          
          {/* Tape elements for realism */}
          <div className="absolute top-1/4 left-1/4 w-16 h-6 bg-white/40 backdrop-blur-sm -rotate-45 shadow-sm" />
          <div className="absolute bottom-1/4 right-1/4 w-12 h-4 bg-white/40 backdrop-blur-sm rotate-12 shadow-sm z-20" />
        </div>

        {/* Right: Text Content */}
        <div className="flex flex-col items-start z-10 w-full mt-8 lg:mt-0">
          <span className="font-script text-gold text-2xl md:text-3xl mb-2 font-bold">Our Story</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight mb-6">
            The Journey Behind AVF
          </h2>
          <p className="text-neutral-800 leading-relaxed mb-10 text-sm max-w-lg font-medium">
            AVF Productions began with a simple belief—every
            brand, every person and every moment has a story worth telling.
            What started as a passion project has grown into a full-scale
            production house trusted by clients across industries.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 w-full border border-neutral-300/60 bg-white/30 backdrop-blur-sm rounded-sm">
            {/* Stat 1 */}
            <div className="flex flex-col items-center justify-center p-6 border-r border-b md:border-b-0 border-neutral-300/60 hover:bg-white/50 transition-colors">
              <Clapperboard className="w-8 h-8 text-gold mb-3 stroke-[1.5]" />
              <span className="text-2xl font-black text-black">{stats.stat1_num}+</span>
              <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest text-center mt-1 whitespace-pre-wrap leading-tight">{stats.stat1_label.replace(' ', '\n')}</span>
            </div>
            {/* Stat 2 */}
            <div className="flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-neutral-300/60 hover:bg-white/50 transition-colors">
              <Film className="w-8 h-8 text-gold mb-3 stroke-[1.5]" />
              <span className="text-2xl font-black text-black">{stats.stat2_num}+</span>
              <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest text-center mt-1 whitespace-pre-wrap leading-tight">{stats.stat2_label.replace(' ', '\n')}</span>
            </div>
            {/* Stat 3 */}
            <div className="flex flex-col items-center justify-center p-6 border-r border-neutral-300/60 hover:bg-white/50 transition-colors">
              <Users className="w-8 h-8 text-gold mb-3 stroke-[1.5]" />
              <span className="text-2xl font-black text-black">{stats.stat3_num}+</span>
              <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest text-center mt-1 whitespace-pre-wrap leading-tight">{stats.stat3_label.replace(' ', '\n')}</span>
            </div>
            {/* Stat 4 */}
            <div className="flex flex-col items-center justify-center p-6 hover:bg-white/50 transition-colors">
              <Globe className="w-8 h-8 text-gold mb-3 stroke-[1.5]" />
              <span className="text-2xl font-black text-black">{stats.stat4_num}+</span>
              <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest text-center mt-1 whitespace-pre-wrap leading-tight">{stats.stat4_label.replace(' ', '\n')}</span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
