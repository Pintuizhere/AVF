import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BtsHeroSection from "@/components/BtsHeroSection";
import BtsStatsSection from "@/components/BtsStatsSection";
import BtsGallerySection from "@/components/BtsGallerySection";

export const metadata = {
  title: "Behind The Scenes | Akash Verma Film Products",
  description: "A glimpse into the hustle, the teamwork and the passion that goes behind every frame.",
};

export default function BtsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <BtsHeroSection />
      
      <BtsStatsSection />

      <BtsGallerySection />

      <Footer />
    </main>
  );
}
