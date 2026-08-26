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
      const res = await fetch("http://localhost:5000/api/services");
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
                className="bg-[#0a0a0a] text-white rounded-sm overflow-hidden flex flex-col group relative shadow-xl border border-neutral-800 hover:border-gold transition-colors duration-500"
              >
                {/* Top Half Image */}
                <div className="h-[240px] relative w-full overflow-hidden">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-900 group-hover:bg-neutral-800 transition-colors" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10" />
                </div>

                {/* Overlapping Icon */}
                <div className="absolute top-[210px] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-gold bg-black flex items-center justify-center z-20 shadow-[0_0_15px_rgba(252,166,3,0.2)] group-hover:shadow-[0_0_20px_rgba(252,166,3,0.5)] transition-shadow">
                  <Icon className="w-6 h-6 text-gold stroke-[1.5]" />
                </div>

                {/* Bottom Half Content */}
                <div className="pt-12 pb-8 px-6 flex flex-col items-center text-center flex-1 z-10 relative bg-[#0a0a0a]">
                  <h3 className="font-bebas text-2xl tracking-widest uppercase mb-4 text-white group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-400 leading-relaxed font-medium whitespace-pre-line flex-1">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
