"use client";

import { Lightbulb, Pencil, Camera, Clapperboard, Send } from "lucide-react";

const steps = [
  { icon: Lightbulb, num: "01", title: "CONCEPT", desc: "Understanding your vision & goals" },
  { icon: Pencil, num: "02", title: "PLAN", desc: "Strategy, scripting & creative planning" },
  { icon: Camera, num: "03", title: "SHOOT", desc: "Cinematic filming with precision" },
  { icon: Clapperboard, num: "04", title: "EDIT", desc: "Editing, color & sound that brings life" },
  { icon: Send, num: "05", title: "DELIVER", desc: "Final output that creates impact" },
];

export default function ProcessSection() {
  return (
    <section className="relative bg-[#f5f0e6] text-black py-32 px-6 overflow-hidden">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        <div className="text-left mb-16 md:mb-24">
          <span className="font-script text-gold text-4xl md:text-5xl font-bold inline-block -rotate-2 mb-2 drop-shadow-sm ml-2">Our Process</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-neutral-900">From Idea to Impact</h2>
        </div>

        <div className="relative">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-[40%] left-10 right-10 h-0.5 bg-neutral-200 -translate-y-1/2 z-0">
             {/* Progress indicator gradient on the line */}
             <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold via-black to-transparent w-1/2 opacity-20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              
              return (
                <div key={i} className="relative z-10 flex flex-col items-center group cursor-pointer">
                  
                  {/* Card */}
                  <div className="bg-white w-full h-full rounded-[2rem] p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-3 border border-white relative overflow-hidden">
                    
                    {/* Background Number */}
                    <span className="absolute -top-6 -right-4 text-9xl font-black text-neutral-50 group-hover:text-gold/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-700 pointer-events-none select-none">
                      {step.num}
                    </span>

                    {/* Icon Container */}
                    <div className="w-24 h-24 rounded-full bg-neutral-50 flex items-center justify-center mb-8 relative group-hover:bg-black transition-colors duration-500 shadow-sm border border-neutral-100 group-hover:border-black group-hover:shadow-xl">
                      {/* Outer Ring */}
                      <div className="absolute inset-2 rounded-full border border-neutral-200 group-hover:border-neutral-800 transition-colors duration-500" />
                      <Icon className="w-10 h-10 text-neutral-800 group-hover:text-gold transition-colors duration-500 relative z-10 stroke-[1.5]" />
                    </div>
                    
                    {/* Text */}
                    <h3 className="font-bold text-sm tracking-widest uppercase mb-4 text-neutral-900 flex flex-col items-center gap-2">
                      <span className="text-gold text-xs font-black bg-gold/10 px-3 py-1 rounded-full">{step.num}</span>
                      {step.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed group-hover:text-neutral-700 transition-colors">
                      {step.desc}
                    </p>

                  </div>

                  {/* Connectors for mobile/tablet */}
                  {i !== steps.length - 1 && (
                    <div className="lg:hidden w-0.5 h-12 bg-gradient-to-b from-neutral-200 to-transparent my-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
