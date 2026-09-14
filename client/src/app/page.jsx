import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import FloatingQuickActions from "@/components/FloatingQuickActions";

const ClientsSection = dynamic(() => import("@/components/ClientsSection"));
const ServicesSection = dynamic(() => import("@/components/ServicesSection"));
const ProcessSection = dynamic(() => import("@/components/ProcessSection"));
const ExploreWorkSection = dynamic(() => import("@/components/ExploreWorkSection"));
const ReviewsSection = dynamic(() => import("@/components/ReviewsSection"));
const Footer = dynamic(() => import("@/components/Footer"));

export const revalidate = 60; // Revalidate page every 60 seconds

async function fetchHomepageData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
  // Use Promise.allSettled to fetch all data in parallel without one failure breaking everything
  const endpoints = [
    { key: 'hero', url: `${baseUrl}/api/hero` },
    { key: 'clients', url: `${baseUrl}/api/clients` },
    { key: 'settings', url: `${baseUrl}/api/settings` },
    { key: 'featured', url: `${baseUrl}/api/featured` },
    { key: 'shorts', url: `${baseUrl}/api/shorts` },
    { key: 'services', url: `${baseUrl}/api/services` },
    { key: 'projects', url: `${baseUrl}/api/projects` },
    { key: 'testimonials', url: `${baseUrl}/api/testimonials` },
  ];

  const results = await Promise.allSettled(
    endpoints.map(ep => fetch(ep.url, { next: { revalidate: 60 } }).then(res => res.json()))
  );

  const data = {};
  endpoints.forEach((ep, index) => {
    if (results[index].status === 'fulfilled') {
      data[ep.key] = results[index].value;
    } else {
      console.error(`Failed to fetch ${ep.key}:`, results[index].reason);
      data[ep.key] = null;
    }
  });

  return data;
}

export default async function Home() {
  const initialData = await fetchHomepageData();

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-gold selection:text-black relative">
      <Navbar />
      <FloatingQuickActions />
      
      <main>
        <HeroSection initialData={initialData.hero} />
        <ClientsSection initialData={{ clients: initialData.clients, settings: initialData.settings }} />
        <FeaturedSection initialData={{ featured: initialData.featured, shorts: initialData.shorts, settings: initialData.settings }} />
        <ServicesSection initialData={initialData.services} />
        <ProcessSection />
        <ExploreWorkSection initialData={initialData.projects} />
        <ReviewsSection initialData={{ testimonials: initialData.testimonials, settings: initialData.settings }} />
      </main>

      <Footer />
    </div>
  );
}
