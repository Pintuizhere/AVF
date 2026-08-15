import { ArrowRight, Video, CalendarDays, Clapperboard, Package, Coffee, Camera, Film } from "lucide-react";

const services = [
  { icon: Video, title: "DOCUMENTARIES", desc: "Real stories. Real impact." },
  { icon: CalendarDays, title: "EVENTS", desc: "Cinematic coverage of every moment." },
  { icon: Clapperboard, title: "COMMERCIALS", desc: "Brands come alive on screen." },
  { icon: Package, title: "PRODUCTS", desc: "Showcasing products at their best." },
  { icon: Coffee, title: "FOOD", desc: "Tasty looks great on camera." },
  { icon: Camera, title: "MODEL PHOTOGRAPHY", desc: "Professional shots that stand out." },
  { icon: Film, title: "REELS", desc: "Short format. Big impact." }
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative bg-[#0d0d0d] pt-32 pb-32 text-white border-y border-white/5">
      {/* Film strip edge decoration */}
      <div className="absolute left-4 top-0 bottom-0 w-8 border-x border-white/10 flex flex-col justify-between py-4 opacity-30">
         {[...Array(20)].map((_, i) => (
           <div key={i} className="w-4 h-3 bg-white/20 mx-auto rounded-sm" />
         ))}
      </div>
      <div className="absolute right-4 top-0 bottom-0 w-8 border-x border-white/10 flex flex-col justify-between py-4 opacity-30 hidden md:flex">
         {[...Array(20)].map((_, i) => (
           <div key={i} className="w-4 h-3 bg-white/20 mx-auto rounded-sm" />
         ))}
      </div>

      <div className="container mx-auto px-16 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-script text-gold text-3xl font-bold">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mt-2">Our Services</h2>
          </div>
          <button className="flex items-center gap-2 text-gold text-xs font-bold tracking-widest uppercase hover:text-white transition-colors group">
            View All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mb-4 flex items-center justify-center text-gold border border-gold/20 rounded-md group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                  <Icon className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-bold text-[10px] tracking-widest uppercase mb-2">{svc.title}</h3>
                <p className="text-neutral-500 text-xs leading-relaxed px-2 group-hover:text-neutral-300 transition-colors">{svc.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
