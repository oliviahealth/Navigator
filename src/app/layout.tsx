import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
