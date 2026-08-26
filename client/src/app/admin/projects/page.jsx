"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, Search, MoreVertical, Edit2, Trash2, Eye, Filter } from "lucide-react";

export default function AdminProjectsPage() {
  
  // Dummy data representing projects from the frontend
  const projects = [
    { id: 1, title: "Beyond Borders", category: "Documentaries", year: "2024", client: "Global Network", duration: "27:45", status: "Published", image: "/images/hero-bg.jpg" },
    { id: 2, title: "Tech Beyond", category: "Commercials", year: "2023", client: "TechCorp", duration: "01:00", status: "Published", image: "/images/services-bg.jpg" },
    { id: 3, title: "Live in Concert", category: "Events", year: "2024", client: "MusicFest", duration: "03:15", status: "Draft", image: "/images/hero-bg.jpg" },
    { id: 4, title: "Sweet Delights", category: "Food", year: "2023", client: "Bakery", duration: "00:40", status: "Published", image: "/images/services-bg.jpg" },
    { id: 5, title: "Urban Edge", category: "Model Photography", year: "2024", client: "FashionBrand", duration: "00:40", status: "Published", image: "/images/hero-bg.jpg" },
    { id: 6, title: "Timeless Beauty", category: "Jewellery", year: "2024", client: "LuxeJewels", duration: "00:30", status: "Draft", image: "/images/services-bg.jpg" },
  ];

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

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-2">
        {projects.map((project) => (
          <div key={project.id} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl overflow-hidden group hover:border-gold/30 transition-colors flex flex-col">
            
            {/* Image Thumbnail */}
            <div className="relative h-48 w-full border-b border-[#1a1a1a] overflow-hidden">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider rounded backdrop-blur-md border ${
                  project.status === 'Published' 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30'
                }`}>
                  {project.status}
                </span>
              </div>
              <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-mono rounded">
                {project.duration}
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
                <span className="text-neutral-300">{project.client}</span>
              </div>
              
              {/* Actions row */}
              <div className="flex items-center gap-2 mt-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-[#111] hover:bg-[#222] border border-[#222] rounded text-xs text-neutral-300 transition-colors">
                  <Edit2 className="w-3.5 h-3.5" /> Edit
                </button>
                <button className="w-9 h-9 flex items-center justify-center bg-[#111] hover:bg-red-500/10 border border-[#222] hover:border-red-500/30 rounded text-neutral-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <Link href={`/our-work/${project.id}`} target="_blank" className="w-9 h-9 flex items-center justify-center bg-[#111] hover:bg-blue-500/10 border border-[#222] hover:border-blue-500/30 rounded text-neutral-400 hover:text-blue-500 transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
