import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutStorySection from "@/components/AboutStorySection";
import DirectorNoteSection from "@/components/DirectorNoteSection";
import PhilosophySection from "@/components/PhilosophySection";
import ManifestoSection from "@/components/ManifestoSection";
import TeamSection from "@/components/TeamSection";

export const metadata = {
  title: "About Us | AVF Production - Video Production & Visual Arts",
  description: "Learn more about AVF Production, our story, philosophy, and the creative team behind our premium visual experiences in Ranchi, Jharkhand.",
};

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
