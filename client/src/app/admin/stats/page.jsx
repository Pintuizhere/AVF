"use client";

import { useState, useEffect } from "react";
import { Save, Film, Target, Users, Clock, Globe, Clapperboard } from "lucide-react";

export default function AdminStatsPage() {
  const [homeStats, setHomeStats] = useState({
    stat1_num: "150", stat1_label: "Projects",
    stat2_num: "10", stat2_label: "Years Experience",
    stat3_num: "50", stat3_label: "Creative Team",
    stat4_num: "5000", stat4_label: "Hours of Footage",
  });

  const [aboutStats, setAboutStats] = useState({
    stat1_num: "7", stat1_label: "Years Of Experience",
    stat2_num: "250", stat2_label: "Projects Completed",
    stat3_num: "150", stat3_label: "Happy Clients",
    stat4_num: "10", stat4_label: "Industries Served",
  });

  const [isSaving, setIsSaving] = useState(false);

  // Sync with localStorage on mount
  useEffect(() => {
    const storedHome = localStorage.getItem("avf_home_stats");
    if (storedHome) setHomeStats(JSON.parse(storedHome));

    const storedAbout = localStorage.getItem("avf_about_stats");
    if (storedAbout) setAboutStats(JSON.parse(storedAbout));
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    localStorage.setItem("avf_home_stats", JSON.stringify(homeStats));
    localStorage.setItem("avf_about_stats", JSON.stringify(aboutStats));
    
    // Dispatch an event so the frontend components know to update instantly
    window.dispatchEvent(new Event('storage'));

    setTimeout(() => setIsSaving(false), 500);
  };

  return (
    <div className="flex flex-col gap-10 pb-12">
      
      {/* Floating Action Bar */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Manage Statistics</h1>
          <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Update the numbers and labels across the website.</p>
        </div>
        <button 
          onClick={handleSave}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gold hover:bg-gold/90 text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors shadow-[0_0_15px_rgba(252,166,3,0.3)]"
        >
          <Save className="w-4 h-4 stroke-[2]" /> {isSaving ? "Saved!" : "Save All Changes"}
        </button>
      </div>

      {/* HOMEPAGE STATS SECTION */}
      <section className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="bg-[#111] p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-bebas uppercase tracking-widest text-white">Homepage Statistics</h2>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold uppercase text-neutral-400 tracking-wider">Animated Strip</span>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Item 1 */}
          <div className="flex flex-col gap-3 p-4 bg-black rounded-lg border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center mb-2">
               <Film className="w-4 h-4 text-gold" />
            </div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Target Number</label>
            <input 
              type="text" 
              value={homeStats.stat1_num}
              onChange={(e) => setHomeStats({...homeStats, stat1_num: e.target.value})}
              className="bg-[#111] border border-[#222] text-white text-xl font-bold rounded-md px-3 py-2 focus:outline-none focus:border-gold/50"
            />
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-2">Label Text</label>
            <input 
              type="text" 
              value={homeStats.stat1_label}
              onChange={(e) => setHomeStats({...homeStats, stat1_label: e.target.value})}
              className="bg-[#111] border border-[#222] text-neutral-400 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-gold/50 uppercase tracking-widest font-bold"
            />
          </div>

          {/* Item 2 */}
          <div className="flex flex-col gap-3 p-4 bg-black rounded-lg border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center mb-2">
               <Target className="w-4 h-4 text-gold" />
            </div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Target Number</label>
            <input 
              type="text" 
              value={homeStats.stat2_num}
              onChange={(e) => setHomeStats({...homeStats, stat2_num: e.target.value})}
              className="bg-[#111] border border-[#222] text-white text-xl font-bold rounded-md px-3 py-2 focus:outline-none focus:border-gold/50"
            />
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-2">Label Text</label>
            <input 
              type="text" 
              value={homeStats.stat2_label}
              onChange={(e) => setHomeStats({...homeStats, stat2_label: e.target.value})}
              className="bg-[#111] border border-[#222] text-neutral-400 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-gold/50 uppercase tracking-widest font-bold"
            />
          </div>

          {/* Item 3 */}
          <div className="flex flex-col gap-3 p-4 bg-black rounded-lg border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center mb-2">
               <Users className="w-4 h-4 text-gold" />
            </div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Target Number</label>
            <input 
              type="text" 
              value={homeStats.stat3_num}
              onChange={(e) => setHomeStats({...homeStats, stat3_num: e.target.value})}
              className="bg-[#111] border border-[#222] text-white text-xl font-bold rounded-md px-3 py-2 focus:outline-none focus:border-gold/50"
            />
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-2">Label Text</label>
            <input 
              type="text" 
              value={homeStats.stat3_label}
              onChange={(e) => setHomeStats({...homeStats, stat3_label: e.target.value})}
              className="bg-[#111] border border-[#222] text-neutral-400 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-gold/50 uppercase tracking-widest font-bold"
            />
          </div>

          {/* Item 4 */}
          <div className="flex flex-col gap-3 p-4 bg-black rounded-lg border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center mb-2">
               <Clock className="w-4 h-4 text-gold" />
            </div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Target Number</label>
            <input 
              type="text" 
              value={homeStats.stat4_num}
              onChange={(e) => setHomeStats({...homeStats, stat4_num: e.target.value})}
              className="bg-[#111] border border-[#222] text-white text-xl font-bold rounded-md px-3 py-2 focus:outline-none focus:border-gold/50"
            />
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-2">Label Text</label>
            <input 
              type="text" 
              value={homeStats.stat4_label}
              onChange={(e) => setHomeStats({...homeStats, stat4_label: e.target.value})}
              className="bg-[#111] border border-[#222] text-neutral-400 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-gold/50 uppercase tracking-widest font-bold"
            />
          </div>
        </div>

        {/* Live Preview (Homepage Style) */}
        <div className="p-6 border-t border-white/5 bg-black overflow-x-auto">
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Live Homepage Preview</p>
          <div className="w-full bg-[#e9e6dc] text-black border-y-[4px] border-dotted border-[#111] py-8 rounded shadow-lg min-w-[800px]">
             <div className="grid grid-cols-4 gap-4 divide-x divide-black/20">
                <div className="flex items-center justify-center gap-4 px-4">
                  <Film className="w-10 h-10 text-black stroke-[1.5]" />
                  <div className="flex flex-col">
                    <h4 className="text-3xl font-black leading-none tracking-tight">{homeStats.stat1_num}+</h4>
                    <p className="text-[10px] font-bold tracking-[0.15em] text-black/60 mt-1.5 uppercase">{homeStats.stat1_label}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 px-4">
                  <Target className="w-10 h-10 text-black stroke-[1.5]" />
                  <div className="flex flex-col">
                    <h4 className="text-3xl font-black leading-none tracking-tight">{homeStats.stat2_num}+</h4>
                    <p className="text-[10px] font-bold tracking-[0.15em] text-black/60 mt-1.5 uppercase">{homeStats.stat2_label}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 px-4">
                  <Users className="w-10 h-10 text-black stroke-[1.5]" />
                  <div className="flex flex-col">
                    <h4 className="text-3xl font-black leading-none tracking-tight">{homeStats.stat3_num}+</h4>
                    <p className="text-[10px] font-bold tracking-[0.15em] text-black/60 mt-1.5 uppercase">{homeStats.stat3_label}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 px-4">
                  <Clock className="w-10 h-10 text-black stroke-[1.5]" />
                  <div className="flex flex-col">
                    <h4 className="text-3xl font-black leading-none tracking-tight">{homeStats.stat4_num}+</h4>
                    <p className="text-[10px] font-bold tracking-[0.15em] text-black/60 mt-1.5 uppercase">{homeStats.stat4_label}</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ABOUT PAGE STATS SECTION */}
      <section className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="bg-[#111] p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-bebas uppercase tracking-widest text-gold">About Page Statistics</h2>
          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold uppercase text-neutral-400 tracking-wider">Cream Grid Panel</span>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Item 1 */}
          <div className="flex flex-col gap-3 p-4 bg-black rounded-lg border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center mb-2">
               <Clapperboard className="w-4 h-4 text-gold" />
            </div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Number String</label>
            <input 
              type="text" 
              value={aboutStats.stat1_num}
              onChange={(e) => setAboutStats({...aboutStats, stat1_num: e.target.value})}
              className="bg-[#111] border border-[#222] text-white text-xl font-bold rounded-md px-3 py-2 focus:outline-none focus:border-gold/50"
            />
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-2">Label Text</label>
            <textarea 
              value={aboutStats.stat1_label}
              onChange={(e) => setAboutStats({...aboutStats, stat1_label: e.target.value})}
              className="bg-[#111] border border-[#222] text-neutral-400 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-gold/50 uppercase tracking-widest font-bold resize-none h-16"
            />
          </div>

          {/* Item 2 */}
          <div className="flex flex-col gap-3 p-4 bg-black rounded-lg border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center mb-2">
               <Film className="w-4 h-4 text-gold" />
            </div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Number String</label>
            <input 
              type="text" 
              value={aboutStats.stat2_num}
              onChange={(e) => setAboutStats({...aboutStats, stat2_num: e.target.value})}
              className="bg-[#111] border border-[#222] text-white text-xl font-bold rounded-md px-3 py-2 focus:outline-none focus:border-gold/50"
            />
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-2">Label Text</label>
            <textarea 
              value={aboutStats.stat2_label}
              onChange={(e) => setAboutStats({...aboutStats, stat2_label: e.target.value})}
              className="bg-[#111] border border-[#222] text-neutral-400 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-gold/50 uppercase tracking-widest font-bold resize-none h-16"
            />
          </div>

          {/* Item 3 */}
          <div className="flex flex-col gap-3 p-4 bg-black rounded-lg border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center mb-2">
               <Users className="w-4 h-4 text-gold" />
            </div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Number String</label>
            <input 
              type="text" 
              value={aboutStats.stat3_num}
              onChange={(e) => setAboutStats({...aboutStats, stat3_num: e.target.value})}
              className="bg-[#111] border border-[#222] text-white text-xl font-bold rounded-md px-3 py-2 focus:outline-none focus:border-gold/50"
            />
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-2">Label Text</label>
            <textarea 
              value={aboutStats.stat3_label}
              onChange={(e) => setAboutStats({...aboutStats, stat3_label: e.target.value})}
              className="bg-[#111] border border-[#222] text-neutral-400 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-gold/50 uppercase tracking-widest font-bold resize-none h-16"
            />
          </div>

          {/* Item 4 */}
          <div className="flex flex-col gap-3 p-4 bg-black rounded-lg border border-white/5">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center mb-2">
               <Globe className="w-4 h-4 text-gold" />
            </div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Number String</label>
            <input 
              type="text" 
              value={aboutStats.stat4_num}
              onChange={(e) => setAboutStats({...aboutStats, stat4_num: e.target.value})}
              className="bg-[#111] border border-[#222] text-white text-xl font-bold rounded-md px-3 py-2 focus:outline-none focus:border-gold/50"
            />
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mt-2">Label Text</label>
            <textarea 
              value={aboutStats.stat4_label}
              onChange={(e) => setAboutStats({...aboutStats, stat4_label: e.target.value})}
              className="bg-[#111] border border-[#222] text-neutral-400 text-xs rounded-md px-3 py-2 focus:outline-none focus:border-gold/50 uppercase tracking-widest font-bold resize-none h-16"
            />
          </div>
        </div>

        {/* Live Preview (About Page Style) */}
        <div className="p-6 border-t border-white/5 bg-[#f5f0e6] overflow-x-auto relative">
          <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4 absolute top-4 left-4">Live About Page Preview</p>
          <div className="w-full max-w-4xl mx-auto mt-8 border border-neutral-300/60 bg-white/50 backdrop-blur-sm rounded-sm grid grid-cols-4 shadow-xl">
             <div className="flex flex-col items-center justify-center p-6 border-r border-neutral-300/60">
                <Clapperboard className="w-8 h-8 text-gold mb-3 stroke-[1.5]" />
                <span className="text-2xl font-black text-black">{aboutStats.stat1_num}+</span>
                <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest text-center mt-1 whitespace-pre-wrap leading-tight">{aboutStats.stat1_label.replace(' ', '\n')}</span>
             </div>
             <div className="flex flex-col items-center justify-center p-6 border-r border-neutral-300/60">
                <Film className="w-8 h-8 text-gold mb-3 stroke-[1.5]" />
                <span className="text-2xl font-black text-black">{aboutStats.stat2_num}+</span>
                <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest text-center mt-1 whitespace-pre-wrap leading-tight">{aboutStats.stat2_label.replace(' ', '\n')}</span>
             </div>
             <div className="flex flex-col items-center justify-center p-6 border-r border-neutral-300/60">
                <Users className="w-8 h-8 text-gold mb-3 stroke-[1.5]" />
                <span className="text-2xl font-black text-black">{aboutStats.stat3_num}+</span>
                <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest text-center mt-1 whitespace-pre-wrap leading-tight">{aboutStats.stat3_label.replace(' ', '\n')}</span>
             </div>
             <div className="flex flex-col items-center justify-center p-6">
                <Globe className="w-8 h-8 text-gold mb-3 stroke-[1.5]" />
                <span className="text-2xl font-black text-black">{aboutStats.stat4_num}+</span>
                <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest text-center mt-1 whitespace-pre-wrap leading-tight">{aboutStats.stat4_label.replace(' ', '\n')}</span>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
