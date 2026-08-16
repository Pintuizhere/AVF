"use client";

import Image from "next/image";
import { 
  Clapperboard, Users, Eye, Mail, ArrowUpRight, ArrowDownRight, 
  ChevronDown, UserCircle2, CheckCircle2, Clock, CalendarClock, PauseCircle
} from "lucide-react";

export default function AdminDashboardPage() {
  
  // Dummy Data
  const stats = [
    { title: "Total Projects", value: "42", change: "+ 8.6%", isPositive: true, icon: Clapperboard, chart: "M0 20 Q 10 10, 20 15 T 40 5 T 60 10 T 80 0" },
    { title: "Total Leads", value: "128", change: "+ 12.4%", isPositive: true, icon: Users, chart: "M0 20 Q 15 5, 30 15 T 50 10 T 70 15 T 80 5" },
    { title: "Page Views", value: "7,845", change: "+ 15.7%", isPositive: true, icon: Eye, chart: "M0 20 Q 10 15, 20 5 T 40 10 T 60 0 T 80 5" },
    { title: "Subscribers", value: "564", change: "- 3.2%", isPositive: false, icon: Mail, chart: "M0 5 Q 15 15, 30 10 T 50 20 T 70 15 T 80 20" },
  ];

  const recentLeads = [
    { name: "Rohit Sharma", email: "rohit@gmail.com", time: "10 mins ago", status: "New" },
    { name: "Neha Kapoor", email: "neha.kapoor@mail.com", time: "1 hour ago", status: "New" },
    { name: "Arjun Verma", email: "arjunv@mail.com", time: "2 hours ago", status: "Contacted" },
    { name: "Karan Mehta", email: "karan.mehta@mail.com", time: "5 hours ago", status: "Contacted" },
    { name: "Pooja Singh", email: "pooja.singh@mail.com", time: "1 day ago", status: "Closed" },
  ];

  const recentProjects = [
    { title: "Luxury Lifestyle Film", category: "Commercial", status: "In Progress", color: "bg-gold" },
    { title: "Corporate Event 2024", category: "Event", status: "Completed", color: "bg-green-500" },
    { title: "Product Promo - TechGear", category: "Commercial", status: "In Progress", color: "bg-gold" },
  ];

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
          
          <div className="flex-1 relative w-full min-h-[250px] mt-4">
             {/* Y-axis Labels */}
             <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-neutral-500 font-medium z-10">
               <span>10K</span>
               <span>8K</span>
               <span>6K</span>
               <span>4K</span>
               <span>2K</span>
               <span>0</span>
             </div>
             
             {/* Chart Grid Lines */}
             <div className="absolute left-6 right-0 top-1 bottom-6 flex flex-col justify-between z-0">
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="w-full h-[1px] bg-[#1a1a1a]" />
               ))}
             </div>

             {/* SVG Line Chart */}
             <div className="absolute left-6 right-0 top-1 bottom-6 z-20">
               <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                 <defs>
                   <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="rgba(252,166,3,0.2)" />
                     <stop offset="100%" stopColor="rgba(252,166,3,0)" />
                   </linearGradient>
                 </defs>
                 <path 
                   d="M 0,80 L 5,60 L 15,40 L 25,50 L 30,48 L 40,60 L 50,45 L 55,30 L 60,50 L 65,52 L 75,25 L 85,38 L 95,50 L 100,30 L 105,40" 
                   fill="url(#chartGradient)" 
                   stroke="none"
                 />
                 <path 
                   d="M 0,80 L 5,60 L 15,40 L 25,50 L 30,48 L 40,60 L 50,45 L 55,30 L 60,50 L 65,52 L 75,25 L 85,38 L 95,50 L 100,30 L 105,40" 
                   fill="none" 
                   stroke="#FCA603" 
                   strokeWidth="1.5" 
                   strokeLinecap="round" 
                   strokeLinejoin="round"
                   className="drop-shadow-[0_0_8px_rgba(252,166,3,0.6)]"
                 />
                 <circle cx="100" cy="30" r="3" fill="#FCA603" className="drop-shadow-[0_0_5px_rgba(252,166,3,1)]" />
               </svg>

               {/* Hover Tooltip Mockup */}
               <div className="absolute right-0 top-4 -translate-y-full bg-[#111] border border-[#222] rounded-md p-2 shadow-xl flex flex-col items-end">
                 <span className="text-sm font-bold text-white">7,845</span>
                 <span className="text-[9px] text-neutral-400">May 18, 2024</span>
               </div>
             </div>

             {/* X-axis Labels */}
             <div className="absolute left-6 right-0 bottom-0 flex justify-between text-[10px] text-neutral-500 font-medium">
               <span>Apr 18</span>
               <span>Apr 24</span>
               <span>Apr 30</span>
               <span>May 06</span>
               <span>May 12</span>
               <span>May 18</span>
             </div>
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
              <div key={i} className="flex items-center justify-between group">
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
                  <span className="text-[9px] text-neutral-500">{lead.time}</span>
                  <div className={`px-2 py-0.5 rounded text-[9px] font-medium border ${
                    lead.status === 'New' ? 'bg-gold/10 border-gold/20 text-gold' : 
                    lead.status === 'Contacted' ? 'bg-[#222] border-[#333] text-neutral-300' : 
                    'bg-[#111] border-[#222] text-neutral-500'
                  }`}>
                    {lead.status}
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

      {/* Bottom Row: Projects Overview & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Projects Overview */}
        <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-white">Projects Overview</h3>
            <button className="text-[10px] font-bold text-gold hover:text-white transition-colors">
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
            
            {/* Stat: Completed */}
            <div className="bg-[#111] border border-[#1a1a1a] rounded-lg p-4 flex flex-col items-center justify-center gap-3">
              <div className="relative flex flex-col items-center justify-center w-12 h-12">
                 <svg className="w-full h-full transform -rotate-90">
                   <circle cx="24" cy="24" r="20" stroke="#222" strokeWidth="3" fill="none" />
                   <circle cx="24" cy="24" r="20" stroke="#22c55e" strokeWidth="3" fill="none" strokeDasharray="125" strokeDashoffset="25" />
                 </svg>
                 <CheckCircle2 className="w-4 h-4 text-green-500 absolute" />
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-white block">12</span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Completed</span>
              </div>
            </div>

            {/* Stat: In Progress */}
            <div className="bg-[#111] border border-[#1a1a1a] rounded-lg p-4 flex flex-col items-center justify-center gap-3">
              <div className="relative flex flex-col items-center justify-center w-12 h-12">
                 <svg className="w-full h-full transform -rotate-90">
                   <circle cx="24" cy="24" r="20" stroke="#222" strokeWidth="3" fill="none" />
                   <circle cx="24" cy="24" r="20" stroke="#FCA603" strokeWidth="3" fill="none" strokeDasharray="125" strokeDashoffset="60" />
                 </svg>
                 <Clock className="w-4 h-4 text-gold absolute" />
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-white block">18</span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider">In Progress</span>
              </div>
            </div>

            {/* Stat: Upcoming */}
            <div className="bg-[#111] border border-[#1a1a1a] rounded-lg p-4 flex flex-col items-center justify-center gap-3">
              <div className="relative flex flex-col items-center justify-center w-12 h-12">
                 <svg className="w-full h-full transform -rotate-90">
                   <circle cx="24" cy="24" r="20" stroke="#222" strokeWidth="3" fill="none" />
                   <circle cx="24" cy="24" r="20" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="125" strokeDashoffset="90" />
                 </svg>
                 <CalendarClock className="w-4 h-4 text-blue-500 absolute" />
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-white block">8</span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider">Upcoming</span>
              </div>
            </div>

            {/* Stat: On Hold */}
            <div className="bg-[#111] border border-[#1a1a1a] rounded-lg p-4 flex flex-col items-center justify-center gap-3">
              <div className="relative flex flex-col items-center justify-center w-12 h-12">
                 <svg className="w-full h-full transform -rotate-90">
                   <circle cx="24" cy="24" r="20" stroke="#222" strokeWidth="3" fill="none" />
                   <circle cx="24" cy="24" r="20" stroke="#ef4444" strokeWidth="3" fill="none" strokeDasharray="125" strokeDashoffset="110" />
                 </svg>
                 <PauseCircle className="w-4 h-4 text-red-500 absolute" />
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-white block">4</span>
                <span className="text-[9px] text-neutral-400 uppercase tracking-wider">On Hold</span>
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
              <div key={i} className="flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-[#111] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-10 rounded overflow-hidden border border-[#222]">
                    <Image src="/images/services-bg.jpg" alt="Project" fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white group-hover:text-gold transition-colors">{project.title}</span>
                    <span className="text-[10px] text-neutral-500">{project.category}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-neutral-400">{project.status}</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${project.color} shadow-[0_0_5px_currentColor]`} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <footer className="mt-8 text-center">
        <p className="text-[10px] text-neutral-500">
          © 2024 <span className="text-gold">AVF</span> Akash Verma Film Products. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

// ArrowRight needed for button
function ArrowRight(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
