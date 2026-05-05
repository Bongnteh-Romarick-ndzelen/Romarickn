import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Bongnteh Romarick",
  description:
    "Insights, tutorials, and deep dives into web development, design, and technology.",
  openGraph: {
    title: "Blog | Bongnteh Romarick",
    description: "Insights, tutorials, and deep dives into web development.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Bongnteh Romarick",
    description: "Insights, tutorials, and deep dives into web development.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
