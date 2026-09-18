import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHeroSection from "@/components/ContactHeroSection";
import ContactFormSection from "@/components/ContactFormSection";
import ContactFeaturesSection from "@/components/ContactFeaturesSection";

export const metadata = {
  title: "Contact Us | AVF Production – Film & Video Production Company",
  description: "Get in touch with AVF Production for professional video production, photography, commercials, film production, events, and creative visual projects in India.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <ContactHeroSection />

      <ContactFormSection />

      <ContactFeaturesSection />

      <Footer hideCta={true} />
    </main>
  );
}
