"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export default function VideoModal({ isOpen, onClose, url }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !url) return null;

  const renderContent = () => {
    const lowerUrl = url.toLowerCase();
    
    // YouTube
    if (lowerUrl.includes('youtube.com/watch?v=') || lowerUrl.includes('youtu.be/')) {
      let videoId = "";
      if (lowerUrl.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1]?.split('&')[0];
      } else {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      }
      
      if (videoId) {
        return (
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            className="w-full h-full object-contain bg-black rounded-lg shadow-2xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        );
      }
    }
    
    // Vimeo
    if (lowerUrl.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      if (videoId) {
        return (
          <iframe 
            src={`https://player.vimeo.com/video/${videoId}?autoplay=1`}
            className="w-full h-full object-contain bg-black rounded-lg shadow-2xl"
            allow="autoplay; fullscreen; picture-in-picture" 
            allowFullScreen
          />
        );
      }
    }
    
    // Instagram
    if (lowerUrl.includes('instagram.com/p/') || lowerUrl.includes('instagram.com/reel/')) {
      let embedUrl = url;
      // strip query params just in case for clean embed
      embedUrl = embedUrl.split('?')[0];
      if (!embedUrl.endsWith('/embed') && !embedUrl.endsWith('/embed/')) {
        embedUrl = embedUrl.endsWith('/') ? `${embedUrl}embed` : `${embedUrl}/embed`;
      }
      return (
        <iframe 
          src={embedUrl}
          className="w-full h-full max-w-[400px] object-contain bg-white rounded-lg shadow-2xl mx-auto"
          frameBorder="0"
          scrolling="no"
          allowTransparency="true"
          allow="encrypted-media"
        />
      );
    }
    
    // Direct Video file fallback
    if (lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm')) {
      return (
        <video 
          src={url} 
          className="w-full h-full object-contain bg-black rounded-lg shadow-2xl" 
          controls 
          autoPlay 
        />
      );
    }

    // Fallback message for unsupported links
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-neutral-900 rounded-lg shadow-2xl p-8 text-center border border-white/10">
        <p className="text-white text-lg font-bold mb-4">This link cannot be previewed directly.</p>
        <a href={url} target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-gold text-black font-bold uppercase tracking-widest text-xs rounded hover:bg-white transition-colors">
          Open Link in New Tab
        </a>
      </div>
    );
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/50 hover:text-white transition-colors z-[110] bg-black/50 hover:bg-black p-3 rounded-full border border-white/10 hover:border-gold hover:text-gold"
      >
        <X className="w-6 h-6 sm:w-8 sm:h-8 stroke-[1.5]" />
      </button>

      <div 
        className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {renderContent()}
      </div>
    </div>
  );
}
