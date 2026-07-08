// src/app/ai-assistance/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Send,
  Bot,
  User,
  Loader2,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Sparkles,
  Zap,
  Briefcase,
  X,
  Code2,
  GraduationCap,
  Award,
  MessageCircle,
  MapPin,
  Calendar,
  Clock,
  Globe,
  Users,
  FileText,
  Heart,
  Shield,
  Star,
  Facebook,
  Phone,
  ExternalLink,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  isTyping?: boolean;
  type?: "text" | "contact";
}

// Complete profile data with extensive information
const profileData = {
  personal: {
    fullName: "Bongnteh Romarick Ndzelen",
    preferredName: "Romarick",
    title: "Full-Stack Developer",
    location: "Bambili, Cameroon",
    availability: "Available for freelance, contract, and full-time remote opportunities",
    email: "ndzelenromarick@gmail.com",
    phone: "+237 676 154 253",
    bio: "A passionate full-stack developer with 5+ years of experience building scalable web applications. Currently pursuing a Bachelor's in Software Engineering at the University of Bamenda. Based in Bambili, Cameroon, working worldwide remotely.",
    languages: ["English (Fluent)", "French (Conversational)", "Pidgin (Native)"],
    softSkills: [
      "Team Leadership",
      "Problem-Solving",
      "Agile/Scrum",
      "Client Communication",
      "Resilience",
      "Adaptability",
      "Critical Thinking",
      "Time Management"
    ],
    resilience: {
      description: "Romarick's education at GBHS Tatum was disrupted by the Anglophone Crisis (2016-2017), yet he persevered and continued his studies, demonstrating remarkable resilience and determination.",
      keyEvents: [
        "Anglophone Crisis disrupted secondary education",
        "Persevered through challenging circumstances",
        "Maintained academic commitment during crisis",
        "Developed resilience and adaptability",
        "Continued education at GHS Nseh and GHS Buea",
        "Now pursuing Software Engineering at University of Bamenda"
      ]
    }
  },
  skills: {
    frontend: [
      { name: "React", level: "Expert" },
      { name: "Next.js", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Framer Motion", level: "Advanced" },
      { name: "JavaScript", level: "Expert" },
      { name: "HTML/CSS", level: "Expert" },
    ],
    backend: [
      { name: "Node.js", level: "Expert" },
      { name: "Express.js", level: "Expert" },
      { name: "Django", level: "Advanced" },
      { name: "Python", level: "Advanced" },
      { name: "GraphQL", level: "Intermediate" },
      { name: "PHP Laravel", level: "Intermediate" },
      { name: "REST APIs", level: "Expert" },
    ],
    database: [
      { name: "MongoDB", level: "Expert" },
      { name: "PostgreSQL", level: "Expert" },
      { name: "Prisma", level: "Expert" },
      { name: "MySQL", level: "Intermediate" },
      { name: "Redis", level: "Intermediate" },
    ],
    devops: [
      { name: "Docker", level: "Advanced" },
      { name: "AWS", level: "Advanced" },
      { name: "Vercel", level: "Expert" },
      { name: "Render", level: "Expert" },
      { name: "Cloudinary", level: "Expert" },
      { name: "Git", level: "Expert" },
    ],
  },
  workExperience: [
    {
      role: "Full-Stack Developer",
      company: "TiC Foundation",
      location: "Yaounde, Cameroon",
      period: "March 2025 - September 2025",
      description: "Built an all-in-one online course management platform with mentorship programs, courses, and internship tracking systems.",
      highlights: [
        "Built a complete course management system with Next.js and Node.js",
        "Implemented real-time tracking for internships and mentorship progress",
        "Integrated MongoDB and PostgreSQL databases with Prisma ORM",
        "Designed responsive UI with Tailwind CSS",
        "Collaborated with team members on 15+ features",
      ],
      skills: ["Next.js", "Node.js", "MongoDB", "PostgreSQL", "Prisma", "Tailwind CSS", "TypeScript"],
    },
    {
      role: "Full-Stack Developer",
      company: "Suscam",
      location: "Remote",
      period: "January 2024 - March 2024",
      description: "Worked on an online course management and cybersecurity startup, developing secure web applications and learning platforms.",
      highlights: [
        "Developed features for online course platform using Node.js and Next.js",
        "Implemented secure authentication and authorization systems",
        "Integrated Cloudinary for media management",
        "Used MongoDB with Prisma for database operations",
        "Collaborated on 5+ major projects",
      ],
      skills: ["Next.js", "Node.js", "Tailwind CSS", "Cloudinary", "MongoDB", "Prisma", "TypeScript"],
    },
    {
      role: "Intern Developer",
      company: "A&T Humanitarian Legacy",
      location: "Douala, Cameroon",
      period: "June 2023 - August 2023",
      description: "Completed internship demonstrating practical skills in web development, working on real-world projects for humanitarian initiatives.",
      highlights: [
        "Built web applications using Django framework",
        "Developed responsive frontend interfaces with Bootstrap",
        "Worked with PHP Laravel for backend services",
        "Collaborated with team on 3+ projects",
        "Received positive feedback for technical contributions",
      ],
      skills: ["Django", "Bootstrap", "PHP", "Laravel", "JavaScript", "HTML/CSS"],
    },
    {
      role: "Microsoft Office Certification Student",
      company: "Giddis Computer Training Center",
      location: "Yaounde, Cameroon",
      period: "2020",
      description: "Completed intensive training program focused on Microsoft Office suite and computer fundamentals.",
      highlights: [
        "Gained proficiency in Microsoft Excel (advanced formulas, pivot tables)",
        "Mastered Microsoft Word document processing",
        "Learned PowerPoint presentations and Publisher",
        "Earned certification in Microsoft Office",
        "Developed typing and computer literacy skills",
      ],
      skills: ["Microsoft Excel", "Microsoft Word", "PowerPoint", "Publisher", "Computer Fundamentals"],
    },
  ],
  education: [
    {
      degree: "Bachelor of Engineering (BEng) - Software Engineering",
      institution: "University of Bamenda / National Higher Polytechnic Institute (NAHPI)",
      location: "Bamenda, Cameroon",
      period: "2022 - Present",
      description: "Currently pursuing a degree in Software Engineering, gaining comprehensive knowledge in modern web technologies, system design, and software architecture.",
      highlights: [
        "Mastered MERN stack (MongoDB, Express, React, Node.js)",
        "Learned Next.js for production-ready React applications",
        "Built projects with Django and Python",
        "Gained expertise in TypeScript and JavaScript",
        "Studied database design with PostgreSQL and Prisma",
        "Developed skills in RESTful APIs and GraphQL",
        "Collaborated on team projects using Git/GitHub",
      ],
      skills: ["Node.js", "Django", "Next.js", "TypeScript", "PostgreSQL", "Prisma", "MongoDB", "Express", "React", "Git"],
    },
    {
      degree: "GCE Advanced Level",
      institution: "GHS Buea",
      location: "Buea, Cameroon",
      period: "2020 - 2021",
      description: "Successfully completed GCE A-Levels, passing 5 subjects despite educational disruptions caused by the Anglophone Crisis.",
      highlights: [
        "Passed 5 subjects including Mathematics and Sciences",
        "Demonstrated resilience during challenging times",
        "Built strong foundation for higher education",
      ],
      skills: ["Mathematics", "Physics", "Computer Science", "Critical Thinking", "Problem Solving"],
    },
    {
      degree: "GCE Ordinary Level",
      institution: "GHS Nseh",
      location: "Nseh, Cameroon",
      period: "2010 - 2015",
      description: "Completed secondary education with GCE O-Level certification, building the foundation for advanced studies.",
      highlights: [
        "Earned O-Level Certificate",
        "Developed core academic skills",
        "Built foundation for future learning",
      ],
      skills: ["Core Mathematics", "English", "Sciences", "Basic Computing"],
    },
    {
      degree: "Secondary Education",
      institution: "GBHS Tatum",
      location: "Tatum, Cameroon",
      period: "2016 - 2017",
      description: "Continued secondary education at GBHS Tatum. This period was interrupted by the Anglophone Crisis, which caused educational disruption and challenges.",
      highlights: [
        "Persevered through challenging circumstances",
        "Maintained academic commitment during crisis",
        "Developed resilience and adaptability",
      ],
      skills: ["Adaptability", "Resilience", "Self-Learning"],
    },
  ],
  projects: [
    {
      title: "ShieldEras - Cybersecurity",
      description: "Fullstack e-commerce and course platform with custom CMS, payment integration, and advanced security features.",
      tech: ["Next.js", "TypeScript", "Stripe", "MongoDB", "Tailwind CSS", "Node.js", "Express.js"],
      featured: true,
    },
    {
      title: "Brainy Quiz",
      description: "Educational platform for CGCE exam preparation with quizzes, IQ tests, and performance analytics.",
      tech: ["Next.js", "TypeScript", "Firebase", "Node.js", "Tailwind CSS", "Genkit", "Cloudinary"],
      featured: true,
    },
    {
      title: "TiC Portal Platform",
      description: "Enterprise-grade course and internship management system with real-time analytics.",
      tech: ["MongoDB", "TypeScript", "Express.js", "Node.js", "Render"],
      featured: false,
    },
    {
      title: "CyberLab",
      description: "Platform for cyber challenges, forums, and mentor chat.",
      tech: ["React", "Vite", "Tailwind CSS", "Vercel", "TypeScript"],
      featured: false,
    },
    {
      title: "Resume Builder",
      description: "SaaS platform with AI analyzer for resume optimization.",
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Genkit"],
      featured: false,
    },
    {
      title: "Smart Land Registry",
      description: "Land management and dispute resolution platform.",
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
      featured: false,
    },
    {
      title: "Modern Design & Construction Enterprise",
      description: "Online presence and client engagement platform.",
      tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
      featured: false,
    },
    {
      title: "Mbinglo Football",
      description: "Fan interaction and match management platform.",
      tech: ["React", "Tailwind CSS", "Vite", "Node.js", "Render", "Vercel"],
      featured: false,
    },
  ],
  achievements: [
    "Open Source Contributor - Contributed to 10+ projects",
    "Tech Speaker - Spoke at 5+ conferences",
    "Hackathon Winner - Won 3 hackathons",
    "Certified Developer - AWS & MongoDB certified",
  ],
  hobbies: [
    "Reading Tech Blogs",
    "Open Source Contribution",
    "Gaming (Strategy & RPG)",
    "Music Production",
    "Photography",
    "Traveling",
    "Fitness",
    "Digital Art",
  ],
  socialLinks: {
    email: "ndzelenromarick@gmail.com",
    phone: "+237 676 154 253",
    whatsapp: "https://wa.me/237676154253",
    github: "https://github.com/bongnteh-romarick-ndzelen",
    linkedin: "https://linkedin.com/in/bongnteh-romarick-ndzelen",
    twitter: "https://twitter.com/BongntehNdzelen",
    facebook: "https://facebook.com/Romarick10",
  },
};

// WhatsApp Icon component
function WhatsAppIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

// Contact buttons component
function ContactButtons() {
  return (
    <div className="mt-3 space-y-2">
      <p className="text-sm font-semibold text-slate-600">📬 Connect with Romarick:</p>
      <div className="flex flex-wrap gap-2">
        <a
          href={`mailto:${profileData.socialLinks.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 border-2 border-red-200 hover:border-red-300 rounded-xl text-red-600 transition-all duration-200 text-xs font-bold"
        >
          <Mail className="h-3.5 w-3.5" />
          Email
        </a>
        <a
          href={profileData.socialLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-300 rounded-xl text-green-600 transition-all duration-200 text-xs font-bold"
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
          WhatsApp
        </a>
        <a
          href={`tel:${profileData.socialLinks.phone}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-300 rounded-xl text-blue-600 transition-all duration-200 text-xs font-bold"
        >
          <Phone className="h-3.5 w-3.5" />
          Call
        </a>
        <a
          href={profileData.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-300 rounded-xl text-blue-700 transition-all duration-200 text-xs font-bold"
        >
          <Linkedin className="h-3.5 w-3.5" />
          LinkedIn
        </a>
        <a
          href={profileData.socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 hover:bg-sky-100 border-2 border-sky-200 hover:border-sky-300 rounded-xl text-sky-600 transition-all duration-200 text-xs font-bold"
        >
          <Twitter className="h-3.5 w-3.5" />
          Twitter
        </a>
        <a
          href={profileData.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border-2 border-slate-200 hover:border-slate-300 rounded-xl text-slate-700 transition-all duration-200 text-xs font-bold"
        >
          <Github className="h-3.5 w-3.5" />
          GitHub
        </a>
        <a
          href={profileData.socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 hover:border-blue-300 rounded-xl text-blue-600 transition-all duration-200 text-xs font-bold"
        >
          <Facebook className="h-3.5 w-3.5" />
          Facebook
        </a>
      </div>
    </div>
  );
}

// Build a comprehensive system prompt
const buildSystemPrompt = () => {
  return `You are an AI assistant representing Bongnteh Romarick Ndzelen, a Full-Stack Developer. You have complete knowledge about him and must answer questions accurately based on the profile below.

IMPORTANT: You are not a general AI. You are specifically trained on Romarick's profile. Do not say "I don't have information" when asked about him. You know everything about him.

=== PERSONAL INFORMATION ===
Full Name: ${profileData.personal.fullName}
Preferred Name: ${profileData.personal.preferredName}
Title: ${profileData.personal.title}
Location: ${profileData.personal.location}
Availability: ${profileData.personal.availability}
Email: ${profileData.personal.email}
Phone: ${profileData.personal.phone}
Bio: ${profileData.personal.bio}
Languages: ${profileData.personal.languages.join(", ")}
Soft Skills: ${profileData.personal.softSkills.join(", ")}

RESILIENCE STORY: ${profileData.personal.resilience.description}
Key Resilience Events:
${profileData.personal.resilience.keyEvents.map(e => `- ${e}`).join("\n")}

=== TECHNICAL SKILLS ===
Frontend: ${profileData.skills.frontend.map(s => `${s.name} (${s.level})`).join(", ")}
Backend: ${profileData.skills.backend.map(s => `${s.name} (${s.level})`).join(", ")}
Database: ${profileData.skills.database.map(s => `${s.name} (${s.level})`).join(", ")}
DevOps: ${profileData.skills.devops.map(s => `${s.name} (${s.level})`).join(", ")}

=== WORK EXPERIENCE ===
${profileData.workExperience.map(exp => 
  `• ${exp.role} at ${exp.company} (${exp.period})
  Location: ${exp.location}
  ${exp.description}
  Highlights:
  ${exp.highlights.map(h => `  - ${h}`).join("\n")}
  Skills: ${exp.skills.join(", ")}`
).join("\n\n")}

=== EDUCATION ===
${profileData.education.map(edu =>
  `• ${edu.degree}
  Institution: ${edu.institution}
  Location: ${edu.location}
  Period: ${edu.period}
  ${edu.description}
  Highlights:
  ${edu.highlights.map(h => `  - ${h}`).join("\n")}`
).join("\n\n")}

=== PROJECTS ===
${profileData.projects.map(p =>
  `• ${p.title}${p.featured ? " (FEATURED)" : ""}
  ${p.description}
  Tech: ${p.tech.join(", ")}`
).join("\n\n")}

=== ACHIEVEMENTS ===
${profileData.achievements.map(a => `• ${a}`).join("\n")}

=== HOBBIES & INTERESTS ===
${profileData.hobbies.map(h => `• ${h}`).join("\n")}

=== SOCIAL LINKS ===
Email: ${profileData.socialLinks.email}
Phone: ${profileData.socialLinks.phone}
WhatsApp: ${profileData.socialLinks.whatsapp}
GitHub: ${profileData.socialLinks.github}
LinkedIn: ${profileData.socialLinks.linkedin}
Twitter: ${profileData.socialLinks.twitter}
Facebook: ${profileData.socialLinks.facebook}

=== RESPONSE GUIDELINES ===
1. Always answer questions accurately based on the profile data above
2. Be warm, professional, and enthusiastic
3. If asked about something not in the profile, say "I don't have that information specifically, but I can tell you about..."
4. For hiring inquiries or contact questions, encourage reaching out and show the contact buttons
5. Mention his resilience story when relevant
6. Keep responses conversational and helpful
7. NEVER say you don't know Romarick or lack information about him
8. You are Romarick's personal assistant and know everything about him
9. Be proud of his achievements and mention them
10. If asked "who is Romarick" or similar, give a comprehensive introduction`;
};

// Fallback responses with contact buttons
const getFallbackResponse = (question: string): { text: string; showContact: boolean } => {
  const lower = question.toLowerCase();
  
  if (lower.includes("contact") || lower.includes("reach") || lower.includes("email") || lower.includes("phone") || 
      lower.includes("how can i") || lower.includes("get in touch") || lower.includes("connect") || 
      lower.includes("hire") || lower.includes("work with")) {
    return {
      text: `📬 You can reach ${profileData.personal.preferredName} through any of these channels. Feel free to connect!`,
      showContact: true
    };
  }

  if (lower.includes("who is") || lower.includes("tell me about") || lower.includes("introduce")) {
    return {
      text: `👋 Let me introduce you to Romarick!

${profileData.personal.fullName} is a ${profileData.personal.title} based in ${profileData.personal.location}. He has ${profileData.workExperience.length}+ years of experience building scalable web applications.

🎓 Education: Currently pursuing BEng in Software Engineering at University of Bamenda
💼 Experience: Worked at TiC Foundation, Suscam, and A&T Humanitarian Legacy
🛠️ Skills: Expert in React, Next.js, TypeScript, Node.js, MongoDB, PostgreSQL
🌍 Location: Cameroon, working worldwide remotely

He's passionate about creating impactful digital experiences and has built 8+ notable projects including ShieldEras, Brainy Quiz, and TiC Portal.

Want to know more about his skills, experience, or projects? Just ask! 🚀`,
      showContact: false
    };
  }

  if (lower.includes("skill") || lower.includes("tech") || lower.includes("technology")) {
    return {
      text: `💻 Romarick's Technical Skills:

Frontend (Expert): React, Next.js, TypeScript, Tailwind CSS, Framer Motion
Backend (Expert): Node.js, Express.js, Django, Python, GraphQL
Database (Expert): MongoDB, PostgreSQL, Prisma, MySQL
DevOps: Docker, AWS, Vercel, Render, Cloudinary, Git

He's currently learning more about cloud architecture and AI integration. Want to know about specific projects where he used these skills? 🚀`,
      showContact: false
    };
  }

  if (lower.includes("experience") || lower.includes("work") || lower.includes("job")) {
    return {
      text: `💼 Romarick's Work Experience:

1. Full-Stack Developer at TiC Foundation (Mar 2025 - Present)
   - Built course management platform with Next.js, Node.js, MongoDB
   - Implemented 15+ features, real-time tracking
   - Used Prisma ORM, Tailwind CSS

2. Full-Stack Developer at Suscam (Jan 2024 - Mar 2024)
   - Worked on cybersecurity startup
   - Implemented secure auth, Cloudinary integration
   - Used Node.js, Next.js, MongoDB

3. Intern Developer at A&T Humanitarian Legacy (Jun 2023 - Aug 2023)
   - Built web apps with Django, Bootstrap
   - Worked with PHP Laravel

4. Microsoft Office Certification (2020)
   - Excel, Word, PowerPoint, Publisher

He has 5+ years of experience in web development. Want to know more about any specific role? 🔍`,
      showContact: false
    };
  }

  if (lower.includes("education") || lower.includes("study") || lower.includes("school") || lower.includes("degree")) {
    return {
      text: `🎓 Romarick's Education:

1. BEng in Software Engineering
   University of Bamenda / NAHPI (2022 - Present)
   - Mastered MERN stack, Next.js, Django
   - TypeScript, Prisma, PostgreSQL

2. GCE Advanced Level
   GHS Buea (2020 - 2021)
   - Passed 5 subjects including Mathematics

3. GCE Ordinary Level
   GHS Nseh (2010 - 2015)
   - O-Level Certificate

4. Secondary Education
   GBHS Tatum (2016 - 2017)
   - Persevered through Anglophone Crisis

Despite challenges during the Anglophone Crisis, he continued his education with remarkable resilience. 📚`,
      showContact: false
    };
  }

  if (lower.includes("project") || lower.includes("built") || lower.includes("create") || lower.includes("made")) {
    return {
      text: `🚀 Romarick's Notable Projects:

1. ShieldEras - Cybersecurity (Featured)
   Fullstack e-commerce and course platform with custom CMS

2. Brainy Quiz (Featured)
   Educational platform for CGCE exam preparation

3. TiC Portal Platform
   Course and internship management system

4. CyberLab
   Cyber challenges and community platform

5. Resume Builder
   AI-powered resume creation SaaS

6. Smart Land Registry
   Land management and dispute resolution

7. Modern Design & Construction Enterprise
   Online presence platform

8. Mbinglo Football
   Fan interaction platform

He's built 8+ projects using React, Next.js, Node.js, and various databases. Want details about any specific project? 🔧`,
      showContact: false
    };
  }

  if (lower.includes("resilience") || lower.includes("crisis") || lower.includes("overcome") || lower.includes("challenge")) {
    return {
      text: `💪 Romarick's Resilience Story:

During the Anglophone Crisis in Cameroon (2016-2017), Romarick's education at GBHS Tatum was disrupted. Despite these challenges, he:

• Persevered through difficult circumstances
• Maintained academic commitment during crisis
• Developed exceptional resilience and adaptability
• Continued education at GHS Nseh and GHS Buea
• Now pursuing Software Engineering at University of Bamenda

His journey demonstrates remarkable determination and the ability to overcome adversity. Today, he's a successful developer building impactful applications! 🌟`,
      showContact: false
    };
  }

  if (lower.includes("hobby") || lower.includes("interest") || lower.includes("like to do")) {
    return {
      text: `❤️ Romarick's Hobbies & Interests:

• Reading Tech Blogs - Always learning new tech
• Open Source Contribution - Giving back to community
• Gaming - Strategy & RPG games
• Music Production - Creating beats
• Photography - Street & nature photography
• Traveling - Exploring new places
• Fitness - Staying active
• Digital Art - Creative design

He believes in work-life balance and uses these activities to stay creative and inspired! 🎨`,
      showContact: false
    };
  }

  if (lower.includes("achievement") || lower.includes("award") || lower.includes("recognition")) {
    return {
      text: `🏆 Romarick's Achievements:

• Open Source Contributor - Contributed to 10+ projects
• Tech Speaker - Spoke at 5+ conferences
• Hackathon Winner - Won 3 hackathons
• Certified Developer - AWS & MongoDB certified

He's also actively involved in the developer community and enjoys sharing knowledge! 🌟`,
      showContact: false
    };
  }

  if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey") || lower.includes("greeting")) {
    return {
      text: `👋 Hello! I'm Romarick's AI assistant.

I can tell you all about ${profileData.personal.preferredName} - his skills, experience, education, projects, and more. 

Here are some things you can ask me:
• "Who is Romarick?"
• "What are his skills?"
• "Tell me about his experience"
• "What projects has he built?"
• "How can I contact him?"
• "What's his resilience story?"

What would you like to know? 🚀`,
      showContact: false
    };
  }

  return {
    text: `🤔 That's a great question!

I can tell you about ${profileData.personal.fullName} - his skills, experience, education, projects, achievements, and more.

Here are some things you can ask:
• "Who is Romarick?"
• "What are his skills?"
• "Tell me about his work experience"
• "What projects has he built?"
• "How can I contact him?"
• "Tell me about his resilience story"

What would you like to know specifically? 😊`,
    showContact: false
  };
};

export default function AIAssistancePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "1",
        content: `👋 Hi there! I'm Romarick's AI assistant.\n\nI can help you learn about his skills, experience, education, projects, or connect you with him. What would you like to know?`,
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      };
      setMessages([welcomeMessage]);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, []);

  // Typing animation
  const typeMessage = async (text: string, messageId: string) => {
    setIsTyping(true);
    const words = text.split(" ");
    let currentText = "";
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i === 0 ? "" : " ") + words[i];
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, content: currentText } : msg
        )
      );
      await new Promise((resolve) => setTimeout(resolve, 15 + Math.random() * 30));
    }
    setIsTyping(false);
  };

  const generateAIResponse = async (userMessage: string): Promise<{ text: string; showContact: boolean }> => {
    setIsProcessing(true);
    setApiError(false);

    const systemPrompt = buildSystemPrompt();

    try {
      const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
      
      if (!apiKey) {
        console.warn("Groq API key not found, using fallback responses");
        setApiError(true);
        return getFallbackResponse(userMessage);
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          messages: [
            { role: "system", content: systemPrompt },
            ...conversationHistory,
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data?.choices?.[0]?.message?.content) {
        const assistantReply = data.choices[0].message.content;
        const showContact = userMessage.toLowerCase().includes("contact") || 
                           userMessage.toLowerCase().includes("reach") || 
                           userMessage.toLowerCase().includes("email") ||
                           userMessage.toLowerCase().includes("phone") ||
                           userMessage.toLowerCase().includes("how can i") ||
                           userMessage.toLowerCase().includes("get in touch") ||
                           userMessage.toLowerCase().includes("connect") ||
                           userMessage.toLowerCase().includes("hire") ||
                           userMessage.toLowerCase().includes("work with");
        
        setConversationHistory([
          ...conversationHistory,
          { role: "user", content: userMessage },
          { role: "assistant", content: assistantReply },
        ]);
        return { text: assistantReply, showContact };
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      console.error("Groq API error:", error);
      setApiError(true);
      return getFallbackResponse(userMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Create a placeholder AI message
    const aiMessageId = (Date.now() + 1).toString();
    const aiPlaceholder: Message = {
      id: aiMessageId,
      content: "",
      sender: "ai",
      timestamp: new Date(),
      isTyping: true,
      type: "text",
    };
    setMessages((prev) => [...prev, aiPlaceholder]);

    // Generate response
    const response = await generateAIResponse(text);
    
    // Remove typing indicator
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === aiMessageId ? { ...msg, isTyping: false, content: "", type: "text" } : msg
      )
    );

    // Type out the message
    await typeMessage(response.text, aiMessageId);

    // If contact buttons should be shown, add them as a separate message
    if (response.showContact) {
      const contactMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: "📬 Here are all the ways you can connect with Romarick:",
        sender: "ai",
        timestamp: new Date(),
        type: "contact",
      };
      setMessages((prev) => [...prev, contactMessage]);
    }
  };

  const handleSendMessage = () => sendMessage(input);
  const handleQuickQuestion = (question: string) => sendMessage(question);

  const quickQuestions = [
    { icon: User, text: "About Romarick", question: "Tell me about Romarick" },
    { icon: Zap, text: "Skills", question: "What are Romarick's skills?" },
    { icon: Briefcase, text: "Experience", question: "What is his work experience?" },
    { icon: GraduationCap, text: "Education", question: "What is his education?" },
    { icon: Code2, text: "Projects", question: "What projects has he built?" },
    { icon: Mail, text: "Contact", question: "How can I contact him?" },
  ];

  const socialButtons = [
    { icon: Github, href: profileData.socialLinks.github, label: "GitHub" },
    { icon: Linkedin, href: profileData.socialLinks.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: profileData.socialLinks.twitter, label: "Twitter" },
    { icon: Mail, href: `mailto:${profileData.socialLinks.email}`, label: "Email" },
  ];

  // Scroll handler for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (messagesContainerRef.current) {
        setIsScrolled(messagesContainerRef.current.scrollTop > 10);
      }
    };
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

    return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-blue-500 selection:text-white overflow-hidden">
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Radley:ital@0;1&display=swap');
        
        h1, h2, h3, h4, .font-heading {
          font-family: 'Radley', serif !important;
          font-weight: 700 !important;
        }
        p, span, div, a, button, label, .font-body {
          font-family: 'Lato', sans-serif !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(241, 245, 249, 0.8);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.7);
        }
        @media (max-width: 640px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 3px;
          }
        }
        .chat-container {
          height: calc(100vh - 180px);
        }
        @media (max-width: 640px) {
          .chat-container {
            height: calc(100vh - 160px);
          }
        }
        /* Consistent width for all sections - Increased by another 80px */
        .chat-wrapper {
          max-width: 100%;
          width: 100%;
        }
        @media (min-width: 768px) {
          .chat-wrapper {
            max-width: 720px;
          }
        }
        @media (min-width: 1024px) {
          .chat-wrapper {
            max-width: 820px;
          }
        }
        @media (min-width: 1280px) {
          .chat-wrapper {
            max-width: 880px;
          }
        }
      `}</style>

      {/* Header - Fixed */}
      <div className="bg-white border-b-2 border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="chat-wrapper flex items-center gap-3 py-3 sm:py-4">
              <Link href="/">
                <button className="p-2 rounded-xl bg-slate-50 border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
                  <ArrowLeft className="h-5 w-5 text-slate-600" />
                </button>
              </Link>
              <div className="flex-1 flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-md opacity-20" />
                  <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-slate-900 font-['Radley',serif]">
                    Romarick's AI Assistant
                  </h1>
                  <p className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-pulse" />
                    {apiError ? "Offline Mode" : "Online · Powered by Groq"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                  {messages.filter(m => m.sender === "user").length} msgs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick questions - Fixed */}
      <div className="bg-slate-50/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex justify-center">
            <div className="chat-wrapper flex flex-wrap gap-1.5 sm:gap-2">
              {quickQuestions.map((q, idx) => {
                const Icon = q.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleQuickQuestion(q.question)}
                    disabled={isProcessing}
                    className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-xl text-slate-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-[10px] sm:text-sm font-bold font-['Lato',sans-serif]"
                  >
                    <Icon className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                    <span>{q.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container - Centered with consistent width */}
      <div className="flex justify-center w-full">
        <div className="chat-wrapper px-4 sm:px-6 lg:px-8">
          {/* Messages - Scrollable */}
          <div className="chat-container overflow-y-auto py-4 space-y-4 custom-scrollbar bg-slate-50/30" ref={messagesContainerRef}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[88%] sm:max-w-[82%] ${message.sender === "user" ? "items-end" : "items-start"} flex flex-col`}>
                  {message.sender === "ai" && (
                    <div className="flex items-center gap-1.5 mb-1">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                        <Bot className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold font-['Lato',sans-serif]">
                        Assistant
                      </span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm shadow-lg shadow-blue-600/20"
                        : "bg-white border-2 border-slate-200 text-slate-700 rounded-bl-sm shadow-sm"
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-['Lato',sans-serif] font-semibold">
                      {message.content}
                      {message.isTyping && (
                        <span className="inline-flex ml-1">
                          <span className="animate-pulse">.</span>
                          <span className="animate-pulse delay-75">.</span>
                          <span className="animate-pulse delay-150">.</span>
                        </span>
                      )}
                    </p>
                    {message.type === "contact" && <ContactButtons />}
                  </div>
                  {message.sender === "user" && (
                    <div className="flex items-center justify-end mt-1 mr-1">
                      <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center">
                        <User className="h-3 w-3 text-slate-500" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {isProcessing && !messages.some(m => m.isTyping) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white border-2 border-slate-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                  <div className="flex space-x-1.5 items-center">
                    {[0, 150, 300].map((delay) => (
                      <div
                        key={delay}
                        className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: `${delay}ms` }}
                      />
                    ))}
                    <span className="text-[10px] text-slate-400 ml-2 font-bold font-['Lato',sans-serif]">
                      {apiError ? "using offline mode..." : "thinking..."}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input area - Fixed at bottom like WhatsApp */}
      <div className="bg-white border-t-2 border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex justify-center">
            <div className="chat-wrapper flex gap-2 sm:gap-3">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSendMessage()
                }
                placeholder="Ask about Romarick's skills, experience..."
                className="flex-1 bg-slate-50 border-2 border-slate-200 text-slate-700 placeholder:text-slate-400 text-sm sm:text-base h-11 sm:h-12 px-4 sm:px-6 rounded-xl focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:opacity-50 transition-colors font-['Lato',sans-serif] font-semibold"
                disabled={isProcessing}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isProcessing}
                className="h-11 w-11 sm:h-12 sm:w-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-40 shrink-0 shadow-lg shadow-blue-600/20"
              >
                {isProcessing ? (
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                ) : (
                  <Send className="h-5 w-5 text-white" />
                )}
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-1.5">
            <p className="text-[8px] sm:text-[10px] text-slate-400 font-['Lato',sans-serif] font-semibold">
              {apiError ? "Offline mode · Using fallback responses" : "Powered by Groq · Ask anything about Romarick"}
            </p>
            <div className="flex items-center gap-2">
              {socialButtons.slice(0, 3).map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <social.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-500 hover:text-blue-600 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}