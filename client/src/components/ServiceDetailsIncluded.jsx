import { Search, FileText, Video, Scissors, CheckCircle } from 'lucide-react';

const inclusions = [
  {
    icon: <Search className="w-10 h-10 mb-6 text-gold stroke-1" />,
    title: "RESEARCH & CONCEPT",
    description: "In-depth research and story development."
  },
  {
    icon: <FileText className="w-10 h-10 mb-6 text-gold stroke-1" />,
    title: "SCRIPTING & PLANNING",
    description: "Well-structured scripts and detailed planning."
  },
  {
    icon: <Video className="w-10 h-10 mb-6 text-gold stroke-1" />,
    title: "FILMING",
    description: "Cinematic shooting with professional equipment."
  },
  {
    icon: <Scissors className="w-10 h-10 mb-6 text-gold stroke-1" />,
    title: "EDITING & SOUND DESIGN",
    description: "Seamless editing, sound design & color grading."
  },
  {
    icon: <CheckCircle className="w-10 h-10 mb-6 text-gold stroke-1" />,
    title: "FINAL DELIVERY",
    description: "High-quality final output in all required formats."
  }
];

export default function ServiceDetailsIncluded() {
  return (
    <section className="relative w-full py-24 bg-black text-white mt-8">
      {/* Texture Overlay */}
      <div className="bg-noise absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bebas mb-16 tracking-wider text-center lg:text-left">
          WHAT'S INCLUDED
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {inclusions.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left group cursor-default">
              <div className="p-4 rounded-full border border-white/5 bg-white/5 mb-6 group-hover:bg-gold/10 group-hover:border-gold/30 transition-colors duration-500">
                {item.icon}
              </div>
              <h3 className="font-bebas text-xl tracking-wider mb-3 text-gray-200">{item.title}</h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed max-w-[200px]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
