import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHeroSection from "@/components/ContactHeroSection";
import ContactFormSection from "@/components/ContactFormSection";
import ContactFeaturesSection from "@/components/ContactFeaturesSection";

export const metadata = {
  title: "Contact Us | Akash Verma Film Products",
  description: "Have a story to tell? Let's create it together. Get in touch with our team.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      <ContactHeroSection />
      
      <ContactFormSection />

      <ContactFeaturesSection />

      <Footer />
    </main>
  );
}
