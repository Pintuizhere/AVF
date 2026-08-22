import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ReviewsSection from "@/components/ReviewsSection";
import ClientsSection from "@/components/ClientsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-gold selection:text-black">
      <Navbar />
      
      <main>
        <HeroSection />
        <ServicesSection />
        <ProcessSection />
        <ReviewsSection />
        <ClientsSection />
      </main>

      <Footer />
    </div>
  );
}
