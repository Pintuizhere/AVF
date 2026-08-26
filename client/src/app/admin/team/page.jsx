"use client";

import { useState, useEffect } from "react";
import { Plus, Save, Trash2, X, UploadCloud, Eye, EyeOff, Image as ImageIcon } from "lucide-react";

// Inline SVG components since we removed them from lucide-react earlier
const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function AdminTeamPage() {
  const [isActive, setIsActive] = useState(true);
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Akash Verma",
      role: "Founder & Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
    {
      id: 2,
      name: "Rohan Das",
      role: "Lead Cinematographer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      instagram: "https://instagram.com",
      linkedin: "",
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Creative Producer",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
      instagram: "",
      linkedin: "https://linkedin.com",
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", role: "", image: "", instagram: "", linkedin: "" });

  // Sync with localStorage on mount
  useEffect(() => {
    const storedStatus = localStorage.getItem("avf_team_active");
    if (storedStatus !== null) setIsActive(storedStatus === "true");

    const storedTeam = localStorage.getItem("avf_team_data");
    if (storedTeam) setTeamMembers(JSON.parse(storedTeam));
  }, []);

  const handleToggleActive = () => {
    const newStatus = !isActive;
    setIsActive(newStatus);
    localStorage.setItem("avf_team_active", String(newStatus));
  };

  const saveToStorage = (newTeamData) => {
    setTeamMembers(newTeamData);
    localStorage.setItem("avf_team_data", JSON.stringify(newTeamData));
  };

  const handleUpdate = (id, field, value) => {
    const updated = teamMembers.map(item => item.id === id ? { ...item, [field]: value } : item);
    saveToStorage(updated);
  };

  const removeMember = (id) => {
    const updated = teamMembers.filter(item => item.id !== id);
    saveToStorage(updated);
  };

  const handleAddNewItem = () => {
    if (!newItem.name) return;
    const itemToAdd = {
      id: Date.now(),
      name: newItem.name,
      role: newItem.role || "Team Member",
      image: newItem.image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      instagram: newItem.instagram,
      linkedin: newItem.linkedin,
    };
    saveToStorage([...teamMembers, itemToAdd]);
    setIsAdding(false);
    setNewItem({ name: "", role: "", image: "", instagram: "", linkedin: "" });
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      
      {/* Top Warning/Status Bar */}
      <div className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${isActive ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
            {isActive ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </div>
          <div className="flex flex-col">
            <h2 className={`font-bold ${isActive ? 'text-emerald-400' : 'text-red-400'}`}>
              Frontend Display: {isActive ? 'ACTIVE' : 'DEACTIVATED'}
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              {isActive 
                ? "The Team section is currently visible on the public About page." 
                : "The Team section is hidden. Visitors cannot see this section."}
            </p>
          </div>
        </div>
        
        <button 
          onClick={handleToggleActive}
          className={`px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-widest transition-all ${
            isActive 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
              : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg'
          }`}
        >
          {isActive ? 'Deactivate Section' : 'Activate Section'}
        </button>
      </div>

      {/* Floating Action Bar */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white">Manage Team Members</h1>
          <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Live WYSIWYG Editor. Click directly on text to edit.</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-transparent border border-[#222] hover:border-white text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              <Plus className="w-3 h-3 sm:w-4 sm:h-4" /> Add Member
            </button>
          )}
        </div>
      </div>

      {/* Add New Member Form */}
      {isAdding && (
        <div className="bg-[#0a0a0a] border border-gold/50 rounded-xl p-6 shadow-[0_0_20px_rgba(252,166,3,0.1)] relative">
          <button 
            onClick={() => setIsAdding(false)}
            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-lg font-bebas uppercase tracking-widest text-gold mb-6">Add New Team Member</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Name *</label>
                <input 
                  type="text" 
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  placeholder="e.g. John Doe" 
                  className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Role</label>
                <input 
                  type="text" 
                  value={newItem.role}
                  onChange={(e) => setNewItem({...newItem, role: e.target.value})}
                  placeholder="e.g. Lead Editor" 
                  className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md px-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Upload File (Image)</label>
                <div className="w-full h-24 border-2 border-dashed border-[#222] hover:border-gold/50 rounded-lg flex flex-col items-center justify-center bg-[#111] transition-colors cursor-pointer group relative overflow-hidden">
                  {newItem.image ? (
                    <>
                      <img src={newItem.image} alt="Preview" className="w-full h-full object-cover opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-white bg-black/60 px-3 py-1 rounded">Change Image</span>
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

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="flex flex-col gap-1">
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Instagram URL</label>
                  <div className="relative">
                    <InstagramIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input 
                      type="text" 
                      value={newItem.instagram}
                      onChange={(e) => setNewItem({...newItem, instagram: e.target.value})}
                      placeholder="https://instagram.com/..." 
                      className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md pl-10 pr-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest">LinkedIn URL</label>
                  <div className="relative">
                    <LinkedinIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input 
                      type="text" 
                      value={newItem.linkedin}
                      onChange={(e) => setNewItem({...newItem, linkedin: e.target.value})}
                      placeholder="https://linkedin.com/in/..." 
                      className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md pl-10 pr-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Live Preview */}
            <div className="flex flex-col items-center justify-center border border-dashed border-[#222] rounded-xl p-4 bg-[#111]">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-4">Live Preview</span>
              <div className="w-full max-w-[240px] aspect-[4/5] rounded-xl overflow-hidden mb-6 border border-white/10 shadow-xl bg-neutral-900 relative group">
                <img 
                  src={newItem.image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"} 
                  alt="Preview" 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Social Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-4">
                    {newItem.instagram && (
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                        <InstagramIcon className="w-4 h-4" />
                      </div>
                    )}
                    {newItem.linkedin && (
                      <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                        <LinkedinIcon className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold tracking-tight uppercase text-white mb-1">
                {newItem.name || "Member Name"}
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                {newItem.role || "Role"}
              </p>
            </div>

          </div>

          <div className="mt-8 flex justify-end">
            <button 
              onClick={handleAddNewItem}
              disabled={!newItem.name}
              className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors"
            >
              <Plus className="w-4 h-4 stroke-[2]" /> Add Member
            </button>
          </div>

        </div>
      )}

      {/* Grid View */}
      <section className="bg-black py-12 px-6 rounded-xl border border-white/5 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 relative z-10">
          {teamMembers.map((member) => (
            <div key={member.id} className="group relative flex flex-col items-center">
              
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6 border border-white/10 hover:border-gold/30 transition-all duration-500 shadow-xl bg-neutral-900">
                
                {/* Delete Overlay */}
                <button 
                  onClick={() => removeMember(member.id)}
                  className="absolute top-4 right-4 z-40 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Social Media & Image Edit Overlay (shows on hover) */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 gap-4 z-20">
                  
                  <div className="w-full">
                    <label className="text-[8px] font-bold text-neutral-300 uppercase tracking-widest block mb-1">Image URL</label>
                    <input
                      type="text"
                      value={member.image}
                      onChange={(e) => handleUpdate(member.id, 'image', e.target.value)}
                      className="w-full text-xs text-white bg-black/80 border border-white/20 rounded px-2 py-1.5 focus:outline-none focus:border-gold text-center"
                      placeholder="Image URL"
                    />
                  </div>

                  <div className="w-full">
                    <label className="text-[8px] font-bold text-neutral-300 uppercase tracking-widest block mb-1">Instagram URL</label>
                    <div className="relative">
                      <InstagramIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-400" />
                      <input
                        type="text"
                        value={member.instagram || ""}
                        onChange={(e) => handleUpdate(member.id, 'instagram', e.target.value)}
                        className="w-full text-xs text-white bg-black/80 border border-white/20 rounded pl-7 pr-2 py-1.5 focus:outline-none focus:border-gold"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="text-[8px] font-bold text-neutral-300 uppercase tracking-widest block mb-1">LinkedIn URL</label>
                    <div className="relative">
                      <LinkedinIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-400" />
                      <input
                        type="text"
                        value={member.linkedin || ""}
                        onChange={(e) => handleUpdate(member.id, 'linkedin', e.target.value)}
                        className="w-full text-xs text-white bg-black/80 border border-white/20 rounded pl-7 pr-2 py-1.5 focus:outline-none focus:border-gold"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                </div>
              </div>

              {/* Text Content Editable */}
              <div className="flex flex-col items-center gap-1 w-full">
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => handleUpdate(member.id, 'name', e.target.value)}
                  className="text-xl font-bold tracking-tight uppercase text-white hover:text-gold transition-colors bg-transparent border-b border-transparent hover:border-white/30 focus:border-white w-full text-center focus:outline-none"
                  placeholder="Member Name"
                />
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => handleUpdate(member.id, 'role', e.target.value)}
                  className="text-xs font-bold uppercase tracking-widest text-neutral-500 bg-transparent border-b border-transparent hover:border-white/30 focus:border-white w-full text-center focus:outline-none"
                  placeholder="Role"
                />
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
