"use client";

import { useState } from "react";
import { Plus, Save, Trash2, X, Play, Image as ImageIcon, Video, Link as LinkIcon, UploadCloud } from "lucide-react";
import Image from "next/image";

export default function AdminShortsPage() {
  const [shorts, setShorts] = useState([
    {
      id: 1,
      title: "Monitor Nonstop",
      category: "Productivity",
      type: "video",
      src: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=600&auto=format&fit=crop",
      url: "https://youtube.com/shorts/123",
    },
    {
      id: 2,
      title: "Guarantees",
      category: "Business",
      type: "image",
      src: "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=600&auto=format&fit=crop",
      url: "",
    },
    {
      id: 3,
      title: "On Demand",
      category: "Tech",
      type: "video",
      src: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=600&auto=format&fit=crop",
      url: "",
    },
    {
      id: 4,
      title: "Tech Review",
      category: "Gadgets",
      type: "video",
      src: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=600&auto=format&fit=crop",
      url: "",
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", category: "", type: "video", src: "", url: "" });

  const handleUpdate = (id, field, value) => {
    setShorts(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeShort = (id) => {
    setShorts(prev => prev.filter(item => item.id !== id));
  };

  const handleAddNewItem = () => {
    if (!newItem.title) return;
    const itemToAdd = {
      id: Date.now(),
      title: newItem.title,
      category: newItem.category || "Shorts",
      type: newItem.type,
      src: newItem.src || "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop",
      url: newItem.url
    };
    setShorts(prev => [itemToAdd, ...prev]);
    setIsAdding(false);
    setNewItem({ title: "", category: "", type: "video", src: "", url: "" });
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      
      {/* Floating Action Bar */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl mt-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Manage Shorts (Reels)</h1>
          <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Live WYSIWYG Editor. Click directly on text to edit.</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-transparent border border-[#222] hover:border-white text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" /> Add Short
            </button>
          )}
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gold hover:bg-gold/90 text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors shadow-[0_0_15px_rgba(252,166,3,0.3)]">
            <Save className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2]" /> Save Changes
          </button>
        </div>
      </div>

      {/* Add New Short Form */}
      {isAdding && (
        <div className="bg-[#0a0a0a] border border-gold/50 rounded-xl p-6 shadow-[0_0_20px_rgba(252,166,3,0.1)] relative">
          <button 
            onClick={() => setIsAdding(false)}
            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bebas uppercase tracking-widest text-gold mb-6">Add New Short</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Title *</label>
                  <input 
                    type="text" 
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    placeholder="e.g. Studio Setup" 
                    className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Category</label>
                  <input 
                    type="text" 
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    placeholder="e.g. Behind the Scenes" 
                    className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">External URL (Optional)</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input 
                    type="text" 
                    value={newItem.url}
                    onChange={(e) => setNewItem({...newItem, url: e.target.value})}
                    placeholder="https://..." 
                    className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md pl-10 pr-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-6 mt-2">
                <div className="flex flex-col gap-2">
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Upload File (Thumbnail/Video)</label>
                  <div className="w-full h-24 border-2 border-dashed border-[#222] hover:border-gold/50 rounded-lg flex flex-col items-center justify-center bg-[#111] transition-colors cursor-pointer group relative overflow-hidden">
                    {newItem.src ? (
                      <>
                        <img src={newItem.src} alt="Preview" className="w-full h-full object-cover opacity-50" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-bold text-white bg-black/60 px-3 py-1 rounded">Change Media</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="w-6 h-6 text-neutral-500 group-hover:text-gold mb-1 transition-colors" />
                        <span className="text-[10px] font-bold text-neutral-400 group-hover:text-white uppercase tracking-wider">Click to Upload</span>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Media Type (for icon)</label>
                  <div className="flex bg-[#111] border border-[#222] rounded-md p-1">
                    <button 
                      onClick={() => setNewItem({...newItem, type: 'video'})}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors ${newItem.type === 'video' ? 'bg-[#222] text-white' : 'text-neutral-500 hover:text-white'}`}
                    >
                      <Video className="w-4 h-4" /> Video
                    </button>
                    <button 
                      onClick={() => setNewItem({...newItem, type: 'image'})}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors ${newItem.type === 'image' ? 'bg-[#222] text-white' : 'text-neutral-500 hover:text-white'}`}
                    >
                      <ImageIcon className="w-4 h-4" /> Image
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="flex flex-col items-center justify-center border border-dashed border-[#222] rounded-xl p-4 bg-[#111]">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Live Preview</span>
              <div className="relative w-full max-w-[240px] aspect-[9/16] rounded-2xl overflow-hidden shadow-xl border border-white/10">
                <div className="absolute inset-0 z-0 bg-neutral-900">
                  {newItem.src ? (
                    <img src={newItem.src} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-neutral-700">
                      <ImageIcon className="w-8 h-8 mb-2" />
                      <span className="text-xs font-bold uppercase">No Media</span>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/90"></div>

                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center">
                    {newItem.type === 'video' ? <Play className="w-6 h-6 ml-1 fill-current text-white" /> : <ImageIcon className="w-6 h-6 text-white" />}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold mb-2 block drop-shadow-md">
                    {newItem.category || "Category"}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-white leading-tight drop-shadow-lg">
                    {newItem.title || "Project Title"}
                  </h3>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleAddNewItem}
              disabled={!newItem.title}
              className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[2]" /> Add to Shorts
            </button>
          </div>

        </div>
      )}

      {/* Grid View */}
      <section className="bg-black pt-8 pb-12 px-6 rounded-xl border border-white/5 relative overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <div className="mb-10 border-l-[3px] border-gold pl-3 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white">
            Shorts Gallery
          </h2>
          <p className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest mt-1">Live Frontend Preview. Click text to edit.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 relative z-10">
          {shorts.map((reel) => (
            <div 
              key={reel.id} 
              className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden group/card border border-white/10 hover:border-gold/50 transition-all duration-500 shadow-xl"
            >
              {/* Delete Overlay */}
              <button 
                onClick={() => removeShort(reel.id)}
                className="absolute top-4 right-4 z-40 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center text-white opacity-0 group-hover/card:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              
              {/* Media Tags */}
              <div className="absolute top-14 right-4 z-30 flex flex-col gap-1.5 opacity-0 group-hover/card:opacity-100 transition-opacity">
                <span className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-bold text-white uppercase rounded-md shadow-sm w-fit flex items-center gap-1 ml-auto">
                  {reel.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />} 
                  {reel.type}
                </span>
                {reel.url && (
                  <span className="px-2 py-1 bg-blue-600/90 backdrop-blur-md border border-blue-400/50 text-[9px] font-bold text-white uppercase rounded-md flex items-center gap-1 shadow-sm w-fit ml-auto">
                    <LinkIcon className="w-3 h-3" /> Link
                  </span>
                )}
              </div>

              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 z-0 bg-neutral-900">
                <img 
                  src={reel.src} 
                  alt={reel.title} 
                  className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-700 ease-in-out opacity-60 md:opacity-100"
                />
              </div>

              {/* Gradient Overlays for better text legibility */}
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none"></div>

              {/* Image Center Button */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center mb-4 transition-all group-hover/card:bg-gold group-hover/card:border-gold group-hover/card:text-black">
                  {reel.type === 'video' ? <Play className="w-6 h-6 ml-1 fill-current" /> : <ImageIcon className="w-6 h-6" />}
                </div>
              </div>

              {/* Bottom Content Info Editable */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-30 flex flex-col gap-1">
                <input
                  type="text"
                  value={reel.category}
                  onChange={(e) => handleUpdate(reel.id, 'category', e.target.value)}
                  className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold bg-transparent border-b border-transparent hover:border-gold/50 focus:border-gold w-fit focus:outline-none drop-shadow-md placeholder:text-gold/50"
                  placeholder="Category"
                />
                <input
                  type="text"
                  value={reel.title}
                  onChange={(e) => handleUpdate(reel.id, 'title', e.target.value)}
                  className="text-2xl font-bold tracking-tight text-white leading-tight bg-transparent border-b border-transparent hover:border-white/30 focus:border-white w-full focus:outline-none drop-shadow-lg placeholder:text-white/50"
                  placeholder="Short Title"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
