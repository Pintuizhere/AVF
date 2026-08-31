"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Image as ImageIcon, Type, PenTool } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminAboutHero() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    badge: "",
    title: "",
    subtitle: "",
    content: "",
    signatureName: "",
    signatureRole: "",
    image: ""
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/abouthero`);
      const data = await res.json();
      if (data) {
        setFormData({
          badge: data.badge || "",
          title: data.title || "",
          subtitle: data.subtitle || "",
          content: data.content || "",
          signatureName: data.signatureName || "",
          signatureRole: data.signatureRole || "",
          image: data.image || ""
        });
        setPreviewImage(data.image);
      }
    } catch (error) {
      console.error("Error fetching about hero:", error);
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
    submitData.append("badge", formData.badge);
    submitData.append("title", formData.title);
    submitData.append("subtitle", formData.subtitle);
    submitData.append("content", formData.content);
    submitData.append("signatureName", formData.signatureName);
    submitData.append("signatureRole", formData.signatureRole);
    if (imageFile) {
      submitData.append("image", imageFile);
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/abouthero`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: submitData
      });

      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({ ...prev, image: data.image }));
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error("Error saving about hero:", error);
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
          About Hero Saved!
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Manage About Hero</h1>
        <p className="text-neutral-400 mt-2">Update the director's note, photo, and signature displayed at the top of the About page.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        
        {/* Photo Upload */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-gold" /> Director Photo
          </h2>
          
          <div className="flex flex-col gap-4">
            {previewImage && (
              <div className="relative w-full max-w-sm h-[450px] rounded-xl overflow-hidden border border-[#222]">
                <Image src={previewImage} alt="Director Preview" fill className="object-cover" />
              </div>
            )}
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gold file:text-black hover:file:bg-white transition-colors cursor-pointer"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
            <Type className="w-5 h-5 text-gold" /> Text Content
          </h2>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Badge (Yellow Box)</label>
              <input 
                type="text" 
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                placeholder="A Note From Our Founder"
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Title (Large Text)</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Akash Verma"
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Subtitle (Script Font)</label>
              <input 
                type="text" 
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Founder. Filmmaker. Dreamer."
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Main Paragraph</label>
              <textarea 
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="5"
                placeholder="For me, filmmaking is not just about cameras..."
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
            <PenTool className="w-5 h-5 text-gold" /> Signature Section
          </h2>
          
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Signature Name</label>
              <input 
                type="text" 
                name="signatureName"
                value={formData.signatureName}
                onChange={handleChange}
                placeholder="Akash Verma"
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Signature Role</label>
              <input 
                type="text" 
                name="signatureRole"
                value={formData.signatureRole}
                onChange={handleChange}
                placeholder="Founder"
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
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
