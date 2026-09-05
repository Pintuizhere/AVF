"use client";

import { useState, useEffect } from "react";

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function TeamSection() {
  const [isActive, setIsActive] = useState(true); // Default to true
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    // Check localStorage for the toggle state and team data (for the prototype)
    const storedStatus = localStorage.getItem("avf_team_active");
    if (storedStatus !== null) {
      setIsActive(storedStatus === "true");
    }

    const storedTeam = localStorage.getItem("avf_team_data");
    if (storedTeam) {
      setTeamMembers(JSON.parse(storedTeam));
    } else {
      // Default placeholder data
      setTeamMembers([
        {
          id: 1,
          name: "Akash Verma",
          role: "Founder & Director",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
        },
        {
          id: 2,
          name: "Rohan Das",
          role: "Lead Cinematographer",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        },
        {
          id: 3,
          name: "Priya Sharma",
          role: "Creative Producer",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
        }
      ]);
    }
    
    // Listen for cross-tab updates (when admin changes it)
    const handleStorageChange = (e) => {
      if (e.key === "avf_team_active") {
        setIsActive(e.newValue === "true");
      }
      if (e.key === "avf_team_data") {
        setTeamMembers(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!isActive) return null; // HIDDEN if deactivated

  return (
    <section className="bg-black py-24 text-white relative border-t border-white/5">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <span className="font-script text-3xl text-gold mb-2 -rotate-2">The Visionaries</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bebas uppercase tracking-widest text-white leading-none">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-600">Team</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
          {teamMembers.map((member) => (
            <div key={member.id} className="group relative flex flex-col items-center">
              
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-6 border border-white/10 hover:border-gold/30 transition-all duration-500 shadow-xl bg-neutral-900">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover filter grayscale-0 md:grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-700 ease-out"
                />
                
                {/* Social Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-black transition-colors">
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-gold hover:border-gold hover:text-black transition-colors">
                        <LinkedinIcon className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-xl font-bold tracking-tight uppercase text-white mb-1 group-hover:text-gold transition-colors text-center">
                {member.name}
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-neutral-500 text-center">
                {member.role}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
