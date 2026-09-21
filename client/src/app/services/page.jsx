import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHeroSection from "@/components/ServicesHeroSection";
import ServicesGridSection from "@/components/ServicesGridSection";

export const metadata = {
  title: "Our Services | AVF Production - Video, Photography & Visual Arts",
  description: "Explore AVF Production's premium services, including documentary filmmaking, commercial video production, wedding photography, and creative visual storytelling.",
};

export default function ServicesPage() {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-gold selection:text-black">
      <Navbar />
      
      <main>
        <ServicesHeroSection />
        <ServicesGridSection />
      </main>

      <Footer />
    </div>
  );
}
