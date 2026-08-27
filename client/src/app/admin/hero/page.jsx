"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Image as ImageIcon, Type, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminHero() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    headingLine1: "",
    headingLine2: "",
    subtitle: "",
    videoReelUrl: "",
    bgMedia: "",
    bgMediaType: "image"
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchHero();
  }, [router]);

  const fetchHero = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/hero");
      const data = await res.json();
      if (data) {
        setFormData({
          headingLine1: data.headingLine1 || "",
          headingLine2: data.headingLine2 || "",
          subtitle: data.subtitle || "",
          videoReelUrl: data.videoReelUrl || "",
          bgMedia: data.bgMedia || "",
          bgMediaType: data.bgMediaType || "image"
        });
        setPreviewImage(data.bgMedia);
      }
    } catch (error) {
      console.error("Error fetching hero:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("adminToken");

    const submitData = new FormData();
    submitData.append("headingLine1", formData.headingLine1);
    submitData.append("headingLine2", formData.headingLine2);
    submitData.append("subtitle", formData.subtitle);
    submitData.append("videoReelUrl", formData.videoReelUrl);
    if (imageFile) {
      submitData.append("bgMedia", imageFile);
    }

    try {
      const res = await fetch("http://localhost:5000/api/hero", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: submitData
      });

      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, bgMedia: data.bgMedia, bgMediaType: data.bgMediaType }));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error("Error saving hero:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="p-8 pb-32">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-8 right-8 bg-gold text-black px-6 py-3 rounded-lg font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] z-50 animate-fade-in flex items-center gap-3">
          <Save className="w-5 h-5" />
          Hero Settings Saved!
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Manage Hero Section</h1>
        <p className="text-neutral-400 mt-2">Update the main heading, subtitle, background image, and reel link.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        
        {/* Background Media */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-gold" /> Background Media (Image / Video)
          </h2>
          
          <div className="flex flex-col gap-4">
            {previewImage && (
              <div className="relative w-full h-64 rounded-xl overflow-hidden border border-[#222]">
                {(formData.bgMediaType === 'video' || (imageFile && imageFile.type.startsWith('video/'))) ? (
                  <video src={previewImage} className="w-full h-full object-cover" autoPlay muted loop />
                ) : (
                  <Image src={previewImage} alt="Hero Background Preview" fill className="object-cover" />
                )}
              </div>
            )}
            <input 
              type="file" 
              accept="image/*,video/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gold file:text-black hover:file:bg-white transition-colors cursor-pointer"
            />
            <p className="text-[10px] text-neutral-500">Upload a high-quality image or a short, compressed video loop.</p>
          </div>
        </div>

        {/* Text Content */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
            <Type className="w-5 h-5 text-gold" /> Text Content
          </h2>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Heading Line 1 (Uppercase block)</label>
              <textarea 
                name="headingLine1"
                value={formData.headingLine1}
                onChange={handleChange}
                rows="2"
                placeholder="We Don't Just&#10;Create Videos,"
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <p className="text-[10px] text-neutral-500">You can use newlines for line breaks.</p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Heading Line 2 (Script font)</label>
              <input 
                type="text" 
                name="headingLine2"
                value={formData.headingLine2}
                onChange={handleChange}
                placeholder="We Tell Stories."
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Subtitle</label>
              <textarea 
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                rows="2"
                placeholder="Cinematic Visuals. Powerful Stories.<br />Timeless Impact."
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <p className="text-[10px] text-neutral-500">You can use HTML tags like &lt;br /&gt; for line breaks.</p>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-gold" /> Links
          </h2>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Video Reel URL</label>
            <input 
              type="text" 
              name="videoReelUrl"
              value={formData.videoReelUrl}
              onChange={handleChange}
              placeholder="https://youtube.com/..."
              className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
        </div>

        {/* Floating Save Button */}
        <div className="fixed bottom-0 right-0 p-8 w-[calc(100%-256px)] bg-gradient-to-t from-black via-black/90 to-transparent flex justify-end z-40 pointer-events-none">
          <button 
            type="submit" 
            disabled={submitting}
            className="pointer-events-auto flex items-center gap-2 px-8 py-4 bg-gold hover:bg-white text-black text-sm font-bold uppercase tracking-widest rounded-md transition-colors disabled:opacity-50 disabled:hover:bg-gold shadow-2xl shadow-gold/20"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 stroke-[2]" />} 
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </form>
    </div>
  );
}
