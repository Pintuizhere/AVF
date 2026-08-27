"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Clapperboard, Users, Eye, Mail, ArrowUpRight, ArrowDownRight, 
  ChevronDown, UserCircle2, CheckCircle2, Clock, CalendarClock, PauseCircle, ArrowRight, Cloud
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const analyticsData = [
  { date: 'Apr 18', views: 1800 },
  { date: 'Apr 20', views: 4000 },
  { date: 'Apr 22', views: 6000 },
  { date: 'Apr 24', views: 5000 },
  { date: 'Apr 26', views: 5200 },
  { date: 'Apr 30', views: 3900 },
  { date: 'May 02', views: 5200 },
  { date: 'May 04', views: 7000 },
  { date: 'May 06', views: 5000 },
  { date: 'May 08', views: 4800 },
  { date: 'May 12', views: 7500 },
  { date: 'May 14', views: 6500 },
  { date: 'May 16', views: 5000 },
  { date: 'May 18', views: 7845 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111] border border-[#222] rounded-md p-3 shadow-xl flex flex-col items-end min-w-[100px]">
        <span className="text-lg font-bold text-white">{payload[0].value.toLocaleString()}</span>
        <span className="text-[11px] text-neutral-400 mt-1">{label}, 2024</span>
      </div>
    );
  }
  return null;
};

export default function AdminDashboardPage() {
  
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) return;
        const res = await fetch("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchDashboard();
  }, []);

  const stats = [
    { 
      title: "Total Projects", 
      value: data?.totalProjects || "0", 
      change: "Live", 
      isPositive: true, 
      icon: Clapperboard, 
      chart: "M0 20 Q 10 10, 20 15 T 40 5 T 60 10 T 80 0" 
    },
    { 
      title: "Total Leads", 
      value: data?.totalLeads || "0", 
      change: "Live", 
      isPositive: true, 
      icon: Users, 
      chart: "M0 20 Q 15 5, 30 15 T 50 10 T 70 15 T 80 5" 
    },
    { 
      title: "Cloud Storage", 
      value: data?.storageUsage?.usedBytes ? `${(data.storageUsage.usedBytes / (1024 * 1024)).toFixed(1)} MB` : "0 MB", 
      change: data?.storageUsage?.percent ? `${data.storageUsage.percent}% Used` : "0% Used", 
      isPositive: true, 
      icon: Cloud, 
      chart: "M0 20 Q 10 15, 20 5 T 40 10 T 60 0 T 80 5" 
    },
    { 
      title: "Storage Limit", 
      value: "25 GB", 
      change: "Free Tier", 
      isPositive: true, 
      icon: Cloud, 
      chart: "M0 5 Q 15 15, 30 10 T 50 20 T 70 15 T 80 20" 
    },
  ];

  const recentLeads = data?.recentLeads || [];
  const recentProjects = data?.recentProjects || [];

  return (
    <div className="flex flex-col gap-6 pb-8">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-5 flex flex-col relative overflow-hidden group">
            <div className="flex items-start justify-between mb-2">
              <div className="w-10 h-10 rounded-lg border border-[#222] bg-[#111] flex items-center justify-center text-gold">
                <stat.icon className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-neutral-400">{stat.title}</span>
                <span className="text-2xl font-bold text-white mt-1">{stat.value}</span>
              </div>
            </div>
            
            <div className="flex items-end justify-between mt-4">
              <div className="flex items-center gap-1 text-[10px] font-medium">
                {stat.isPositive ? (
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-500" />
                )}
                <span className={stat.isPositive ? "text-green-500" : "text-red-500"}>{stat.change}</span>
                <span className="text-neutral-500 ml-1">this month</span>
              </div>
              
              {/* Mini Sparkline SVG */}
              <div className="w-16 h-6 opacity-70">
                <svg viewBox="0 0 80 24" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  <path 
                    d={stat.chart} 
                    fill="none" 
                    stroke={stat.isPositive ? "#FCA603" : "#ef4444"} 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="drop-shadow-[0_2px_3px_rgba(252,166,3,0.3)]"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row: Analytics & Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Website Analytics Chart */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white">Website Analytics</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#111] border border-[#222] text-xs text-neutral-300 hover:text-white transition-colors">
              Last 30 Days
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex-1 relative w-full min-h-[300px] mt-4" style={{ WebkitFilter: 'drop-shadow(0px 0px 10px rgba(252, 166, 3, 0.2))' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FCA603" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FCA603" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1a1a1a" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#737373', fontSize: 10 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#737373', fontSize: 10 }} 
                  tickFormatter={(val) => `${val >= 1000 ? (val / 1000) + 'K' : val}`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#FCA603', strokeWidth: 1, strokeDasharray: '3 3' }} />
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#FCA603" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                  activeDot={{ r: 6, fill: "#FCA603", stroke: "#0a0a0a", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white">Recent Leads</h3>
            <button className="text-[10px] font-bold text-gold hover:text-white transition-colors">
              View All
            </button>
          </div>
          
          <div className="flex flex-col gap-4 flex-1">
            {recentLeads.map((lead, i) => (
              <div key={lead._id || i} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#222] bg-[#111] flex items-center justify-center text-gold">
                    <UserCircle2 className="w-4 h-4 stroke-[1.5]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white group-hover:text-gold transition-colors cursor-pointer">{lead.name}</span>
                    <span className="text-[10px] text-neutral-500">{lead.email}</span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[9px] text-neutral-500">
                    {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'Just now'}
                  </span>
                  <div className={`px-2 py-0.5 rounded text-[9px] font-medium border ${
                    (!lead.status || lead.status === 'new') ? 'bg-gold/10 border-gold/20 text-gold' : 
                    lead.status === 'contacted' ? 'bg-[#222] border-[#333] text-neutral-300' : 
                    'bg-[#111] border-[#222] text-neutral-500'
                  }`}>
                    {lead.status ? lead.status.charAt(0).toUpperCase() + lead.status.slice(1) : 'New'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 rounded-md border border-gold/30 hover:border-gold text-gold text-[11px] font-bold tracking-widest flex items-center justify-center gap-2 transition-colors">
            View All Leads <ArrowRight className="w-3 h-3 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Bottom Row: Site Assets & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Site Assets Overview */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white">Site Assets Overview</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            
            {/* Stat: Services */}
            <div className="bg-[#111] border border-[#1a1a1a] rounded-lg p-4 flex flex-col items-center justify-center gap-3">
              <div className="relative flex flex-col items-center justify-center w-12 h-12">
                 <svg className="w-full h-full transform -rotate-90">
                   <circle cx="24" cy="24" r="20" stroke="#222" strokeWidth="3" fill="none" />
                   <circle cx="24" cy="24" r="20" stroke="#22c55e" strokeWidth="3" fill="none" strokeDasharray="125" strokeDashoffset="25" />
                 </svg>
                 <CheckCircle2 className="w-4 h-4 text-green-500 absolute" />
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-white block">{data?.totalServices || 0}</span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Services</span>
              </div>
            </div>

            {/* Stat: Shorts */}
            <div className="bg-[#111] border border-[#1a1a1a] rounded-lg p-4 flex flex-col items-center justify-center gap-3">
              <div className="relative flex flex-col items-center justify-center w-12 h-12">
                 <svg className="w-full h-full transform -rotate-90">
                   <circle cx="24" cy="24" r="20" stroke="#222" strokeWidth="3" fill="none" />
                   <circle cx="24" cy="24" r="20" stroke="#FCA603" strokeWidth="3" fill="none" strokeDasharray="125" strokeDashoffset="60" />
                 </svg>
                 <Clock className="w-4 h-4 text-gold absolute" />
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-white block">{data?.totalShorts || 0}</span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Shorts</span>
              </div>
            </div>

            {/* Stat: Testimonials */}
            <div className="bg-[#111] border border-[#1a1a1a] rounded-lg p-4 flex flex-col items-center justify-center gap-3">
              <div className="relative flex flex-col items-center justify-center w-12 h-12">
                 <svg className="w-full h-full transform -rotate-90">
                   <circle cx="24" cy="24" r="20" stroke="#222" strokeWidth="3" fill="none" />
                   <circle cx="24" cy="24" r="20" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="125" strokeDashoffset="90" />
                 </svg>
                 <CalendarClock className="w-4 h-4 text-blue-500 absolute" />
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-white block">{data?.totalTestimonials || 0}</span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Testimonials</span>
              </div>
            </div>

            {/* Stat: Clients */}
            <div className="bg-[#111] border border-[#1a1a1a] rounded-lg p-4 flex flex-col items-center justify-center gap-3">
              <div className="relative flex flex-col items-center justify-center w-12 h-12">
                 <svg className="w-full h-full transform -rotate-90">
                   <circle cx="24" cy="24" r="20" stroke="#222" strokeWidth="3" fill="none" />
                   <circle cx="24" cy="24" r="20" stroke="#ef4444" strokeWidth="3" fill="none" strokeDasharray="125" strokeDashoffset="110" />
                 </svg>
                 <PauseCircle className="w-4 h-4 text-red-500 absolute" />
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-white block">{data?.totalClients || 0}</span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Clients</span>
              </div>
            </div>

          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white">Recent Projects</h3>
            <button className="text-[10px] font-bold text-gold hover:text-white transition-colors">
              View All
            </button>
          </div>
          
          <div className="flex flex-col gap-4">
            {recentProjects.map((project, i) => (
              <div key={project._id || i} className="flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-[#111] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-10 rounded overflow-hidden border border-[#222]">
                    <Image 
                      src={project.mediaUrl || "/images/services-bg.jpg"} 
                      alt={project.title} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white group-hover:text-gold transition-colors">{project.title}</span>
                    <span className="text-[10px] text-neutral-500">{project.category}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-neutral-400">
                    {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Active'}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_currentColor]`} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <footer className="mt-8 text-center">
        <p className="text-[10px] text-neutral-500">
          © {new Date().getFullYear()} <span className="text-gold font-medium">AVF</span> Production. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}


