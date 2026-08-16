import Image from "next/image";

export default function ContactHeroSection() {
  return (
    <section className="relative min-h-[90vh] pt-32 pb-32 flex flex-col justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services-bg.jpg" // Using available placeholder
          alt="Contact Background"
          fill
          className="object-cover opacity-60 object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay z-10" />
      </div>

      {/* Frame corners */}
      <div className="absolute top-24 left-10 w-8 h-8 border-t-2 border-l-2 border-neutral-600 z-20" />
      <div className="absolute bottom-32 left-10 w-8 h-8 border-b-2 border-l-2 border-neutral-600 z-20" />
      <div className="absolute top-24 right-10 w-8 h-8 border-t-2 border-r-2 border-neutral-600 z-20" />
      <div className="absolute bottom-32 right-10 w-8 h-8 border-b-2 border-r-2 border-neutral-600 z-20" />

      {/* Camera HUD Elements */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 flex items-center gap-6 text-neutral-400 font-mono text-[10px] uppercase tracking-widest z-20 bg-black/50 px-6 py-2 rounded-full border border-neutral-800 shadow-md">
        <span>ISO 800</span>
        <span className="w-1 h-1 rounded-full bg-gold"></span>
        <span>F/2.8</span>
        <span className="w-1 h-1 rounded-full bg-gold"></span>
        <span>24FPS</span>
      </div>

      {/* REC Indicator */}
      <div className="absolute top-24 right-12 flex items-center gap-2 text-red-600 font-mono text-sm z-20">
        <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
        <span className="tracking-widest font-bold">REC</span>
      </div>

      {/* Side measurement marks */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20 opacity-40">
        {[...Array(20)].map((_, i) => (
          <div key={`tick-${i}`} className={`w-3 h-[1px] bg-white ${i % 5 === 0 ? 'w-5' : ''} ${i > 15 ? 'bg-red-600' : ''}`} />
        ))}
      </div>

      <div className="container mx-auto px-12 md:px-16 relative z-10 flex flex-col gap-8 mt-12">
        <div className="max-w-3xl flex flex-col items-start gap-2">
          <h2 className="text-4xl md:text-5xl font-script text-gold -rotate-2 ml-4">
            Let&apos;s Connect
          </h2>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bebas uppercase tracking-tighter leading-[0.85] text-white">
            HAVE A STORY<br />
            TO TELL?<br />
            LET&apos;S CREATE IT<br />
            <span className="text-gold">TOGETHER.</span>
          </h1>

          <p className="text-sm font-medium tracking-wide text-neutral-300 leading-relaxed max-w-sm mt-8 relative z-20">
            Whether it&apos;s a project inquiry, collaboration,<br/>
            or just a hello - we&apos;d love to hear from you.
          </p>
        </div>
      </div>
      
      {/* Torn Paper Bottom Edge */}
      <div className="absolute bottom-0 left-0 w-full h-[60px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHBvbHlnb24gZmlsbD0iI2VhZTNkNSIgcG9pbnRzPSIwLDggOCw4IDgsMCAwLDAgIi8+Cgk8cG9seWdvbiBmaWxsPSIjMGQwZDBkIiBwb2ludHM9IjAsOCA0LDQgOCw4ICIvPgo8L3N2Zz4=')] bg-repeat-x bg-bottom opacity-100 z-30 translate-y-[2px]" />
    </section>
  );
}
