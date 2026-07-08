"use client";

import {
  Briefcase,
  Calendar,
  MapPin,
  Award,
  Star,
  GraduationCap,
  BookOpen,
  Code,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { API_BASE_URL } from "@/lib/api";

// Work Experience Data
const workExperiences = [
  {
    id: 1,
    role: "Full-Stack Developer",
    company: "TiC Foundation",
    location: "Yaounde, Cameroon",
    period: "March 2025 - September 2025",
    description:
      "Worked on an all-in-one online course management platform featuring mentorship programs, courses, and internship tracking systems.",
    achievements: [
      "Built a complete course management system with Next.js and Node.js",
      "Implemented real-time tracking for internships and mentorship progress",
      "Integrated MongoDB and PostgreSQL databases with Prisma ORM",
      "Designed responsive UI with Tailwind CSS",
      "Collaborated with team members on 15+ features",
    ],
    skills: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "TypeScript",
    ],
    featured: true,
  },
  {
    id: 2,
    role: "Full-Stack Developer",
    company: "Suscam",
    location: "Remote",
    period: "January 2024 - March 2024",
    description:
      "Worked on an online course management and cybersecurity startup, developing secure web applications and learning platforms.",
    achievements: [
      "Developed features for online course platform using Node.js and Next.js",
      "Implemented secure authentication and authorization systems",
      "Integrated Cloudinary for media management",
      "Used MongoDB with Prisma for database operations",
      "Collaborated on 5+ major projects",
    ],
    skills: [
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Cloudinary",
      "MongoDB",
      "Prisma",
      "TypeScript",
    ],
    featured: false,
  },
  {
    id: 3,
    role: "Intern Developer",
    company: "A&T Humanitarian Legacy",
    location: "Douala, Cameroon",
    period: "June 2023 - August 2023",
    description:
      "Completed internship demonstrating practical skills in web development, working on real-world projects for humanitarian initiatives.",
    achievements: [
      "Built web applications using Django framework",
      "Developed responsive frontend interfaces with Bootstrap",
      "Worked with PHP Laravel for backend services",
      "Collaborated on team on 3+ projects",
      "Received positive feedback for technical contributions",
    ],
    skills: ["Django", "Bootstrap", "PHP", "Laravel", "JavaScript", "HTML/CSS"],
    featured: false,
  },
  {
    id: 4,
    role: "Microsoft Office Certification Student",
    company: "Giddis Computer Training Center",
    location: "Yaounde, Cameroon",
    period: "2020",
    description:
      "Completed intensive training program focused on Microsoft Office suite and computer fundamentals.",
    achievements: [
      "Gained proficiency in Microsoft Excel (advanced formulas, pivot tables)",
      "Mastered Microsoft Word document processing",
      "Learned PowerPoint presentations and Publisher",
      "Earned certification in Microsoft Office",
      "Developed typing and computer literacy skills",
    ],
    skills: [
      "Microsoft Excel",
      "Microsoft Word",
      "PowerPoint",
      "Publisher",
      "Computer Fundamentals",
    ],
    featured: false,
  },
];

// Education Data
const educationExperiences = [
  {
    id: 1,
    degree: "Bachelor of Engineering (BEng) - Software Engineering",
    institution:
      "University of Bamenda / National Higher Polytechnic Institute (NAHPI)",
    location: "Bamenda, Cameroon",
    period: "2022 - Present",
    description:
      "Currently pursuing a degree in Software Engineering, gaining comprehensive knowledge in modern web technologies, system design, and software architecture.",
    achievements: [
      "Mastered MERN stack (MongoDB, Express, React, Node.js)",
      "Learned Next.js for production-ready React applications",
      "Built projects with Django and Python",
      "Gained expertise in TypeScript and JavaScript",
      "Studied database design with PostgreSQL and Prisma",
      "Developed skills in RESTful APIs and GraphQL",
      "Collaborated on team projects using Git/GitHub",
    ],
    skills: [
      "Node.js",
      "Django",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Express",
      "React",
      "Git",
    ],
    featured: true,
  },
  {
    id: 2,
    degree: "GCE Advanced Level",
    institution: "GHS Buea",
    location: "Buea, Cameroon",
    period: "2020 - 2021",
    description:
      "Successfully completed GCE A-Levels, passing 5 subjects despite educational disruptions caused by the Anglophone Crisis.",
    achievements: [
      "Passed 5 subjects including Mathematics and Sciences",
      "Demonstrated resilience during challenging times",
      "Built strong foundation for higher education",
    ],
    skills: [
      "Mathematics",
      "Physics",
      "Computer Science",
      "Critical Thinking",
      "Problem Solving",
    ],
    featured: false,
  },
  {
    id: 3,
    degree: "GCE Ordinary Level",
    institution: "GHS Nseh",
    location: "Nseh, Cameroon",
    period: "2010 - 2015",
    description:
      "Completed secondary education with GCE O-Level certification, building the foundation for advanced studies.",
    achievements: [
      "Earned O-Level Certificate",
      "Developed core academic skills",
      "Built foundation for future learning",
    ],
    skills: ["Core Mathematics", "English", "Sciences", "Basic Computing"],
    featured: false,
  },
  {
    id: 4,
    degree: "Secondary Education",
    institution: "GBHS Tatum",
    location: "Tatum, Cameroon",
    period: "2016 - 2017",
    description:
      "Continued secondary education at GBHS Tatum. This period was interrupted by the Anglophone Crisis, which caused educational disruption and challenges.",
    achievements: [
      "Persevered through challenging circumstances",
      "Maintained academic commitment during crisis",
      "Developed resilience and adaptability",
    ],
    skills: ["Adaptability", "Resilience", "Self-Learning"],
    featured: false,
  },
];

// Stats data
const stats = [
  { label: "Years Experience", value: "5+", icon: Briefcase },
  { label: "Projects Completed", value: "25+", icon: Award },
  { label: "Technologies", value: "20+", icon: Star },
  { label: "Education", value: "4", icon: GraduationCap },
];

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-blue-500 selection:text-white overflow-x-hidden">

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Radley:ital@0;1&display=swap');
        
        h1, h2, h3, h4, .font-heading {
          font-family: 'Radley', serif !important;
          font-weight: 700 !important;
        }
        p, span, div, a, button, label, .font-body {
          font-family: 'Lato', sans-serif !important;
        }
      `}</style>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50/80 border-2 border-blue-200 backdrop-blur-sm mb-4">
            <Briefcase className="h-5 w-5 text-blue-600" />
            <span className="text-base font-bold text-blue-700 uppercase tracking-wide">
              Professional Journey
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 tracking-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Journey
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-bold mt-4">
            A timeline of my professional experience, education, and growth as a
            developer
          </p>
        </div>

        {/* Stats Row - MATCHES ABOUT PAGE LAYOUT */}
        <div className="flex flex-row flex-wrap justify-center gap-2 sm:grid sm:grid-cols-4 sm:gap-5 mb-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex-1 min-w-[70px] max-w-[90px] sm:max-w-none sm:min-w-0 bg-white border-2 border-slate-100 rounded-2xl p-3 sm:p-5 text-center shadow-md shadow-slate-100/50"
              >
                <div className="inline-flex p-1.5 sm:p-2 rounded-lg bg-blue-50 text-blue-600 mb-0.5 sm:mb-2">
                  <Icon className="h-4 w-4 sm:h-7 sm:w-7" />
                </div>
                <p className="text-base sm:text-4xl font-black text-slate-900 leading-none">
                  {stat.value}
                </p>
                <p className="text-[8px] sm:text-sm font-bold text-slate-500 uppercase tracking-wider mt-0.5 sm:mt-1.5 leading-tight">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Work Experience Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />
            <span className="text-base font-black tracking-[0.25em] text-blue-600 uppercase">
              Work Experience
            </span>
            <div className="flex-1 h-0.5 bg-gradient-to-l from-blue-500/30 to-transparent" />
          </div>

          <div className="space-y-6">
            {workExperiences.map((exp, index) => (
              <div
                key={exp.id}
                className="bg-white border-2 border-slate-200/80 rounded-2xl overflow-hidden shadow-sm"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                          {exp.role}
                        </h3>
                        {exp.featured && (
                          <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 text-white text-sm font-black px-4 py-1.5 rounded-xl">
                            <Sparkles className="h-3 w-3 inline mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-xl font-bold text-blue-600 mt-1">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div className="flex items-center gap-2 text-base font-bold text-slate-500">
                        <Calendar className="h-5 w-5" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-base font-bold text-slate-500">
                        <MapPin className="h-5 w-5" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-slate-600 font-semibold leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  <div className="mb-5">
                    <h4 className="text-base font-black text-blue-600 mb-3 flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-base text-slate-600 font-semibold"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-blue-600 mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-sm font-bold bg-slate-100 text-slate-700 px-4 py-2 rounded-xl border-2 border-slate-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
            <span className="text-base font-black tracking-[0.25em] text-indigo-600 uppercase">
              Education
            </span>
            <div className="flex-1 h-0.5 bg-gradient-to-l from-indigo-500/30 to-transparent" />
          </div>

          <div className="space-y-6">
            {educationExperiences.map((edu, index) => (
              <div
                key={edu.id}
                className="bg-white border-2 border-slate-200/80 rounded-2xl overflow-hidden shadow-sm"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <GraduationCap className="h-6 w-6 text-indigo-600" />
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                          {edu.degree}
                        </h3>
                        {edu.featured && (
                          <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 text-white text-sm font-black px-4 py-1.5 rounded-xl">
                            <Sparkles className="h-3 w-3 inline mr-1" />
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-xl font-bold text-indigo-600 mt-1">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2">
                      <div className="flex items-center gap-2 text-base font-bold text-slate-500">
                        <Calendar className="h-5 w-5" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-base font-bold text-slate-500">
                        <MapPin className="h-5 w-5" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-slate-600 font-semibold leading-relaxed mb-5">
                    {edu.description}
                  </p>

                  <div className="mb-5">
                    <h4 className="text-base font-black text-indigo-600 mb-3 flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Key Highlights
                    </h4>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-base text-slate-600 font-semibold"
                        >
                          <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-base font-black text-indigo-600 mb-3">
                      Skills & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-sm font-bold bg-slate-100 text-slate-700 px-4 py-2 rounded-xl border-2 border-slate-200"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/60 rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 sm:mb-3">
              Looking for more details?
            </h3>
            <p className="text-base sm:text-lg text-slate-600 font-semibold mb-4 sm:mb-6 max-w-md mx-auto">
              Download my full resume for a complete overview of my experience
              and qualifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a
                href={`${API_BASE_URL}/api/resume/download`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-10 py-3 sm:py-5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base sm:text-lg font-bold shadow-lg shadow-blue-600/25 transition-all"
              >
                <Briefcase className="h-5 w-5 sm:h-6 sm:w-6" />
                Download Resume
              </a>
              <Link href="/contact" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-5 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 text-base sm:text-lg font-bold rounded-xl transition-all">
                  Contact Me
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}