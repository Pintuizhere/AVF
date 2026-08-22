import { Search, ClipboardList, Camera, Clapperboard, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  {
    num: "01",
    title: "DISCOVER",
    description: "Understanding the story and objective.",
    icon: <Search className="w-8 h-8 text-black stroke-1" />
  },
  {
    num: "02",
    title: "PLAN",
    description: "Research, script and strategy.",
    icon: <ClipboardList className="w-8 h-8 text-black stroke-1" />
  },
  {
    num: "03",
    title: "FILM",
    description: "Capturing real moments.",
    icon: <Camera className="w-8 h-8 text-black stroke-1" />
  },
  {
    num: "04",
    title: "EDIT",
    description: "Crafting the story with precision.",
    icon: <Clapperboard className="w-8 h-8 text-black stroke-1" />
  },
  {
    num: "05",
    title: "DELIVER",
    description: "Final cut delivered with impact.",
    icon: <CheckCircle2 className="w-8 h-8 text-black stroke-1" />
  }
];

export default function ServiceDetailsProcess() {
  return (
    <section className="relative w-full py-24 bg-[#f4f1ea] text-black">
      {/* Top Torn Paper Edge */}
      <div 
        className="absolute top-0 left-0 w-full h-8 -mt-8 z-20"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 40' preserveAspectRatio='none'%3E%3Cpath d='M0,40 C150,20 300,40 450,15 C600,40 750,10 900,35 C1050,15 1200,40 1200,40 L1200,40 L0,40 Z' fill='%23f4f1ea'/%3E%3C/svg%3E\")",
          backgroundSize: '100% 100%'
        }}
      />
      
      <div className="bg-noise absolute inset-0 mix-blend-multiply opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bebas mb-20 tracking-wider text-center">OUR PROCESS</h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center flex-1 w-full md:w-auto">
              
              <div className="flex flex-col items-center text-center group cursor-default mx-auto md:mx-0 w-full max-w-[180px]">
                {/* Icon Circle with rough edge look */}
                <div className="relative w-24 h-24 mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <div className="absolute inset-0 bg-white rounded-full opacity-80 border-2 border-black/10 group-hover:border-gold/50 transition-colors shadow-sm"></div>
                  {/* Fake rough edges using multiple overlapping circles */}
                  <div className="absolute inset-0 border border-black/10 rounded-[45%_55%_40%_60%] group-hover:border-gold/40 animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-0 border border-black/10 rounded-[55%_45%_60%_40%] group-hover:border-gold/40 animate-[spin_15s_linear_infinite_reverse]"></div>
                  <div className="relative z-10">{step.icon}</div>
                </div>
                
                <h3 className="font-bebas text-lg tracking-wider mb-2">
                  <span className="text-gold mr-1">{step.num}.</span> {step.title}
                </h3>
                <p className="text-sm text-gray-600 font-light px-2">{step.description}</p>
              </div>

              {/* Arrow Connector */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block text-gray-300 px-2 flex-shrink-0">
                  <ArrowRight className="w-6 h-6 stroke-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Torn Paper Edge for transitioning to black CTA */}
      <div 
        className="absolute bottom-0 left-0 w-full h-8 -mb-8 z-20"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 40' preserveAspectRatio='none'%3E%3Cpath d='M0,0 C150,20 300,0 450,25 C600,0 750,30 900,5 C1050,25 1200,0 1200,0 L1200,40 L0,40 Z' fill='%230a0a0a'/%3E%3C/svg%3E\")",
          backgroundSize: '100% 100%'
        }}
      />
    </section>
  );
}
