import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me | Bongnteh Romarick",
  description:
    "Get in touch with Bongnteh Romarick for freelance work, collaborations, or just to say hello.",
  openGraph: {
    title: "Contact Me | Bongnteh Romarick",
    description: "Reach out for projects, collaborations, or questions.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
