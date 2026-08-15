import { Lightbulb, Pencil, Camera, Clapperboard, Send, ArrowRight } from "lucide-react";

const steps = [
  { icon: Lightbulb, title: "01. CONCEPT", desc: "Understanding your vision & goals" },
  { icon: Pencil, title: "02. PLAN", desc: "Strategy, scripting & creative planning" },
  { icon: Camera, title: "03. SHOOT", desc: "Cinematic filming with precision" },
  { icon: Clapperboard, title: "04. EDIT", desc: "Editing, color & sound that brings life" },
  { icon: Send, title: "05. DELIVER", desc: "Final output that creates impact" },
];

export default function ProcessSection() {
  return (
    <section className="relative bg-[#f5f0e6] text-black py-32 px-6">
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="mb-16">
          <span className="font-script text-gold text-3xl font-bold">Our Process</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mt-2">From Idea to Impact</h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
            
            return (
              <div key={i} className="flex flex-col items-center flex-1 relative group w-full md:w-auto">
                <div className="relative w-24 h-24 mb-6 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  {/* Paper sketch background effect */}
                  <div className="absolute inset-0 bg-white shadow-md border border-neutral-200 rotate-3 group-hover:rotate-6 transition-transform" />
                  <div className="absolute inset-0 bg-white/50 border border-neutral-300 -rotate-2" />
                  <Icon className="w-8 h-8 text-neutral-800 relative z-10 stroke-[1.5]" />
                </div>
                
                <h3 className="font-bold text-[11px] tracking-widest uppercase mb-2">{step.title}</h3>
                <p className="text-neutral-600 text-xs text-center max-w-[140px] leading-relaxed">{step.desc}</p>

                {/* Arrow connecting to next step */}
                {!isLast && (
                  <div className="hidden md:block absolute top-12 -right-8 text-neutral-300">
                     <svg className="w-12 h-4 text-neutral-400" fill="none" viewBox="0 0 48 16">
                       <path d="M0 8h46M40 2l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
