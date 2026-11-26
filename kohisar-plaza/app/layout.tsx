import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppButton";
import { buildMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = buildMetadata({
  title:
    "Flats, Shops & Offices for Rent in Multi Gardens B17 Islamabad | Kohisar Plaza",
  description:
    "Find 1-bed, 2-bed & 3-bed flats, shops and offices for rent in MPCHS Multi Gardens B17 and FMC Islamabad. Kohisar Plaza — direct from owner, clear monthly rents. WhatsApp now.",
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
