import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutStorySection from "@/components/AboutStorySection";
import DirectorNoteSection from "@/components/DirectorNoteSection";
import PhilosophySection from "@/components/PhilosophySection";
import ManifestoSection from "@/components/ManifestoSection";

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-gold selection:text-black">
      <Navbar />
      
      <main>
        <DirectorNoteSection />
        <AboutStorySection />
        <PhilosophySection />
        <ManifestoSection />
      </main>

      <Footer />
    </div>
  );
}
