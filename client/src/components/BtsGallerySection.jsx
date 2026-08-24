import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function BtsGallerySection() {
  const galleryImages = [
    { src: "/images/hero-bg.jpg", label: "SETTING UP THE SHOT" },
    { src: "/images/services-bg.jpg", label: "DIRECTOR'S VISION" },
    { src: "/images/hero-bg.jpg", label: "AND... ACTION!" },
    { src: "/images/services-bg.jpg", label: "LIGHTS. CAMERA. MAGIC." },
    { src: "/images/hero-bg.jpg", label: "PERFECTING EVERY DETAIL" },
    { src: "/images/services-bg.jpg", label: "REVIEWING THE SHOT" },
    { src: "/images/hero-bg.jpg", label: "FOCUS. FRAME. STORY." },
    { src: "/images/services-bg.jpg", label: "TEAMWORK IN ACTION" },
    { src: "/images/hero-bg.jpg", label: "CREATING MEMORIES" },
  ];

  return (
    <section id="gallery" className="relative w-full bg-[#050505] py-24 z-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-[1400px]">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <span className="font-script text-3xl md:text-4xl text-gold mb-2 -rotate-2">All Access</span>
          <h2 className="text-5xl md:text-7xl font-bebas uppercase tracking-widest text-white leading-none">
            BTS GALLERY
          </h2>
          <div className="h-[2px] w-24 bg-gold mt-6 shadow-[0_0_15px_rgba(252,166,3,0.6)]" />
        </div>

        {/* Modern Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((img, i) => (
            <div 
              key={i} 
              className="relative group w-full aspect-[4/5] bg-neutral-900 overflow-hidden cursor-pointer rounded-sm"
            >
              
              {/* Main Image */}
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover filter grayscale-[0.3] contrast-[1.1] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                <div className="w-0 h-[2px] bg-gold mb-4 group-hover:w-12 transition-all duration-700 delay-100 ease-out" />
                <h3 className="font-bebas text-2xl md:text-3xl tracking-widest text-white drop-shadow-md">
                  {img.label}
                </h3>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                  Behind The Scenes
                </span>
              </div>
              
              {/* Glassmorphic border effect on hover */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-700 pointer-events-none rounded-sm" />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="w-full flex justify-center mt-20">
          <button className="group relative border border-gold/50 text-gold hover:bg-gold hover:text-black px-10 py-4 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-4 transition-all duration-500 rounded-sm overflow-hidden">
            <span className="relative z-10">LOAD MORE MOMENTS</span>
            <ArrowDown className="w-4 h-4 relative z-10 group-hover:translate-y-1 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
          </button>
        </div>

      </div>
    </section>
  );
}
