import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

export default function BtsGallerySection() {
  // Diverse media collection mixing 9:16 (portrait) and 16:9 (landscape) aspect ratios
  // Added support for links (url) and videos
  const galleryMedia = [
    { src: "/images/hero-bg.jpg", aspect: "aspect-[16/9]", type: "image", url: "" },
    { src: "/images/services-bg.jpg", aspect: "aspect-[9/16]", type: "image", url: "https://instagram.com" },
    { src: "/images/hero-bg.jpg", aspect: "aspect-[4/5]", type: "image", url: "" },
    { src: "/images/services-bg.jpg", aspect: "aspect-[16/9]", type: "video", url: "https://youtube.com" },
    { src: "/images/hero-bg.jpg", aspect: "aspect-[9/16]", type: "image", url: "" },
    { src: "/images/services-bg.jpg", aspect: "aspect-[16/9]", type: "video", url: "" },
    { src: "/images/hero-bg.jpg", aspect: "aspect-[9/16]", type: "image", url: "" },
  ];

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
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 mt-8">
          {galleryMedia.map((media, i) => {
            
            const MediaContent = (
              <div 
                className="break-inside-avoid relative w-full bg-[rgb(245,240,230)] p-1.5 md:p-2 shadow-[0_10px_30px_rgba(0,0,0,0.7)] group transition-all duration-700 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(252,166,3,0.15)] rounded-sm mb-8"
              >
                {/* Inner Media Container */}
                <div className={`relative w-full ${media.aspect} overflow-hidden bg-[#111] shadow-inner`}>
                  
                  {media.type === 'video' ? (
                     <div className="w-full h-full bg-black relative flex items-center justify-center filter grayscale-[0.3] contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-out">
                       <Image src={media.src} alt="Video Thumbnail" fill className="object-cover opacity-50" />
                       <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:border-gold group-hover:text-gold transition-colors z-10">
                         <Play className="w-6 h-6 ml-1 fill-current" />
                       </div>
                     </div>
                  ) : (
                    <Image
                      src={media.src}
                      alt={`Behind the scenes photo ${i + 1}`}
                      fill
                      className="object-cover filter grayscale-[0.3] contrast-125 group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  )}
                  
                  {/* Subtle dark gradient overlay to make images look cinematic */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-100 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            );

            // Wrap in an anchor tag if a URL exists
            return media.url ? (
              <Link href={media.url} key={i} target="_blank" rel="noopener noreferrer" className="block outline-none">
                {MediaContent}
              </Link>
            ) : (
              <div key={i}>{MediaContent}</div>
            );

          })}
        </div>

      </div>
    </section>
  );
}
