"use client";

import { useState, useEffect } from "react";
import { 
  Save, User, Lock, Bell, Shield, Smartphone, UploadCloud,
  CheckCircle2, AlertCircle
} from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    profilePicture: "",
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      const res = await fetch("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setProfile({
          name: data.name || "",
          email: data.email || "",
          profilePicture: data.profilePicture || ""
        });
        
        let adminInfo = JSON.parse(localStorage.getItem("adminInfo") || "{}");
        adminInfo.profilePicture = data.profilePicture;
        localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
        window.dispatchEvent(new Event("adminInfoUpdated"));
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      let currentProfilePic = profile.profilePicture;

      // If a new file is selected, upload it first
      if (selectedFile) {
        const formData = new FormData();
        formData.append("image", selectedFile);
        
        const picRes = await fetch("http://localhost:5000/api/users/profile-picture", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });
        
        if (picRes.ok) {
          const picData = await picRes.json();
          currentProfilePic = picData.profilePicture;
        } else {
          const errData = await picRes.json();
          setError(errData.message || "Failed to upload picture");
          setTimeout(() => setError(""), 3000);
          return;
        }
      }

      const res = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email
        })
      });

      if (res.ok) {
        const data = await res.json();
        
        setProfile({
          name: data.name || "",
          email: data.email || "",
          profilePicture: currentProfilePic || ""
        });
        setSelectedFile(null);
        
        let adminInfo = JSON.parse(localStorage.getItem("adminInfo") || "{}");
        adminInfo.name = data.name;
        adminInfo.email = data.email;
        adminInfo.profilePicture = currentProfilePic;
        localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
        window.dispatchEvent(new Event("adminInfoUpdated"));
        
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        const errData = await res.json();
        setError(errData.message || "Failed to update profile");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      setError("Server error");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleSavePassword = async () => {
    if (security.newPassword !== security.confirmPassword) {
      setError("New passwords do not match");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/users/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: security.currentPassword,
          newPassword: security.newPassword
        })
      });

      if (res.ok) {
        setSecurity({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        const errData = await res.json();
        setError(errData.message || "Failed to update password");
        setTimeout(() => setError(""), 3000);
      }
    } catch (err) {
      setError("Server error");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    
    if (activeTab === "profile") {
      await handleSaveProfile();
    } else if (activeTab === "security") {
      await handleSavePassword();
    }
    
    setIsSaving(false);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-12">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white tracking-wide">Settings</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage your profile and security.</p>
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

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-md flex items-center gap-3 text-red-500 text-sm">
          <AlertCircle className="w-5 h-5" />
          <p>{error}</p>
        </div>
      )}

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

          {activeTab === "profile" && (
            <div className="flex flex-col gap-8 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex flex-col gap-1 border-b border-[#1a1a1a] pb-4">
                <h2 className="text-lg font-bold text-white">Profile Settings</h2>
                <p className="text-xs text-neutral-400">Manage your personal account details.</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="relative w-24 h-24 rounded-full bg-[#111] border border-[#222] flex items-center justify-center overflow-hidden group">
                  {imagePreview || profile.profilePicture ? (
                    <img src={imagePreview || profile.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-neutral-500 group-hover:opacity-0 transition-opacity">
                      {profile.name ? profile.name.charAt(0).toUpperCase() : "A"}
                    </span>
                  )}
                  <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                    <UploadCloud className="w-6 h-6 text-gold" />
                    <input type="file" accept="image/jpeg, image/png, image/gif" className="hidden" onChange={handleFileSelect} />
                  </label>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-bold text-white">Profile Picture</h3>
                  <p className="text-xs text-neutral-400">JPG, GIF or PNG. Max size of 2MB.</p>
                  <label className="px-4 py-2 bg-[#111] hover:bg-[#1a1a1a] border border-[#222] text-xs text-white rounded transition-colors w-fit mt-1 cursor-pointer">
                    Upload New
                    <input type="file" accept="image/jpeg, image/png, image/gif" className="hidden" onChange={handleFileSelect} />
                  </label>
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
                    value={security.currentPassword}
                    onChange={(e) => setSecurity({...security, currentPassword: e.target.value})}
                    className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">New Password</label>
                    <input 
                      type="password" 
                      value={security.newPassword}
                      onChange={(e) => setSecurity({...security, newPassword: e.target.value})}
                      className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Confirm New Password</label>
                    <input 
                      type="password" 
                      value={security.confirmPassword}
                      onChange={(e) => setSecurity({...security, confirmPassword: e.target.value})}
                      className="w-full bg-[#111] border border-[#222] focus:border-gold/50 rounded-md px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="mt-4 pt-6 border-t border-[#1a1a1a]">
                  <button onClick={() => { localStorage.removeItem("adminToken"); localStorage.removeItem("adminInfo"); window.location.href="/admin/login"; }} className="px-6 py-2.5 bg-transparent border border-red-500/30 text-red-500 hover:bg-red-500/10 rounded text-sm font-bold uppercase tracking-wider transition-colors">
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
