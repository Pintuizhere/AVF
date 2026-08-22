import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceDetailsHero from "@/components/ServiceDetailsHero";
import ServiceDetailsOverview from "@/components/ServiceDetailsOverview";
import ServiceDetailsIncluded from "@/components/ServiceDetailsIncluded";
import ServiceDetailsProcess from "@/components/ServiceDetailsProcess";
import ServiceDetailsCta from "@/components/ServiceDetailsCta";
import ServiceDetailsRelated from "@/components/ServiceDetailsRelated";
import { notFound } from "next/navigation";

// Mock data store for services
const servicesData = {
  documentaries: {
    slug: "documentaries",
    title: "DOCUMENTARIES",
    subtitle: "Real Stories. Real People. Real Impact.",
    description: "We create powerful documentary films that capture real stories, raise awareness, and leave a lasting impact on audiences.",
    heroImage: "https://images.unsplash.com/photo-1595188613149-a3d8c114f494?q=80&w=2070&auto=format&fit=crop",
    overview: {
      description: "From social issues and human-interest stories to cultural heritage and brand documentaries, we handle everything from research and scripting to filming and post-production with authenticity and cinematic brilliance."
    }
  },
  // Add more services here if needed
  // events: { ... },
  // commercials: { ... },
};

// Generate static params for all known services so they can be statically generated
export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug: slug,
  }));
}

export function generateMetadata({ params }) {
  const service = servicesData[params.slug];
  
  if (!service) {
    return {
      title: "Service Not Found | AVF",
    };
  }

  return {
    title: `${service.title} | AVF - Akash Verma Film Products`,
    description: service.description,
  };
}

export default function ServiceDetailsPage({ params }) {
  const service = servicesData[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-gold selection:text-black flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex flex-col pb-8">
        <ServiceDetailsHero service={service} />
        <ServiceDetailsOverview overview={service.overview} />
        <ServiceDetailsIncluded />
        <ServiceDetailsProcess />
        <ServiceDetailsCta />
        <ServiceDetailsRelated />
      </main>

      <Footer />
    </div>
  );
}
