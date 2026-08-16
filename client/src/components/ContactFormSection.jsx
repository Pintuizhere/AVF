import { Phone, Mail, MapPin, Clock, Camera, MonitorPlay, Globe, Clapperboard, Send, Lock } from "lucide-react";

export default function ContactFormSection() {
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
                  <span className="text-sm font-bold text-black">+91 86765 43210</span>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gold shadow-md">
                  <Mail className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">EMAIL US</span>
                  <span className="text-sm font-bold text-black">hello@avfproductions.com</span>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gold shadow-md">
                  <MapPin className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">VISIT US</span>
                  <span className="text-sm font-bold text-black">New Delhi, India</span>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gold shadow-md">
                  <Clock className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">WORKING HOURS</span>
                  <span className="text-sm font-bold text-black">Mon - Sat: 10:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {[Camera, MonitorPlay, Globe, Clapperboard].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-md bg-black flex items-center justify-center text-white hover:bg-gold hover:text-black transition-colors shadow-md">
                  <Icon className="w-4 h-4 stroke-[2]" />
                </a>
              ))}
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

               <form className="relative z-10 flex flex-col gap-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <input 
                     type="text" 
                     placeholder="Your Name" 
                     className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-sm px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold transition-colors"
                   />
                   <input 
                     type="email" 
                     placeholder="Your Email" 
                     className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-sm px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold transition-colors"
                   />
                 </div>
                 
                 <input 
                   type="text" 
                   placeholder="Phone Number" 
                   className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-sm px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold transition-colors"
                 />

                 <div className="relative">
                   <select defaultValue="" className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-sm px-4 py-4 text-sm text-neutral-400 focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer">
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
                   placeholder="Tell us about your project..." 
                   rows={4}
                   className="w-full bg-[#0a0a0a] border border-neutral-800 rounded-sm px-4 py-4 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-gold transition-colors resize-none"
                 />

                 <div className="mt-2">
                   <button 
                     type="button"
                     className="bg-gold hover:bg-white text-black px-8 py-4 font-bold text-[10px] uppercase tracking-widest flex items-center gap-4 transition-colors rounded-sm shadow-md"
                   >
                     SEND MESSAGE
                     <Send className="w-4 h-4" />
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
