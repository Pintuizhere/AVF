import Image from "next/image";
import { ArrowRight, Clapperboard, Calendar, MonitorPlay, Package, Coffee, Camera, Smartphone } from "lucide-react";

export default function ServicesGridSection() {
  const services = [
    {
      id: "documentaries",
      title: "Documentaries",
      description: "Real stories.\nReal people.\nReal impact.",
      image: "/images/service-doc.jpg",
      icon: Clapperboard,
      colSpan: 1
    },
    {
      id: "events",
      title: "Events",
      description: "Cinematic coverage\nof every moment\nthat matters.",
      image: "/images/bts-photo.jpg", // Using placeholder
      icon: Calendar,
      colSpan: 1
    },
    {
      id: "commercials",
      title: "Commercials",
      description: "Brands come alive\non screen.",
      image: "/images/hero-bg.jpg", // Using placeholder
      icon: MonitorPlay,
      colSpan: 1
    },
    {
      id: "products",
      title: "Products",
      description: "Showcasing products\nat their best.",
      image: "/images/service-product.jpg",
      icon: Package,
      colSpan: 1
    },
    {
      id: "food",
      title: "Food",
      description: "Tasty looks\ngreat on camera.",
      image: "/images/service-food.jpg",
      icon: Coffee,
      colSpan: 1
    },
    {
      id: "model",
      title: "Model Photography",
      description: "Professional shots\nthat stand out.",
      image: "/images/director.jpg", // Using placeholder
      icon: Camera,
      colSpan: 1
    },
    {
      id: "reels",
      title: "Reels",
      description: "Short format.\nBig impact.",
      image: "/images/about-hero-bg.jpg", // Using placeholder
      icon: Smartphone,
      colSpan: 1
    }
  ];

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
          {services.map((service, index) => {
            // To achieve the layout in the design (4 on top, 3 centered on bottom)
            // We can just use standard grid, but the last 3 items need to be centered in a 4-col grid.
            // A simple way is to use col-span logic if it's the last row, but CSS grid is tricky for centering odd items.
            // In Tailwind, lg:col-span-1 works for 4, but the last 3 will just left-align. 
            // We'll wrap the grid in a flex-wrap container instead for perfect centering, or just let them left align.
            // Actually, let's use a flex container for the last 3 items, or just standard grid. The design shows 4 on top, 3 on bottom centered.
            return (
              <div 
                key={service.id} 
                className="bg-[#0a0a0a] text-white rounded-sm overflow-hidden flex flex-col group relative shadow-xl border border-neutral-800 hover:border-gold transition-colors duration-500"
              >
                {/* Top Half Image */}
                <div className="h-[240px] relative w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10" />
                </div>

                {/* Overlapping Icon */}
                <div className="absolute top-[210px] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-gold bg-black flex items-center justify-center z-20 shadow-[0_0_15px_rgba(252,166,3,0.2)] group-hover:shadow-[0_0_20px_rgba(252,166,3,0.5)] transition-shadow">
                  <service.icon className="w-6 h-6 text-gold stroke-[1.5]" />
                </div>

                {/* Bottom Half Content */}
                <div className="pt-12 pb-8 px-6 flex flex-col items-center text-center flex-1 z-10 relative bg-[#0a0a0a]">
                  <h3 className="font-bebas text-2xl tracking-widest uppercase mb-4 text-white group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-xs text-neutral-400 leading-relaxed font-medium mb-8 whitespace-pre-line flex-1">
                    {service.description}
                  </p>
                  
                  <a href={`/services#${service.id}`} className="flex items-center gap-2 text-[10px] font-bold text-gold uppercase tracking-[0.2em] hover:text-white transition-colors mt-auto">
                    View Details
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
