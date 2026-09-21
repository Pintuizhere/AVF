import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


import BtsGallerySection from "@/components/BtsGallerySection";

export const metadata = {
  title: "Behind The Scenes | AVF Production - Filmmaking in Action",
  description: "Get an exclusive behind-the-scenes look at AVF Production. Discover our filmmaking process, on-set teamwork, and the passion that drives every creative project.",
};

export default function BtsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />



      <BtsGallerySection />

      <Footer hideCta={true} />
    </main>
  );
}
