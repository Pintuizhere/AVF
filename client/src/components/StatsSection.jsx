"use client";

import { useEffect, useState, useRef } from "react";
import { Film, Target, Users, Clock } from "lucide-react";

function AnimatedCounter({ end, duration = 2000 }) {
  const [count, setCount] = useState(1);
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
            
            setCount(Math.floor(1 + easeOutExpo * (end - 1)));
            
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
  const [stats, setStats] = useState({
    stat1_num: 150, stat1_label: "Projects",
    stat2_num: 10, stat2_label: "Years Experience",
    stat3_num: 50, stat3_label: "Creative Team",
    stat4_num: 5000, stat4_label: "Hours of Footage",
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/stats?page=home`);
        const data = await res.json();
        if (data && data.stats) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="w-full bg-[#e9e6dc] text-black mt-8 relative z-10 border-y-[6px] border-dotted border-[#111]">
      <div className="container mx-auto px-6 py-10 md:py-14 max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-black/20">
          
          <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-3 sm:gap-4 lg:gap-6 px-4 pt-6 pb-2 sm:py-0">
            <Film className="w-10 h-10 md:w-12 md:h-12 text-black stroke-[1.5]" />
            <div className="flex flex-col">
              <h4 className="text-4xl md:text-4xl font-black leading-none tracking-tight">
                <AnimatedCounter end={stats.stat1_num} duration={2500} />+
              </h4>
              <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-black/60 mt-2 uppercase">{stats.stat1_label}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-3 sm:gap-4 lg:gap-6 px-4 pt-6 pb-2 sm:py-0">
            <Target className="w-10 h-10 md:w-12 md:h-12 text-black stroke-[1.5]" />
            <div className="flex flex-col">
              <h4 className="text-4xl md:text-4xl font-black leading-none tracking-tight">
                <AnimatedCounter end={stats.stat2_num} duration={1500} />+
              </h4>
              <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-black/60 mt-2 uppercase">{stats.stat2_label}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-3 sm:gap-4 lg:gap-6 px-4 pt-6 pb-2 sm:py-0">
            <Users className="w-10 h-10 md:w-12 md:h-12 text-black stroke-[1.5]" />
            <div className="flex flex-col">
              <h4 className="text-4xl md:text-4xl font-black leading-none tracking-tight">
                <AnimatedCounter end={stats.stat3_num} duration={2000} />+
              </h4>
              <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-black/60 mt-2 uppercase">{stats.stat3_label}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-3 sm:gap-4 lg:gap-6 px-4 pt-6 pb-2 sm:py-0">
            <Clock className="w-10 h-10 md:w-12 md:h-12 text-black stroke-[1.5]" />
            <div className="flex flex-col">
              <h4 className="text-4xl md:text-4xl font-black leading-none tracking-tight">
                <AnimatedCounter end={stats.stat4_num} duration={3000} />+
              </h4>
              <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-black/60 mt-2 uppercase">{stats.stat4_label}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
