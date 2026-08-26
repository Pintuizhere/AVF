import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

async function getProject(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/projects/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
}

export default async function WorkDetailsPage({ params }) {
  const unwrappedParams = await params;
  const project = await getProject(unwrappedParams.slug);

  const renderVideo = (url, title) => {
    const lowerUrl = url.toLowerCase();
    let embedUrl = "";
    
    if (lowerUrl.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
    } else if (lowerUrl.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
    } else if (lowerUrl.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      if (videoId) embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1`;
    }

    if (embedUrl) {
      return (
        <iframe 
          src={embedUrl} 
          title={title}
          className="w-full h-full object-cover pointer-events-auto border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        />
      );
    }

    return (
      <video 
        src={url} 
        className="w-full h-full object-cover" 
        controls 
        autoPlay 
        loop 
        muted 
      />
    );
  };

  if (!project) {
    return (
      <main className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <Link href="/our-work" className="text-gold hover:underline">
            Return to Our Work
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Next Project dummy for now since we don't have an endpoint for 'next project'
  const nextProject = {
    title: "View More Work",
    slug: "",
    image: "/images/services-bg.jpg"
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 shrink-0 w-full md:w-auto border-t md:border-t-0 border-neutral-900 pt-8 md:pt-0">
            {project.client && (
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-neutral-500 font-bold tracking-widest uppercase">Client</span>
                <span className="text-sm md:text-base font-bold uppercase">{project.client}</span>
              </div>
            )}
            
            {project.metadata && (project.metadata.iso || project.metadata.aperture || project.metadata.fps) && (
              <div className="flex flex-col gap-1">
                <span className="text-[9px] text-neutral-500 font-bold tracking-widest uppercase">Camera Settings</span>
                <div className="flex items-center gap-3 text-sm md:text-base font-mono text-gold uppercase">
                  {project.metadata.iso && <span>ISO {project.metadata.iso}</span>}
                  {project.metadata.aperture && <span>F/{project.metadata.aperture}</span>}
                  {project.metadata.fps && <span>{project.metadata.fps} FPS</span>}
                </div>
              </div>
            )}
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
            {project.mediaType === 'video' ? (
              renderVideo(project.mediaUrl, project.title)
            ) : (
              <img 
                src={project.mediaUrl} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt={project.title}
              />
            )}
            
            {/* Dark overlay at bottom for controls */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
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
        
        <Link href="/our-work" className="group block relative w-full aspect-[4/3] md:aspect-[21/9] rounded-[2rem] overflow-hidden border border-neutral-800 hover:border-neutral-700 transition-colors duration-500 shadow-2xl">
          
          {/* Background Image */}
          <div className="absolute inset-0 bg-black z-0">
            <Image 
              src={nextProject.image}
              alt={nextProject.title}
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
              {nextProject.title}
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
