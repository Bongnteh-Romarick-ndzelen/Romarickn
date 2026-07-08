'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import { Footer } from '@/components/footer';

const NO_HEADER_FOOTER_PATHS = [
  '/login',
  '/signup',
  '/verify-email',
  '/forgot-password',
  '/reset-password',
  '/auth',
  '/resend-verification',
  '/admin/dashboard',
  '/admin/users',
  '/admin/settings',
  '/ai-assistance',
  
];

export default function ConditionalFooter() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const normalizedPathname = pathname.replace(/\/$/, '');
  
  const shouldHide = NO_HEADER_FOOTER_PATHS.some(
    (path) => normalizedPathname === path || normalizedPathname.startsWith(path + '/')
  );

  if (shouldHide) {
    return null;
  }

  const contactInfo = {
    email: user?.email || "",
    location: "Remote / Available Worldwide",
    website: "https://portfolio.example.com",
    linkedin: "https://linkedin.com/in/example",
    github: "https://github.com/example",
  };

  const availability = [
    { day: "Monday", startTime: "09:00", endTime: "17:00", timezone: "UTC" },
    { day: "Tuesday", startTime: "09:00", endTime: "17:00", timezone: "UTC" },
    { day: "Wednesday", startTime: "09:00", endTime: "17:00", timezone: "UTC" },
    { day: "Thursday", startTime: "09:00", endTime: "17:00", timezone: "UTC" },
    { day: "Friday", startTime: "09:00", endTime: "15:00", timezone: "UTC" }
  ];

  const handleContactRequest = async (message: string): Promise<boolean> => {
    console.log("Contact request sent:", message);
    return true;
  };

  return (
    <Footer
      userProfile={{
        name: user?.name || "Bongnteh R.",
        email: user?.email || "",
        bio: (user as any)?.bio || "Full-Stack Developer passionate about building exceptional digital experiences.",
        avatar: user?.avatar,
        role: (user as any)?.role || "Full-Stack Developer",
        skills: ["Full-Stack Development", "React", "Node.js", "TypeScript", "Next.js"],
        experience: ["5+ years of professional experience", "Led multiple successful projects"],
        company: "Tech Solutions Inc.",
        location: "Remote",
      }}
      contactInfo={contactInfo}
      availability={availability}
      onContactRequest={handleContactRequest}
    />
  );
}
