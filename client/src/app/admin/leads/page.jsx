"use client";

import { useState } from "react";
import { Mail, Phone, Clock, Calendar, CheckCircle, Circle, Trash2, Filter, Search, Tag } from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([
    {
      id: "LD-001",
      name: "Rahul Verma",
      email: "rahul.v@example.com",
      phone: "+91 98765 43210",
      projectType: "documentary",
      message: "Hi AVF team, we are an NGO looking to shoot a 15-minute documentary highlighting our recent water conservation project in Rajasthan. We need a cinematic approach.",
      date: "2024-05-18T10:30:00",
      status: "new"
    },
    {
      id: "LD-002",
      name: "Sneha Kapoor",
      email: "sneha.events@studio.in",
      phone: "+91 87654 32109",
      projectType: "event",
      message: "Looking for premium coverage for a corporate summit next month in Delhi. 2 days event.",
      date: "2024-05-17T14:45:00",
      status: "contacted"
    },
    {
      id: "LD-003",
      name: "Aditya Singh",
      email: "aditya@auto-pulse.com",
      phone: "+91 76543 21098",
      projectType: "commercial",
      message: "Need a high-octane commercial for our new motorcycle launch. Lots of tracking shots needed.",
      date: "2024-05-15T09:15:00",
      status: "new"
    }
  ]);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleStatus = (id) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id 
        ? { ...lead, status: lead.status === 'new' ? 'contacted' : 'new' } 
        : lead
    ));
  };

  const removeLead = (id) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  const getProjectTypeColor = (type) => {
    switch(type) {
      case 'documentary': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'commercial': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'event': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      default: return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/50';
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesFilter = filter === 'all' || lead.status === filter;
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lead.projectType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6 pb-12">
      
      {/* Header & Controls */}
      <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border border-[#1a1a1a] rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl mt-2">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            Leads & Inquiries
            <span className="bg-gold text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
              {leads.filter(l => l.status === 'new').length} New
            </span>
          </h1>
          <p className="text-[10px] sm:text-xs text-neutral-400 mt-1">Manage submissions from your website's contact form.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input 
              type="text" 
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111] border border-[#222] text-white text-xs rounded-md pl-9 pr-4 py-2.5 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full sm:w-auto">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-auto bg-[#111] border border-[#222] text-white text-xs rounded-md pl-4 pr-10 py-2.5 focus:outline-none focus:border-gold/50 transition-colors appearance-none cursor-pointer"
            >
              <option value="all">All Leads</option>
              <option value="new">New / Unread</option>
              <option value="contacted">Contacted</option>
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-neutral-500 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
        {filteredLeads.length === 0 ? (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-neutral-500 border border-dashed border-[#222] rounded-xl">
            <Mail className="w-12 h-12 mb-4 opacity-50" />
            <p>No leads found matching your criteria.</p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div key={lead.id} className={`bg-[#0a0a0a] border ${lead.status === 'new' ? 'border-gold/30 shadow-[0_0_15px_rgba(252,166,3,0.05)]' : 'border-[#1a1a1a]'} rounded-xl overflow-hidden flex flex-col group relative`}>
              
              {/* Delete Overlay */}
              <button 
                onClick={() => removeLead(lead.id)}
                className="absolute top-4 right-4 z-30 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete Lead"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Card Header */}
              <div className="p-6 border-b border-[#1a1a1a] bg-[#0f0f0f]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 pr-8">{lead.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(lead.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      <span className="mx-1">•</span>
                      <Clock className="w-3 h-3" />
                      {new Date(lead.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-sm text-neutral-300 hover:text-gold transition-colors w-fit">
                    <Mail className="w-4 h-4 text-neutral-500" /> {lead.email}
                  </a>
                  <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-sm text-neutral-300 hover:text-gold transition-colors w-fit">
                    <Phone className="w-4 h-4 text-neutral-500" /> {lead.phone}
                  </a>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 bg-[#050505]">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-neutral-500" />
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${getProjectTypeColor(lead.projectType)}`}>
                    {lead.projectType}
                  </span>
                </div>
                
                <p className="text-sm text-neutral-400 leading-relaxed">
                  "{lead.message}"
                </p>
              </div>

              {/* Card Footer (Status Toggle) */}
              <div className="p-4 border-t border-[#1a1a1a] bg-[#0a0a0a]">
                <button 
                  onClick={() => toggleStatus(lead.id)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-colors ${
                    lead.status === 'new' 
                      ? 'bg-gold hover:bg-gold/90 text-black' 
                      : 'bg-[#111] hover:bg-[#222] border border-[#222] text-neutral-400'
                  }`}
                >
                  {lead.status === 'new' ? (
                    <>
                      <Circle className="w-4 h-4" /> Mark as Contacted
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-500" /> Contacted (Click to undo)
                    </>
                  )}
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
