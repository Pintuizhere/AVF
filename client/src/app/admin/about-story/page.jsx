"use client";

import { useState, useEffect, useRef } from "react";
import { Save, UploadCloud, Loader2, Image as ImageIcon, Video, CheckCircle2, XCircle, X } from "lucide-react";

export default function AdminAboutStoryPage() {
  const [formData, setFormData] = useState({
    title: "",
    heading: "",
    description: "",
  });
  
  const [media1Preview, setMedia1Preview] = useState(null);
  const [media2Preview, setMedia2Preview] = useState(null);
  
  const [media1File, setMedia1File] = useState(null);
  const [media2File, setMedia2File] = useState(null);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const fileInput1Ref = useRef(null);
  const fileInput2Ref = useRef(null);

  useEffect(() => {
    fetchAboutStory();
  }, []);

  const fetchAboutStory = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/aboutstory`);
      const data = await res.json();
      setFormData({
        title: data.title || "",
        heading: data.heading || "",
        description: data.description || "",
      });
      if (data.media1 && data.media1.url) {
        setMedia1Preview({ url: data.media1.url, type: data.media1.resource_type });
      }
      if (data.media2 && data.media2.url) {
        setMedia2Preview({ url: data.media2.url, type: data.media2.resource_type });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, mediaNumber) => {
    const file = e.target.files[0];
    if (file) {
      const isVideo = file.type.startsWith("video/");
      const previewObj = {
        url: URL.createObjectURL(file),
        type: isVideo ? "video" : "image",
      };

      if (mediaNumber === 1) {
        setMedia1File(file);
        setMedia1Preview(previewObj);
      } else {
        setMedia2File(file);
        setMedia2Preview(previewObj);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("heading", formData.heading);
    submitData.append("description", formData.description);

    if (media1File) submitData.append("media1", media1File);
    if (media2File) submitData.append("media2", media2File);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/aboutstory`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: submitData,
      });
      
      if (res.ok) {
        showNotification("success", "About Story updated successfully!");
        fetchAboutStory();
      } else {
        showNotification("error", "Failed to update.");
      }
    } catch (err) {
      console.error(err);
      showNotification("error", "Error updating About Story.");
    } finally {
      setSubmitting(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  if (loading) {
    return <div className="text-neutral-500 py-10">Loading About Story...</div>;
  }

  return (
    <div className="flex flex-col gap-6 pb-12 relative">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl animate-in slide-in-from-bottom-5 fade-in duration-300 ${notification.type === 'success' ? 'bg-[#0a0a0a] border border-green-500/30' : 'bg-[#0a0a0a] border border-red-500/30'}`}>
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <span className="text-sm font-medium text-white">{notification.message}</span>
          <button onClick={() => setNotification(null)} className="ml-2 text-neutral-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Action Bar */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl mt-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Manage Our Story</h1>
          <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Update text and media for the About Page "Our Story" section.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 sm:p-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bebas uppercase tracking-widest text-gold mb-2 border-b border-white/10 pb-4">Text Content</h2>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Small Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-[#111] border border-[#333] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g. Our Story"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Main Heading</label>
              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleInputChange}
                className="w-full bg-[#111] border border-[#333] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                placeholder="e.g. The Journey Behind AVF"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full bg-[#111] border border-[#333] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-y"
                placeholder="Story description..."
              />
            </div>
          </div>

          {/* Media Content */}
          <div className="flex flex-col gap-6">
            <h2 className="text-lg font-bebas uppercase tracking-widest text-gold mb-2 border-b border-white/10 pb-4">Polaroid Media</h2>
            
            {/* Media 1 (Back Photo) */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Back Photo / Video (Media 1)</label>
              <p className="text-[10px] text-neutral-600 mb-2">This is the image/video behind the main polaroid.</p>
              
              <input 
                type="file" 
                ref={fileInput1Ref} 
                onChange={(e) => handleFileChange(e, 1)} 
                className="hidden" 
                accept="image/*,video/*" 
              />
              
              <div 
                onClick={() => fileInput1Ref.current?.click()}
                className="w-full h-48 border-2 border-dashed border-[#333] hover:border-gold/50 rounded-xl flex flex-col items-center justify-center bg-[#111] transition-colors cursor-pointer group relative overflow-hidden"
              >
                {media1Preview ? (
                  <>
                    {media1Preview.type === 'video' ? (
                      <video src={media1Preview.url} className="w-full h-full object-cover opacity-70" muted loop playsInline />
                    ) : (
                      <img src={media1Preview.url} alt="Media 1 Preview" className="w-full h-full object-cover opacity-70" />
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold text-white bg-black/80 px-3 py-1.5 rounded uppercase tracking-wider mb-2">Change Media</span>
                      <div className="flex items-center gap-1 text-[10px] text-gold bg-black/60 px-2 py-1 rounded">
                        {media1Preview.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                        {media1Preview.type.toUpperCase()}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 text-neutral-600 group-hover:text-gold mb-3 transition-colors" />
                    <span className="text-xs font-bold text-neutral-500 group-hover:text-white uppercase tracking-widest">Upload Media 1</span>
                  </>
                )}
              </div>
            </div>

            {/* Media 2 (Front Photo) */}
            <div className="flex flex-col gap-2 mt-4">
              <label className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Front Photo / Video (Media 2)</label>
              <p className="text-[10px] text-neutral-600 mb-2">This is the main image/video inside the front polaroid frame.</p>
              
              <input 
                type="file" 
                ref={fileInput2Ref} 
                onChange={(e) => handleFileChange(e, 2)} 
                className="hidden" 
                accept="image/*,video/*" 
              />
              
              <div 
                onClick={() => fileInput2Ref.current?.click()}
                className="w-full h-48 border-2 border-dashed border-[#333] hover:border-gold/50 rounded-xl flex flex-col items-center justify-center bg-[#111] transition-colors cursor-pointer group relative overflow-hidden"
              >
                {media2Preview ? (
                  <>
                    {media2Preview.type === 'video' ? (
                      <video src={media2Preview.url} className="w-full h-full object-cover opacity-70" muted loop playsInline />
                    ) : (
                      <img src={media2Preview.url} alt="Media 2 Preview" className="w-full h-full object-cover opacity-70" />
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold text-white bg-black/80 px-3 py-1.5 rounded uppercase tracking-wider mb-2">Change Media</span>
                      <div className="flex items-center gap-1 text-[10px] text-gold bg-black/60 px-2 py-1 rounded">
                        {media2Preview.type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                        {media2Preview.type.toUpperCase()}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 text-neutral-600 group-hover:text-gold mb-3 transition-colors" />
                    <span className="text-xs font-bold text-neutral-500 group-hover:text-white uppercase tracking-widest">Upload Media 2</span>
                  </>
                )}
              </div>
            </div>
            
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex justify-end">
          <button 
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gold hover:bg-gold/90 text-black text-xs font-black uppercase tracking-widest rounded-md transition-all disabled:opacity-50 min-w-[200px]"
          >
            {submitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
            ) : (
              <><Save className="w-4 h-4" /> Save Changes</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
