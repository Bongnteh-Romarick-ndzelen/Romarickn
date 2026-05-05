import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import ConditionalHeader from "@/components/ConditionalHeader";
import ConditionalFooter from "@/components/ConditionalFooter";
import { AuthProvider } from "@/context/AuthContext";
import { LoadingScreenSpinner } from "@/components/LoadingScreen";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// Base URL for metadata
const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://romarick.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Bongnteh Romarick Ndzelen - Full-Stack Developer",
    template: "%s | Bongnteh Romarick",
  },
  description:
    "Full-stack developer specializing in React, Next.js, Node.js, and cloud technologies. Building high-performance web applications with 5+ years of experience. Based in Cameroon, working worldwide.",
  keywords: [
    "full-stack developer",
    "web developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "portfolio",
    "Cameroon developer",
    "software engineer",
    "TypeScript",
    "Tailwind CSS",
    "MongoDB",
    "PostgreSQL",
  ],
  authors: [
    {
      name: "Bongnteh Romarick Ndzelen",
      url: "https://github.com/bongnteh-romarick-ndzelen",
    },
  ],
  creator: "Bongnteh Romarick",
  publisher: "Bongnteh Romarick",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "Bongnteh Romarick Portfolio",
    title: "Bongnteh Romarick - Full-Stack Developer",
    description:
      "Full-stack developer specializing in React, Next.js, Node.js, and cloud technologies. Building high-performance web applications.",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Bongnteh Romarick - Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bongnteh Romarick - Full-Stack Developer",
    description:
      "Full-stack developer specializing in React, Next.js, Node.js, and cloud technologies.",
    images: ["/logo.png"],
    creator: "@BongntehNdzelen",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: baseUrl,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#111D3A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, "dark")}
      suppressHydrationWarning
    >
      <body className="antialiased bg-[#111D3A] text-slate-300">
        <LoadingScreenSpinner>
          <AuthProvider>
            <ConditionalHeader />
            {children}
            <ConditionalFooter />
            <Toaster />
          </AuthProvider>
        </LoadingScreenSpinner>
      </body>
    </html>
  );
}
