"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Clapperboard, Calendar, MonitorPlay, Package, Coffee, Camera, Smartphone, Car, UploadCloud, Save, Plus, Trash2 } from "lucide-react";

const iconMap = {
  Clapperboard,
  Calendar,
  MonitorPlay,
  Package,
  Coffee,
  Camera,
  Smartphone,
  Car
};

export default function AdminServicesPage() {
  const [services, setServices] = useState([
    {
      id: "documentaries",
      title: "Documentaries",
      description: "Real stories.\nReal people.\nReal impact.",
      image: "/images/service-doc.jpg",
      iconName: "Clapperboard"
    },
    {
      id: "events",
      title: "Events",
      description: "Cinematic coverage\nof every moment\nthat matters.",
      image: "/images/bts-photo.jpg", 
      iconName: "Calendar"
    },
    {
      id: "commercials",
      title: "Commercials",
      description: "Brands come alive\non screen.",
      image: "/images/hero-bg.jpg", 
      iconName: "MonitorPlay"
    },
    {
      id: "products",
      title: "Products",
      description: "Showcasing products\nat their best.",
      image: "/images/service-product.jpg",
      iconName: "Package"
    },
    {
      id: "food",
      title: "Food",
      description: "Tasty looks\ngreat on camera.",
      image: "/images/service-food.jpg",
      iconName: "Coffee"
    },
    {
      id: "model",
      title: "Model Photography",
      description: "Professional shots\nthat stand out.",
      image: "/images/director.jpg", 
      iconName: "Camera"
    },
    {
      id: "reels",
      title: "Reels",
      description: "Short format.\nBig impact.",
      image: "/images/about-hero-bg.jpg", 
      iconName: "Smartphone"
    },
    {
      id: "automotive",
      title: "Automotive",
      description: "Powerful cars.\nBold details.\nCaptured in motion.",
      image: "/images/hero-bg.jpg", 
      iconName: "Car"
    }
  ]);

  const handleInputChange = (id, field, value) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleTextareaChange = (e, id) => {
    handleInputChange(id, 'description', e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const addNewService = () => {
    const newService = {
      id: `new-${Date.now()}`,
      title: "NEW SERVICE",
      description: "Enter description\nhere.",
      image: "/images/hero-bg.jpg",
      iconName: "Clapperboard"
    };
    setServices(prev => [...prev, newService]);
  };

  const removeService = (id) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      
      {/* Floating Action Bar */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl mt-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Manage Services</h1>
          <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Live WYSIWYG Editor. Click any text to edit directly.</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button 
            onClick={addNewService}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-transparent border border-[#222] hover:border-white text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" /> Add Service
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gold hover:bg-gold/90 text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors shadow-[0_0_15px_rgba(252,166,3,0.3)]">
            <Save className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2]" /> Save Changes
          </button>
        </div>
      </div>

      {/* Services Grid matching Frontend */}
      <section className="relative bg-[#f5f0e6] text-black py-8 md:py-16 px-4 md:px-6 overflow-hidden rounded-xl">
        <div className="mx-auto max-w-[1400px]">
          
          <div className="mb-8 md:mb-12 border-l-[3px] md:border-l-4 border-black pl-3 md:pl-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bebas uppercase tracking-wider text-black">
              Live Preview
            </h2>
            <p className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest mt-1 sm:mt-2">Any changes made here will reflect on the live site.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.iconName] || Clapperboard;

              return (
                <div 
                  key={service.id} 
                  className="bg-[#0a0a0a] text-white rounded-sm overflow-hidden flex flex-col group relative shadow-xl border border-neutral-800 hover:border-gold transition-colors duration-500"
                >
                  
                  {/* Delete Button (Admin Only) */}
                  <button 
                    onClick={() => removeService(service.id)}
                    className="absolute top-2 right-2 z-40 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {/* Top Half Image */}
                  <div className="h-[240px] relative w-full overflow-hidden cursor-pointer">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10" />
                    
                    {/* Upload Overlay */}
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center border border-gold/50 mb-2">
                        <UploadCloud className="w-5 h-5 text-gold" />
                      </div>
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">Change Image</span>
                    </div>
                  </div>

                  {/* Overlapping Icon */}
                  <div className="absolute top-[210px] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-gold bg-black flex items-center justify-center z-30 shadow-[0_0_15px_rgba(252,166,3,0.2)] cursor-pointer hover:bg-neutral-900 group/icon">
                    <Icon className="w-6 h-6 text-gold stroke-[1.5]" />
                    {/* Icon Swap Tooltip (Admin Only) */}
                    <div className="absolute -top-8 bg-black border border-[#222] text-[9px] text-white px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
                      Change Icon
                    </div>
                  </div>

                  {/* Bottom Half Content */}
                  <div className="pt-10 pb-6 md:pt-12 md:pb-8 px-4 md:px-6 flex flex-col items-center text-center flex-1 z-10 relative bg-[#0a0a0a]">
                    
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => handleInputChange(service.id, 'title', e.target.value)}
                      className="font-bebas text-xl md:text-2xl tracking-widest uppercase mb-3 md:mb-4 text-white hover:text-gold focus:text-gold transition-colors bg-transparent border-b border-transparent focus:border-gold/50 text-center w-full focus:outline-none placeholder:text-neutral-700"
                      placeholder="SERVICE TITLE"
                    />
                    
                    <textarea
                      value={service.description}
                      onChange={(e) => handleTextareaChange(e, service.id)}
                      className="text-[10px] md:text-xs text-neutral-400 leading-relaxed font-medium flex-1 bg-transparent border border-transparent hover:border-[#222] focus:border-gold/50 rounded p-1 md:p-2 text-center w-full focus:outline-none resize-none overflow-hidden placeholder:text-neutral-700"
                      rows={3}
                      placeholder="Service description..."
                    />

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
