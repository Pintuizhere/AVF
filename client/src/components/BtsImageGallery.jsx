"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X } from "lucide-react";

export default function BtsImageGallery({ images, title }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openLightbox = (imgSrc) => {
    setSelectedImage(imgSrc);
    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    if (typeof window !== "undefined") {
      document.body.style.overflow = "auto";
    }
  };

  const modalContent = selectedImage ? (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12 transition-opacity"
      onClick={closeLightbox}
    >
      {/* Close Button */}
      <button 
        className="absolute top-6 right-6 md:top-8 md:right-8 text-white/70 hover:text-white transition-colors z-[110] p-2 bg-black/50 rounded-full"
        onClick={closeLightbox}
        aria-label="Close modal"
      >
        <X className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Modal Image */}
      <div 
        className="relative w-full max-w-6xl h-full max-h-[85vh] rounded-[5px] overflow-hidden"
        onClick={(e) => e.stopPropagation()} 
      >
        <Image
          src={selectedImage}
          alt={`${title} Zoomed Image`}
          fill
          className="object-contain"
        />
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] gap-4 md:gap-6 grid-flow-row-dense">
        {images.map((img, i) => (
          <div 
            key={i} 
            className={`relative w-full h-full overflow-hidden group rounded-[5px] cursor-pointer shadow-md bg-neutral-200 ${img.spanClass}`}
            onClick={() => openLightbox(img.src)}
          >
            <Image
              src={img.src}
              alt={`${title} Image ${i + 1}`}
              fill
              className="object-cover filter grayscale-[0.3] contrast-[1.1] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            />
            {/* Slight overlay to blend with light theme */}
            <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal via Portal */}
      {mounted && modalContent && createPortal(modalContent, document.body)}
    </>
  );
}
