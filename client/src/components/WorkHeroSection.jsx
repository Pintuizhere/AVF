import Image from "next/image";
import Link from "next/link";

export default function WorkHeroSection() {
  const categories = [
    { id: "all", label: "ALL WORK", active: true },
    { id: "documentaries", label: "DOCUMENTARIES" },
    { id: "events", label: "EVENTS" },
    { id: "commercials", label: "COMMERCIALS" },
    { id: "products", label: "PRODUCTS" },
    { id: "food", label: "FOOD" },
    { id: "model", label: "MODEL" },
    { id: "jewellery", label: "JEWELLERY" },
    { id: "reels", label: "REELS" },
  ];

  return (
    <>
      <section className="relative h-[100dvh] w-full pt-20 pb-8 flex flex-col justify-center bg-black overflow-hidden border-b-[1px] border-neutral-900">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/services-bg.jpg" // Using available placeholder
            alt="Work Background"
            fill
            className="object-cover opacity-40 object-right"
            priority
          />
          {/* Gradient overlays to match the dark cinematic feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          
          {/* Subtle noise/metal texture */}
          <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay z-10" />
        </div>

        {/* Frame corners */}
        <div className="absolute top-28 md:top-32 left-4 md:left-8 w-6 md:w-8 h-6 md:h-8 border-t-2 border-l-2 border-neutral-600 z-20" />
        <div className="absolute bottom-8 left-4 md:left-8 w-6 md:w-8 h-6 md:h-8 border-b-2 border-l-2 border-neutral-600 z-20" />
        <div className="absolute top-28 md:top-32 right-4 md:right-8 w-6 md:w-8 h-6 md:h-8 border-t-2 border-r-2 border-neutral-600 z-20" />
        <div className="absolute bottom-8 right-4 md:right-8 w-6 md:w-8 h-6 md:h-8 border-b-2 border-r-2 border-neutral-600 z-20" />

        {/* Camera HUD Elements */}
        <div className="absolute top-32 md:top-36 left-1/2 -translate-x-1/2 flex items-center gap-4 md:gap-6 text-neutral-400 font-mono text-[8px] md:text-[10px] uppercase tracking-widest z-20 bg-black/50 px-4 md:px-6 py-1.5 md:py-2 rounded-full border border-neutral-800">
          <span>ISO 800</span>
          <span className="w-1 h-1 rounded-full bg-gold"></span>
          <span>F/2.8</span>
          <span className="w-1 h-1 rounded-full bg-gold"></span>
          <span>24FPS</span>
        </div>

        {/* REC Indicator */}
        <div className="absolute top-36 md:top-40 right-8 md:right-12 flex items-center gap-2 text-red-600 font-mono text-xs md:text-sm z-20">
          <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
          <span className="tracking-widest font-bold">REC</span>
        </div>

        {/* Side measurement marks */}
        <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20 opacity-40">
          {[...Array(20)].map((_, i) => (
            <div key={`tick-${i}`} className={`w-2 md:w-3 h-[1px] bg-white ${i % 5 === 0 ? 'w-4 md:w-5' : ''} ${i > 15 ? 'bg-red-600' : ''}`} />
          ))}
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative z-10 flex flex-col mt-4 md:mt-8">
          <div className="max-w-3xl flex flex-col items-start gap-2 md:gap-3">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-script text-gold -rotate-2 ml-2 md:ml-4">
              Our Work
            </h2>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bebas uppercase tracking-tighter leading-[0.85] text-white">
              STORIES WE&apos;VE<br />
              BROUGHT <span className="text-gold">TO LIFE.</span>
            </h1>

            <p className="text-xs md:text-sm font-medium tracking-wide text-neutral-400 leading-relaxed max-w-sm md:max-w-md mt-4 md:mt-6">
              Every frame, a purpose. Every project, a story.<br/>
              Explore our work across different industries<br/>
              and creative formats.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
