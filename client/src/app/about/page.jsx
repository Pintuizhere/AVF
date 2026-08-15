import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHeroSection from "@/components/AboutHeroSection";
import AboutStorySection from "@/components/AboutStorySection";
import DirectorNoteSection from "@/components/DirectorNoteSection";
import PhilosophySection from "@/components/PhilosophySection";
import ManifestoSection from "@/components/ManifestoSection";
import CtaSection from "@/components/CtaSection";

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-gold selection:text-black">
      <Navbar />
      
      <main>
        <AboutHeroSection />
        <AboutStorySection />
        <DirectorNoteSection />
        <PhilosophySection />
        <ManifestoSection />
        <CtaSection />
      </main>

      <Footer />
    </div>
  );
}
