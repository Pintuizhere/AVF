import Image from "next/image";
import Link from "next/link";
import { Camera, Calendar, Images } from "lucide-react";

export default function BtsGallerySection() {
  const galleryImages = [
    { slug: "setting-up-the-shot", src: "/images/hero-bg.jpg", label: "SETTING UP THE SHOT", date: "12 MAY 2024", photos: 12 },
    { slug: "directors-vision", src: "/images/services-bg.jpg", label: "DIRECTOR'S VISION", date: "14 MAY 2024", photos: 18 },
    { slug: "and-action", src: "/images/hero-bg.jpg", label: "AND... ACTION!", date: "15 MAY 2024", photos: 10 },
    { slug: "lights-camera-magic", src: "/images/services-bg.jpg", label: "LIGHTS. CAMERA. MAGIC.", date: "18 MAY 2024", photos: 15 },
    { slug: "perfecting-every-detail", src: "/images/hero-bg.jpg", label: "PERFECTING EVERY DETAIL", date: "20 MAY 2024", photos: 24 },
    { slug: "reviewing-the-shot", src: "/images/services-bg.jpg", label: "REVIEWING THE SHOT", date: "22 MAY 2024", photos: 8 },
    { slug: "focus-frame-story", src: "/images/hero-bg.jpg", label: "FOCUS. FRAME. STORY.", date: "25 MAY 2024", photos: 14 },
    { slug: "teamwork-in-action", src: "/images/services-bg.jpg", label: "TEAMWORK IN ACTION", date: "28 MAY 2024", photos: 32 },
    { slug: "creating-memories", src: "/images/hero-bg.jpg", label: "CREATING MEMORIES", date: "02 JUN 2024", photos: 20 },
  ];

  return (
    <section id="gallery" className="relative w-full bg-[#050505] py-24 z-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-[1400px]">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 relative">
          
          <span className="font-script text-3xl md:text-4xl text-gold mb-2 -rotate-2">All Access</span>
          <h2 className="text-5xl md:text-7xl font-bebas uppercase tracking-widest text-white leading-none">
            BTS GALLERY
          </h2>
          <div className="h-[2px] w-24 bg-gold mt-6 shadow-[0_0_15px_rgba(252,166,3,0.6)]" />
        </div>

        {/* Modern Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((img, i) => (
            <Link href={`/bts/${img.slug}`} key={i} className="block group relative mt-3 mr-3 md:mt-4 md:mr-4">
              
              {/* Stack Layer 2 (Deepest) */}
              <div className="absolute inset-0 bg-white rounded-[5px] -translate-y-3 translate-x-3 md:-translate-y-4 md:translate-x-4 opacity-40 z-0 shadow-lg" />
              
              {/* Stack Layer 1 (Middle) */}
              <div className="absolute inset-0 bg-white rounded-[5px] -translate-y-1.5 translate-x-1.5 md:-translate-y-2 md:translate-x-2 opacity-70 z-10 shadow-lg" />

              <div 
                className="relative w-full aspect-[4/5] bg-neutral-900 overflow-hidden cursor-pointer rounded-[5px] z-20 shadow-2xl border border-white/5"
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
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex flex-col transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-out">
                  <div className="w-0 h-[2px] bg-gold mb-4 group-hover:w-12 transition-all duration-700 delay-100 ease-out" />
                  <h3 className="font-bebas text-2xl md:text-3xl tracking-widest text-white drop-shadow-md">
                    {img.label}
                  </h3>
                  
                  {/* Date and Photos Footer */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                    <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono tracking-wider">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>{img.date}</span>
                    </div>
                    <span className="text-neutral-600">•</span>
                    <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono tracking-wider">
                      <Images className="w-3.5 h-3.5 text-gold" />
                      <span>{img.photos} PHOTOS</span>
                    </div>
                  </div>

                </div>
                
                {/* Glassmorphic border effect on hover */}
                <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-700 pointer-events-none rounded-[5px]" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button (Styled from Screenshot) */}
        <div className="w-full flex justify-center mt-20">
          <div className="relative inline-flex items-center justify-center p-4">
            
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/30" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-gold/30" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-gold/30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/30" />

            <button className="group relative border border-gold/40 text-gold hover:text-black px-8 py-3 rounded-full font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all duration-500 overflow-hidden">
              <Camera className="w-4 h-4 relative z-10 group-hover:text-black transition-colors duration-500" />
              <span className="relative z-10">VIEW ALL GALLERY</span>
              <div className="absolute inset-0 bg-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
            </button>
            
          </div>
        </div>

      </div>
    </section>
  );
}
