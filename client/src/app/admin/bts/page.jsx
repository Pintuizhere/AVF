"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Save, Trash2, UploadCloud, Link as LinkIcon, Image as ImageIcon, Video, Monitor, Smartphone, X } from "lucide-react";

export default function AdminBtsPage() {
  const [mediaItems, setMediaItems] = useState([
    { id: 1, src: "/images/hero-bg.jpg", type: "image", aspect: "16:9", url: "" },
    { id: 2, src: "/images/services-bg.jpg", type: "image", aspect: "9:16", url: "https://instagram.com" },
    { id: 3, src: "/images/hero-bg.jpg", type: "video", aspect: "16:9", url: "" },
    { id: 4, src: "/images/services-bg.jpg", type: "image", aspect: "9:16", url: "" },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    type: "image",
    aspect: "16:9",
    url: "",
    src: "" // Would normally come from an upload
  });

  const removeMedia = (id) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddNewItem = () => {
    const itemToAdd = {
      id: Date.now(),
      src: newItem.src || "/images/hero-bg.jpg", // placeholder if empty
      type: newItem.type,
      aspect: newItem.aspect,
      url: newItem.url
    };
    setMediaItems(prev => [itemToAdd, ...prev]);
    setIsAdding(false);
    setNewItem({ type: "image", aspect: "16:9", url: "", src: "" }); // reset
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      
      {/* Floating Action Bar */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl mt-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Manage BTS Gallery</h1>
          <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Upload images/videos, set aspect ratios, and add links.</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-transparent border border-[#222] hover:border-white text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" /> Add Media
            </button>
          )}
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-gold hover:bg-gold/90 text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors shadow-[0_0_15px_rgba(252,166,3,0.3)]">
            <Save className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2]" /> Save Gallery
          </button>
        </div>
      </div>

      {/* Add New Media Form */}
      {isAdding && (
        <div className="bg-[#0a0a0a] border border-gold/50 rounded-xl p-6 shadow-[0_0_20px_rgba(252,166,3,0.1)] relative">
          
          <button 
            onClick={() => setIsAdding(false)}
            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bebas uppercase tracking-widest text-gold mb-6">Add New BTS Media</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left: Upload Area */}
            <div className="flex flex-col gap-2">
              <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest">1. Upload File</label>
              <div className="w-full h-48 border-2 border-dashed border-[#222] hover:border-gold/50 rounded-lg flex flex-col items-center justify-center bg-[#111] transition-colors cursor-pointer group">
                <UploadCloud className="w-8 h-8 text-neutral-500 group-hover:text-gold mb-2 transition-colors" />
                <span className="text-xs font-bold text-neutral-400 group-hover:text-white">Click to Upload Image or Video</span>
              </div>
            </div>

            {/* Right: Settings */}
            <div className="flex flex-col gap-6">
              
              {/* Type Toggle */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">2. Media Type</label>
                <div className="flex bg-[#111] border border-[#222] rounded-md p-1">
                  <button 
                    onClick={() => setNewItem({...newItem, type: 'image'})}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors ${newItem.type === 'image' ? 'bg-[#222] text-white' : 'text-neutral-500 hover:text-white'}`}
                  >
                    <ImageIcon className="w-4 h-4" /> Image
                  </button>
                  <button 
                    onClick={() => setNewItem({...newItem, type: 'video'})}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-xs font-bold uppercase tracking-wider transition-colors ${newItem.type === 'video' ? 'bg-[#222] text-white' : 'text-neutral-500 hover:text-white'}`}
                  >
                    <Video className="w-4 h-4" /> Video
                  </button>
                </div>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">3. Aspect Ratio</label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setNewItem({...newItem, aspect: '16:9'})}
                    className={`flex items-center justify-center gap-2 py-2 rounded border text-xs font-bold transition-all ${newItem.aspect === '16:9' ? 'bg-[#222] border-gold text-white' : 'bg-[#111] border-[#222] text-neutral-500 hover:text-white'}`}
                  >
                    <Monitor className="w-4 h-4" /> 16:9
                  </button>
                  <button 
                    onClick={() => setNewItem({...newItem, aspect: '9:16'})}
                    className={`flex items-center justify-center gap-2 py-2 rounded border text-xs font-bold transition-all ${newItem.aspect === '9:16' ? 'bg-[#222] border-gold text-white' : 'bg-[#111] border-[#222] text-neutral-500 hover:text-white'}`}
                  >
                    <Smartphone className="w-4 h-4" /> 9:16
                  </button>
                </div>
              </div>

              {/* External Link */}
              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">4. External URL (Optional)</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input 
                    type="text" 
                    value={newItem.url}
                    onChange={(e) => setNewItem({...newItem, url: e.target.value})}
                    placeholder="e.g. https://instagram.com/..." 
                    className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md pl-10 pr-4 py-2 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleAddNewItem}
              className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/90 text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[2]" /> Add to Gallery
            </button>
          </div>

        </div>
      )}

      {/* Media Gallery View */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
        {mediaItems.map((item) => (
          <div key={item.id} className="relative group rounded-xl overflow-hidden border border-[#222] hover:border-gold/50 bg-[#111] shadow-xl transition-all duration-300 hover:-translate-y-1">
            
            {/* Media Tags */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5 pointer-events-none">
              <span className={`px-2 py-1 backdrop-blur-md border text-[9px] font-bold text-white uppercase rounded-md shadow-sm ${item.aspect === '16:9' ? 'bg-black/60 border-white/20' : 'bg-gold/80 border-gold text-black'}`}>
                {item.aspect === '16:9' ? 'Landscape (16:9)' : 'Portrait (9:16)'}
              </span>
              {item.url && (
                <span className="px-2 py-1 bg-blue-600/90 backdrop-blur-md border border-blue-400/50 text-[9px] font-bold text-white uppercase rounded-md flex items-center gap-1 shadow-sm w-fit">
                  <LinkIcon className="w-3 h-3" /> Link
                </span>
              )}
            </div>

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity z-30 flex items-center justify-center">
              <button 
                onClick={() => removeMedia(item.id)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded transition-colors shadow-lg"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>

            {/* Thumbnail Container (Uniform Size) */}
            <div className="relative w-full aspect-square bg-[#050505]">
              {item.type === 'video' && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <Video className="w-5 h-5 text-white/70 ml-1" />
                  </div>
                </div>
              )}
              <Image 
                src={item.src} 
                alt="BTS Item" 
                fill 
                className={`object-cover transition-transform duration-700 group-hover:scale-105 ${item.type === 'video' ? 'opacity-50' : ''}`} 
              />
            </div>
            
            {/* Bottom Info Bar */}
            <div className="p-3 border-t border-[#222] bg-[#0a0a0a] flex items-center justify-between">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                {item.type === 'video' ? <Video className="w-3.5 h-3.5 text-gold" /> : <ImageIcon className="w-3.5 h-3.5 text-neutral-400" />}
                {item.type}
              </span>
              <span className="text-[9px] text-neutral-600">ID: {item.id}</span>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
