"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Plus, Search, MoreVertical, Edit2, Trash2, Eye, Filter } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/projects`);
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      const adminToken = localStorage.getItem("adminToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/projects/${deleteConfirmId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) fetchProjects();
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-xs text-neutral-400 mt-1">Manage your portfolio, edit details, and add new projects.</p>
        </div>
        <Link 
          href="/admin/projects/add" 
          className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold/90 text-black text-xs font-bold uppercase tracking-widest rounded-md transition-colors w-fit"
        >
          <Plus className="w-4 h-4 stroke-[2]" /> Add Project
        </Link>
      </div>

      {/* Toolbar: Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search projects by title or client..." 
            className="w-full bg-[#111] border border-[#222] text-white text-sm rounded-md pl-10 pr-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#111] border border-[#222] text-neutral-300 hover:text-white text-sm rounded-md transition-colors w-full sm:w-auto">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-neutral-500">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="flex justify-center py-20 text-neutral-500">No projects found. Create one!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-2">
          {projects.map((project) => (
            <div key={project._id} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl overflow-hidden group hover:border-gold/30 transition-colors flex flex-col">
              
              {/* Image Thumbnail */}
              <div className="relative h-48 w-full border-b border-[#1a1a1a] overflow-hidden">
                <Image 
                  src={project.mediaUrl || "/images/hero-bg.jpg"} 
                  alt={project.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded backdrop-blur-md border bg-green-500/20 text-green-400 border-green-500/30">
                    Published
                  </span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gold font-bold tracking-widest uppercase mb-1">
                      {project.category} — {project.year}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
                  </div>
                  <button className="text-neutral-500 hover:text-white transition-colors shrink-0">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs text-neutral-400 mt-auto pt-4 border-t border-[#1a1a1a]">
                  <span className="font-medium text-neutral-500">Client:</span>
                  <span className="text-neutral-300">{project.client || 'N/A'}</span>
                </div>
                
                {/* Actions row */}
                <div className="flex items-center gap-2 mt-4">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#111] hover:bg-[#222] border border-[#222] rounded text-xs text-neutral-300 transition-colors">
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => setDeleteConfirmId(project._id)} className="w-9 h-9 flex items-center justify-center bg-[#111] hover:bg-red-500/10 border border-[#222] hover:border-red-500/30 rounded text-neutral-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <Link href={`/our-work/${project.slug || project._id}`} target="_blank" className="w-9 h-9 flex items-center justify-center bg-[#111] hover:bg-blue-500/10 border border-[#222] hover:border-blue-500/30 rounded text-neutral-400 hover:text-blue-500 transition-colors">
                    <Eye className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Custom Confirm Modal for Deleting */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bebas uppercase tracking-widest text-red-500 mb-2">Delete Project</h3>
            <p className="text-neutral-400 text-sm mb-8 leading-relaxed">
              Are you sure you want to delete this project? This action cannot be undone.
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
