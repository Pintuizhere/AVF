"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Link2, MapPin, Phone, Mail, Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminFooter() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const [formData, setFormData] = useState({
    aboutText: "",
    facebookUrl: "",
    instagramUrl: "",
    youtubeUrl: "",
    linkedinUrl: "",
    phoneNumbers: "",
    emailAddress: "",
    address: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetchFooter();
  }, [router]);

  const fetchFooter = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/footer");
      const data = await res.json();
      if (data) {
        setFormData({
          aboutText: data.aboutText || "",
          facebookUrl: data.facebookUrl || "",
          instagramUrl: data.instagramUrl || "",
          youtubeUrl: data.youtubeUrl || "",
          linkedinUrl: data.linkedinUrl || "",
          phoneNumbers: data.phoneNumbers || "",
          emailAddress: data.emailAddress || "",
          address: data.address || ""
        });
      }
    } catch (error) {
      console.error("Error fetching footer:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch("http://localhost:5000/api/footer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error("Error saving footer:", error);
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
          Footer Settings Saved!
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-black text-white uppercase tracking-tight">Manage Footer</h1>
        <p className="text-neutral-400 mt-2">Update contact information, social links, and company details.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
        
        {/* Company Info */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-gold" /> Company Info
          </h2>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">About Text (Under Logo)</label>
            <textarea 
              name="aboutText"
              value={formData.aboutText}
              onChange={handleChange}
              rows="3"
              placeholder="AVF is committed to creating premium visual experiences..."
              className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
            <Phone className="w-5 h-5 text-gold" /> Contact Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <Mail className="w-4 h-4 text-neutral-500" /> Email Address
              </label>
              <input 
                type="text" 
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                placeholder="info@avf.com"
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-500" /> Phone Numbers
              </label>
              <textarea 
                name="phoneNumbers"
                value={formData.phoneNumbers}
                onChange={handleChange}
                rows="2"
                placeholder="+91 9334713774&#10;+91 9431584755"
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
              <p className="text-[10px] text-neutral-500">Put each number on a new line.</p>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-500" /> Physical Address
              </label>
              <textarea 
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="AVF Pvt. Ltd.&#10;Opposite Film City,&#10;Mumbai - 400001"
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4 mb-6 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-gold" /> Social Media Links
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <Link2 className="w-4 h-4 text-neutral-500" /> Instagram URL
              </label>
              <input 
                type="text" 
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleChange}
                placeholder="https://instagram.com/..."
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <Link2 className="w-4 h-4 text-neutral-500" /> Facebook URL
              </label>
              <input 
                type="text" 
                name="facebookUrl"
                value={formData.facebookUrl}
                onChange={handleChange}
                placeholder="https://facebook.com/..."
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <Link2 className="w-4 h-4 text-neutral-500" /> Youtube URL
              </label>
              <input 
                type="text" 
                name="youtubeUrl"
                value={formData.youtubeUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-3 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <Link2 className="w-4 h-4 text-neutral-500" /> LinkedIn URL
              </label>
              <input 
                type="text" 
                name="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/..."
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
