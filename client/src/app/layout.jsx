import { Outfit, Geist_Mono, Bebas_Neue, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ["400", "600"],
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const constanley = localFont({
  src: "../../public/fonts/Constanley.ttf",
  variable: "--font-constanley",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.avfproduction.com'),
  title: {
    default: "AVF Production | Video Production House in Ranchi, Jharkhand",
    template: "%s | AVF Production"
  },
  description: "AVF Production is a passionate video production house in Ranchi, Jharkhand specializing in photography, storytelling, and visual arts.",
  keywords: ["Video Production Ranchi", "Photography Jharkhand", "Filmmaking", "Visual Artists", "AVF Production", "Wedding Photography", "Commercial Video", "Corporate Video Ranchi"],
  authors: [{ name: "AVF Production" }],
  creator: "AVF Production",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.avfproduction.com",
    title: "AVF Production | Video Production House in Ranchi",
    description: "Passionate Photography, Storytellers & Visual Artists based in Ranchi, Jharkhand.",
    siteName: "AVF Production",
    images: [
      {
        url: "/icon.png",
        width: 800,
        height: 600,
        alt: "AVF Production Logo",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AVF Production | Visual Artists & Storytellers",
    description: "Passionate Photography, Storytellers & Visual Artists based in Ranchi.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${constanley.variable} ${geistMono.variable} ${bebasNeue.variable} ${montserrat.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#0a0a0a] text-white">
        <ScrollToTop />
        <div className="flex-1 w-full overflow-x-hidden relative">
          {children}
        </div>
      </body>
    </html>
  );
}

