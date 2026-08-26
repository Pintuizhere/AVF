"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, Clapperboard, MonitorPlay, Camera, MessageSquareQuote, 
  Mail, Users, FileText, Settings, ShieldCheck, Calendar, Bell, ChevronDown, Menu, LogOut, X
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Clapperboard },
  { name: "Services", href: "/admin/services", icon: MonitorPlay },
  { name: "BTS Gallery", href: "/admin/bts", icon: Camera },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { name: "Leads / Inquiries", href: "/admin/leads", icon: Mail },
  { name: "Subscribers", href: "/admin/subscribers", icon: Users },
  { name: "Team", href: "/admin/team", icon: Users },
  { name: "Pages", href: "/admin/pages", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Users", href: "/admin/users", icon: ShieldCheck },
];

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#050505] text-white font-sans">{children}</div>;
  }

  return (
    <div className="flex h-screen w-full bg-[#050505] text-white overflow-hidden font-sans relative">
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-[100] w-64 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col h-full transform transition-transform duration-300 ease-in-out shrink-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Branding & Mobile Close */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#1a1a1a]">
          <Link href="/" className="flex items-center">
            <img src="/images/logo.png" alt="AVF Production Logo" className="h-[60px] w-auto object-contain" />
          </Link>
          <button 
            className="md:hidden text-neutral-400 hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto custom-scrollbar py-6 px-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-md transition-all group ${
                  isActive 
                    ? "bg-[#1f1606] border border-gold/20 shadow-[0_0_15px_rgba(252,166,3,0.05)]" 
                    : "hover:bg-[#111] border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 stroke-[1.5] transition-colors ${
                    isActive ? "text-gold" : "text-neutral-500 group-hover:text-white"
                  }`} />
                  <span className={`text-sm font-medium transition-colors ${
                    isActive ? "text-gold" : "text-neutral-400 group-hover:text-white"
                  }`}>
                    {item.name}
                  </span>
                </div>
                
                {/* Chevron for non-active/hover */}
                {!isActive && (
                   <svg className="w-4 h-4 text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                   </svg>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Section: Sign Out */}
        <div className="p-4 mt-auto flex flex-col gap-4">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-md text-neutral-400 hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all group">
            <LogOut className="w-5 h-5 stroke-[1.5]" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden w-full">
        
        {/* Topbar */}
        <header className="h-20 bg-[#0a0a0a] border-b border-[#1a1a1a] flex items-center justify-between px-4 md:px-8 shrink-0">
          
          <div className="flex items-center gap-4 md:gap-6">
            {/* Mobile Hamburger Menu */}
            <button 
              className="md:hidden text-neutral-400 hover:text-white transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex flex-col">
              <h2 className="text-lg md:text-xl font-bold text-white leading-tight truncate">Dashboard</h2>
              <p className="hidden sm:block text-xs text-neutral-400 mt-0.5">Welcome back, Admin!</p>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="hidden sm:flex items-center gap-2 text-neutral-400">
              <Calendar className="w-4 h-4 stroke-[1.5]" />
              <span className="text-xs font-medium">May 18, 2024</span>
            </div>
            
            <div className="relative cursor-pointer group">
              <Bell className="w-5 h-5 stroke-[1.5] text-neutral-400 group-hover:text-white transition-colors" />
              <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold rounded-full border-2 border-[#0a0a0a] flex items-center justify-center text-[8px] font-bold text-black">
                3
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3 cursor-pointer group pl-4 border-l border-[#222]">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#cfa25c] flex items-center justify-center text-black font-bold text-sm shadow-md">
                A
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-sm font-bold text-white leading-tight">Admin</span>
                <span className="text-[10px] text-neutral-400">Super Admin</span>
              </div>
              <ChevronDown className="hidden md:block w-4 h-4 stroke-[2] text-neutral-500 group-hover:text-white ml-2 transition-colors" />
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6 bg-[#050505]">
          {children}
        </main>
        
      </div>

    </div>
  );
}
