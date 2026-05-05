import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Bongnteh Romarick",
  description:
    "Learn about Bongnteh Romarick, a passionate full-stack developer with 5+ years of experience in React, Next.js, Node.js, and cloud technologies. Discover my journey, skills, and what drives me to create impactful web applications.",
  keywords: [
    "full-stack developer",
    "web developer",
    "React developer",
    "Next.js developer",
    "Cameroon developer",
    "software engineer",
    "about me",
    "developer portfolio",
    "Bongnteh Romarick",
  ],
  openGraph: {
    title: "About Me | Bongnteh Romarick - Full-Stack Developer",
    description:
      "Passionate full-stack developer from Cameroon specializing in modern web technologies. Learn about my journey, skills, and what I do.",
    url: "https://romarick.vercel.app/about",
    siteName: "Bongnteh Romarick Portfolio",
    images: [
      {
        url: "/romarick.jpeg",
        width: 800,
        height: 800,
        alt: "Bongnteh Romarick - Full-Stack Developer",
      },
    ],
    locale: "en_US",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Me | Bongnteh Romarick",
    description:
      "Full-stack developer passionate about building web applications.",
    images: ["/romarick.jpeg"],
    creator: "@BongntehNdzelen",
  },
  alternates: {
    canonical: "https://romarick.vercel.app/about",
  },
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
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
