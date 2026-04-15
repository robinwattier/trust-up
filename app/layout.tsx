import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const helvetica = localFont({
  src: "./fonts/Helvetica-Bold.ttf",
  variable: "--font-helvetica",
  weight: "700",
  style: "normal",
});

export const metadata: Metadata = {
  title: "TrustUp Smart-Bati | Agent Estimateur AI-Native",
  description: "Solution intelligente d'estimation technique pour les artisans TrustUp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable} ${helvetica.variable} h-full antialiased`}>
      <body className="font-sans min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
