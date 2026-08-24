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

const workData = [
  {
    id: "documentaries",
    title: "Documentaries",
    icon: Film,
    description: "Real stories. Real people. Real impact.",
    projects: [
      { title: "Beyond Borders", duration: "27:45", image: "/images/hero-bg.jpg" },
      { title: "Roots of India", duration: "32:10", image: "/images/hero-bg.jpg" },
      { title: "The Unseen", duration: "24:30", image: "/images/hero-bg.jpg" },
      { title: "Voices of Change", duration: "28:15", image: "/images/hero-bg.jpg" },
    ]
  },
  {
    id: "events",
    title: "Events",
    icon: CalendarDays,
    description: "Cinematic coverage of every moment that makes history.",
    projects: [
      { title: "Live in Concert", duration: "03:15", image: "/images/services-bg.jpg" },
      { title: "Corporate Summit", duration: "02:45", image: "/images/services-bg.jpg" },
      { title: "Wedding Tales", duration: "04:20", image: "/images/services-bg.jpg" },
      { title: "Award Night", duration: "02:30", image: "/images/services-bg.jpg" },
    ]
  },
  {
    id: "commercials",
    title: "Commercials",
    icon: Video,
    description: "Brands come alive on screen.",
    projects: [
      { title: "Tech Beyond", duration: "01:00", image: "/images/hero-bg.jpg" },
      { title: "Drive the Future", duration: "00:45", image: "/images/hero-bg.jpg" },
      { title: "Elegance Redefined", duration: "00:60", image: "/images/hero-bg.jpg" },
      { title: "Built Different", duration: "00:40", image: "/images/hero-bg.jpg" },
    ]
  },
  {
    id: "products",
    title: "Products",
    icon: Package,
    description: "Showcasing products at their best.",
    projects: [
      { title: "Prime Series", duration: "00:35", image: "/images/services-bg.jpg" },
      { title: "Minimal Lamp", duration: "00:30", image: "/images/services-bg.jpg" },
      { title: "Audio Pro", duration: "00:45", image: "/images/services-bg.jpg" },
      { title: "Essence", duration: "00:30", image: "/images/services-bg.jpg" },
    ]
  },
  {
    id: "food",
    title: "Food",
    icon: UtensilsCrossed,
    description: "Tasty looks great on camera.",
    projects: [
      { title: "Sweet Delights", duration: "00:40", image: "/images/hero-bg.jpg" },
      { title: "Gourmet Journey", duration: "00:55", image: "/images/hero-bg.jpg" },
      { title: "Sweet Moments", duration: "00:35", image: "/images/hero-bg.jpg" },
      { title: "Spice Stories", duration: "02:45", image: "/images/hero-bg.jpg" },
    ]
  },
  {
    id: "model-photography",
    title: "Model Photography",
    icon: Camera,
    description: "Professional shots that stand out.",
    projects: [
      { title: "Urban Edge", duration: "00:40", image: "/images/services-bg.jpg" },
      { title: "Natural Light", duration: "00:35", image: "/images/services-bg.jpg" },
      { title: "Monochrome Mood", duration: "00:45", image: "/images/services-bg.jpg" },
      { title: "Bold & Beautiful", duration: "00:45", image: "/images/services-bg.jpg" },
    ]
  },
  {
    id: "jewellery",
    title: "Jewellery",
    icon: Diamond,
    description: "Details that define elegance.",
    projects: [
      { title: "Timeless Beauty", duration: "00:30", image: "/images/hero-bg.jpg" },
      { title: "Golden Heritage", duration: "00:35", image: "/images/hero-bg.jpg" },
      { title: "Diamond Sparkle", duration: "00:45", image: "/images/hero-bg.jpg" },
      { title: "Royal Collection", duration: "00:45", image: "/images/hero-bg.jpg" },
    ]
  },
  {
    id: "reels",
    title: "Reels",
    icon: Smartphone,
    description: "Short format. Big impact.",
    projects: [
      { title: "Travel Reels", duration: "00:15", image: "/images/services-bg.jpg" },
      { title: "Lifestyle Reels", duration: "00:15", image: "/images/services-bg.jpg" },
      { title: "Trending Reels", duration: "00:15", image: "/images/services-bg.jpg" },
      { title: "Action Reels", duration: "00:15", image: "/images/services-bg.jpg" },
    ]
  }
];

export default function OurWorkPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <WorkHeroSection />

      <WorkCategoryNav />

      {/* Main Content Areas */}
      <div className="flex flex-col">
        {workData.map((category) => (
          <section id={category.id} key={category.id}>
            <WorkCategoryRow
              icon={<category.icon className="w-6 h-6 stroke-[1.5]" />}
              title={category.title}
              description={category.description}
              projects={category.projects}
            />
          </section>
        ))}
      </div>

      <Footer />
    </main>
  );
}
