import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Bongnteh Romarick',
  description: 'Explore my portfolio of full-stack projects including AI platforms, e-commerce solutions, and web applications.',
  openGraph: {
    title: 'Projects | Bongnteh Romarick',
    description: 'Explore my portfolio of full-stack projects.',
    type: 'website',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}