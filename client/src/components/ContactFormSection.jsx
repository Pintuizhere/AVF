"use client";

import { Phone, Mail, MapPin, Clock, Send, Lock, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

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

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: ""
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const [contactData, setContactData] = useState({
    facebookUrl: "#",
    instagramUrl: "#",
    youtubeUrl: "#",
    linkedinUrl: "#",
    phoneNumbers: "+91 86765 43210",
    emailAddress: "hello@avfproduction.com",
    address: "New Delhi, India",
    workingHours: "Mon - Sat: 10:00 AM - 7:00 PM"
  });

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/footer");
        if (res.ok) {
          const data = await res.json();
          if (data) setContactData(data);
        }
      } catch (error) {
        console.error("Failed to fetch contact data:", error);
      }
    };
    fetchFooterData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    try {
      const res = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ loading: false, success: true, error: "" });
        setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
        setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
      } else {
        setStatus({ loading: false, success: false, error: data.message || "Failed to submit" });
      }
    } catch (error) {
      setStatus({ loading: false, success: false, error: "Server connection failed" });
    }
  };
  return (
    <section className="relative w-full bg-[#eae3d5] pt-20 pb-24 z-20">
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-multiply" />
      
      {/* Torn Edge transition at the top */}
      <div className="absolute top-0 left-0 w-full h-[60px] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgoJPHBvbHlnb24gZmlsbD0iI2VhZTNkNSIgcG9pbnRzPSIwLDggOCw4IDgsMCAwLDAgIi8+Cgk8cG9seWdvbiBmaWxsPSIjMGQwZDBkIiBwb2ludHM9IjAsOCA0LDQgOCw4ICIvPgo8L3N2Zz4=')] bg-repeat-x bg-bottom -translate-y-full opacity-100 z-10" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
          
          {/* Left Column: Contact Details */}
          <div className="flex flex-col items-start pt-8">
            <span className="font-script text-3xl text-gold mb-1 -rotate-2">Get In Touch</span>
            <h2 className="text-5xl md:text-6xl font-bebas uppercase tracking-widest text-black leading-none mb-6">
              WE&apos;RE HERE TO HELP!
            </h2>
            <p className="text-sm font-medium text-neutral-700 tracking-wide max-w-md mb-12">
              Got a vision? We&apos;re ready to bring it to life.<br/>
              Drop us a message and our team will<br/>
              get back to you soon.
            </p>

            <div className="flex flex-col gap-8 mb-12">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gold shadow-md">
                  <Phone className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">CALL US</span>
                  <span className="text-sm font-bold text-black">
                    {contactData.phoneNumbers.split('\n').map((num, i) => (
                      <span key={i}>{num}<br/></span>
                    ))}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gold shadow-md">
                  <Mail className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">EMAIL US</span>
                  <span className="text-sm font-bold text-black">{contactData.emailAddress}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gold shadow-md">
                  <MapPin className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">VISIT US</span>
                  <span className="text-sm font-bold text-black">
                    {contactData.address.split('\n').map((line, i) => (
                      <span key={i}>{line}<br/></span>
                    ))}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gold shadow-md">
                  <Clock className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">WORKING HOURS</span>
                  <span className="text-sm font-bold text-black">{contactData.workingHours}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {[
                { icon: FacebookIcon, url: contactData.facebookUrl },
                { icon: InstagramIcon, url: contactData.instagramUrl },
                { icon: YoutubeIcon, url: contactData.youtubeUrl },
                { icon: LinkedinIcon, url: contactData.linkedinUrl }
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a key={idx} href={social.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-md bg-black flex items-center justify-center text-white hover:bg-gold hover:text-black transition-colors shadow-md">
                    <Icon className="w-4 h-4 stroke-[2]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Column: Form Card */}
          <div className="relative">
             {/* Card Background */}
             <div className="w-full bg-[#121212] rounded-md shadow-2xl p-8 md:p-12 relative overflow-hidden border border-neutral-800">
               <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none mix-blend-overlay" />
               <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/20 pointer-events-none" />
               
               <div className="relative z-10 flex flex-col items-start mb-8">
                 <span className="font-script text-2xl text-gold mb-1 -rotate-2">Send Us a Message</span>
                 <h3 className="text-4xl md:text-5xl font-bebas uppercase tracking-widest text-white leading-none">
                   TELL US ABOUT YOUR PROJECT
                 </h3>
               </div>

               <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                 {status.success && (
                   <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-md flex items-center gap-3 text-green-500 text-sm">
                     <CheckCircle2 className="w-5 h-5 shrink-0" />
                     <p>Message sent successfully! We will get back to you soon.</p>
                   </div>
                 )}
                 {status.error && (
                   <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-md text-red-500 text-sm">
                     <p>{status.error}</p>
                   </div>
                 )}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name" 
                      className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-sm px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold transition-colors"
                    />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Your Email" 
                      className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-sm px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold transition-colors"
                    />
                 </div>
                 
                 <input 
                   type="text" 
                   name="phone"
                   value={formData.phone}
                   onChange={handleChange}
                   required
                   placeholder="Phone Number" 
                   className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-sm px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold transition-colors"
                 />

                 <div className="relative">
                   <select 
                     name="projectType"
                     value={formData.projectType}
                     onChange={handleChange}
                     required
                     className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-sm px-4 py-4 text-sm text-neutral-400 focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                   >
                     <option value="" disabled>Project Type</option>
                     <option value="documentary">Documentary</option>
                     <option value="commercial">Commercial</option>
                     <option value="event">Event Coverage</option>
                     <option value="other">Other</option>
                   </select>
                   <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                     <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M1 1.5L6 6.5L11 1.5" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                   </div>
                 </div>

                 <textarea 
                   name="message"
                   value={formData.message}
                   onChange={handleChange}
                   required
                   placeholder="Tell us about your project..." 
                   rows={4}
                   className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-sm px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold transition-colors resize-none"
                 />

                 <div className="mt-2">
                   <button 
                     type="submit"
                     disabled={status.loading}
                     className="bg-gold hover:bg-white text-black px-8 py-4 font-bold text-[10px] uppercase tracking-widest flex items-center gap-4 transition-colors rounded-sm shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {status.loading ? "SENDING..." : "SEND MESSAGE"}
                     {!status.loading && <Send className="w-4 h-4" />}
                   </button>
                 </div>

                 <div className="flex items-center gap-2 mt-4">
                   <Lock className="w-3 h-3 text-gold" />
                   <span className="text-[10px] text-neutral-500 font-medium">We respect your privacy. Your information is safe with us.</span>
                 </div>
               </form>
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
