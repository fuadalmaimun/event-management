import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GoodTogether | Make a Difference",
  description:
    "Discover volunteer events, connect with your community, and make a positive impact.",
  icons: {
    icon: "/favicon.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f7ef" },
    { media: "(prefers-color-scheme: dark)", color: "#06130d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} h-full antialiased`}
      suppressHydrationWarning
      
    >
      
      <body className="flex min-h-full flex-col font-sans">
        <Toaster />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
