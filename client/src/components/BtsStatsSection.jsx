import { Film, Target, Users, Clock } from "lucide-react";

export default function BtsStatsSection() {
  const stats = [
    { icon: Film, value: "150+", label: "PROJECTS" },
    { icon: Target, value: "10+", label: "YEARS EXPERIENCE" },
    { icon: Users, value: "50+", label: "CREATIVE TEAM" },
    { icon: Clock, value: "5000+", label: "HOURS OF FOOTAGE" }
  ];

  return (
    <section className="relative w-full bg-[#eae3d5] py-8 z-30 shadow-[0_-15px_30px_rgba(0,0,0,0.8)] border-y-2 border-dashed border-[#b38f51]/40">
      {/* Texture */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-multiply" />
      
      {/* Rough Edge Top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-black opacity-10 blur-[2px]" />
      <div className="absolute top-0 left-0 w-full h-[3px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHBvbHlnb24gZmlsbD0iI2VhZTNkNSIgcG9pbnRzPSIwLDAgOCwwIDgsOCAwLDggIi8+Cgk8cG9seWdvbiBmaWxsPSIjMGQwZDBkIiBwb2ludHM9IjAsMCA0LDQgOCwwICIvPgo8L3N2Zz4=')] opacity-30 -translate-y-[2px]" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10 flex flex-wrap justify-between items-center gap-y-8 divide-x-0 md:divide-x-2 divide-neutral-400/30">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-4 w-full md:w-auto flex-1 justify-center px-4">
            <div className="w-12 h-12 text-[#2a2a2a] shrink-0">
              <stat.icon className="w-full h-full stroke-[1]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-black font-bebas tracking-wide leading-none">{stat.value}</span>
              <span className="text-[10px] font-bold text-neutral-600 tracking-widest uppercase mt-1">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Rough Edge Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHBvbHlnb24gZmlsbD0iI2VhZTNkNSIgcG9pbnRzPSIwLDggOCw4IDgsMCAwLDAgIi8+Cgk8cG9seWdvbiBmaWxsPSIjMGQwZDBkIiBwb2ludHM9IjAsOCA0LDQgOCw4ICIvPgo8L3N2Zz4=')] opacity-30 translate-y-[2px]" />
    </section>
  );
}
