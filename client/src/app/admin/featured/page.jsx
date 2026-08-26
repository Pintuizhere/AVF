"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Save, Trash2, X, Play, Image as ImageIcon, Video, Link as LinkIcon, UploadCloud, Loader2 } from "lucide-react";

export default function AdminFeaturedPage() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", category: "", type: "image", url: "" });
  const [newMediaFile, setNewMediaFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/featured");
      const data = await res.json();
      setFeaturedItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLocal = (id, field, value) => {
    setFeaturedItems(prev => prev.map(item => item._id === id ? { ...item, [field]: value } : item));
  };

  const saveUpdateToBackend = async (id, field, value) => {
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`http://localhost:5000/api/featured/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ [field]: value }),
      });
    } catch (err) {
      console.error("Failed to update field:", field);
    }
  };

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`http://localhost:5000/api/featured/${deleteConfirmId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchFeatured();
    } catch (err) {
      console.error("Failed to delete", err);
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewMediaFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddNewItem = async () => {
    if (!newItem.title || !newMediaFile) {
      alert("Title and Thumbnail are required.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    Object.keys(newItem).forEach(key => formData.append(key, newItem[key]));
    formData.append("media", newMediaFile);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/featured", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        setIsAdding(false);
        setNewItem({ title: "", category: "", type: "image", url: "" });
        setNewMediaFile(null);
        setPreviewUrl(null);
        fetchFeatured();
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error("Failed to create", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      
      {/* Floating Action Bar */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl mt-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Manage Featured Work</h1>
          <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Live WYSIWYG Editor. Click directly on text to edit (auto-saves on blur).</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-transparent border border-[#222] hover:border-white text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" /> Add Featured Item
            </button>
          )}
        </div>
      </div>

      {/* Add New Featured Item Form */}
      {isAdding && (
        <div className="bg-[#0a0a0a] border border-gold/50 rounded-xl p-6 shadow-[0_0_20px_rgba(252,166,3,0.1)] relative">
          <button 
            onClick={() => setIsAdding(false)}
            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bebas uppercase tracking-widest text-gold mb-6">Add New Featured Item</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Title *</label>
                <input 
                  type="text" 
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  placeholder="e.g. Angrezi Sapne" 
                  className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Category</label>
                <input 
                  type="text" 
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  placeholder="e.g. Official Trailer" 
                  className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
                />
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
            </div>

            {/* Media Upload & Settings */}
            <div className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Upload File (Thumbnail)</label>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,video/*" />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-32 border-2 border-dashed border-[#222] hover:border-gold/50 rounded-lg flex flex-col items-center justify-center bg-[#111] transition-colors cursor-pointer group relative overflow-hidden"
                >
                  {previewUrl ? (
                    <>
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white bg-black/60 px-3 py-1 rounded">Change</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-neutral-500 group-hover:text-gold mb-2 transition-colors" />
                      <span className="text-xs font-bold text-neutral-400 group-hover:text-white">Click to Upload Image</span>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Media Type (for icon)</label>
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

            </div>

          </div>

          <div className="mt-8 flex justify-end max-w-4xl">
            <button 
              onClick={handleAddNewItem}
              disabled={submitting || !newItem.title}
              className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 stroke-[2]" />} 
              {submitting ? "Uploading..." : "Add to Featured"}
            </button>
          </div>

        </div>
      )}

      {/* Grid View */}
      <section className="bg-black py-8 px-6 rounded-xl border border-white/5">
        
        <div className="mb-8 border-l-[3px] border-gold pl-3">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white">
            Featured Projects
          </h2>
          <p className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest mt-1">Live Frontend Preview. Click text to edit.</p>
        </div>

        {loading ? (
          <div className="text-neutral-500 py-10">Loading featured projects...</div>
        ) : featuredItems.length === 0 ? (
          <div className="text-neutral-500 py-10">No featured items found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <div 
                key={item._id} 
                className="relative w-full aspect-[16/9] rounded-xl overflow-hidden group/card border border-neutral-800/50 hover:border-gold/30 transition-all duration-500 shadow-xl"
              >
                {/* Delete Overlay */}
                <button 
                  onClick={() => setDeleteConfirmId(item._id)}
                  className="absolute top-3 right-3 z-30 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center text-white opacity-0 group-hover/card:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Media Tags */}
                <div className="absolute top-3 left-3 z-30 flex flex-col gap-1.5 opacity-0 group-hover/card:opacity-100 transition-opacity">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-bold text-white uppercase rounded-md shadow-sm w-fit flex items-center gap-1">
                    {item.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />} 
                    {item.type}
                  </span>
                  {item.url && (
                    <span className="px-2 py-1 bg-blue-600/90 backdrop-blur-md border border-blue-400/50 text-[9px] font-bold text-white uppercase rounded-md flex items-center gap-1 shadow-sm w-fit">
                      <LinkIcon className="w-3 h-3" /> Link
                    </span>
                  )}
                </div>

                {/* Background Media */}
                <div className="absolute inset-0 z-0 bg-neutral-900">
                  <img 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                
                {/* Vignette effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 pointer-events-none z-0" />

                {/* Play Button Overlay */}
                {item.type === 'video' && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full border border-white/20 bg-white/10 flex items-center justify-center shadow-2xl backdrop-blur-sm group-hover/card:bg-gold group-hover/card:border-gold group-hover/card:text-black transition-all">
                      <Play className="w-5 h-5 ml-1 fill-current" />
                    </div>
                  </div>
                )}

                {/* Content text */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                  <div className="flex flex-col gap-1 w-full max-w-[80%] relative z-30">
                    <input
                      type="text"
                      value={item.category || ""}
                      onChange={(e) => handleUpdateLocal(item._id, 'category', e.target.value)}
                      onBlur={(e) => saveUpdateToBackend(item._id, 'category', e.target.value)}
                      className="text-[10px] font-bold tracking-[0.2em] uppercase text-gold bg-transparent border-b border-transparent hover:border-gold/50 focus:border-gold w-fit focus:outline-none shadow-black drop-shadow-md placeholder:text-gold/50"
                      placeholder="Category"
                    />
                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(e) => handleUpdateLocal(item._id, 'title', e.target.value)}
                      onBlur={(e) => saveUpdateToBackend(item._id, 'title', e.target.value)}
                      className="text-2xl md:text-3xl font-bold tracking-tight text-white bg-transparent border-b border-transparent hover:border-white/30 focus:border-white w-full focus:outline-none drop-shadow-lg placeholder:text-white/50"
                      placeholder="Project Title"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Custom Confirm Modal for Deleting */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bebas uppercase tracking-widest text-red-500 mb-2">Delete Featured Item</h3>
            <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
              Are you sure you want to delete this featured item? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="px-5 py-2.5 rounded text-xs font-bold tracking-widest uppercase text-white bg-transparent border border-[#333] hover:border-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="px-5 py-2.5 rounded text-xs font-bold tracking-widest uppercase text-white bg-red-600 hover:bg-red-500 transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)]"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
