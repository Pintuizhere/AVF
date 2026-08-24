"use client";

import Link from "next/link";

const categories = [
  { id: "all", label: "All Work" },
  { id: "documentaries", label: "Documentaries" },
  { id: "events", label: "Events" },
  { id: "commercials", label: "Commercials" },
  { id: "products", label: "Products" },
  { id: "food", label: "Food" },
  { id: "model-photography", label: "Model" },
  { id: "jewellery", label: "Jewellery" },
  { id: "reels", label: "Reels" },
];

export default function WorkCategoryNav() {
  return (
    <div className="w-full bg-[#f5f0e6] z-30 relative pt-1 pb-1">
      <div className="w-full border-y-[6px] border-dotted border-[#111] py-8">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex items-center justify-start xl:justify-center gap-8 md:gap-12 overflow-x-auto scrollbar-hide whitespace-nowrap pb-2 pt-2 -mx-6 px-6 xl:mx-0 xl:px-0">
            {categories.map((cat) => (
              <Link 
                key={cat.id} 
                href={cat.id === 'all' ? '#' : `#${cat.id}`}
                onClick={(e) => {
                  if(cat.id === 'all') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`font-montserrat text-[10px] md:text-[11px] tracking-[0.2em] font-bold uppercase transition-all duration-300 flex-shrink-0 ${
                  cat.id === 'all' 
                    ? 'bg-[#FCA603] text-black px-6 py-2.5 rounded-full shadow-[0_4px_10px_rgba(252,166,3,0.3)] hover:shadow-[0_6px_15px_rgba(252,166,3,0.5)] hover:-translate-y-0.5'
                    : 'text-neutral-800 hover:text-black hover:-translate-y-0.5'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
