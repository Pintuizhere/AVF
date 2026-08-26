import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedSection from "@/components/FeaturedSection";
import ReelsSection from "@/components/ReelsSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ReviewsSection from "@/components/ReviewsSection";
import ClientsSection from "@/components/ClientsSection";
import Footer from "@/components/Footer";
import FloatingQuickActions from "@/components/FloatingQuickActions";
import ExploreWorkSection from "@/components/ExploreWorkSection";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-gold selection:text-black relative">
      <Navbar />
      <FloatingQuickActions />
      
      <main>
        <HeroSection />
        <FeaturedSection />
        <ReelsSection />
        <ServicesSection />
        <ProcessSection />
        <ExploreWorkSection />
        <ReviewsSection />
        <ClientsSection />
      </main>

      <Footer />
    </div>
  );
}
