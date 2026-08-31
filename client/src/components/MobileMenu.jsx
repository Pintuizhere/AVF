import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  X, Home, User, Clapperboard, MonitorPlay, Camera, Mail, 
  Phone, MapPin, Globe, ArrowRight 
} from "lucide-react";

const FacebookIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.61l.39-4H14V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);
const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const [footerData, setFooterData] = useState({
    phoneNumbers: "+91 86765 43210",
    emailAddress: "hello@avfproduction.com",
    address: "New Delhi, India",
    instagramUrl: "#",
    youtubeUrl: "#",
    facebookUrl: "#",
    linkedinUrl: "#"
  });

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/footer`);
        if (res.ok) {
          const data = await res.json();
          if (data) setFooterData(data);
        }
      } catch (error) {
        console.error("Failed to fetch footer data:", error);
      }
    };
    fetchFooter();
  }, []);

  const links = [
    { name: "HOME", href: "/", icon: Home },
    { name: "ABOUT US", href: "/about", icon: User },
    { name: "SERVICES", href: "/services", icon: Clapperboard },
    { name: "OUR WORK", href: "/our-work", icon: MonitorPlay },
    { name: "BTS", href: "/bts", icon: Camera },
    { name: "CONTACT US", href: "/contact", icon: Mail },
  ];

  const socialIcons = [
    { icon: FacebookIcon, label: "FB", url: footerData.facebookUrl },
    { icon: InstagramIcon, label: "IG", url: footerData.instagramUrl },
    { icon: YoutubeIcon, label: "YT", url: footerData.youtubeUrl },
    { icon: LinkedinIcon, label: "LI", url: footerData.linkedinUrl }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-[400px] bg-[#0a0a0a] z-[100] transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-y-auto overflow-x-hidden border-r border-[#1a1a1a] shadow-2xl ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1a1a1a]">
          <div className="flex items-center">
            <img src="/images/logo.png" alt="AVF Logo" className="h-[60px] w-auto object-contain drop-shadow-[0_2px_2px_rgba(0,0,0,1)]" />
          </div>
          <button 
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>
        </div>

        {/* Hero Image Section */}
        <div className="relative w-full aspect-[4/3] bg-black">
          <Image
            src="/images/services-bg.jpg"
            alt="Hero Background"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start">
             <h3 className="text-3xl font-bebas uppercase text-white leading-[0.9] tracking-widest drop-shadow-md">
               RECORDED.<br/>
               CRAFTED.<br/>
               <span className="text-gold">REMEMBERED.</span>
             </h3>
             <p className="text-[10px] uppercase tracking-widest text-neutral-300 font-bold mt-2">
               EVERY FRAME HAS<br/>A PURPOSE.
             </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col py-2 border-b border-[#1a1a1a]">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={onClose}
                className="group relative flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-6">
                  {/* Active Indicator Line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${isActive ? 'bg-gold' : 'bg-transparent'}`} />
                  
                  <link.icon className={`w-6 h-6 stroke-[1.5] transition-colors ${isActive ? 'text-gold' : 'text-neutral-400 group-hover:text-white'}`} />
                  <span className={`font-bold tracking-widest text-xs transition-colors ${isActive ? 'text-gold' : 'text-white'}`}>
                    {link.name}
                  </span>
                </div>
                <div className="text-neutral-600 group-hover:text-gold transition-colors">
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 1L6.5 6L1.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Contact Details */}
        <div className="px-6 py-8">
          <div className="flex flex-col mb-8">
            <span className="font-script text-[36px] text-[#FCA603] mb-2 leading-none">Let&apos;s Connect</span>
            <p className="text-[14px] text-neutral-300 leading-relaxed font-medium">
              Have a project in mind?<br/>
              We&apos;d love to hear from you.
            </p>
          </div>

          <div className="flex flex-col gap-6 mb-12">
            <div className="flex items-center gap-6">
              <div className="w-[50px] h-[50px] rounded-full border border-[#FCA603] flex items-center justify-center text-[#FCA603] shrink-0">
                <Phone className="w-5 h-5 stroke-[1.5]" />
              </div>
              <span className="text-[14px] text-white font-semibold tracking-wide">{footerData.phoneNumbers.split('\n')[0]}</span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-[50px] h-[50px] rounded-full border border-[#FCA603] flex items-center justify-center text-[#FCA603] shrink-0">
                <Mail className="w-5 h-5 stroke-[1.5]" />
              </div>
              <span className="text-[14px] text-white font-semibold tracking-wide">{footerData.emailAddress}</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-[50px] h-[50px] rounded-full border border-[#FCA603] flex items-center justify-center text-[#FCA603] shrink-0">
                <MapPin className="w-5 h-5 stroke-[1.5]" />
              </div>
              <span className="text-[14px] text-white font-semibold tracking-wide truncate max-w-[200px]">{footerData.address.split('\n').join(', ')}</span>
            </div>
          </div>

          {/* Social Follow */}
          <div className="flex flex-col mb-10">
            <span className="text-[11px] font-bold text-white uppercase tracking-[0.2em] mb-4">FOLLOW US</span>
            <div className="flex items-center gap-4">
              {socialIcons.map((social, idx) => (
                <a key={idx} href={social.url} target="_blank" rel="noreferrer" className="w-[46px] h-[46px] rounded-[10px] bg-[#1a1a1a] flex items-center justify-center text-white hover:bg-[#FCA603] hover:text-black transition-colors shadow-md">
                  <social.icon className="w-5 h-5 stroke-[1.5]" />
                </a>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link 
            href="/contact" 
            onClick={onClose}
            className="w-full bg-[#FCA603] hover:bg-white text-black px-6 py-4 font-bold text-[13px] uppercase tracking-widest flex items-center justify-between transition-colors shadow-md"
          >
            START YOUR PROJECT
            <ArrowRight className="w-5 h-5 stroke-[2]" />
          </Link>
        </div>

        {/* Footer Area with Torn Paper & Graphics */}
        <div className="relative mt-auto pt-16 pb-8 bg-black">
          {/* Torn Paper Top Edge */}
          <div className="absolute top-0 left-0 w-full h-[60px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHBvbHlnb24gZmlsbD0iIzBhMGEwYSIgcG9pbnRzPSIwLDggOCw4IDgsMCAwLDAgIi8+Cgk8cG9seWdvbiBmaWxsPSIjMDAwMDAwIiBwb2ludHM9IjAsOCA0LDQgOCw4ICIvPgo8L3N2Zz4=')] bg-repeat-x bg-bottom -translate-y-full opacity-100 z-10" />
          
          <div className="flex items-center justify-center relative h-32 px-4 mb-6">
            {/* Lens */}
            <div className="absolute -left-10 bottom-0 w-32 h-32 rounded-full overflow-hidden opacity-60 mix-blend-luminosity">
               <Image src="/images/hero-bg.jpg" alt="Lens" fill className="object-cover object-left-bottom" />
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-black/50" />
            </div>

            {/* Taped Note */}
            <div className="relative z-10 w-24 h-24 bg-[#f5f1e6] shadow-xl flex flex-col items-center justify-center -rotate-6 border border-neutral-300">
               <div className="absolute -top-1 -left-2 w-8 h-3 bg-[#c2b49d]/80 shadow-sm backdrop-blur-md transform -rotate-12" />
               <div className="absolute inset-0 bg-noise opacity-20 mix-blend-multiply pointer-events-none" />
               <span className="font-script text-xs text-black -rotate-2 mt-1">Lights.</span>
               <span className="font-script text-xs text-black -rotate-2">Camera.</span>
               <span className="font-script text-sm text-black font-bold -rotate-2">AVF.</span>
            </div>

            {/* Film Rolls */}
            <div className="absolute -right-4 bottom-2 w-28 h-28 opacity-80 mix-blend-luminosity transform rotate-6">
               <Image src="/images/services-bg.jpg" alt="Film" fill className="object-cover rounded-md" />
            </div>
          </div>

          <p className="text-center text-[9px] text-neutral-600 px-6">
            © {new Date().getFullYear()} AVF Production.<br/>All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
}
