import Image from "next/image";

export default function WorkHeroSection() {
  return (
    <section className="relative w-full pt-40 md:pt-44 pb-12 flex flex-col items-center justify-center bg-black border-b-[1px] border-neutral-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services-bg.jpg"
          alt="Work Background"
          fill
          className="object-cover opacity-40"
          priority
        />
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40 z-10" />
      </div>

      <div className="relative z-20 container mx-auto px-6 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bebas uppercase tracking-widest text-gold drop-shadow-lg">
          Our Work
        </h1>
        <p className="text-neutral-300 mt-4 text-xs sm:text-sm md:text-base font-medium max-w-lg mx-auto">
          Every frame, a purpose. Every project, a story. Explore our work across different industries and creative formats.
        </p>
      </div>
    </section>
  );
}
