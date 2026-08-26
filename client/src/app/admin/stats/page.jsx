"use client";

import { useState, useEffect } from "react";
import { Loader2, Save, Film, Target, Users, Clock, Clapperboard, Globe } from "lucide-react";

export default function AdminStatsPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statsData, setStatsData] = useState({
    home: null,
    about: null
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3000);
  };

  useEffect(() => {
    fetchStats("home");
    fetchStats("about");
  }, []);

  const fetchStats = async (pageName) => {
    try {
      const res = await fetch(`http://localhost:5000/api/stats?page=${pageName}`);
      const data = await res.json();
      setStatsData(prev => ({ ...prev, [pageName]: data.stats }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (pageName, field, value) => {
    setStatsData(prev => ({
      ...prev,
      [pageName]: {
        ...prev[pageName],
        [field]: value
      }
    }));
  };

  const handleSave = async (pageName) => {
    setSaving(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`http://localhost:5000/api/stats/${pageName}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ stats: statsData[pageName] }),
      });
      if (res.ok) {
        showToast("Stats saved successfully!");
      } else {
        showToast("Failed to save stats.", "error");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !statsData.home || !statsData.about) {
    return <div className="p-8 text-neutral-500">Loading stats...</div>;
  }

  const currentStats = statsData[activeTab];

  return (
    <div className="flex flex-col gap-6 pb-12">
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a] rounded-xl p-4 flex flex-col shadow-xl mt-2">
        <h1 className="text-xl font-bold text-white">Manage Key Statistics</h1>
        <p className="text-xs text-neutral-400 mt-1">Update the four key metrics displayed on the Home page and About page.</p>
        
        {/* Tabs */}
        <div className="flex gap-4 mt-6">
          <button 
            onClick={() => setActiveTab("home")}
            className={`pb-2 text-sm font-bold tracking-widest uppercase border-b-2 transition-colors ${activeTab === "home" ? "border-gold text-gold" : "border-transparent text-neutral-500 hover:text-white"}`}
          >
            Home Page Stats
          </button>
          <button 
            onClick={() => setActiveTab("about")}
            className={`pb-2 text-sm font-bold tracking-widest uppercase border-b-2 transition-colors ${activeTab === "about" ? "border-gold text-gold" : "border-transparent text-neutral-500 hover:text-white"}`}
          >
            About Page Stats
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          
          {[1, 2, 3, 4].map(num => (
            <div key={num} className="bg-neutral-900/50 p-6 rounded-lg border border-white/5 relative">
              <span className="absolute -top-3 -left-3 w-8 h-8 bg-neutral-800 border border-neutral-700 rounded-full flex items-center justify-center text-xs font-bold text-neutral-400">
                {num}
              </span>
              
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Number Value</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={currentStats[`stat${num}_num`] || 0}
                      onChange={(e) => handleInputChange(activeTab, `stat${num}_num`, Number(e.target.value))}
                      className="w-full bg-[#111] border border-[#222] text-white text-xl font-black rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Label Text</label>
                  <input 
                    type="text" 
                    value={currentStats[`stat${num}_label`] || ''}
                    onChange={(e) => handleInputChange(activeTab, `stat${num}_label`, e.target.value)}
                    className="w-full bg-[#111] border border-[#222] text-neutral-300 text-sm uppercase tracking-widest rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </div>
            </div>
          ))}

        </div>

        <div className="mt-10 flex justify-end">
          <button 
            onClick={() => handleSave(activeTab)}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold/90 disabled:opacity-50 text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 stroke-[2]" />} 
            {saving ? "Saving..." : `Save ${activeTab === 'home' ? 'Home' : 'About'} Stats`}
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <section className="bg-[#111] py-8 px-6 rounded-xl border border-white/5 relative mt-4">
        <div className="mb-10 border-l-[3px] border-gold pl-3 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white">
            Live Preview
          </h2>
          <p className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest mt-1">
            How it will look on the {activeTab} page
          </p>
        </div>

        {activeTab === "home" && (
          <div className="w-full bg-[#e9e6dc] text-black border-y-[6px] border-dotted border-[#111] py-10 md:py-14 px-6 rounded-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-black/20">
              
              <div className="flex items-center justify-center gap-4 lg:gap-6 px-4 pt-4 sm:pt-0">
                <Film className="w-10 h-10 md:w-12 md:h-12 text-black stroke-[1.5]" />
                <div className="flex flex-col">
                  <h4 className="text-3xl md:text-4xl font-black leading-none tracking-tight">
                    {currentStats.stat1_num}+
                  </h4>
                  <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-black/60 mt-1.5 uppercase">{currentStats.stat1_label}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 lg:gap-6 px-4 pt-8 sm:pt-0">
                <Target className="w-10 h-10 md:w-12 md:h-12 text-black stroke-[1.5]" />
                <div className="flex flex-col">
                  <h4 className="text-3xl md:text-4xl font-black leading-none tracking-tight">
                    {currentStats.stat2_num}+
                  </h4>
                  <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-black/60 mt-1.5 uppercase">{currentStats.stat2_label}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 lg:gap-6 px-4 pt-8 sm:pt-0">
                <Users className="w-10 h-10 md:w-12 md:h-12 text-black stroke-[1.5]" />
                <div className="flex flex-col">
                  <h4 className="text-3xl md:text-4xl font-black leading-none tracking-tight">
                    {currentStats.stat3_num}+
                  </h4>
                  <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-black/60 mt-1.5 uppercase">{currentStats.stat3_label}</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 lg:gap-6 px-4 pt-8 sm:pt-0">
                <Clock className="w-10 h-10 md:w-12 md:h-12 text-black stroke-[1.5]" />
                <div className="flex flex-col">
                  <h4 className="text-3xl md:text-4xl font-black leading-none tracking-tight">
                    {currentStats.stat4_num}+
                  </h4>
                  <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-black/60 mt-1.5 uppercase">{currentStats.stat4_label}</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="w-full bg-[#f5f0e6] text-black border border-neutral-300/60 rounded-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 w-full">
              <div className="flex flex-col items-center justify-center p-6 border-r border-b md:border-b-0 border-neutral-300/60">
                <Clapperboard className="w-8 h-8 text-gold mb-3 stroke-[1.5]" />
                <span className="text-2xl font-black text-black">{currentStats.stat1_num}+</span>
                <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest text-center mt-1 whitespace-pre-wrap leading-tight">{currentStats.stat1_label.replace(' ', '\n')}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-neutral-300/60">
                <Film className="w-8 h-8 text-gold mb-3 stroke-[1.5]" />
                <span className="text-2xl font-black text-black">{currentStats.stat2_num}+</span>
                <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest text-center mt-1 whitespace-pre-wrap leading-tight">{currentStats.stat2_label.replace(' ', '\n')}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-6 border-r border-neutral-300/60">
                <Users className="w-8 h-8 text-gold mb-3 stroke-[1.5]" />
                <span className="text-2xl font-black text-black">{currentStats.stat3_num}+</span>
                <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest text-center mt-1 whitespace-pre-wrap leading-tight">{currentStats.stat3_label.replace(' ', '\n')}</span>
              </div>
              <div className="flex flex-col items-center justify-center p-6">
                <Globe className="w-8 h-8 text-gold mb-3 stroke-[1.5]" />
                <span className="text-2xl font-black text-black">{currentStats.stat4_num}+</span>
                <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest text-center mt-1 whitespace-pre-wrap leading-tight">{currentStats.stat4_label.replace(' ', '\n')}</span>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className={`px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border ${toast.type === 'error' ? 'bg-red-950/90 border-red-500/50 text-red-200' : 'bg-green-950/90 border-green-500/50 text-green-200'} backdrop-blur-md`}>
            {toast.type === 'success' && <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
            {toast.type === 'error' && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
            <span className="font-bold text-sm tracking-wide">{toast.message}</span>
          </div>
        </div>
      )}

    </div>
  );
}
