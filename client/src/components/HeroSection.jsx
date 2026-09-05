"use client";

import { useState, useEffect } from "react";
import { Play, BatteryMedium } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const subtitleLines = [
  { type: 'dot', text: 'CINEMATIC', size: 'text-xs md:text-sm' },
  { type: 'dot', text: 'VISUALS.', size: 'text-xs md:text-sm' },
  { type: 'dot', text: 'POWERFUL', size: 'text-xs md:text-sm' },
  { type: 'dot', text: 'STORIES.', size: 'text-xs md:text-sm' },
  { type: 'dot', text: 'TIMELESS IMPACT.', size: 'text-[10px] md:text-xs mt-1' },
];

export default function HeroSection() {
  const [heroData, setHeroData] = useState(null);
  const [isReelPlaying, setIsReelPlaying] = useState(false);
  const [activeTextIndex, setActiveTextIndex] = useState(0);

  useEffect(() => {
    const fetchHero = async () => {
      const fallbackData = {
        headingLine1: "We Don't Just\nCreate Videos,",
        headingLine2: "We Tell Stories.",
        subtitle: "Cinematic Visuals. Powerful Stories.<br />Timeless Impact.",
        videoReelUrl: "",
        bgMedia: "/images/hero-bg.jpg",
        bgMediaType: "image"
      };

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/hero`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        
        if (data && Object.keys(data).length > 0) {
          setHeroData({
            headingLine1: data.headingLine1 || fallbackData.headingLine1,
            headingLine2: data.headingLine2 || fallbackData.headingLine2,
            subtitle: data.subtitle || fallbackData.subtitle,
            videoReelUrl: data.videoReelUrl || fallbackData.videoReelUrl,
            bgMedia: data.bgMedia || fallbackData.bgMedia,
            bgMediaType: data.bgMediaType || fallbackData.bgMediaType
          });
        } else {
          setHeroData(fallbackData);
        }
      } catch (error) {
        console.error("Error fetching hero data:", error);
        setHeroData(fallbackData);
      }
    };
    fetchHero();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTextIndex((prev) => (prev + 1) % subtitleLines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  if (!heroData) {
    return <section className="relative min-h-screen bg-black"></section>;
  }

  return (
    <section id="home" className="relative h-[100dvh] w-full pt-20 pb-8 flex items-center justify-center overflow-hidden bg-black">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {heroData.bgMediaType === 'video' ? (
          <video
            src={heroData.bgMedia}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <Image
            src={heroData.bgMedia}
            alt="Cinematic Background"
            fill
            className={`object-cover opacity-80 ${isReelPlaying ? 'animate-zoom-in-out' : ''}`}
            priority
          />
        )}
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent z-10" />
      </div>
      <div className="absolute top-28 left-8 w-16 h-16 border-t-2 border-l-2 border-white/30" />
      <div className="absolute top-28 right-8 w-16 h-16 border-t-2 border-r-2 border-white/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/30" />

      {/* REC Indicator */}
      <div className="absolute top-32 right-12 flex items-center gap-2 text-red-500 font-mono text-sm">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        <span className="tracking-widest font-bold">REC</span>
      </div>

      {/* Audio meter bars mockup */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-60 z-20 hidden md:flex">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`h-1 w-6 ${i > 15 ? 'bg-red-500' : i > 10 ? 'bg-yellow-500' : 'bg-white'}`} />
        ))}
      </div>


      <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10 mt-8 md:mt-12">
        
        {/* Left Content */}
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-col">
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold uppercase tracking-tighter leading-tight text-white opacity-0 animate-fade-up [animation-delay:200ms] whitespace-pre-line">
              {heroData.headingLine1}
            </h1>
            <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bebas text-gold uppercase tracking-widest mt-1 md:mt-2 lg:mt-3 origin-left opacity-0 animate-fade-up [animation-delay:400ms] ml-4 md:ml-8">
              {heroData.headingLine2}
            </h2>
          </div>

          <div className="flex items-stretch gap-5 opacity-0 animate-fade-up [animation-delay:600ms]">
            {/* Scroll Indicator */}
            <div className="flex flex-col items-center justify-between py-1">
              {subtitleLines.map((line, i) => (
                <div 
                  key={`ind-${i}`} 
                  onClick={() => setActiveTextIndex(i)}
                  className="cursor-pointer py-1 flex items-center justify-center min-h-[16px]"
                >
                  {line.type === 'number' ? (
                    <span className={`text-[9px] font-bold transition-colors duration-300 ${activeTextIndex === i ? 'text-gold' : 'text-neutral-600 hover:text-neutral-400'}`}>
                      {line.label}
                    </span>
                  ) : (
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeTextIndex === i ? 'bg-gold' : 'border border-neutral-600 hover:border-neutral-400'}`}></div>
                  )}
                </div>
              ))}
            </div>

            {/* Subtitle Text */}
            <div className="flex flex-col font-bold tracking-[0.2em] uppercase max-w-sm justify-between">
              {subtitleLines.map((line, i) => (
                <span 
                  key={`text-${i}`} 
                  onClick={() => setActiveTextIndex(i)}
                  className={`${line.size} cursor-pointer leading-relaxed transition-all duration-500 ${activeTextIndex === i ? 'text-gold opacity-100 scale-[1.02] origin-left' : 'text-neutral-500 opacity-50'}`}
                >
                  {line.text}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 mt-2 opacity-0 animate-fade-up [animation-delay:800ms]">
            <Link href="/our-work" className="bg-gold text-black px-6 md:px-8 py-3 md:py-4 text-[10px] md:text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors flex items-center gap-2">
              View Our Work
              <Play className="w-4 h-4" />
            </Link>

          </div>
        </div>

        {/* Right Content - Empty to let background show */}
        <div className="hidden lg:block relative min-h-[250px] w-full"></div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-8 left-12 flex items-center gap-2 text-neutral-400 opacity-0 animate-fade-in [animation-delay:1000ms]">
        <BatteryMedium className="w-6 h-6" />
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-sm tracking-[0.2em] opacity-0 animate-fade-in [animation-delay:1000ms]">
        00:00:12:05
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes zoom-in-out {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .animate-fade-up {
          animation: fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out forwards;
        }
        .animate-zoom-in-out {
          animation: zoom-in-out 20s ease-in-out infinite;
        }
      `}} />
    </section>
  );
}
