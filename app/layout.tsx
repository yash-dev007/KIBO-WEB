import type { Metadata } from "next";
import { Inter, Inter_Tight, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SideRails } from "@/components/ui/SideRails";
import { Topbar } from "@/components/ui/Topbar";
import { StickyNav } from "@/components/ui/StickyNav";
import { Footer } from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight" });
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-playfair" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "KIBO — A desktop companion that lives on your screen",
  description: "KIBO is a new class of interface—a persistent, reactive, and evolving digital companion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${interTight.variable} ${playfair.variable} ${jetbrains.variable} font-body`}>
        <SideRails />
        <div className="relative z-10 shell">
          <Topbar />
          <StickyNav />
          <main>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}