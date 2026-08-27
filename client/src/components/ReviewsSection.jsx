"use client";

import { ArrowRight, Star } from "lucide-react";
import { useState, useEffect } from "react";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/testimonials");
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-[#0d0d0d] text-white py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            What Our Clients Say
          </h2>
          <button className="flex items-center gap-2 text-gold text-xs font-bold tracking-widest uppercase hover:text-white transition-colors group">
            View All Reviews
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {loading ? (
          <div className="text-center text-neutral-500 py-20 font-bold uppercase tracking-widest">
            Loading Reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center text-neutral-500 py-20 font-bold uppercase tracking-widest">
            No Reviews Found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review._id} className="bg-neutral-900/50 border border-white/10 p-8 rounded-sm relative group hover:bg-neutral-900 transition-colors flex flex-col h-full">
                <span className="absolute top-4 left-4 text-gold/20 font-serif text-6xl leading-none">"</span>
                
                <div className="relative z-10 flex flex-col h-full">
                  <p className="text-neutral-300 text-sm leading-relaxed mb-8 flex-1 italic break-words">
                    {review.text}
                  </p>
                  
                  <div>
                    <div className="flex gap-1 text-gold mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-3 h-3 ${j < (review.rating || 5) ? 'fill-current text-gold' : 'text-neutral-700'}`} />
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center overflow-hidden">
                         {review.avatarUrl ? (
                           <img src={review.avatarUrl} alt={review.author} className="w-full h-full object-cover" />
                         ) : (
                           <span className="text-xs font-bold text-neutral-500 uppercase">{review.author ? review.author[0] : 'A'}</span>
                         )}
                      </div>
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white">{review.author}</h4>
                        <p className="text-neutral-500 text-[10px] tracking-widest uppercase">{review.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
