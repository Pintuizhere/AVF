import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkHeroSection from "@/components/WorkHeroSection";
import WorkCategoryNav from "@/components/WorkCategoryNav";
import WorkCategoryRow from "@/components/WorkCategoryRow";
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

export const metadata = {
  title: "Our Work | Akash Verma Film Products",
  description: "Explore our portfolio of documentaries, events, commercials, and more.",
};

async function getProjects() {
  try {
    const res = await fetch("http://localhost:5000/api/projects", { cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export default async function OurWorkPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <WorkHeroSection />

      <WorkCategoryNav />

      {/* Main Content Areas */}
      <div className="flex flex-col" id="all-work">
        {projects.length > 0 ? (
          <WorkCategoryRow projects={projects.map(p => ({
            _id: p._id,
            slug: p.slug,
            title: p.title,
            image: p.mediaUrl, // Mapping for the component
            categoryTitle: p.category,
            // Fallback for duration if they used it in the UI, now we have year/client instead
            duration: p.year || "2024"
          }))} />
        ) : (
          <div className="py-32 flex justify-center text-neutral-500">
            No projects found. Add some from the admin dashboard!
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
