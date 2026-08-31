"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, Link2, GripVertical, Check, X } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaYoutube, FaFacebook, FaTwitter, FaLinkedin, FaTiktok, FaEnvelope } from "react-icons/fa";

const PLATFORMS = ['WhatsApp', 'Instagram', 'YouTube', 'Facebook', 'X/Twitter', 'LinkedIn', 'TikTok', 'Email'];

const getIconForPlatform = (platform) => {
  switch (platform) {
    case 'WhatsApp': return <FaWhatsapp className="w-5 h-5 text-[#25D366]" />;
    case 'Instagram': return <FaInstagram className="w-5 h-5 text-[#E1306C]" />;
    case 'YouTube': return <FaYoutube className="w-5 h-5 text-[#FF0000]" />;
    case 'Facebook': return <FaFacebook className="w-5 h-5 text-[#1877F2]" />;
    case 'X/Twitter': return <FaTwitter className="w-5 h-5 text-white" />;
    case 'LinkedIn': return <FaLinkedin className="w-5 h-5 text-[#0A66C2]" />;
    case 'TikTok': return <FaTiktok className="w-5 h-5 text-white" />;
    case 'Email': return <FaEnvelope className="w-5 h-5 text-gold" />;
    default: return <Link2 className="w-5 h-5 text-white" />;
  }
};

export default function AdminSocialLinksPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ platform: "WhatsApp", url: "", isActive: true, order: 0 });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/social-links/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setLinks(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = async () => {
    if (!newItem.url) {
      alert("URL is required.");
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/social-links`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(newItem)
      });
      if (res.ok) {
        setIsAdding(false);
        setNewItem({ platform: "WhatsApp", url: "", isActive: true, order: links.length });
        fetchLinks();
      }
    } catch (err) {
      console.error("Failed to create", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this link?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/social-links/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchLinks();
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const handleUpdate = async (id, field, value) => {
    // Optimistic update
    setLinks(links.map(l => l._id === id ? { ...l, [field]: value } : l));
    
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/social-links/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ [field]: value }),
      });
    } catch (err) {
      console.error("Failed to update", err);
      fetchLinks(); // Revert on failure
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      
      {/* Action Bar */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl mt-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Manage Social Links</h1>
          <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Configure the links that appear in the bottom-right floating menu.</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gold hover:bg-gold/90 text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4 stroke-[2]" /> Add Link
            </button>
          )}
        </div>
      </div>

      {/* Add New Link Form */}
      {isAdding && (
        <div className="bg-[#0a0a0a] border border-gold/50 rounded-xl p-6 shadow-[0_0_20px_rgba(252,166,3,0.1)] relative">
          <button 
            onClick={() => setIsAdding(false)}
            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bebas uppercase tracking-widest text-gold mb-6">Add New Social Link</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Platform *</label>
              <select 
                value={newItem.platform}
                onChange={(e) => setNewItem({...newItem, platform: e.target.value})}
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
              >
                {PLATFORMS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">URL *</label>
              <input 
                type="text" 
                value={newItem.url}
                onChange={(e) => setNewItem({...newItem, url: e.target.value})}
                placeholder="https://..." 
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Display Order</label>
              <input 
                type="number" 
                value={newItem.order}
                onChange={(e) => setNewItem({...newItem, order: parseInt(e.target.value) || 0})}
                className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button 
              onClick={handleAddNew}
              disabled={submitting || !newItem.url}
              className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 stroke-[2]" />} 
              {submitting ? "Saving..." : "Save Link"}
            </button>
          </div>
        </div>
      )}

      {/* Links List */}
      <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-neutral-500">Loading links...</div>
        ) : links.length === 0 ? (
          <div className="p-8 text-center text-neutral-500">No social links configured yet.</div>
        ) : (
          <div className="flex flex-col divide-y divide-[#1a1a1a]">
            {links.map((link) => (
              <div key={link._id} className="p-4 md:p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:bg-[#111] transition-colors group">
                
                <div className="flex items-center gap-4 flex-1 w-full">
                  <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center shrink-0 border border-[#333]">
                    {getIconForPlatform(link.platform)}
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <span className="font-bold text-white text-sm">{link.platform}</span>
                    <input 
                      type="text"
                      value={link.url}
                      onChange={(e) => handleUpdate(link._id, 'url', e.target.value)}
                      className="bg-transparent border-b border-transparent hover:border-[#333] focus:border-gold/50 text-xs text-neutral-400 focus:text-white outline-none w-full max-w-md transition-colors"
                      placeholder="URL"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-[#222] pt-4 md:pt-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Order</span>
                    <input 
                      type="number"
                      value={link.order}
                      onChange={(e) => handleUpdate(link._id, 'order', parseInt(e.target.value) || 0)}
                      className="w-16 bg-[#1a1a1a] border border-[#333] rounded px-2 py-1 text-xs text-center text-white focus:outline-none focus:border-gold/50"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={link.isActive}
                        onChange={(e) => handleUpdate(link._id, 'isActive', e.target.checked)}
                      />
                      <div className="w-9 h-5 bg-[#222] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-neutral-400 peer-checked:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gold"></div>
                    </label>
                    <span className="text-[10px] font-bold uppercase tracking-widest w-12 text-center text-neutral-500">
                      {link.isActive ? 'Active' : 'Hidden'}
                    </span>
                  </div>

                  <button 
                    onClick={() => handleDelete(link._id)}
                    className="w-8 h-8 rounded flex items-center justify-center text-neutral-500 hover:text-white hover:bg-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
