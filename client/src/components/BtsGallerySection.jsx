"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function BtsGallerySection() {
  const [galleryMedia, setGalleryMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchBts();
  }, []);

  const fetchBts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bts");
      const data = await res.json();
      setGalleryMedia(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = galleryMedia.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(galleryMedia.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Optional: scroll to top of gallery
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="gallery" className="relative w-full bg-[#050505] py-24 md:py-32 z-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-[1600px]">
        
        {/* Minimal Header */}
        <div className="flex flex-col items-center justify-center text-center mb-16 md:mb-24">
          <span className="text-gold text-xs font-bold tracking-[0.4em] uppercase mb-6 block">
            Exclusive
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bebas uppercase tracking-widest text-white leading-none">
            BTS GALLERY
          </h2>
          <div className="h-[1px] w-24 bg-gold mt-8" />
        </div>

        {/* Masonry Media Gallery */}
        {loading ? (
          <div className="text-center text-neutral-500 py-20 font-bold uppercase tracking-widest">
            Loading Gallery...
          </div>
        ) : galleryMedia.length === 0 ? (
          <div className="text-center text-neutral-500 py-20 font-bold uppercase tracking-widest">
            No Behind The Scenes content yet.
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 mt-8">
            {currentItems.map((media) => {
              
              const MediaContent = (
                <div 
                  onClick={() => !media.url && setSelectedMedia(media)}
                  className={`break-inside-avoid relative w-full bg-white p-2 md:p-3 border-2 border-black shadow-[6px_6px_0px_0px_#fca603] md:shadow-[8px_8px_0px_0px_#fca603] group transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_#fca603] md:hover:shadow-[12px_12px_0px_0px_#fca603] mb-8 md:mb-10 ${!media.url ? 'cursor-pointer' : ''}`}
                >
                  {/* Inner Media Container */}
                  <div className={`relative w-full ${media.aspect} overflow-hidden bg-[#111] border border-black`}>
                    
                    {media.type === 'video' ? (
                       <div className="w-full h-full bg-black relative flex items-center justify-center filter grayscale-[0.3] contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-out">
                         <img src={media.src} alt={media.title || "Video"} className="absolute inset-0 w-full h-full object-cover opacity-50" />
                         <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:border-gold group-hover:text-gold transition-colors z-10">
                           <Play className="w-6 h-6 ml-1 fill-current" />
                         </div>
                       </div>
                    ) : (
                      <img
                        src={media.src}
                        alt={media.title || "Behind the scenes photo"}
                        className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.3] contrast-125 group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    )}
                    
                    {/* Subtle dark gradient overlay to make images look cinematic */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
              );

              // Wrap in an anchor tag if a URL exists
              return media.url ? (
                <Link href={media.url} key={media._id} target="_blank" rel="noopener noreferrer" className="block outline-none">
                  {MediaContent}
                </Link>
              ) : (
                <div key={media._id}>{MediaContent}</div>
              );

            })}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 md:mt-16 gap-3 md:gap-4 flex-wrap">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center border-2 border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] disabled:translate-y-1 disabled:translate-x-1 transition-all hover:bg-neutral-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-1.5 md:gap-2 flex-wrap justify-center">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-9 h-9 md:w-10 md:h-10 flex items-center justify-center border-2 border-black font-bold text-sm transition-all ${
                    currentPage === i + 1 
                      ? 'bg-black text-white shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] translate-y-1 translate-x-1' 
                      : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center border-2 border-black bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] disabled:translate-y-1 disabled:translate-x-1 transition-all hover:bg-neutral-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8" onClick={() => setSelectedMedia(null)}>
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-gold transition-colors z-[110]"
            onClick={(e) => { e.stopPropagation(); setSelectedMedia(null); }}
          >
            <X className="w-8 h-8 md:w-10 md:h-10" />
          </button>
          
          <div className="relative w-full max-w-7xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === 'video' ? (
              <video src={selectedMedia.src} autoPlay controls className="max-w-full max-h-[90vh] object-contain" />
            ) : (
              <img src={selectedMedia.src} alt={selectedMedia.title || "Full screen media"} className="max-w-full max-h-[90vh] object-contain" />
            )}
          </div>
        </div>
      )}

    </section>
  );
}
