"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Clock, Calendar, CheckCircle, Circle, Trash2, Filter, Search, Tag, Loader2, AlertCircle } from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/leads", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setLeads(data);
      } else {
        setError(data.message || "Failed to fetch leads");
      }
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'New' ? 'Contacted' : 'New';
    
    // Optimistic update
    setLeads(prev => prev.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));
    
    try {
      const token = localStorage.getItem("adminToken");
      await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      // Revert if error
      setLeads(prev => prev.map(lead => lead._id === id ? { ...lead, status: currentStatus } : lead));
    }
  };

  const removeLead = async (id) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    
    // Optimistic update
    const previousLeads = [...leads];
    setLeads(prev => prev.filter(lead => lead._id !== id));
    
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!res.ok) {
        setLeads(previousLeads);
      }
    } catch (err) {
      setLeads(previousLeads);
    }
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
    const matchesFilter = filter === 'all' || lead.status.toLowerCase() === filter.toLowerCase();
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
              {leads.filter(l => l.status === 'New').length} New
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

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-500 text-sm mb-4">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Leads Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
        {loading ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-neutral-500">
            <Loader2 className="w-10 h-10 mb-4 animate-spin text-gold" />
            <p>Loading leads...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-neutral-500 border border-dashed border-[#222] rounded-xl">
            <Mail className="w-12 h-12 mb-4 opacity-50" />
            <p>No leads found matching your criteria.</p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div key={lead._id} className={`bg-[#0a0a0a] border ${lead.status === 'New' ? 'border-gold/30 shadow-[0_0_15px_rgba(252,166,3,0.05)]' : 'border-[#1a1a1a]'} rounded-xl overflow-hidden flex flex-col group relative`}>
              
              {/* Delete Overlay */}
              <button 
                onClick={() => removeLead(lead._id)}
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
                      {new Date(lead.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      <span className="mx-1">•</span>
                      <Clock className="w-3 h-3" />
                      {new Date(lead.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
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
                  onClick={() => toggleStatus(lead._id, lead.status)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded text-xs font-bold uppercase tracking-widest transition-colors ${
                    lead.status === 'New' 
                      ? 'bg-gold hover:bg-gold/90 text-black' 
                      : 'bg-[#111] hover:bg-[#222] border border-[#222] text-neutral-400'
                  }`}
                >
                  {lead.status === 'New' ? (
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
