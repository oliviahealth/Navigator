import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";

import Navbar from '@/components/Navbar';
import Footer from "@/components/Footer";
import ErrorPopup from "@/components/ErrorPopup";
import SuccessPopup from "@/components/SuccessPopup";

const myFont = localFont({
  src: '../../fonts/OpenSans-VariableFont_wdth,wght.ttf',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "OliviaHealth - Navigator",
  description: "Electronic Health Record For Community Health Workers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`w-full h-full flex flex-col ${myFont.className}`}>
        <Navbar />
  
        <SuccessPopup />
        <ErrorPopup />

        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
