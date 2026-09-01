"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ProjectMediaViewer({ project }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <>
      <div 
        className="relative w-full aspect-square sm:aspect-video md:aspect-[16/9] lg:aspect-[21/9] p-2 md:p-6 bg-[#0a0a0a] flex flex-col justify-center shadow-[0_10px_40px_rgba(0,0,0,0.8)] group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* 4 Viewfinder Corners */}
        <div className="absolute top-0 left-0 w-6 h-6 md:w-16 md:h-16 border-t-[1.5px] border-l-[1.5px] border-gold transition-all duration-700 opacity-80 md:opacity-50 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:-translate-y-1" />
        <div className="absolute top-0 right-0 w-6 h-6 md:w-16 md:h-16 border-t-[1.5px] border-r-[1.5px] border-gold transition-all duration-700 opacity-80 md:opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
        <div className="absolute bottom-0 left-0 w-6 h-6 md:w-16 md:h-16 border-b-[1.5px] border-l-[1.5px] border-gold transition-all duration-700 opacity-80 md:opacity-50 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:translate-y-1" />
        <div className="absolute bottom-0 right-0 w-6 h-6 md:w-16 md:h-16 border-b-[1.5px] border-r-[1.5px] border-gold transition-all duration-700 opacity-80 md:opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:translate-y-1" />

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
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Navigation Arrows & Pagination Dots (Only show if multiple media items) */}
          {Array.isArray(project.mediaUrl) && project.mediaUrl.length > 1 && (
            <>
              <button className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-300 opacity-100 md:opacity-0 group-hover:opacity-100 md:-translate-x-4 md:group-hover:translate-x-0">
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 stroke-[1.5]" />
              </button>
              <button className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-300 opacity-100 md:opacity-0 group-hover:opacity-100 md:translate-x-4 md:group-hover:translate-x-0">
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 stroke-[1.5]" />
              </button>

              {/* Pagination Dots */}
              <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-gold shadow-[0_0_8px_#fca603]" />
                {project.mediaUrl.slice(1).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-neutral-500 hover:bg-neutral-400 transition-colors cursor-pointer" />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8" onClick={() => setIsModalOpen(false)}>
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-gold transition-colors z-[110]"
            onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
          >
            <X className="w-8 h-8 md:w-10 md:h-10" />
          </button>
          
          <div className="relative w-full max-w-7xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {project.mediaType === 'video' ? (
              <video src={project.mediaUrl} autoPlay controls className="max-w-full max-h-[90vh] object-contain" />
            ) : (
              <img src={project.mediaUrl} alt={project.title} className="max-w-full max-h-[90vh] object-contain" />
            )}

            {/* Modal Navigation Arrows (Only show if multiple media items) */}
            {Array.isArray(project.mediaUrl) && project.mediaUrl.length > 1 && (
              <>
                <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-300" onClick={(e) => e.stopPropagation()}>
                  <ChevronLeft className="w-5 h-5 md:w-8 md:h-8 stroke-[1.5]" />
                </button>
                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-300" onClick={(e) => e.stopPropagation()}>
                  <ChevronRight className="w-5 h-5 md:w-8 md:h-8 stroke-[1.5]" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
