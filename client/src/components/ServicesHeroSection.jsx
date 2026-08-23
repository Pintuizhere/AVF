import Image from "next/image";

export default function ServicesHeroSection() {
  return (
    <section className="relative min-h-screen pt-32 pb-24 flex items-center bg-black overflow-hidden border-b-[8px] border-black border-dashed">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services-bg.jpg" // The placeholder or actual services background
          alt="Services Background"
          fill
          className="object-cover opacity-50 object-right"
          priority
        />
        {/* Gradient overlay to make left side darker */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        
        {/* Subtle noise/metal texture */}
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay z-10" />
      </div>

      {/* Frame corners */}
      <div className="absolute top-24 left-10 w-8 h-8 border-t-2 border-l-2 border-neutral-600 z-20" />
      <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-neutral-600 z-20" />
      <div className="absolute top-24 right-10 w-8 h-8 border-t-2 border-r-2 border-neutral-600 z-20" />
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-neutral-600 z-20" />

      {/* REC Indicator */}
      <div className="absolute top-32 right-12 flex items-center gap-2 text-red-500 font-mono text-sm z-20">
        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
        <span className="tracking-widest font-bold">REC</span>
      </div>

      {/* Side measurement marks */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20 opacity-40">
        {[...Array(20)].map((_, i) => (
          <div key={`tick-${i}`} className={`w-3 h-[1px] bg-white ${i % 5 === 0 ? 'w-5' : ''} ${i > 15 ? 'bg-red-500' : ''}`} />
        ))}
      </div>

      <div className="container mx-auto px-12 md:px-16 relative z-10">
        <div className="max-w-2xl flex flex-col items-start gap-4">
          
          <h1 className="text-7xl md:text-9xl font-bebas uppercase tracking-tighter leading-none text-white">
            Services
          </h1>
          
          <h2 className="text-4xl md:text-5xl font-script text-gold -rotate-2 ml-4">
            We Bring Your Vision<br />
            To Life.
          </h2>

          <p className="text-sm font-medium tracking-wide text-neutral-300 leading-relaxed max-w-sm mt-8">
            From concept to screen, we offer end-to-end visual storytelling services that connect, inspire and leave a lasting impact.
          </p>

        </div>
      </div>

    </section>
  );
}
