import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BtsImageGallery from "@/components/BtsImageGallery";

// Format the slug into a Title for the Hero section.
function formatSlugToTitle(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function BtsDetail({ params }) {
  const { slug } = await params;
  const title = formatSlugToTitle(slug || "");

  // Mock array of images with varying spans for a bento-style grid (mixing 16:9 and 9:16 looks)
  const detailImages = [
    { src: "/images/hero-bg.jpg", spanClass: "col-span-1 md:col-span-2 row-span-1" },       // Landscape (16:9)
    { src: "/images/services-bg.jpg", spanClass: "col-span-1 row-span-2" },                  // Portrait (9:16)
    { src: "/images/hero-bg.jpg", spanClass: "col-span-1 md:col-span-2 row-span-1" },       // Landscape (16:9)
    { src: "/images/services-bg.jpg", spanClass: "col-span-1 md:col-span-2 row-span-2" },   // Large Feature
    { src: "/images/hero-bg.jpg", spanClass: "col-span-1 row-span-2" },                      // Portrait (9:16)
    { src: "/images/services-bg.jpg", spanClass: "col-span-1 md:col-span-2 row-span-1" },   // Landscape (16:9)
    { src: "/images/hero-bg.jpg", spanClass: "col-span-1 row-span-1" },                      // Square-ish
    { src: "/images/services-bg.jpg", spanClass: "col-span-1 md:col-span-2 row-span-1" },   // Landscape (16:9)
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-gold selection:text-black">
      <Navbar />
      
      <main>
        {/* Breadcrumb Hero Section */}
        <section className="relative w-full pt-32 pb-20 lg:pt-48 lg:pb-32 bg-[#050505] flex items-center justify-center border-b border-white/10 z-10">
          {/* Background */}
          <div className="absolute inset-0 z-0">
             <Image src="/images/hero-bg.jpg" fill className="object-cover opacity-10 grayscale" alt="BTS Background" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/80" />
          </div>

          <div className="container mx-auto px-6 max-w-5xl flex flex-col items-center justify-center text-center relative z-10 mt-8 lg:mt-0">
            
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-mono tracking-widest text-neutral-400 mb-8 uppercase">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-neutral-600" />
              <Link href="/bts" className="hover:text-gold transition-colors">BTS</Link>
              <ChevronRight className="w-3 h-3 text-neutral-600" />
              <span className="text-gold">{title}</span>
            </nav>

            <span className="font-script text-3xl md:text-5xl text-gold mb-4 md:mb-6 -rotate-2">Behind The Scenes</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas uppercase tracking-widest text-white leading-none drop-shadow-xl px-4">
              {title}
            </h1>
            <div className="h-[2px] w-24 bg-gold mt-8 shadow-[0_0_15px_rgba(252,166,3,0.6)]" />
          </div>
        </section>

        {/* Image Only Gallery Section */}
        <section className="py-20 lg:py-32 bg-[#f5f0e6] w-full relative z-20 border-t border-neutral-300">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[1600px]">
             
             {/* Bento Grid with Lightbox */}
             <BtsImageGallery images={detailImages} title={title} />

             {/* Back Button */}
             <div className="w-full flex justify-center mt-24">
               <Link href="/bts" className="group relative border border-gold/40 text-gold hover:text-black px-10 py-4 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-4 transition-all duration-500 rounded-sm overflow-hidden">
                 <ArrowLeft className="w-4 h-4 relative z-10 group-hover:-translate-x-1 transition-transform duration-300" />
                 <span className="relative z-10">BACK TO GALLERY</span>
                 <div className="absolute inset-0 bg-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />
               </Link>
             </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
