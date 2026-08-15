export default function ClientsSection() {
  const brands = ["CocaCola", "Nike", "SAMSUNG", "TATA", "vivo", "PUMA", "TEDx"];

  return (
    <section className="bg-[#e6e1d6] text-black py-16 px-6 border-t border-black/10">
      <div className="container mx-auto max-w-7xl">
        <h3 className="text-center font-bold text-sm tracking-[0.2em] uppercase mb-12 text-neutral-500">
          Trusted By Amazing Brands
        </h3>
        
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 md:gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
          {brands.map((brand, i) => (
            <div key={i} className="text-xl md:text-2xl font-black uppercase tracking-tighter">
              {/* Using text as placeholder for logos */}
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
