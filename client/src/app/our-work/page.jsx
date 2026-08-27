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
  
  // Extract unique categories
  const uniqueCategories = [...new Set(projects.map(p => p.category))].filter(Boolean);

  // Group projects by category
  const groupedProjects = uniqueCategories.map(cat => ({
    category: cat,
    projects: projects.filter(p => p.category === cat)
  }));

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <WorkHeroSection />

      <WorkCategoryNav customCategories={uniqueCategories} />

      {/* Main Content Areas */}
      <div className="flex flex-col" id="all-work">
        {groupedProjects.length > 0 ? (
          groupedProjects.map(group => (
            <div 
              key={group.category} 
              id={group.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}
              className="pt-24 -mt-24" // Offset for sticky headers if any
            >
              <WorkCategoryRow 
                title={group.category} 
                projects={group.projects.map(p => ({
                  _id: p._id,
                  slug: p.slug,
                  title: p.title,
                  image: p.mediaUrl,
                  categoryTitle: p.category,
                  duration: p.year || "2024"
                }))} 
              />
            </div>
          ))
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
