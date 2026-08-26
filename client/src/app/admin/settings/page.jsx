"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Save, User, Lock, Bell, Globe, Image as ImageIcon, 
  Link as LinkIcon, Shield, Smartphone, UploadCloud,
  CheckCircle2
} from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock State
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "AVF Productions",
    siteDescription: "Premium Video Production Agency",
    contactEmail: "hello@avfproductions.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Cinematic Way, Studio City, CA 91604"
  });

  const [socialLinks, setSocialLinks] = useState({
    instagram: "https://instagram.com/avfproductions",
    youtube: "https://youtube.com/avfproductions",
    vimeo: "https://vimeo.com/avfproductions",
    linkedin: "https://linkedin.com/company/avfproductions"
  });

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@avfproductions.com",
  });

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "profile", label: "Profile", icon: User },
    { id: "social", label: "Social Links", icon: LinkIcon },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-12">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white tracking-wide">Settings</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage your website configuration and profile.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gold hover:bg-gold/90 text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors shadow-[0_0_15px_rgba(252,166,3,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          ) : showSuccess ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4 stroke-[2]" />
          )}
          {showSuccess ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-4">
        
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 flex flex-col gap-2 shrink-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm font-medium ${
                  isActive 
                    ? "bg-[#1f1606] text-gold border border-gold/20 shadow-[0_0_15px_rgba(252,166,3,0.05)]" 
                    : "text-neutral-400 hover:text-white hover:bg-[#111] border border-transparent"
                }`}
              >
                <tab.icon className={`w-5 h-5 ${isActive ? "text-gold" : "text-neutral-500"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 shadow-xl relative overflow-hidden">
          
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

          {activeTab === "general" && (
            <div className="flex flex-col gap-8 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex flex-col gap-1 border-b border-[#1a1a1a] pb-4">
                <h2 className="text-lg font-bold text-white">General Information</h2>
                <p className="text-xs text-neutral-400">Basic details about your website.</p>
              </div>

              <div className="grid gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Site Name</label>
                  <input 
                    type="text" 
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                    className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Site Description</label>
                  <textarea 
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                    rows={3}
                    className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Contact Email</label>
                    <input 
                      type="email" 
                      value={generalSettings.contactEmail}
                      onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                      className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Contact Phone</label>
                    <input 
                      type="text" 
                      value={generalSettings.contactPhone}
                      onChange={(e) => setGeneralSettings({...generalSettings, contactPhone: e.target.value})}
                      className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Address</label>
                  <input 
                    type="text" 
                    value={generalSettings.address}
                    onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                    className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="flex flex-col gap-8 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex flex-col gap-1 border-b border-[#1a1a1a] pb-4">
                <h2 className="text-lg font-bold text-white">Profile Settings</h2>
                <p className="text-xs text-neutral-400">Manage your personal account details.</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 rounded-full bg-[#111] border border-[#222] flex items-center justify-center overflow-hidden group">
                  <span className="text-2xl font-bold text-neutral-500 group-hover:opacity-0 transition-opacity">A</span>
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                    <UploadCloud className="w-6 h-6 text-gold" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-bold text-white">Profile Picture</h3>
                  <p className="text-xs text-neutral-400">JPG, GIF or PNG. Max size of 2MB.</p>
                  <button className="px-4 py-2 bg-[#111] hover:bg-[#1a1a1a] border border-[#222] text-xs text-white rounded transition-colors w-fit mt-1">
                    Upload New
                  </button>
                </div>
              </div>

              <div className="grid gap-6 mt-2">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div className="flex flex-col gap-8 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex flex-col gap-1 border-b border-[#1a1a1a] pb-4">
                <h2 className="text-lg font-bold text-white">Social Links</h2>
                <p className="text-xs text-neutral-400">Connect your social media accounts.</p>
              </div>

              <div className="grid gap-6">
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <div key={platform} className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </label>
                    <div className="relative flex items-center">
                      <LinkIcon className="absolute left-4 w-4 h-4 text-neutral-500" />
                      <input 
                        type="url" 
                        value={url}
                        onChange={(e) => setSocialLinks({...socialLinks, [platform]: e.target.value})}
                        className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md pl-11 pr-4 py-3 text-sm text-white focus:outline-none transition-colors"
                        placeholder={`https://${platform}.com/...`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="flex flex-col gap-8 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex flex-col gap-1 border-b border-[#1a1a1a] pb-4">
                <h2 className="text-lg font-bold text-white">Security Settings</h2>
                <p className="text-xs text-neutral-400">Manage your password and security preferences.</p>
              </div>

              <div className="grid gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Current Password</label>
                  <input 
                    type="password" 
                    className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">New Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Confirm New Password</label>
                    <input 
                      type="password" 
                      className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-6 border-t border-[#1a1a1a]">
                  <button className="px-6 py-2.5 bg-transparent border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded text-sm font-bold uppercase tracking-wider transition-colors">
                    Log out of all devices
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
