"use client";

import { useEffect, useState, useRef } from "react";
import { Film, Target, Users, Clock } from "lucide-react";

function AnimatedCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime = null;
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Smooth ease-out curve
            const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            
            setCount(Math.floor(easeOutExpo * end));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.unobserve(element);
        }
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsSection() {
  return (
    <div className="w-full bg-[#e9e6dc] text-black mt-8 relative z-10 border-y-[6px] border-dotted border-[#111]">
      <div className="container mx-auto px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-black/20">
          
          <div className="flex items-center justify-center gap-4 lg:gap-6 px-4 pt-4 sm:pt-0">
            <Film className="w-10 h-10 md:w-12 md:h-12 text-black stroke-[1.5]" />
            <div className="flex flex-col">
              <h4 className="text-3xl md:text-4xl font-black leading-none tracking-tight">
                <AnimatedCounter end={150} duration={2500} />+
              </h4>
              <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-black/60 mt-1.5 uppercase">Projects</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 lg:gap-6 px-4 pt-8 sm:pt-0">
            <Target className="w-10 h-10 md:w-12 md:h-12 text-black stroke-[1.5]" />
            <div className="flex flex-col">
              <h4 className="text-3xl md:text-4xl font-black leading-none tracking-tight">
                <AnimatedCounter end={10} duration={1500} />+
              </h4>
              <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-black/60 mt-1.5 uppercase">Years Experience</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 lg:gap-6 px-4 pt-8 sm:pt-0">
            <Users className="w-10 h-10 md:w-12 md:h-12 text-black stroke-[1.5]" />
            <div className="flex flex-col">
              <h4 className="text-3xl md:text-4xl font-black leading-none tracking-tight">
                <AnimatedCounter end={50} duration={2000} />+
              </h4>
              <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-black/60 mt-1.5 uppercase">Creative Team</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 lg:gap-6 px-4 pt-8 sm:pt-0">
            <Clock className="w-10 h-10 md:w-12 md:h-12 text-black stroke-[1.5]" />
            <div className="flex flex-col">
              <h4 className="text-3xl md:text-4xl font-black leading-none tracking-tight">
                <AnimatedCounter end={5000} duration={3000} />+
              </h4>
              <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-black/60 mt-1.5 uppercase">Hours of Footage</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
