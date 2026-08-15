import Image from "next/image";

export default function ManifestoSection() {
  return (
    <section className="relative bg-[#0a0a0a] text-white py-32 px-6 overflow-hidden">
      
      {/* Subtle Background Image */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/hero-bg.jpg" // Reusing the dark cinematic camera image
          alt="Cinematic Camera"
          fill
          className="object-cover"
        />
        {/* Gradient to fade out the background to black on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10 relative">
        
        {/* Left: Text Content */}
        <div className="flex flex-col items-start z-10 border-l-2 border-neutral-800 pl-8">
          <span className="font-bebas text-gold text-lg tracking-widest uppercase mb-8">Our Manifesto</span>
          
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-medium tracking-wide">We don&apos;t chase trends.</h3>
            <h3 className="text-2xl md:text-3xl font-medium tracking-wide">We create timeless stories.</h3>
            <h3 className="text-2xl md:text-3xl font-medium tracking-wide">Your story. Our vision.</h3>
            <h3 className="text-2xl md:text-3xl font-medium tracking-wide text-neutral-400">One impact.</h3>
          </div>
        </div>

        {/* Right: Bullet Points */}
        <div className="flex flex-col items-start lg:items-end justify-center z-10 w-full pt-8 lg:pt-0">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(252,166,3,0.6)]" />
               <span className="text-xl font-bold tracking-wide">Story First</span>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(252,166,3,0.6)]" />
               <span className="text-xl font-bold tracking-wide">People Always</span>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(252,166,3,0.6)]" />
               <span className="text-xl font-bold tracking-wide">Details Matter</span>
            </div>
            <div className="flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(252,166,3,0.6)]" />
               <span className="text-xl font-bold tracking-wide">Impact Lasts</span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
