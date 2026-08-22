import { Camera, Film, Users, Trophy } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: <Camera className="w-8 h-8 mb-4 text-gold stroke-1" />,
    title: "AUTHENTIC STORYTELLING",
    description: "Stories that connect and inspire."
  },
  {
    icon: <Film className="w-8 h-8 mb-4 text-gold stroke-1" />,
    title: "CINEMATIC EXCELLENCE",
    description: "High-quality visuals and sound."
  },
  {
    icon: <Users className="w-8 h-8 mb-4 text-gold stroke-1" />,
    title: "EXPERT FILMMAKERS",
    description: "Experienced team with a creative vision."
  },
  {
    icon: <Trophy className="w-8 h-8 mb-4 text-gold stroke-1" />,
    title: "IMPACTFUL RESULTS",
    description: "Content that creates awareness and impact."
  }
];

export default function ServiceDetailsOverview({ overview }) {
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
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Photo Collage */}
          <div className="w-full lg:w-1/2 relative h-[600px] flex items-center justify-center">
            {/* Background Image (Slightly rotated) */}
            <div className="absolute w-64 h-80 bg-white p-3 shadow-xl transform -rotate-6 -translate-x-12 -translate-y-8 grayscale hover:grayscale-0 transition-all duration-500 hover:z-20">
              <div className="relative w-full h-full bg-gray-200 overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1579292850935-776326e5fc5f?q=80&w=1200&auto=format&fit=crop" 
                  alt="Documentary 1"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Foreground Image 1 (Slightly rotated other way) */}
            <div className="absolute w-72 h-48 bg-white p-3 shadow-2xl transform rotate-3 translate-x-12 translate-y-16 grayscale hover:grayscale-0 transition-all duration-500 z-10 hover:z-20">
              <div className="relative w-full h-full bg-gray-200 overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop" 
                  alt="Documentary 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Top foreground image */}
            <div className="absolute w-64 h-64 bg-white p-3 shadow-2xl transform rotate-2 -translate-y-12 translate-x-4 grayscale hover:grayscale-0 transition-all duration-500 z-10 hover:z-20">
              <div className="relative w-full h-full bg-gray-200 overflow-hidden">
                 <Image 
                  src="https://images.unsplash.com/photo-1518131370213-9a4a75e3c1ad?q=80&w=1200&auto=format&fit=crop" 
                  alt="Documentary 3"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bebas mb-6 tracking-wider">OVERVIEW</h2>
            
            <p className="text-gray-700 mb-12 leading-relaxed text-lg font-light max-w-xl">
              {overview.description}
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {features.map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="font-bebas text-xl tracking-wider mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 font-light px-4">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Bottom Torn Paper Edge for transitioning to black section */}
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
