import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkHeroSection from "@/components/WorkHeroSection";
import WorkGridContainer from "@/components/WorkGridContainer";
import { 
  Film, 
  CalendarDays, 
  Video, 
  Package, 
  UtensilsCrossed, 
  Camera, 
  Diamond, 
  Smartphone 
} from "lucide-react";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Our Work | Akash Verma Film Products",
  description: "Explore our portfolio of documentaries, events, commercials, and more.",
};

async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/projects`, { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export default async function OurWorkPage() {
  const projects = await getProjects();
  
  // Extract unique categories
  const uniqueCategories = [...new Set(projects.map(p => p.category))].filter(Boolean);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <WorkHeroSection />

      <WorkGridContainer customCategories={uniqueCategories} projects={projects} />

      <Footer hideCta={true} />
    </main>
  );
}
