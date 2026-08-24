import Image from "next/image";

export default function ManifestoSection() {
  return (
    <section className="relative bg-[#f5f0e6] text-black py-16 lg:py-24 px-4 md:px-6 overflow-hidden flex items-center border-y border-neutral-300">
      
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg" // Dark cinematic camera image
          alt="Cinematic Camera"
          fill
          className="object-cover opacity-10 grayscale mix-blend-multiply hover:grayscale-0 hover:opacity-20 transition-all duration-1000 ease-in-out"
        />
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f0e6] via-[#f5f0e6]/80 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#f5f0e6_100%)] opacity-80" />
      </div>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-20 relative">
        
        {/* Left: Text Content */}
        <div className="lg:col-span-8 flex flex-col items-start z-10 pl-4 md:pl-12 border-l-4 border-gold">
          <div className="inline-block bg-white/60 px-4 py-2 mb-8 backdrop-blur-sm border border-neutral-300">
             <span className="font-bebas text-gold text-lg tracking-[0.3em] uppercase drop-shadow-sm">
               Our Manifesto
             </span>
          </div>
          
          <div className="space-y-6 lg:space-y-8 group">
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-800 hover:text-black transition-colors duration-500">
              We don&apos;t chase trends.
            </h3>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-800 hover:text-black transition-colors duration-500">
              We create <span className="text-gold font-script text-5xl md:text-7xl lg:text-8xl lowercase px-2 drop-shadow-sm">timeless</span> stories.
            </h3>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-neutral-800 hover:text-black transition-colors duration-500">
              Your story. Our vision.
            </h3>
            <h3 className="inline-block text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest text-black bg-gold mt-8 px-6 py-2 uppercase font-bebas shadow-lg">
              One impact.
            </h3>
          </div>
        </div>

        {/* Right: Bullet Points */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center z-10 w-full pt-12 lg:pt-0">
          <div className="space-y-8 relative before:absolute before:left-[11px] before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-gold/80 before:via-gold/20 before:to-transparent lg:before:hidden">
            
            {[
              { title: "Story First", desc: "The narrative dictates the frame." },
              { title: "People Always", desc: "Capturing genuine emotion." },
              { title: "Details Matter", desc: "Perfection in every pixel." },
              { title: "Impact Lasts", desc: "Visuals that resonate." }
            ].map((item, index) => (
              <div key={index} className="flex items-start lg:justify-end gap-6 group cursor-default">
                
                {/* Desktop layout: text on left, dot on right */}
                <div className="hidden lg:flex flex-col items-end text-right">
                  <span className="text-2xl font-bold tracking-wide text-neutral-800 group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </span>
                  <span className="text-sm font-mono tracking-widest text-neutral-500 uppercase mt-1 group-hover:text-neutral-700 transition-colors duration-300">
                    {item.desc}
                  </span>
                </div>
                
                {/* Dot */}
                <div className="relative mt-2 lg:mt-3">
                  <div className="w-6 h-6 rounded-full border border-gold/50 flex items-center justify-center bg-[#f5f0e6] group-hover:border-gold transition-colors duration-300 z-10 relative">
                     <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(252,166,3,0)] group-hover:shadow-[0_0_15px_rgba(252,166,3,0.6)] transition-shadow duration-300" />
                  </div>
                </div>

                {/* Mobile layout: text on right */}
                <div className="flex lg:hidden flex-col items-start text-left">
                  <span className="text-xl md:text-2xl font-bold tracking-wide text-neutral-800 group-hover:text-gold transition-colors duration-300">
                    {item.title}
                  </span>
                  <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase mt-1">
                    {item.desc}
                  </span>
                </div>
                
              </div>
            ))}

          </div>
        </div>
        
      </div>
    </section>
  );
}
