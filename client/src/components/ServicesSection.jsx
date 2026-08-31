"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Video, CalendarDays, Clapperboard, Package, Coffee, Camera, Film, CarFront, Calendar, MonitorPlay, Smartphone, Car } from "lucide-react";

const iconMap = {
  Clapperboard,
  Calendar,
  CalendarDays,
  MonitorPlay,
  Package,
  Coffee,
  Camera,
  Smartphone,
  Car,
  CarFront,
  Video,
  Film
};

const bgColors = [
  "from-amber-900/80 to-black",
  "from-blue-900/80 to-black",
  "from-emerald-900/80 to-black",
  "from-purple-900/80 to-black",
  "from-orange-900/80 to-black",
  "from-rose-900/80 to-black",
  "from-red-900/80 to-black",
  "from-cyan-900/80 to-black"
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [servicesData, setServicesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/services`);
      const data = await res.json();
      setServicesData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null; // or a skeleton
  if (servicesData.length === 0) return null;

  return (
    <section id="services" className="relative bg-black pt-24 pb-32 text-white border-y border-white/5 overflow-hidden">
      
      {/* Background glow behind the active visual */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-[800px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div>
            <span className="font-script text-gold text-3xl md:text-4xl font-bold">What We Do</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mt-2">Our Services</h2>
          </div>
          {/* Desktop Button - hidden on mobile */}
          <button className="hidden md:flex items-center gap-2 text-gold text-sm font-bold tracking-widest uppercase hover:text-white transition-colors group">
            View All Services
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Content: Side-by-side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 items-start">
          
          {/* Left: Services List */}
          <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-2 relative">
            {servicesData.map((svc, i) => {
              const Icon = iconMap[svc.iconName] || Clapperboard;
              const isActive = activeIndex === i;
              const color = bgColors[i % bgColors.length];
              
              return (
                <div key={svc._id || i} className="flex flex-col">
                  {/* Service List Item */}
                  <div 
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`group flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-2xl cursor-pointer transition-all duration-500 border ${isActive ? 'bg-white/5 border-white/10 shadow-xl' : 'border-transparent hover:bg-white/[0.02] hover:border-white/5'}`}
                  >
                    <div className={`w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-full flex items-center justify-center transition-colors duration-500 border shadow-lg ${isActive ? 'bg-gold text-black border-gold shadow-gold/20' : 'bg-neutral-900 text-gold border-white/10 group-hover:border-gold/50'}`}>
                      <Icon className={`w-5 h-5 md:w-7 md:h-7 stroke-[1.5] ${isActive ? 'fill-black/10' : ''}`} />
                    </div>
                    <div className="flex flex-col">
                      <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight mb-1 transition-colors duration-500 ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>
                        {svc.title}
                      </h3>
                      {isActive && (
                        <p className="text-sm md:text-base leading-relaxed text-neutral-400 animate-in fade-in slide-in-from-bottom-2 duration-500">
                          {svc.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mobile Only: Inline Visual Card (Accordion Style) */}
                  <div className={`lg:hidden overflow-hidden transition-all duration-700 ease-in-out ${isActive ? 'max-h-[500px] mt-4 mb-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="relative h-[350px] w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                      <div className={`w-full h-full bg-[#0a0a0a] relative`}>
                        {/* Background Image if uploaded */}
                        {svc.image && (
                          <div className="absolute inset-0 z-0">
                            <img src={svc.image} alt={svc.title} className="w-full h-full object-cover opacity-50" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70 z-10" />

                        <div className="absolute top-6 left-6 right-6 flex justify-between items-center opacity-60 z-30">
                          <div className="flex gap-2 items-center">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]" />
                            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-white">REC</span>
                          </div>
                          <span className="text-[10px] font-mono tracking-widest text-white/70">{String(i + 1).padStart(2, '0')}:00</span>
                        </div>
                        
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                          <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center mb-6 bg-black/20 backdrop-blur-md shadow-2xl">
                            <Icon className="w-10 h-10 text-gold stroke-[1.5]" />
                          </div>
                          <h4 className="text-3xl font-black uppercase tracking-tighter text-white px-6 text-center drop-shadow-lg">
                            {svc.title}
                          </h4>
                          <p className="text-gold font-script text-2xl mt-3 -rotate-2 drop-shadow-lg text-center px-4">
                            {svc.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right: Reels / Visual Showcase (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-5 relative h-[700px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.4)] group cursor-pointer">
            
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 z-20 pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/10 to-transparent opacity-50 z-20 pointer-events-none" />

            {servicesData.map((svc, i) => {
              const Icon = iconMap[svc.iconName] || Clapperboard;
              const color = bgColors[i % bgColors.length];

              return (
                <div 
                  key={svc._id || i}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${activeIndex === i ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
                >
                  <div className={`w-full h-full bg-[#0a0a0a] relative`}>
                    {/* Background Image if uploaded */}
                    {svc.image && (
                      <div className="absolute inset-0 z-0">
                        <img src={svc.image} alt={svc.title} className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70 z-10" />

                    <div className="absolute top-8 left-8 right-8 flex justify-between items-center opacity-60 z-30">
                      <div className="flex gap-3 items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]" />
                        <span className="text-xs font-mono tracking-widest uppercase font-bold text-white shadow-black drop-shadow-md">REC</span>
                      </div>
                      <span className="text-xs font-mono tracking-widest text-white/70">{String(i + 1).padStart(2, '0')}:00</span>
                    </div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
                      <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center mb-8 bg-black/20 backdrop-blur-md shadow-2xl group-hover:scale-110 group-hover:border-gold/30 transition-all duration-700">
                        <Icon className="w-12 h-12 text-gold stroke-[1.5]" />
                      </div>
                      <h4 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white px-8 text-center drop-shadow-2xl">
                        {svc.title}
                      </h4>
                      <p className="text-gold font-script text-3xl mt-4 -rotate-2 drop-shadow-lg">
                        {svc.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Mobile Button (Bottom) */}
        <div className="mt-8 flex justify-center md:hidden">
          <button className="flex items-center gap-2 text-gold text-[11px] font-bold tracking-widest uppercase hover:bg-white/5 transition-colors group border border-gold/20 px-8 py-4 rounded-full">
            View All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
