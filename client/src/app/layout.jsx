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
  title: "AVF | Akash Verma Film Products",
  description: "Passionate Filmmakers, Storytellers & Visual Artists",
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

