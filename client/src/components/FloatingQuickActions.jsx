"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, X, Link2 } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaYoutube, FaFacebook, FaTwitter, FaLinkedin, FaTiktok, FaEnvelope } from "react-icons/fa";

const getIconForPlatform = (platform) => {
  switch (platform) {
    case 'WhatsApp': return <FaWhatsapp className="w-5 h-5 text-[#25D366]" />;
    case 'Instagram': return <FaInstagram className="w-5 h-5 text-[#E1306C]" />;
    case 'YouTube': return <FaYoutube className="w-5 h-5 text-[#FF0000]" />;
    case 'Facebook': return <FaFacebook className="w-5 h-5 text-[#1877F2]" />;
    case 'X/Twitter': return <FaTwitter className="w-5 h-5 text-white" />;
    case 'LinkedIn': return <FaLinkedin className="w-5 h-5 text-[#0A66C2]" />;
    case 'TikTok': return <FaTiktok className="w-5 h-5 text-white" />;
    case 'Email': return <FaEnvelope className="w-5 h-5 text-gold" />;
    default: return <Link2 className="w-5 h-5 text-white" />;
  }
};

export default function FloatingQuickActions() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    // Fetch dynamic social links
    const fetchLinks = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/social-links`);
        if (res.ok) {
          const data = await res.json();
          setSocialLinks(data);
        }
      } catch (err) {
        console.error("Failed to fetch social links", err);
      }
    };
    fetchLinks();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past roughly the Hero section
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false); // Auto close when returning to top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only render if there are links available
  if (socialLinks.length === 0) return null;

  return (
    <div 
      className={`fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"
      }`}
    >
      <div className="relative flex flex-col items-end">
        
        {/* Expanded Menu (Box Style) */}
        <div 
          className={`absolute bottom-[calc(100%+12px)] md:bottom-[calc(100%+16px)] right-0 bg-[#111] border border-[#222] rounded-2xl p-2 shadow-2xl flex flex-col gap-1 w-48 transition-all duration-500 origin-bottom-right ${
            isOpen ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-90 translate-y-4 pointer-events-none"
          }`}
        >
          {socialLinks.map((item) => (
            <Link 
              href={item.url} 
              key={item._id}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-300 hover:text-black hover:bg-gold rounded-xl transition-all duration-300 group"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-gold group-hover:text-black transition-colors">{getIconForPlatform(item.platform)}</span>
              <span className="font-montserrat font-semibold tracking-wider">{item.platform}</span>
            </Link>
          ))}
          
          {/* Decorative Top Flare */}
          <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />
        </div>

        {/* Main Floating Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.8)] relative group ${
            isOpen ? "bg-[#111] border border-[#333]" : "bg-gold border border-gold hover:scale-110"
          }`}
        >
          {/* Subtle pulse effect behind the button when closed */}
          {!isOpen && (
            <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-20 pointer-events-none" />
          )}

          <div className="relative w-full h-full flex items-center justify-center">
            <X 
              className={`w-6 h-6 md:w-7 md:h-7 text-white absolute transition-all duration-500 transform ${
                isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
              }`} 
            />
            <Camera 
              className={`w-6 h-6 md:w-7 md:h-7 text-black absolute transition-all duration-500 transform ${
                isOpen ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`} 
            />
          </div>
        </button>

      </div>
    </div>
  );
}
