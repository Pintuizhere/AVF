"use client";

import { ArrowRight, ArrowLeft, Star } from "lucide-react";
import { useState, useEffect } from "react";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(window.innerWidth >= 768 ? 3 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (reviews.length <= visibleCards) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.ceil(reviews.length / visibleCards) - 1;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);
    
    return () => clearInterval(interval);
  }, [reviews.length, visibleCards]);

  const fetchTestimonials = async () => {
    try {
      const [testRes, settingsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/testimonials`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/settings`)
      ]);
      const data = await testRes.json();
      setReviews(data);

      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        if (settingsData.testimonialsSectionVisible !== undefined) {
          setIsVisible(settingsData.testimonialsSectionVisible);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <section className="bg-[#0d0d0d] text-white py-16 md:py-32 px-6 overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-8 bg-gold" />
              <span className="text-gold text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase">
                Testimonials
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              What Our Clients Say
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-gold hover:border-gold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => {
                const maxIndex = Math.ceil(reviews.length / visibleCards) - 1;
                setCurrentIndex(prev => Math.min(Math.max(0, maxIndex), prev + 1));
              }}
              className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-black hover:bg-gold hover:border-gold transition-all"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
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
          <div className="relative">
            <div 
              className="flex transition-transform duration-700 ease-in-out gap-8"
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 2}rem))`
              }}
            >
              {reviews.map((review) => (
                <div 
                  key={review._id} 
                  className="w-full md:w-[calc(33.333%-1.35rem)] shrink-0 bg-neutral-900/50 border border-white/10 p-8 rounded-sm relative group hover:bg-neutral-900 transition-colors flex flex-col min-h-[300px]"
                >
                  <span className="absolute top-4 left-4 text-gold/20 font-serif text-6xl leading-none">"</span>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <p className="text-neutral-300 text-sm leading-relaxed mb-8 flex-1 italic break-words line-clamp-6">
                      {review.text}
                    </p>
                    
                    <div>
                      <div className="flex gap-1 text-gold mb-4">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className={`w-3 h-3 ${j < (review.rating || 5) ? 'fill-current text-gold' : 'text-neutral-700'}`} />
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                           {review.avatarUrl ? (
                             <img src={review.avatarUrl} alt={review.author} className="w-full h-full object-cover" />
                           ) : (
                             <span className="text-xs font-bold text-neutral-500 uppercase">{review.author ? review.author[0] : 'A'}</span>
                           )}
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-white truncate">{review.author}</h4>
                          <p className="text-neutral-500 text-[10px] tracking-widest uppercase truncate">{review.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Dots */}
            {Math.ceil(reviews.length / visibleCards) > 1 && (
              <div className="flex justify-center gap-3 mt-12">
                {Array.from({ length: Math.ceil(reviews.length / visibleCards) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? "bg-gold scale-125" : "bg-neutral-700 hover:bg-neutral-500"
                    }`}
                    aria-label={`Go to page ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
