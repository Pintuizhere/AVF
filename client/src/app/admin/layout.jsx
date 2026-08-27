"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, Clapperboard, MonitorPlay, Camera, MessageSquareQuote, 
  Mail, Users, FileText, Settings, ShieldCheck, Calendar, Bell, ChevronDown, Menu, LogOut, X,
  Star, Smartphone, BarChart2, Briefcase, PanelBottom, PanelTop
} from "lucide-react";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Hero Section", href: "/admin/hero", icon: PanelTop },
  { name: "About Hero", href: "/admin/about-hero", icon: PanelTop },
  { name: "Our Story", href: "/admin/about-story", icon: FileText },
  { name: "Projects", href: "/admin/projects", icon: Clapperboard },
  { name: "Featured Work", href: "/admin/featured", icon: Star },
  { name: "Shorts", href: "/admin/shorts", icon: Smartphone },
  { name: "Services", href: "/admin/services", icon: MonitorPlay },
  { name: "BTS Gallery", href: "/admin/bts", icon: Camera },
  { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { name: "Stats", href: "/admin/stats", icon: BarChart2 },
  { name: "Brands", href: "/admin/clients", icon: Briefcase },
  { name: "Leads / Inquiries", href: "/admin/leads", icon: Mail },
  { name: "Team", href: "/admin/team", icon: Users },
  { name: "Footer", href: "/admin/footer", icon: PanelBottom },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  { name: "Users", href: "/admin/users", icon: ShieldCheck },
];

export default function AdminDashboardLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    const info = localStorage.getItem("adminInfo");
    if (info) {
      try {
        setAdminInfo(JSON.parse(info));
      } catch (e) {
        console.error("Error parsing adminInfo", e);
      }
    }
    
    // Listen for storage changes in case settings updates it
    const handleStorageChange = () => {
      const updatedInfo = localStorage.getItem("adminInfo");
      if (updatedInfo) {
        try {
          setAdminInfo(JSON.parse(updatedInfo));
        } catch (e) {}
      }
    };
    
    window.addEventListener("storage", handleStorageChange);
    // Also listen for a custom event since we update in same tab
    window.addEventListener("adminInfoUpdated", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("adminInfoUpdated", handleStorageChange);
    };
  }, []);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;

    const fetchLeads = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken");
        if (!adminToken) return;
        const res = await fetch("http://localhost:5000/api/leads", {
          headers: { Authorization: `Bearer ${adminToken}` }
        });
        if (res.ok) {
          const data = await res.json();
          setInquiries(data);
        }
      } catch (err) {
        console.error("Failed to fetch leads", err);
      }
    };
    
    fetchLeads();
    
    const intervalId = setInterval(fetchLeads, 30000);
    return () => clearInterval(intervalId);
  }, [isLoginPage]);

  const newInquiries = inquiries.filter(lead => lead.status === 'new' || !lead.status).slice(0, 5);
  const unreadCount = inquiries.filter(lead => lead.status === 'new' || !lead.status).length;

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
          <button 
            onClick={() => {
              localStorage.removeItem("adminToken");
              localStorage.removeItem("adminInfo");
              window.location.href = "/admin/login";
            }}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-md text-neutral-400 hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all group"
          >
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
            
            <div className="relative group z-40">
              <button 
                className="relative cursor-pointer"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell className={`w-5 h-5 stroke-[1.5] transition-colors ${isNotificationsOpen ? 'text-white' : 'text-neutral-400 hover:text-white'}`} />
                {unreadCount > 0 && (
                  <div className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold rounded-full border-2 border-[#0a0a0a] flex items-center justify-center text-[8px] font-bold text-black animate-in zoom-in">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </div>
                )}
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsNotificationsOpen(false)}
                  />
                  <div className="fixed sm:absolute right-4 left-4 sm:left-auto sm:right-0 top-20 sm:top-full sm:mt-4 sm:w-80 md:w-96 bg-[#0a0a0a] border border-[#222] rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="p-4 border-b border-[#222] flex items-center justify-between bg-[#111]">
                      <h3 className="font-bold text-white text-sm">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-[10px] uppercase tracking-widest text-gold font-bold bg-gold/10 px-2 py-1 rounded">
                          {unreadCount} New
                        </span>
                      )}
                    </div>
                    
                    <div className="max-h-[350px] overflow-y-auto custom-scrollbar flex flex-col">
                      {newInquiries.length === 0 ? (
                        <div className="p-8 text-center text-neutral-500 text-sm">
                          No new notifications
                        </div>
                      ) : (
                        newInquiries.map((inquiry, idx) => (
                          <Link 
                            key={inquiry._id || idx}
                            href="/admin/leads"
                            onClick={() => setIsNotificationsOpen(false)}
                            className="p-4 border-b border-[#1a1a1a] hover:bg-[#111] transition-colors flex flex-col gap-1 relative overflow-hidden group"
                          >
                            <div className="flex justify-between items-start gap-2">
                              <span className="font-bold text-white text-sm truncate">{inquiry.name}</span>
                              <span className="text-[10px] text-neutral-500 shrink-0">
                                {new Date(inquiry.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <span className="text-xs text-gold uppercase font-bold tracking-wider">{inquiry.projectType || 'Inquiry'}</span>
                            <p className="text-xs text-neutral-400 line-clamp-1 mt-1">{inquiry.message}</p>
                            
                            {/* New indicator dot */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold opacity-50 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))
                      )}
                    </div>
                    
                    <Link 
                      href="/admin/leads"
                      onClick={() => setIsNotificationsOpen(false)}
                      className="block p-3 text-center text-xs text-neutral-400 hover:text-white hover:bg-[#111] transition-colors border-t border-[#222]"
                    >
                      View All Inquiries
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 md:gap-3 cursor-pointer group pl-4 border-l border-[#222]">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#cfa25c] flex items-center justify-center text-black font-bold text-sm shadow-md overflow-hidden relative">
                {adminInfo?.profilePicture ? (
                  <img src={adminInfo.profilePicture} alt={adminInfo.name} className="w-full h-full object-cover" />
                ) : (
                  adminInfo?.name ? adminInfo.name.charAt(0).toUpperCase() : "A"
                )}
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-sm font-bold text-white leading-tight">{adminInfo?.name || "Admin"}</span>
                <span className="text-[10px] text-neutral-400">{adminInfo?.role || "Super Admin"}</span>
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
