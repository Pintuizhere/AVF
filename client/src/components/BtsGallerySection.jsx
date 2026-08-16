import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function BtsGallerySection() {
  const categories = [
    { id: "all", label: "ALL", active: true },
    { id: "documentaries", label: "DOCUMENTARIES" },
    { id: "events", label: "EVENTS" },
    { id: "commercials", label: "COMMERCIALS" },
    { id: "products", label: "PRODUCTS" },
    { id: "food", label: "FOOD" },
    { id: "model", label: "MODEL" },
    { id: "jewellery", label: "JEWELLERY" },
    { id: "reels", label: "REELS" },
  ];

  const galleryImages = [
    { src: "/images/hero-bg.jpg", label: "SETTING UP THE SHOT", rotate: "-rotate-2" },
    { src: "/images/services-bg.jpg", label: "DIRECTOR'S VISION", rotate: "rotate-1" },
    { src: "/images/hero-bg.jpg", label: "AND... ACTION!", rotate: "-rotate-1" },
    { src: "/images/services-bg.jpg", label: "LIGHTS. CAMERA. MAGIC.", rotate: "rotate-2" },
    { src: "/images/hero-bg.jpg", label: "PERFECTING EVERY DETAIL", rotate: "-rotate-1" },
    { src: "/images/services-bg.jpg", label: "REVIEWING THE SHOT", rotate: "rotate-1" },
    { src: "/images/hero-bg.jpg", label: "FOCUS. FRAME. STORY.", rotate: "-rotate-2" },
    { src: "/images/services-bg.jpg", label: "TEAMWORK IN ACTION", rotate: "rotate-2" },
    { src: "/images/hero-bg.jpg", label: "CREATING MEMORIES", rotate: "-rotate-1" },
  ];

  return (
    <section id="gallery" className="relative w-full bg-black py-24 z-20">
      <div className="container mx-auto px-6 md:px-12 max-w-[1400px]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
          <div className="flex flex-col items-start">
            <span className="font-script text-3xl text-gold mb-[-10px] ml-4 -rotate-2">All Access</span>
            <h2 className="text-5xl md:text-6xl font-bebas uppercase tracking-widest text-white leading-none">
              BTS GALLERY
            </h2>
            <div className="h-[2px] w-24 bg-gold mt-4 shadow-[0_0_10px_rgba(252,166,3,0.5)]" />
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap items-center gap-4 lg:gap-6 pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`text-[10px] font-bold uppercase tracking-widest transition-all ${
                  cat.active 
                    ? "bg-gold text-black px-4 py-1.5 rounded-sm shadow-[0_0_10px_rgba(252,166,3,0.4)]" 
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
          {galleryImages.map((img, i) => (
            <div key={i} className="relative group w-full aspect-[4/3] bg-neutral-900 overflow-visible cursor-pointer">
              
              {/* Film Border Effects (Left & Right) */}
              <div className="absolute top-0 bottom-0 left-0 w-4 bg-black/60 border-r border-neutral-800 z-10 flex flex-col justify-between py-2 items-center pointer-events-none">
                 {[...Array(6)].map((_,j) => <div key={`l-${j}`} className="w-1.5 h-2 rounded-sm bg-neutral-800/80" />)}
              </div>
              <div className="absolute top-0 bottom-0 right-0 w-4 bg-black/60 border-l border-neutral-800 z-10 flex flex-col justify-between py-2 items-center pointer-events-none">
                 {[...Array(6)].map((_,j) => <div key={`r-${j}`} className="w-1.5 h-2 rounded-sm bg-neutral-800/80" />)}
              </div>

              {/* Main Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover opacity-80 filter sepia-[0.2] contrast-125 group-hover:opacity-100 group-hover:scale-105 group-hover:sepia-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </div>

              {/* Taped Label at Bottom Center */}
              <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 ${img.rotate} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-0`}>
                <div className="relative px-6 py-1.5 bg-[#eae3d5] border border-neutral-300 shadow-md">
                   {/* Tape left */}
                   <div className="absolute -top-1 -left-2 w-6 h-3 bg-white/40 backdrop-blur-sm shadow-sm rotate-[30deg]" />
                   {/* Tape right */}
                   <div className="absolute -top-1 -right-2 w-6 h-3 bg-white/40 backdrop-blur-sm shadow-sm -rotate-[30deg]" />
                   
                   <span className="font-script text-lg text-black tracking-wide whitespace-nowrap">
                     {img.label}
                   </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="w-full flex justify-center mt-20">
          <button className="border border-gold text-gold hover:bg-gold hover:text-black px-8 py-3 font-bold text-xs uppercase tracking-widest flex items-center gap-3 transition-colors rounded-sm shadow-[inset_0_0_10px_rgba(252,166,3,0.1),_0_0_15px_rgba(252,166,3,0.1)] hover:shadow-[0_0_20px_rgba(252,166,3,0.4)]">
            LOAD MORE MOMENTS
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
