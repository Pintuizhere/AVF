import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicesHeroSection from "@/components/ServicesHeroSection";
import ServicesGridSection from "@/components/ServicesGridSection";

export const metadata = {
  title: "Services | AVF - Akash Verma Film Products",
  description: "End-to-end visual storytelling services by AVF including documentaries, events, commercials, products, food, model photography, and reels.",
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
