"use client";

import Link from "next/link";

export default function WorkCategoryNav({ customCategories = [] }) {
  const categories = [
    { id: "all", label: "All Work" },
    ...customCategories.map(cat => ({
      id: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      label: cat
    }))
  ];

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
                className={`font-montserrat text-[10px] md:text-[11px] tracking-[0.2em] font-bold uppercase transition-all duration-300 flex-shrink-0 text-neutral-800 hover:text-black hover:-translate-y-0.5`}
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
