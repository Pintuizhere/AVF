import Link from 'next/link';
import { Play, ArrowRight, Circle } from 'lucide-react';

export default function ServiceDetailsHero({ service }) {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex flex-col justify-center bg-black overflow-hidden border-b border-white/10">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${service.heroImage || 'https://images.unsplash.com/photo-1595188613149-a3d8c114f494?q=80&w=2070&auto=format&fit=crop'})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {/* Camera UI Top Bar */}
      <div className="absolute top-24 left-0 w-full z-10 px-8 flex justify-between items-center text-xs tracking-[0.2em] text-white/50 font-mono">
        <div className="flex gap-4">
          <Link href="/" className="hover:text-gold transition-colors">HOME</Link>
          <span>&gt;</span>
          <Link href="/services" className="hover:text-gold transition-colors">SERVICES</Link>
          <span>&gt;</span>
          <span className="text-white">{service.title.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-2 text-red-500 animate-pulse">
          <Circle size={10} fill="currentColor" />
          <span>REC</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-10 flex items-center h-full pt-16">
        <div className="max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-bebas text-white mb-4 uppercase tracking-wider">
            {service.title}
          </h1>
          
          <h2 className="text-3xl md:text-5xl font-script text-gold mb-6 leading-tight">
            {service.subtitle}
          </h2>
          
          <p className="text-lg text-gray-300 mb-10 max-w-lg font-light leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link 
              href="/contact" 
              className="group flex items-center gap-3 bg-gold text-black px-8 py-4 font-bold tracking-wider hover:bg-white transition-colors duration-300"
            >
              GET A QUOTE
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <button className="group flex items-center gap-4 text-white hover:text-gold transition-colors duration-300 font-bold tracking-wider">
              <span className="w-12 h-12 rounded-full border border-current flex items-center justify-center">
                <Play className="w-5 h-5 ml-1" />
              </span>
              WATCH SHOWREEL
            </button>
          </div>
        </div>
      </div>

      {/* Camera UI Bottom Bar / Viewfinder markings */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-8 text-xs tracking-[0.2em] text-white/40 font-mono bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm border border-white/10">
        <span>ISO 800</span>
        <span>+</span>
        <span>F/2.8</span>
        <span>+</span>
        <span>24FPS</span>
      </div>

      {/* Side Viewfinder Ticks */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`h-0.5 bg-white ${i % 5 === 0 ? 'w-4' : 'w-2'} ${i > 15 ? 'bg-red-500' : ''}`} />
        ))}
      </div>
    </section>
  );
}
