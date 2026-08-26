"use client";

import { useState } from "react";
import { Plus, Save, Trash2, X, Star } from "lucide-react";

export default function AdminTestimonialsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      text: "AVF captured the essence of our brand beautifully. Highly professional and creative team!",
      author: "Rohit Sharma",
      role: "CEO, Elevate Brands",
    },
    {
      id: 2,
      text: "Their storytelling is next level. Every frame speaks emotion.",
      author: "Neha Kapoor",
      role: "Event Curator",
    },
    {
      id: 3,
      text: "On-time delivery, amazing output and a great experience overall.",
      author: "Arjun Verma",
      role: "Marketing Head, UrbanStrides",
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ text: "", author: "", role: "" });

  const handleUpdate = (id, field, value) => {
    setReviews(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleTextareaChange = (e, id) => {
    handleUpdate(id, 'text', e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const removeReview = (id) => {
    setReviews(prev => prev.filter(item => item.id !== id));
  };

  const handleAddNewItem = () => {
    if (!newItem.author || !newItem.text) return;
    
    const itemToAdd = {
      id: Date.now(),
      text: newItem.text,
      author: newItem.author,
      role: newItem.role || "Client"
    };
    setReviews(prev => [itemToAdd, ...prev]);
    setIsAdding(false);
    setNewItem({ text: "", author: "", role: "" }); // reset
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      
      {/* Floating Action Bar */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl mt-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Manage Testimonials</h1>
          <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Live WYSIWYG Editor. Click any text to edit directly.</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-transparent border border-[#222] hover:border-white text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" /> Add Testimonial
            </button>
          )}
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gold hover:bg-gold/90 text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors shadow-[0_0_15px_rgba(252,166,3,0.3)]">
            <Save className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2]" /> Save Changes
          </button>
        </div>
      </div>

      {/* Add New Testimonial Form */}
      {isAdding && (
        <div className="bg-[#0a0a0a] border border-gold/50 rounded-xl p-6 shadow-[0_0_20px_rgba(252,166,3,0.1)] relative">
          
          <button 
            onClick={() => setIsAdding(false)}
            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bebas uppercase tracking-widest text-gold mb-6">Add New Testimonial</h2>
          
          <div className="flex flex-col gap-4 max-w-2xl">
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Client Name *</label>
              <input 
                type="text" 
                value={newItem.author}
                onChange={(e) => setNewItem({...newItem, author: e.target.value})}
                placeholder="e.g. John Doe" 
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Client Role/Company</label>
              <input 
                type="text" 
                value={newItem.role}
                onChange={(e) => setNewItem({...newItem, role: e.target.value})}
                placeholder="e.g. CEO, Acme Corp" 
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Testimonial Quote *</label>
              <textarea 
                value={newItem.text}
                onChange={(e) => setNewItem({...newItem, text: e.target.value})}
                placeholder="Write the client's review here..." 
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors resize-none h-32"
              />
            </div>

          </div>

          <div className="mt-8 flex justify-end max-w-2xl">
            <button 
              onClick={handleAddNewItem}
              disabled={!newItem.author || !newItem.text}
              className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[2]" /> Add to Grid
            </button>
          </div>

        </div>
      )}

      {/* Live Preview Grid */}
      <section className="bg-[#0d0d0d] py-12 px-6 rounded-xl border border-[#1a1a1a]">
        
        <div className="mb-10 border-l-[3px] border-gold pl-3">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white">
            What Our Clients Say
          </h2>
          <p className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest mt-1">Live Frontend Preview. Click text to edit.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-neutral-900/50 border border-white/10 p-8 rounded-sm relative group hover:bg-neutral-900 transition-colors flex flex-col">
              
              {/* Delete Overlay */}
              <button 
                onClick={() => removeReview(review.id)}
                className="absolute top-4 right-4 z-30 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <span className="absolute top-4 left-4 text-gold/20 font-serif text-6xl leading-none select-none pointer-events-none">"</span>
              
              <div className="relative z-10 flex flex-col h-full">
                
                {/* WYSIWYG Quote Text */}
                <textarea
                  value={review.text}
                  onChange={(e) => handleTextareaChange(e, review.id)}
                  className="text-neutral-300 text-sm leading-relaxed mb-8 flex-1 italic bg-transparent border border-transparent hover:border-[#222] focus:border-gold/50 rounded p-1 w-full focus:outline-none resize-none overflow-hidden placeholder:text-neutral-700"
                  rows={4}
                  placeholder="Review quote..."
                />
                
                <div>
                  <div className="flex gap-1 text-gold mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                       <span className="text-xs font-bold text-neutral-500 uppercase">{review.author ? review.author[0] : "?"}</span>
                    </div>
                    <div className="flex flex-col w-full gap-1">
                      {/* WYSIWYG Author Name */}
                      <input
                        type="text"
                        value={review.author}
                        onChange={(e) => handleUpdate(review.id, 'author', e.target.value)}
                        className="font-bold text-xs uppercase tracking-wider text-white bg-transparent border-b border-transparent hover:border-[#222] focus:border-gold/50 w-full focus:outline-none placeholder:text-neutral-700"
                        placeholder="CLIENT NAME"
                      />
                      {/* WYSIWYG Role */}
                      <input
                        type="text"
                        value={review.role}
                        onChange={(e) => handleUpdate(review.id, 'role', e.target.value)}
                        className="text-neutral-500 text-[10px] tracking-widest uppercase bg-transparent border-b border-transparent hover:border-[#222] focus:border-gold/50 w-full focus:outline-none placeholder:text-neutral-700"
                        placeholder="CLIENT ROLE"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
