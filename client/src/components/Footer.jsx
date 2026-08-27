"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronRight, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

export default function Footer() {
  const [footerData, setFooterData] = useState({
    aboutText: "AVF is committed to creating premium visual experiences and telling stories with trust, quality, and excellence.",
    facebookUrl: "#",
    instagramUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
    phoneNumbers: "+91 9334713774\n+91 9431584755",
    emailAddress: "info@avf.com",
    address: "AVF Pvt. Ltd.\nOpposite Film City,\nMumbai - 400001"
  });

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/footer");
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

  const socialLinks = [
    { icon: FacebookIcon, url: footerData.facebookUrl },
    { icon: InstagramIcon, url: footerData.instagramUrl },
    { icon: YoutubeIcon, url: footerData.youtubeUrl },
    { icon: LinkedinIcon, url: footerData.linkedinUrl }
  ];

  return (
    <footer id="contact" className="relative bg-black pt-24 pb-12 overflow-hidden border-t border-white/10 text-white">
      {/* Background cinematic elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 opacity-20 pointer-events-none">
        <Image 
          src="/images/hero-bg.jpg"
          alt="Cinematic Background"
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-black/80 to-transparent z-0 pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-50 z-0 pointer-events-none mix-blend-overlay" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left: Lens element */}
        <div className="hidden md:flex w-72 h-72 items-center justify-center -ml-16 relative z-10">
           <Image
             src="/images/camera_lens_PNG7.png"
             alt="Camera Lens"
             fill
             className="object-contain object-center filter drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
           />
        </div>

        {/* Center: CTA */}
        <div className="flex-1 flex flex-col items-center text-center">
          <span className="font-script text-gold text-3xl mb-4 font-bold">Let's Create</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-none">
            Something Extraordinary<br />Together
          </h2>
          <button className="bg-gold text-black px-8 py-4 font-bold text-xs tracking-widest uppercase hover:bg-white transition-colors flex items-center gap-3">
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Image */}
        <div className="relative w-72 h-72 hidden md:flex items-center justify-center -mr-8">
           <Image
             src="/images/retakeflip.png"
             alt="Retake Flipboard"
             fill
             className="object-contain object-center filter drop-shadow-[0_0_20px_rgba(0,0,0,0.6)]"
           />
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 mt-24 pt-16 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-6">
            <div className="relative w-44 h-24">
              <Image 
                src="/images/logo.png" 
                alt="AVF Logo" 
                fill 
                className="object-contain object-left" 
              />
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {footerData.aboutText}
            </p>
            <div className="flex gap-3 mt-2">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a key={idx} href={social.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-black transition-all group">
                    <Icon className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Our Work', path: '/our-work' },
                { name: 'Behind The Scenes', path: '/bts' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.path} className="text-sm text-neutral-400 hover:text-gold transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-gold transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services / Projects */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold uppercase tracking-wider text-white">Projects</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: 'Documentaries', path: '/our-work' },
                { name: 'Events & Concerts', path: '/our-work' },
                { name: 'Commercials', path: '/our-work' },
                { name: 'Product Shoots', path: '/our-work' },
                { name: 'Food Photography', path: '/our-work' },
                { name: 'All Projects', path: '/our-work' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.path} className="text-sm text-neutral-400 hover:text-gold transition-colors flex items-center gap-2 group">
                    <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-gold transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold uppercase tracking-wider text-white">Contact Us</h4>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <a href={`tel:${footerData.phoneNumbers.split('\n')[0]}`} className="text-sm text-neutral-400 hover:text-white transition-colors">
                  {footerData.phoneNumbers.split('\n').map((num, i) => (
                    <span key={i}>{num}<br/></span>
                  ))}
                </a>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <a href={`mailto:${footerData.emailAddress}`} className="text-sm text-neutral-400 hover:text-white transition-colors break-all">
                  {footerData.emailAddress}
                </a>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-neutral-400 leading-relaxed">
                  {footerData.address.split('\n').map((line, i) => (
                    <span key={i}>{line}<br/></span>
                  ))}
                </span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-white/10 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 tracking-wider">
          <p>&copy; {new Date().getFullYear()} AVF Productions. All Rights Reserved.</p>
          <p className="mt-3 md:mt-0">
            Developed by <span className="text-[#3b82f6] font-medium hover:text-blue-400 transition-colors cursor-pointer">anymediaworks</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
