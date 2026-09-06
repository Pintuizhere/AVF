"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Clapperboard, Calendar, MonitorPlay, Package, Coffee, Camera, Smartphone, Car, Video, CalendarDays, Film, CarFront } from "lucide-react";

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

export default function ServicesGridSection() {
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

  return (
    <section className="relative bg-[#f5f0e6] text-black py-24 px-6 border-y-[6px] border-dotted border-[#111] overflow-hidden">
      <div className="container mx-auto max-w-[1400px]">
        
        {/* Section Title */}
        <div className="mb-12 border-l-4 border-black pl-4">
          <h2 className="text-4xl md:text-5xl font-bebas uppercase tracking-wider text-black">
            Our Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.iconName] || Clapperboard;

            return (
              <div 
                key={service._id || index} 
                className="bg-[#0a0a0a] text-white rounded-sm overflow-hidden flex flex-col group relative shadow-xl border border-neutral-800 hover:border-gold transition-colors duration-500 h-[400px]"
              >
                {/* Full Background Image */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-900 group-hover:bg-neutral-800 transition-colors" />
                  )}
                  {/* Bottom Fade */}
                  <div className="absolute bottom-0 left-0 w-full h-[180px] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent z-10 pointer-events-none" />
                </div>

                {/* Center Content Overlay */}
                <div className="relative z-20 flex flex-col items-center justify-center h-full px-6">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full border border-gold bg-black flex items-center justify-center shadow-[0_0_15px_rgba(252,166,3,0.2)] group-hover:shadow-[0_0_20px_rgba(252,166,3,0.5)] transition-shadow mb-4">
                    <Icon className="w-6 h-6 text-gold stroke-[1.5]" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-bebas text-2xl tracking-widest uppercase text-white group-hover:text-gold transition-colors text-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
                    {service.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
