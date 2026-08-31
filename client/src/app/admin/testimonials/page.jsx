"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, X, Star, UploadCloud, Loader2, Image as ImageIcon } from "lucide-react";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ text: "", author: "", role: "", rating: 5 });
  const [newAvatarFile, setNewAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/testimonials`);
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLocal = (id, field, value) => {
    setItems(prev => prev.map(item => item._id === id ? { ...item, [field]: value } : item));
  };

  const saveUpdateToBackend = async (id, field, value) => {
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/testimonials/${id}`, {
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/testimonials/${deleteConfirmId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchItems();
    } catch (err) {
      console.error("Failed to delete", err);
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatarFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddNewItem = async () => {
    if (!newItem.text || !newItem.author || !newItem.role) {
      alert("Quote, Author, and Role are required.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    Object.keys(newItem).forEach(key => formData.append(key, newItem[key]));
    if (newAvatarFile) {
      formData.append("avatar", newAvatarFile);
    }

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/testimonials`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        setIsAdding(false);
        setNewItem({ text: "", author: "", role: "", rating: 5 });
        setNewAvatarFile(null);
        setPreviewUrl(null);
        fetchItems();
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
          <h1 className="text-xl font-bold text-white">Manage Testimonials</h1>
          <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Live WYSIWYG Editor. Click directly on text/rating to edit (auto-saves on blur).</p>
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
        </div>
      </div>

      {/* Add New Form */}
      {isAdding && (
        <div className="bg-[#0a0a0a] border border-gold/50 rounded-xl p-6 shadow-[0_0_20px_rgba(252,166,3,0.1)] relative">
          <button 
            onClick={() => setIsAdding(false)}
            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bebas uppercase tracking-widest text-gold mb-6">Add New Testimonial</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Quote / Review *</label>
                <textarea 
                  value={newItem.text}
                  onChange={(e) => setNewItem({...newItem, text: e.target.value})}
                  placeholder="e.g. AVF captured the essence of our brand beautifully..." 
                  className="w-full h-24 resize-none bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Author Name *</label>
                  <input 
                    type="text" 
                    value={newItem.author}
                    onChange={(e) => setNewItem({...newItem, author: e.target.value})}
                    placeholder="e.g. Rohit Sharma" 
                    className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Role / Company *</label>
                  <input 
                    type="text" 
                    value={newItem.role}
                    onChange={(e) => setNewItem({...newItem, role: e.target.value})}
                    placeholder="e.g. CEO, Elevate Brands" 
                    className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-end">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Rating (1-5)</label>
                  <select
                    value={newItem.rating}
                    onChange={(e) => setNewItem({...newItem, rating: Number(e.target.value)})}
                    className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors appearance-none"
                  >
                    {[5,4,3,2,1].map(num => (
                      <option key={num} value={num}>{num} Stars</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Avatar (Optional)</label>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full bg-[#111] border border-[#222] hover:border-gold/50 text-white text-sm rounded-md px-4 py-2.5 flex items-center justify-center gap-2 transition-colors"
                  >
                    <UploadCloud className="w-4 h-4 text-neutral-400" />
                    {newAvatarFile ? 'Change File' : 'Upload Image'}
                  </button>
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-neutral-900/50 border border-white/10 p-8 rounded-sm relative group flex flex-col h-full shadow-2xl">
              <span className="absolute top-4 left-4 text-gold/20 font-serif text-6xl leading-none">"</span>
              
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-neutral-300 text-sm leading-relaxed mb-8 flex-1 italic break-words">
                  {newItem.text || "Your testimonial quote will appear here. It looks just like the frontend design."}
                </p>
                
                <div>
                  <div className="flex gap-1 text-gold mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-3 h-3 ${j < newItem.rating ? 'fill-current text-gold' : 'text-neutral-700'}`} />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center overflow-hidden">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs font-bold text-neutral-500 uppercase">{newItem.author ? newItem.author[0] : 'A'}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs uppercase tracking-wider">{newItem.author || "Author Name"}</h4>
                      <p className="text-neutral-500 text-[10px] tracking-widest uppercase">{newItem.role || "Role, Company"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleAddNewItem}
              disabled={submitting || !newItem.text || !newItem.author || !newItem.role}
              className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 stroke-[2]" />} 
              {submitting ? "Uploading..." : "Publish Testimonial"}
            </button>
          </div>

        </div>
      )}

      {/* Grid Layout Preview */}
      <section className="bg-black py-8 px-6 rounded-xl border border-white/5 relative mt-4">
        <div className="mb-10 border-l-[3px] border-gold pl-3 relative z-10">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-white">
            Live Reviews Grid
          </h2>
          <p className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest mt-1">
            Exact preview of how it looks on the frontend.
          </p>
        </div>

        {loading ? (
          <div className="text-neutral-500 py-10 relative z-10">Loading testimonials...</div>
        ) : items.length === 0 ? (
          <div className="text-neutral-500 py-10 relative z-10">No items found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {items.map((item) => (
              <div 
                key={item._id} 
                className="bg-neutral-900/50 border border-white/10 p-8 rounded-sm relative group hover:bg-neutral-900 hover:border-gold/30 transition-colors shadow-lg"
              >
                
                {/* Delete button (Admin specific) */}
                <button 
                  onClick={() => setDeleteConfirmId(item._id)}
                  className="absolute top-4 right-4 z-40 w-8 h-8 bg-red-500/90 hover:bg-red-500 rounded flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <span className="absolute top-4 left-4 text-gold/20 font-serif text-6xl leading-none pointer-events-none">"</span>
                
                <div className="relative z-10 flex flex-col h-full">
                  <textarea
                    value={item.text}
                    onChange={(e) => handleUpdateLocal(item._id, 'text', e.target.value)}
                    onBlur={(e) => saveUpdateToBackend(item._id, 'text', e.target.value)}
                    className="text-neutral-300 text-sm leading-relaxed mb-8 flex-1 italic bg-transparent border-b border-transparent hover:border-white/20 focus:border-gold focus:outline-none resize-none overflow-hidden"
                    rows={4}
                  />
                  
                  <div>
                    <div className="flex gap-1 mb-4">
                       {[1,2,3,4,5].map((num) => (
                         <button 
                            key={num}
                            onClick={() => {
                              handleUpdateLocal(item._id, 'rating', num);
                              saveUpdateToBackend(item._id, 'rating', num);
                            }}
                            className="focus:outline-none"
                         >
                           <Star className={`w-4 h-4 transition-colors ${num <= item.rating ? 'fill-current text-gold' : 'text-neutral-700'}`} />
                         </button>
                       ))}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="relative w-10 h-10 rounded-full bg-neutral-800 border border-white/20 flex items-center justify-center overflow-hidden group/avatar cursor-pointer">
                        {item.avatarUrl ? (
                          <img src={item.avatarUrl} alt={item.author} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs font-bold text-neutral-500 uppercase">{item.author ? item.author[0] : 'A'}</span>
                        )}
                        {/* Note: Direct inline avatar updating is skipped for simplicity. The user can recreate if they need a new avatar, or we can add a complex input here */}
                      </div>
                      <div className="flex flex-col gap-1 flex-1">
                        <input
                          type="text"
                          value={item.author}
                          onChange={(e) => handleUpdateLocal(item._id, 'author', e.target.value)}
                          onBlur={(e) => saveUpdateToBackend(item._id, 'author', e.target.value)}
                          className="font-bold text-xs uppercase tracking-wider text-white bg-transparent border-b border-transparent hover:border-white/30 focus:border-gold focus:outline-none w-full"
                          placeholder="Author Name"
                        />
                        <input
                          type="text"
                          value={item.role}
                          onChange={(e) => handleUpdateLocal(item._id, 'role', e.target.value)}
                          onBlur={(e) => saveUpdateToBackend(item._id, 'role', e.target.value)}
                          className="text-neutral-500 text-[10px] tracking-widest uppercase bg-transparent border-b border-transparent hover:border-neutral-500/50 focus:border-gold focus:outline-none w-full"
                          placeholder="Role, Company"
                        />
                      </div>
                    </div>
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
            <h3 className="text-xl font-bebas uppercase tracking-widest text-red-500 mb-2">Delete Testimonial</h3>
            <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
              Are you sure you want to delete this review? This action cannot be undone.
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
