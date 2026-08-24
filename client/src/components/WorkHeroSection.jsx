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
      <section className="relative min-h-[100dvh] pt-32 pb-24 flex flex-col justify-center bg-black overflow-hidden border-b-[1px] border-neutral-900">
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
        <div className="absolute top-24 left-10 w-8 h-8 border-t-2 border-l-2 border-neutral-600 z-20" />
        <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-neutral-600 z-20" />
        <div className="absolute top-24 right-10 w-8 h-8 border-t-2 border-r-2 border-neutral-600 z-20" />
        <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-neutral-600 z-20" />

        {/* Camera HUD Elements */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center gap-6 text-neutral-400 font-mono text-[10px] uppercase tracking-widest z-20 bg-black/50 px-6 py-2 rounded-full border border-neutral-800">
          <span>ISO 800</span>
          <span className="w-1 h-1 rounded-full bg-gold"></span>
          <span>F/2.8</span>
          <span className="w-1 h-1 rounded-full bg-gold"></span>
          <span>24FPS</span>
        </div>

        {/* REC Indicator */}
        <div className="absolute top-24 right-12 flex items-center gap-2 text-gold font-mono text-sm z-20">
          <div className="w-3 h-3 rounded-full bg-gold animate-pulse shadow-[0_0_10px_rgba(252,166,3,0.8)]" />
          <span className="tracking-widest font-bold">REC</span>
        </div>

        {/* Side measurement marks */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20 opacity-40">
          {[...Array(20)].map((_, i) => (
            <div key={`tick-${i}`} className={`w-3 h-[1px] bg-white ${i % 5 === 0 ? 'w-5' : ''} ${i > 15 ? 'bg-gold' : ''}`} />
          ))}
        </div>

        <div className="container mx-auto px-12 md:px-16 relative z-10 flex flex-col gap-12">
          <div className="max-w-3xl flex flex-col items-start gap-4">
            <h2 className="text-4xl md:text-5xl font-script text-gold -rotate-2 ml-4">
              Our Work
            </h2>
            
            <h1 className="text-6xl md:text-8xl font-bebas uppercase tracking-tighter leading-[0.85] text-white">
              STORIES WE&apos;VE<br />
              BROUGHT <span className="text-gold">TO LIFE.</span>
            </h1>

            <p className="text-sm font-medium tracking-wide text-neutral-400 leading-relaxed max-w-md mt-6">
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
