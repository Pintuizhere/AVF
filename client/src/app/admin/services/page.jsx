"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, Clapperboard, Calendar, MonitorPlay, Package, Coffee, Camera, Smartphone, Car, UploadCloud, Save, Plus, Trash2, Loader2, Video, CalendarDays, Film, CarFront } from "lucide-react";

const iconMap = {
  Clapperboard,
  Calendar,
  CalendarDays,
  MonitorPlay,
  Package,
  Coffee,
  Camera,
  Smartphone,
  Car,
  CarFront,
  Video,
  Film
};

const iconOptions = Object.keys(iconMap);

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // For adding new service
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ title: "", description: "", iconName: "Clapperboard" });
  const [newMediaFile, setNewMediaFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // For inline file update
  const hiddenFileInputRef = useRef(null);
  const [activeUploadId, setActiveUploadId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChangeLocal = (id, field, value) => {
    setServices(prev => prev.map(s => s._id === id ? { ...s, [field]: value } : s));
  };

  const handleTextareaChangeLocal = (e, id) => {
    handleInputChangeLocal(id, 'description', e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const saveUpdateToBackend = async (id, field, value) => {
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`http://localhost:5000/api/services/${id}`, {
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
      const res = await fetch(`http://localhost:5000/api/services/${deleteConfirmId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchServices();
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

  const handleAddNewService = async () => {
    if (!newItem.title || !newItem.description) {
      alert("Title and Description are required.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    Object.keys(newItem).forEach(key => formData.append(key, newItem[key]));
    if (newMediaFile) {
      formData.append("media", newMediaFile);
    }

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/services", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      if (res.ok) {
        setIsAdding(false);
        setNewItem({ title: "", description: "", iconName: "Clapperboard" });
        setNewMediaFile(null);
        setPreviewUrl(null);
        fetchServices();
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error("Failed to create", err);
    } finally {
      setSubmitting(false);
    }
  };

  const triggerImageUpload = (id) => {
    setActiveUploadId(id);
    hiddenFileInputRef.current.click();
  };

  const handleInlineImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeUploadId) return;

    try {
      const token = localStorage.getItem("adminToken");
      const formData = new FormData();
      formData.append("media", file);

      const res = await fetch(`http://localhost:5000/api/services/${activeUploadId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        fetchServices(); // Refresh to get new image URL
      }
    } catch (err) {
      console.error("Failed to upload image", err);
    } finally {
      setActiveUploadId(null);
      e.target.value = "";
    }
  };

  const cycleIcon = (id, currentIconName) => {
    const currentIndex = iconOptions.indexOf(currentIconName);
    const nextIndex = (currentIndex + 1) % iconOptions.length;
    const nextIconName = iconOptions[nextIndex];
    handleInputChangeLocal(id, "iconName", nextIconName);
    saveUpdateToBackend(id, "iconName", nextIconName);
  };

  const [showDefaultConfirm, setShowDefaultConfirm] = useState(false);

  const confirmLoadDefaults = async () => {
    setShowDefaultConfirm(false);
    setLoading(true);
    const defaultServices = [
      { title: "Documentaries", description: "Real stories.\nReal people.\nReal impact.", iconName: "Video" },
      { title: "Events", description: "Cinematic coverage\nof every moment\nthat matters.", iconName: "CalendarDays" },
      { title: "Commercials", description: "Brands come alive\non screen.", iconName: "Clapperboard" },
      { title: "Products", description: "Showcasing products\nat their best.", iconName: "Package" },
      { title: "Food", description: "Tasty looks\ngreat on camera.", iconName: "Coffee" },
      { title: "Model Photography", description: "Professional shots\nthat stand out.", iconName: "Camera" },
      { title: "Automotive", description: "High-octane visuals\nin motion.", iconName: "CarFront" },
      { title: "Reels", description: "Short format.\nBig impact.", iconName: "Film" }
    ];

    try {
      const token = localStorage.getItem("adminToken");
      for (const svc of defaultServices) {
        const formData = new FormData();
        formData.append("title", svc.title);
        formData.append("description", svc.description);
        formData.append("iconName", svc.iconName);
        
        await fetch("http://localhost:5000/api/services", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });
      }
      await fetchServices();
    } catch (err) {
      console.error("Failed to load defaults", err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      
      {/* Hidden file input for inline updates */}
      <input type="file" ref={hiddenFileInputRef} onChange={handleInlineImageUpload} className="hidden" accept="image/*" />

      {/* Floating Action Bar */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl mt-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Manage Services</h1>
          <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Live WYSIWYG Editor. Click any text to edit directly (auto-saves on blur).</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button 
            onClick={() => setShowDefaultConfirm(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-neutral-900 border border-[#222] hover:border-gold text-white hover:text-gold text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
          >
            Load Defaults
          </button>
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-transparent border border-[#222] hover:border-white text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" /> Add Service
            </button>
          )}
        </div>
      </div>

      {/* Add New Service Form */}
      {isAdding && (
        <div className="bg-[#0a0a0a] border border-gold/50 rounded-xl p-6 shadow-[0_0_20px_rgba(252,166,3,0.1)] relative">
          <button 
            onClick={() => setIsAdding(false)}
            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bebas uppercase tracking-widest text-gold mb-6">Add New Service</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Title *</label>
                <input 
                  type="text" 
                  value={newItem.title}
                  onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  placeholder="e.g. Documentaries" 
                  className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Description *</label>
                <textarea 
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  placeholder="Service description..." 
                  rows={3}
                  className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Upload Background Image</label>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-24 border-2 border-dashed border-[#222] hover:border-gold/50 rounded-lg flex flex-col items-center justify-center bg-[#111] transition-colors cursor-pointer group relative overflow-hidden"
                >
                  {previewUrl ? (
                    <>
                      <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white bg-black/60 px-3 py-1 rounded">Change Image</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-6 h-6 text-neutral-500 group-hover:text-gold mb-1 transition-colors" />
                      <span className="text-[10px] font-bold text-neutral-400 group-hover:text-white uppercase tracking-wider">Click to Upload Image</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Live Preview of Add Form */}
            <div className="flex flex-col items-center justify-center border border-dashed border-[#222] rounded-xl p-4 bg-[#111]">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Live Preview</span>
              
              <div className="bg-[#0a0a0a] text-white rounded-sm overflow-hidden flex flex-col group relative shadow-xl border border-neutral-800 w-full max-w-[280px]">
                {/* Top Half Image */}
                <div className="h-[180px] relative w-full overflow-hidden">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-80 grayscale" />
                  ) : (
                    <div className="w-full h-full bg-neutral-900" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10" />
                </div>

                {/* Overlapping Icon */}
                <div className="absolute top-[150px] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-gold bg-black flex items-center justify-center z-30 shadow-[0_0_15px_rgba(252,166,3,0.2)]">
                  <Clapperboard className="w-6 h-6 text-gold stroke-[1.5]" />
                </div>

                {/* Bottom Half Content */}
                <div className="pt-10 pb-6 px-4 flex flex-col items-center text-center flex-1 z-10 relative bg-[#0a0a0a]">
                  <h3 className="font-bebas text-xl tracking-widest uppercase mb-3 text-white">
                    {newItem.title || "SERVICE TITLE"}
                  </h3>
                  <p className="text-[10px] text-neutral-400 leading-relaxed font-medium">
                    {newItem.description || "Service description goes here."}
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleAddNewService}
              disabled={submitting || !newItem.title || !newItem.description}
              className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4 stroke-[2]" />} 
              {submitting ? "Saving..." : "Add to Services"}
            </button>
          </div>

        </div>
      )}


      {/* Services Grid matching Frontend */}
      <section className="relative bg-[#f5f0e6] text-black py-8 md:py-16 px-4 md:px-6 overflow-hidden rounded-xl">
        <div className="mx-auto max-w-[1400px]">
          
          <div className="mb-8 md:mb-12 border-l-[3px] md:border-l-4 border-black pl-3 md:pl-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bebas uppercase tracking-wider text-black">
              Live Preview
            </h2>
            <p className="text-[10px] sm:text-xs font-bold text-neutral-500 uppercase tracking-widest mt-1 sm:mt-2">Any changes made here will reflect on the live site.</p>
          </div>

          {loading ? (
            <div className="text-black py-10 font-bold">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="text-black py-10 font-bold">No services found.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => {
                const Icon = iconMap[service.iconName] || Clapperboard;

                return (
                  <div 
                    key={service._id} 
                    className="bg-[#0a0a0a] text-white rounded-sm overflow-hidden flex flex-col group relative shadow-xl border border-neutral-800 hover:border-gold transition-colors duration-500"
                  >
                    
                    {/* Delete Button (Admin Only) */}
                    <button 
                      onClick={() => setDeleteConfirmId(service._id)}
                      className="absolute top-2 right-2 z-40 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Top Half Image */}
                    <div 
                      className="h-[240px] relative w-full overflow-hidden cursor-pointer"
                      onClick={() => triggerImageUpload(service._id)}
                    >
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a] z-10" />
                      
                      {/* Upload Overlay */}
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                        <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center border border-gold/50 mb-2">
                          <UploadCloud className="w-5 h-5 text-gold" />
                        </div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Change Image</span>
                      </div>
                    </div>

                    {/* Overlapping Icon */}
                    <div 
                      onClick={() => cycleIcon(service._id, service.iconName)}
                      className="absolute top-[210px] left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-gold bg-black flex items-center justify-center z-30 shadow-[0_0_15px_rgba(252,166,3,0.2)] cursor-pointer hover:bg-neutral-900 group/icon"
                    >
                      <Icon className="w-6 h-6 text-gold stroke-[1.5]" />
                      {/* Icon Swap Tooltip (Admin Only) */}
                      <div className="absolute -top-8 bg-black border border-[#222] text-[9px] text-white px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 whitespace-nowrap transition-opacity pointer-events-none">
                        Change Icon
                      </div>
                    </div>

                    {/* Bottom Half Content */}
                    <div className="pt-10 pb-6 md:pt-12 md:pb-8 px-4 md:px-6 flex flex-col items-center text-center flex-1 z-10 relative bg-[#0a0a0a]">
                      
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => handleInputChangeLocal(service._id, 'title', e.target.value)}
                        onBlur={(e) => saveUpdateToBackend(service._id, 'title', e.target.value)}
                        className="font-bebas text-xl md:text-2xl tracking-widest uppercase mb-3 md:mb-4 text-white hover:text-gold focus:text-gold transition-colors bg-transparent border-b border-transparent focus:border-gold/50 text-center w-full focus:outline-none placeholder:text-neutral-700"
                        placeholder="SERVICE TITLE"
                      />
                      
                      <textarea
                        value={service.description}
                        onChange={(e) => handleTextareaChangeLocal(e, service._id)}
                        onBlur={(e) => saveUpdateToBackend(service._id, 'description', e.target.value)}
                        className="text-[10px] md:text-xs text-neutral-400 leading-relaxed font-medium flex-1 bg-transparent border border-transparent hover:border-[#222] focus:border-gold/50 rounded p-1 md:p-2 text-center w-full focus:outline-none resize-none overflow-hidden placeholder:text-neutral-700"
                        rows={3}
                        placeholder="Service description..."
                      />

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* Custom Confirm Modal for Loading Defaults */}
      {showDefaultConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bebas uppercase tracking-widest text-white mb-2">Load Default Services</h3>
            <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
              This will automatically add the 8 default services to your database. You can edit or delete them later. Do you want to continue?
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowDefaultConfirm(false)}
                className="px-5 py-2.5 rounded text-xs font-bold tracking-widest uppercase text-white bg-transparent border border-[#333] hover:border-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmLoadDefaults}
                className="px-5 py-2.5 rounded text-xs font-bold tracking-widest uppercase text-black bg-gold hover:bg-gold/90 transition-colors shadow-[0_0_15px_rgba(252,166,3,0.3)]"
              >
                Yes, Load Defaults
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Confirm Modal for Deleting */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bebas uppercase tracking-widest text-red-500 mb-2">Delete Service</h3>
            <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
              Are you sure you want to delete this service? This action cannot be undone.
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
