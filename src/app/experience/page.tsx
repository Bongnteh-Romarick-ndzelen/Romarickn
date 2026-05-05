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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
      "Collaborated with team on 3+ projects",
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

// Card background variants
const cardBgVariants = [
  "bg-slate-800/85",
  "bg-slate-800/80",
  "bg-slate-800/90",
  "bg-slate-800/75",
  "bg-slate-800/85",
];

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-[#111D3A] relative overflow-hidden">
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(64,224,208,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(64,224,208,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Glow orbs */}
      <div className="absolute top-[-80px] right-[-60px] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-teal-500/10 rounded-full border border-teal-500/20">
            <Briefcase className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-teal-400" />
            <span className="text-[10px] sm:text-xs font-medium text-teal-300">
              Professional Journey
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Journey
            </span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            A timeline of my professional experience, education, and growth as a
            developer
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-2 sm:p-3 rounded-xl bg-slate-800/20 border border-slate-700/30 backdrop-blur-sm"
              >
                <div className="inline-flex p-1 sm:p-1.5 rounded-lg bg-teal-500/10 mb-1">
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-teal-400" />
                </div>
                <div className="text-base sm:text-lg font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-[8px] sm:text-[10px] text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Work Experience Section */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-teal-500 to-transparent" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-teal-400 uppercase">
              Work Experience
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-teal-500/30 to-transparent" />
          </div>
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {workExperiences.map((exp, index) => (
              <Card
                key={exp.id}
                className={`group ${cardBgVariants[index % cardBgVariants.length]} border border-slate-700/40 hover:border-teal-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:-translate-y-1 overflow-hidden rounded-xl backdrop-blur-sm`}
              >
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
                          {exp.role}
                        </h3>
                        {exp.featured && (
                          <Badge className="bg-gradient-to-r from-teal-500 to-cyan-500 border-0 text-white text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 font-semibold">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-teal-400 mt-1">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400">
                        <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400">
                        <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-[10px] sm:text-xs font-bold text-teal-400 mb-2 flex items-center gap-1.5">
                      <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[10px] sm:text-xs text-slate-400"
                        >
                          <div className="w-1 h-1 rounded-full bg-teal-400 mt-1.5 flex-shrink-0"></div>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] sm:text-xs font-bold text-teal-400 mb-2">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {exp.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-[8px] sm:text-[9px] bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors px-1.5 sm:px-2 py-0 font-medium"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-teal-500 to-transparent" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-teal-400 uppercase">
              Education
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-teal-500/30 to-transparent" />
          </div>
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {educationExperiences.map((edu, index) => (
              <Card
                key={edu.id}
                className={`group ${cardBgVariants[index % cardBgVariants.length]} border border-slate-700/40 hover:border-teal-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-teal-900/20 hover:-translate-y-1 overflow-hidden rounded-xl backdrop-blur-sm`}
              >
                <CardContent className="p-4 sm:p-5 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <GraduationCap className="h-4 w-4 text-teal-400" />
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
                          {edu.degree}
                        </h3>
                        {edu.featured && (
                          <Badge className="bg-gradient-to-r from-teal-500 to-cyan-500 border-0 text-white text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 font-semibold">
                            Current
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm sm:text-base font-semibold text-teal-400 mt-1">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400">
                        <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        <span>{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400">
                        <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
                    {edu.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-[10px] sm:text-xs font-bold text-teal-400 mb-2 flex items-center gap-1.5">
                      <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      Key Highlights
                    </h4>
                    <ul className="space-y-1.5">
                      {edu.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[10px] sm:text-xs text-slate-400"
                        >
                          <div className="w-1 h-1 rounded-full bg-teal-400 mt-1.5 flex-shrink-0"></div>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] sm:text-xs font-bold text-teal-400 mb-2">
                      Skills & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {edu.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-[8px] sm:text-[9px] bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors px-1.5 sm:px-2 py-0 font-medium"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 p-4 sm:p-6">
            <h3 className="text-sm sm:text-base font-bold text-white mb-2">
              Looking for more details?
            </h3>
            <p className="text-[11px] sm:text-sm text-slate-300 mb-3 sm:mb-4">
              Download my full resume for a complete overview of my experience
              and qualifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-[11px] sm:text-sm font-semibold transition-all"
              >
                <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                Download Full Resume
              </a>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 text-[11px] sm:text-sm h-8 sm:h-9 px-3 sm:px-4 font-medium rounded-lg"
                >
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}