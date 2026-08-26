"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, X, Play, Image as ImageIcon, Video, Link as LinkIcon, UploadCloud, Loader2 } from "lucide-react";

export default function AdminBtsPage() {
  const [btsItems, setBtsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", type: "image", url: "", aspect: "aspect-[16/9]" });
  const [newMediaFile, setNewMediaFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    fetchBts();
  }, []);

  const fetchBts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bts");
      const data = await res.json();
      setBtsItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLocal = (id, field, value) => {
    setBtsItems(prev => prev.map(item => item._id === id ? { ...item, [field]: value } : item));
  };

  const saveUpdateToBackend = async (id, field, value) => {
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`http://localhost:5000/api/bts/${id}`, {
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

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`http://localhost:5000/api/bts/${deleteConfirmId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchBts();
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
      const res = await fetch("http://localhost:5000/api/bts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        setIsAdding(false);
        setNewItem({ title: "", type: "image", url: "", aspect: "aspect-[16/9]" });
        setNewMediaFile(null);
        setPreviewUrl(null);
        fetchBts();
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
          <h1 className="text-xl font-bold text-white">Manage BTS Gallery</h1>
          <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Live WYSIWYG Editor. Click directly on text/aspect dropdown to edit (auto-saves on blur).</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-transparent border border-[#222] hover:border-white text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" /> Add BTS Item
            </button>
          )}
        </div>
      </div>

      {/* Add New BTS Form */}
      {isAdding && (
        <div className="bg-[#0a0a0a] border border-gold/50 rounded-xl p-6 shadow-[0_0_20px_rgba(252,166,3,0.1)] relative">
          <button 
            onClick={() => setIsAdding(false)}
            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bebas uppercase tracking-widest text-gold mb-6">Add New BTS Item</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Title *</label>
                <input 
                  type="text" 
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  placeholder="e.g. Set Construction" 
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

              <div className="flex flex-col gap-1 mt-2">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Aspect Ratio</label>
                <select
                  value={newItem.aspect}
                  onChange={(e) => setNewItem({...newItem, aspect: e.target.value})}
                  className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors appearance-none"
                >
                  <option value="aspect-[16/9]">Landscape (16:9)</option>
                  <option value="aspect-[9/16]">Portrait (9:16)</option>
                  <option value="aspect-[4/5]">Portrait Square (4:5)</option>
                  <option value="aspect-square">Square (1:1)</option>
                </select>
              </div>

              <div className="flex flex-col gap-6 mt-2">
                <div className="flex flex-col gap-2">
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Upload File (Thumbnail/Video)</label>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,video/*" />
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-24 border-2 border-dashed border-[#222] hover:border-gold/50 rounded-lg flex flex-col items-center justify-center bg-[#111] transition-colors cursor-pointer group relative overflow-hidden"
                  >
                    {previewUrl ? (
                      <>
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-50" />
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

            {/* Live Preview of Aspect Ratio */}
            <div className="flex flex-col items-center justify-center border border-dashed border-[#222] rounded-xl p-4 bg-[#111]">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Aspect Preview</span>
              <div className={`relative w-full max-w-[300px] ${newItem.aspect} rounded-sm overflow-hidden shadow-xl border border-white/10 transition-all duration-300`}>
                <div className="absolute inset-0 z-0 bg-neutral-900 flex items-center justify-center">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="w-8 h-8 text-neutral-700" />
                  )}
                </div>
                
                {newItem.type === 'video' && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full border border-white/20 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                      <Play className="w-5 h-5 ml-1 fill-current text-white" />
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white font-bold truncate text-sm">{newItem.title || "Title here"}</h3>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleAddNewItem}
              disabled={submitting || !newItem.title}
              className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 stroke-[2]" />} 
              {submitting ? "Uploading..." : "Add to Gallery"}
            </button>
          </div>

        </div>
      )}

      {/* Masonry Layout Preview */}
      <section className="bg-black py-8 px-6 rounded-xl border border-white/5 relative">
        <div className="mb-10 border-l-[3px] border-gold pl-3 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white">
            BTS Masonry Layout
          </h2>
          <p className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest mt-1">
            Exact preview of how it looks on the frontend.
          </p>
        </div>

        {loading ? (
          <div className="text-neutral-500 py-10 relative z-10">Loading gallery...</div>
        ) : btsItems.length === 0 ? (
          <div className="text-neutral-500 py-10 relative z-10">No items found.</div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 relative z-10">
            {btsItems.map((item) => (
              <div 
                key={item._id} 
                className="break-inside-avoid relative w-full bg-[#111] p-1 shadow-lg group hover:-translate-y-1 transition-all duration-300 rounded-sm mb-6 border border-[#222] hover:border-gold/50"
              >
                
                {/* Delete button (Admin specific) */}
                <button 
                  onClick={() => setDeleteConfirmId(item._id)}
                  className="absolute top-3 right-3 z-40 w-8 h-8 bg-red-500/90 hover:bg-red-500 rounded flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Edit Controls Overlay (Admin specific) */}
                <div className="absolute top-3 left-3 z-40 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <select 
                    value={item.aspect}
                    onChange={(e) => {
                      handleUpdateLocal(item._id, 'aspect', e.target.value);
                      saveUpdateToBackend(item._id, 'aspect', e.target.value);
                    }}
                    className="bg-black/80 backdrop-blur border border-[#333] text-white text-[10px] font-bold uppercase p-1.5 rounded focus:outline-none focus:border-gold"
                  >
                    <option value="aspect-[16/9]">16:9</option>
                    <option value="aspect-[9/16]">9:16</option>
                    <option value="aspect-[4/5]">4:5</option>
                    <option value="aspect-square">1:1</option>
                  </select>
                  
                  <div className="flex gap-1">
                    <button 
                      onClick={() => {
                        const newType = item.type === 'video' ? 'image' : 'video';
                        handleUpdateLocal(item._id, 'type', newType);
                        saveUpdateToBackend(item._id, 'type', newType);
                      }}
                      className="px-2 py-1.5 bg-black/80 backdrop-blur border border-[#333] text-[9px] font-bold text-white uppercase rounded flex items-center gap-1 shadow-sm hover:border-gold"
                    >
                      {item.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />} 
                      {item.type}
                    </button>
                    {item.url && (
                      <span className="px-2 py-1.5 bg-blue-600/90 backdrop-blur border border-blue-400 text-[9px] font-bold text-white uppercase rounded flex items-center gap-1 shadow-sm">
                        <LinkIcon className="w-3 h-3" /> Link
                      </span>
                    )}
                  </div>
                </div>

                {/* Media Container (Frontend matched) */}
                <div className={`relative w-full ${item.aspect} overflow-hidden bg-black shadow-inner`}>
                  
                  {item.type === 'video' ? (
                     <div className="w-full h-full relative flex items-center justify-center filter grayscale-[0.3] contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-out">
                       <img src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                       <div className="w-12 h-12 rounded-full border-2 border-white/50 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:border-gold group-hover:text-gold transition-colors z-10 pointer-events-none">
                         <Play className="w-5 h-5 ml-1 fill-current" />
                       </div>
                     </div>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.3] contrast-125 group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <input
                      type="text"
                      value={item.title || ""}
                      onChange={(e) => handleUpdateLocal(item._id, 'title', e.target.value)}
                      onBlur={(e) => saveUpdateToBackend(item._id, 'title', e.target.value)}
                      className="text-base font-bold tracking-tight text-white bg-transparent border-b border-transparent hover:border-white/30 focus:border-white w-full focus:outline-none placeholder:text-white/50"
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={item.url || ""}
                      onChange={(e) => handleUpdateLocal(item._id, 'url', e.target.value)}
                      onBlur={(e) => saveUpdateToBackend(item._id, 'url', e.target.value)}
                      className="text-[10px] text-blue-300 bg-transparent border-b border-transparent hover:border-blue-300/30 focus:border-blue-300 w-full focus:outline-none placeholder:text-blue-300/50"
                      placeholder="URL (optional)"
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
            <h3 className="text-xl font-bebas uppercase tracking-widest text-red-500 mb-2">Delete BTS Item</h3>
            <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
              Are you sure you want to delete this behind-the-scenes item? This action cannot be undone.
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
