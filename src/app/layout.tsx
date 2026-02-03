import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

import { Toaster } from "sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const serif = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: {
    default: "Modern Dentist | Premium Dental Care",
    template: "%s | Modern Dentist",
  },
  metadataBase: new URL("http://localhost:3000"),
  description: "Experience premium dental care with a gentle touch. General, Cosmetic, and Emergency Dentistry in New York.",
  keywords: ["Dentist", "New York", "Cosmetic Dentistry", "Invisalign", "Dental Implants", "Emergency Dentist"],
  authors: [{ name: "Dr. Sarah Mitchell" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://moderndentist-demo.vercel.app",
    title: "Modern Dentist | Premium Dental Care",
    description: "Experience premium dental care with a gentle touch. General, Cosmetic, and Emergency Dentistry in New York.",
    siteName: "Modern Dentist",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Modern Dentist Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modern Dentist | Premium Dental Care",
    description: "Experience premium dental care with a gentle touch.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sans.variable} ${serif.variable} antialiased`}
      >
        <ErrorBoundary name="Root">
          {children}
        </ErrorBoundary>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
