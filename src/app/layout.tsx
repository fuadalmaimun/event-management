import type { Metadata } from "next";
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
};

const themeScript = `(function(){try{var s=localStorage.getItem("gt-theme")||"auto";var h=new Date().getHours();var night=h>=18||h<6;var t=s==="auto"?(night?"dark":"light"):s;document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Toaster />

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
