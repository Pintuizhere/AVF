import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutStorySection from "@/components/AboutStorySection";
import DirectorNoteSection from "@/components/DirectorNoteSection";
import PhilosophySection from "@/components/PhilosophySection";
import ManifestoSection from "@/components/ManifestoSection";
import TeamSection from "@/components/TeamSection";

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-gold selection:text-black">
      <Navbar />
      
      <main>
        <DirectorNoteSection />
        <AboutStorySection />
        <PhilosophySection />
        <TeamSection />
        <ManifestoSection />
      </main>

      <Footer hideCta={true} />
    </div>
  );
}
