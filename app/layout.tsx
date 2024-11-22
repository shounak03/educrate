import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Appbar from "@/components/Appbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "eduCrate",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
    <body className="min-h-screen bg-white dark:bg-gray-950 relative pb-[68px]">
      <Appbar />
      <main className="w-full max-w-7xl mx-auto px-4 md:px-6">
        {children}
        <Toaster />
      </main>
      <Footer />
    </body>
  </html>
  );
}
