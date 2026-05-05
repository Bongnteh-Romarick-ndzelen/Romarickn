import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Bongnteh Romarick",
  description:
    "View my professional work experience, education, and technical skills as a full-stack developer.",
  openGraph: {
    title: "Experience | Bongnteh Romarick",
    description: "Professional journey and qualifications.",
    type: "profile",
  },
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
