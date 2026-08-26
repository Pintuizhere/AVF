import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function WorkDetailsPage({ params }) {
  // Dummy data for the presentation
  const project = {
    title: "Crockery Photography",
    category: "Photography",
    year: "2024",
    client: "Crockery Brand",
    role: "DOP / Cinematographer",
    images: ["/images/hero-bg.jpg", "/images/services-bg.jpg"],
    brief: "We partnered with a premium crockery brand to create high-quality product photography that showcases the craftsmanship, texture, and elegance of their collection. Our objective was to produce visually compelling imagery that translates physical luxury into the digital space.",
    challenge: "Breaking through the visual noise of the current market required a raw, high-contrast narrative that didn't compromise on editorial precision.",
    execution: "We utilized modern rendering and custom-built digital components to ensure the brand felt as high-end in motion as it did in static form.",
    nextProject: {
      title: "Jewellery Photography",
      slug: "jewellery-photography",
      category: "Jewellery",
      image: "/images/services-bg.jpg"
    }
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      <Navbar />

      {/* 1. Header & Metadata Section */}
      <section className="container mx-auto px-6 md:px-12 pt-24 md:pt-32 pb-8 md:pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          {/* Main Title Area */}
          <div className="flex flex-col max-w-4xl">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="h-[2px] w-8 md:w-12 bg-gold" />
              <span className="text-gold text-[9px] md:text-xs font-bold tracking-[0.3em] uppercase">
                {project.category} — {project.year}
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[110px] font-bebas tracking-wide uppercase leading-[0.85] text-white">
              {project.title.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>
          </div>

          {/* Minimal Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-x-12 gap-y-6 shrink-0 w-full md:w-auto border-t md:border-t-0 border-neutral-900 pt-8 md:pt-0">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] text-neutral-500 font-bold tracking-widest uppercase">Client</span>
              <span className="text-sm md:text-base font-bold uppercase">{project.client}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Massive Image Section (Viewfinder Card Style) */}
      <section className="container mx-auto px-4 sm:px-6 md:px-12 pb-16 md:pb-32">
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] p-3 md:p-6 bg-[#0a0a0a] flex flex-col justify-center shadow-[0_10px_40px_rgba(0,0,0,0.8)] group">
          
          {/* 4 Viewfinder Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 md:w-16 md:h-16 border-t-[1.5px] border-l-[1.5px] border-gold transition-all duration-700 opacity-50 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:-translate-y-1" />
          <div className="absolute top-0 right-0 w-8 h-8 md:w-16 md:h-16 border-t-[1.5px] border-r-[1.5px] border-gold transition-all duration-700 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
          <div className="absolute bottom-0 left-0 w-8 h-8 md:w-16 md:h-16 border-b-[1.5px] border-l-[1.5px] border-gold transition-all duration-700 opacity-50 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:translate-y-1" />
          <div className="absolute bottom-0 right-0 w-8 h-8 md:w-16 md:h-16 border-b-[1.5px] border-r-[1.5px] border-gold transition-all duration-700 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1" />

          {/* Inner Frame */}
          <div className="relative w-full h-full overflow-hidden bg-black border border-[#222]">
            <Image 
              src={project.images[0]} 
              alt={project.title} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            
            {/* Dark overlay at bottom for controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Navigation Arrows */}
            <button className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0">
              <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 stroke-[1.5]" />
            </button>
            <button className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
              <ChevronRight className="w-4 h-4 md:w-6 md:h-6 stroke-[1.5]" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-2.5 h-2.5 rounded-full bg-gold shadow-[0_0_10px_rgba(252,166,3,0.5)]" />
              <div className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/80 transition-colors cursor-pointer" />
              <div className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/80 transition-colors cursor-pointer" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Project Overview Section */}
      <section className="pt-12 pb-6 md:py-32 container mx-auto px-6 md:px-12 border-t border-neutral-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24">
          
          <div className="lg:col-span-4 flex flex-col">
            <div className="sticky top-32">
              <span className="text-gold text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase mb-4 block">
                Overview
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas tracking-wide uppercase text-white mb-8">
                About The Project<span className="text-gold">.</span>
              </h2>
              <div className="w-16 h-[1px] bg-gold" />
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-neutral-300 leading-[1.8] md:leading-[1.9] font-light max-w-4xl">
              {project.brief}
            </p>
          </div>

        </div>
      </section>

      {/* 4. Next Project (Full Image Card Style) */}
      <section className="pt-6 pb-16 md:py-32 container mx-auto px-4 sm:px-6 md:px-12">
        <div className="w-full h-[1px] bg-neutral-900 mb-8 md:mb-16" />
        
        <Link href={`/our-work/${project.nextProject.slug}`} className="group block relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-colors duration-500 shadow-2xl">
          
          {/* Background Image */}
          <div className="absolute inset-0 bg-black z-0">
            <Image 
              src={project.nextProject.image}
              alt={project.nextProject.title}
              fill
              className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 opacity-50 group-hover:opacity-70"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
          </div>
          
          {/* Centered Content */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4 sm:p-8">
            <div className="flex items-center gap-4 mb-6 transform md:translate-y-2 md:group-hover:-translate-y-1 transition-transform duration-500">
              <div className="h-[1px] w-8 md:w-12 bg-gold md:bg-neutral-500 md:group-hover:bg-gold transition-colors duration-500" />
              <span className="text-gold md:text-neutral-400 md:group-hover:text-gold text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase transition-colors duration-500">
                Up Next
              </span>
              <div className="h-[1px] w-8 md:w-12 bg-gold md:bg-neutral-500 md:group-hover:bg-gold transition-colors duration-500" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bebas tracking-wide uppercase text-white mb-6 md:mb-8 drop-shadow-2xl">
              {project.nextProject.title}
            </h2>

            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-gold md:border-white/20 flex items-center justify-center bg-gold md:bg-transparent text-black md:text-white backdrop-blur-md md:group-hover:bg-gold md:group-hover:text-black md:group-hover:border-gold transition-all duration-500 transform md:translate-y-2 md:group-hover:-translate-y-1 shadow-xl">
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6 stroke-[2]" />
            </div>
          </div>
          
        </Link>
      </section>

      <Footer />
    </main>
  );
}
