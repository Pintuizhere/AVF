"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, Trash2, Plus, Loader2, Save, Maximize2 } from "lucide-react";

export default function AdminClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const fileInputRef = useRef(null);

  // Form State
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [zoom, setZoom] = useState(1.0);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/clients`);
      const data = await res.json();
      setClients(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selected);
      // Auto-generate name from filename if empty
      if (!name) {
        setName(selected.name.split(".")[0].toUpperCase());
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !file) return;

    setSubmitting(true);
    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", file);
    formData.append("zoom", zoom);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/clients`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        // Reset form
        setName("");
        setFile(null);
        setPreview(null);
        setZoom(1.0);
        if (fileInputRef.current) fileInputRef.current.value = "";
        
        // Refresh list
        fetchClients();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to add client logo.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const [zoomTimers, setZoomTimers] = useState({});

  const handleUpdateZoom = (id, newZoom) => {
    // Optimistic update
    setClients(prev => prev.map(c => c._id === id ? { ...c, zoom: newZoom } : c));
    
    // Clear previous timer for this client
    if (zoomTimers[id]) clearTimeout(zoomTimers[id]);
    
    // Set a new timer to debounce the backend save
    const timer = setTimeout(async () => {
      const token = localStorage.getItem("adminToken");
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/clients/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ zoom: newZoom }),
        });
      } catch (err) {
        console.error(err);
      }
    }, 500); // 500ms debounce
    
    setZoomTimers(prev => ({ ...prev, [id]: timer }));
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const token = localStorage.getItem("adminToken");
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/clients/${deleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setClients(prev => prev.filter(c => c._id !== deleteId));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a] rounded-xl p-4 flex flex-col shadow-xl mt-2">
        <h1 className="text-xl font-bold text-white">Manage Client Brands</h1>
        <p className="text-xs text-neutral-400 mt-1">Upload brand logos and perfectly balance their visual weight on the public site.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Upload Form */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 flex flex-col gap-6 sticky top-28">
            <h2 className="text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4">Add New Brand</h2>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Brand Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. NETFLIX"
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Logo Image (PNG)</label>
              
              <div 
                className="w-full aspect-[2/1] bg-[#111] border-2 border-dashed border-[#333] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-gold/50 hover:bg-[#1a1a1a] transition-all overflow-hidden relative group"
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <div className="w-full h-full bg-[#e9e6dc] flex items-center justify-center p-4 relative overflow-hidden">
                    {/* Exact replica of the frontend bounding box */}
                    <div className="w-24 h-12 relative flex items-center justify-center overflow-hidden border border-red-500/30">
                      <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain transition-all" style={{ transform: `scale(${zoom})` }} />
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 text-neutral-600 mb-2 group-hover:text-gold transition-colors" />
                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest group-hover:text-gold/70">Upload Logo</span>
                  </>
                )}
                
                {preview && (
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs font-bold text-white uppercase tracking-widest bg-black/80 px-4 py-2 rounded-full border border-white/20">Change Image</span>
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden" 
              />
            </div>

            {/* Initial Zoom Slider */}
            {preview && (
              <div className="flex flex-col gap-2 p-4 bg-neutral-900/50 rounded-lg border border-white/5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                    <Maximize2 className="w-3 h-3" /> Initial Zoom
                  </label>
                  <span className="text-xs text-gold font-bold">{zoom.toFixed(1)}x</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="2.5" 
                  step="0.1" 
                  value={zoom}
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-full accent-gold mt-2 cursor-pointer"
                />
              </div>
            )}

            <button 
              type="submit" 
              disabled={submitting || !name || !file}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold hover:bg-gold/90 disabled:opacity-50 disabled:hover:bg-gold text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors mt-2"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 stroke-[2]" />} 
              {submitting ? "Uploading..." : "Add Brand"}
            </button>
          </form>
        </div>

        {/* Right: Active Brands List */}
        <div className="lg:col-span-2">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-6">Active Brands ({clients.length})</h2>
            
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                <p className="text-xs uppercase tracking-widest font-bold">Loading brands...</p>
              </div>
            ) : clients.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-xl bg-white/5">
                <p className="text-sm text-neutral-500 font-medium">No brand logos uploaded yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clients.map(client => (
                  <div key={client._id} className="bg-neutral-900/40 border border-white/10 rounded-xl p-4 flex flex-col gap-4 group">
                    
                    {/* Visual Preview */}
                    <div className="w-full h-32 bg-[#e9e6dc] rounded-md relative flex items-center justify-center overflow-hidden border border-black/20 group/preview">
                      <div className="absolute top-2 left-2 bg-black text-gold text-[9px] font-black tracking-widest px-2 py-0.5 rounded shadow-sm z-10">
                        FRONTEND SIMULATOR
                      </div>
                      
                      <button 
                        onClick={() => setDeleteId(client._id)}
                        className="absolute top-2 right-2 w-7 h-7 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded flex items-center justify-center transition-colors z-10 opacity-0 group-hover/preview:opacity-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Exact 1:1 scale of the frontend bounding box container for perfect visual representation */}
                      <div className="w-24 h-12 relative flex items-center justify-center overflow-hidden border border-red-500/20 group-hover/preview:border-red-500/50 transition-colors">
                        <img 
                          src={client.logoUrl} 
                          alt={client.name} 
                          className="max-w-full max-h-full object-contain transition-all duration-300"
                          style={{ transform: `scale(${client.zoom || 1.0})` }}
                        />
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col gap-3 px-2">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-bold text-white uppercase tracking-widest">{client.name}</span>
                        <span className="text-[10px] text-neutral-500 font-mono bg-black px-2 py-0.5 rounded">{parseFloat(client.zoom || 1.0).toFixed(1)}x</span>
                      </div>
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Maximize2 className="w-3 h-3 text-gold" /> Zoom Scale
                        </label>
                        <input 
                          type="range" 
                          min="0.5" 
                          max="2.5" 
                          step="0.1" 
                          value={client.zoom || 1.0}
                          onChange={(e) => handleUpdateZoom(client._id, parseFloat(e.target.value))}
                          className="w-full accent-gold cursor-pointer"
                        />
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-2">Delete Brand Logo?</h3>
            <p className="text-sm text-neutral-400 mb-6">This action cannot be undone. The image will be permanently removed from the server.</p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2 bg-[#111] hover:bg-[#222] text-white text-sm font-bold rounded-md transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-md transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
