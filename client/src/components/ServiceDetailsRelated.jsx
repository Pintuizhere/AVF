import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const relatedProjects = [
  {
    id: 1,
    title: "THE UNSUNG HEROES",
    category: "Documentary",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "VOICES OF CHANGE",
    category: "Documentary",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "ROOTS & CULTURE",
    category: "Documentary",
    image: "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "BEYOND BOUNDARIES",
    category: "Documentary",
    image: "https://images.unsplash.com/photo-1518131370213-9a4a75e3c1ad?q=80&w=800&auto=format&fit=crop"
  }
];

export default function ServiceDetailsRelated() {
  return (
    <section className="relative w-full py-24 bg-[#f4f1ea] text-black">
      <div className="bg-noise absolute inset-0 mix-blend-multiply opacity-50 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-bebas tracking-wider">RELATED WORKS</h2>
          
          <Link href="/our-work" className="hidden md:flex items-center gap-2 text-gold font-bold tracking-wider hover:text-black transition-colors group">
            VIEW ALL PROJECTS
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="relative group/carousel">
          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 text-gold hover:text-black transition-colors hidden md:block opacity-0 group-hover/carousel:opacity-100">
            <ChevronLeft className="w-10 h-10" />
          </button>
          
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 text-gold hover:text-black transition-colors hidden md:block opacity-0 group-hover/carousel:opacity-100">
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProjects.map((project) => (
              <Link href={`/our-work/${project.id}`} key={project.id} className="group relative block overflow-hidden aspect-video bg-black">
                {/* Image */}
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white/80 group-hover:border-gold group-hover:text-gold transition-colors duration-500 scale-90 group-hover:scale-100">
                    <Play className="w-4 h-4 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bebas text-xl tracking-wider mb-1">{project.title}</h3>
                  <p className="text-gray-400 text-xs font-mono tracking-widest uppercase">{project.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <Link href="/our-work" className="md:hidden mt-8 flex justify-center items-center gap-2 text-gold font-bold tracking-wider hover:text-black transition-colors group">
          VIEW ALL PROJECTS
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      {/* Bottom transition back to black for Footer */}
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
