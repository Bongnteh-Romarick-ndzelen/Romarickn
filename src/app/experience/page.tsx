"use client";

import { Briefcase, Calendar, MapPin, Award, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const experiences = [
  {
    id: 1,
    role: "Senior Full-Stack Developer",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA (Remote)",
    period: "Jan 2021 - Present",
    description:
      "Led the development of a scalable e-commerce platform using Next.js and Prisma. Architected and implemented key features, mentored junior developers, and improved application performance by 30%.",
    achievements: [
      "Led a team of 4 developers to deliver the MVP in 3 months",
      "Reduced API response time by 40% through query optimization",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Mentored 2 junior developers who were promoted to mid-level",
    ],
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "AWS",
    ],
    featured: true,
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Creative Minds Agency",
    location: "New York, NY (Hybrid)",
    period: "Jun 2018 - Dec 2020",
    description:
      "Developed and maintained responsive user interfaces for various client websites using React. Collaborated with designers to translate mockups into high-quality code and improved user experience scores.",
    achievements: [
      "Built 15+ responsive websites for clients across various industries",
      "Improved Lighthouse scores from 65 to 95+ on all projects",
      "Created a reusable component library used across 10+ projects",
      "Reduced bounce rate by 25% through UX improvements",
    ],
    skills: [
      "React",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Redux",
      "Jest",
      "Webpack",
      "Figma",
    ],
    featured: false,
  },
  {
    id: 3,
    role: "Web Developer Intern",
    company: "Innovate Startups",
    location: "Austin, TX (On-site)",
    period: "May 2017 - Aug 2017",
    description:
      "Assisted in building and testing new features for a SaaS application. Gained hands-on experience with modern web technologies and agile development methodologies.",
    achievements: [
      "Contributed to 5 major feature releases",
      "Wrote comprehensive documentation for the codebase",
      "Participated in daily stand-ups and sprint planning",
      "Received outstanding intern award for contributions",
    ],
    skills: ["HTML", "CSS", "JavaScript", "jQuery", "Git", "Bootstrap"],
    featured: false,
  },
];

// Stats data
const stats = [
  { label: "Years Experience", value: "5+", icon: Briefcase },
  { label: "Projects Completed", value: "20+", icon: Award },
  { label: "Technologies", value: "15+", icon: Star },
];

export default function ExperiencePage() {
  return (
    <div
      className="min-h-screen bg-[#080b12]"
      style={{
        fontFamily:
          "'Noto Sans', 'Roboto', system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
            <Briefcase className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-400" />
            <span className="text-[10px] sm:text-xs font-medium text-purple-300">
              Professional Journey
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
            Work{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            A timeline of my professional journey, achievements, and growth as a
            developer
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-2 sm:p-3 rounded-xl bg-slate-800/30 border border-slate-700/50"
              >
                <div className="inline-flex p-1 sm:p-1.5 rounded-lg bg-purple-500/10 mb-1">
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                </div>
                <div className="text-base sm:text-lg font-black text-white">
                  {stat.value}
                </div>
                <div className="text-[8px] sm:text-[10px] text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Experience Cards */}
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          {experiences.map((exp, index) => (
            <Card
              key={exp.id}
              className="group bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20 overflow-hidden rounded-xl"
            >
              <CardContent className="p-4 sm:p-5 md:p-6">
                {/* Header with featured badge */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {exp.role}
                      </h3>
                      {exp.featured && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 font-semibold">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm sm:text-base font-semibold text-purple-400 mt-1">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400">
                      <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500">
                      <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Achievements */}
                <div className="mb-4">
                  <h4 className="text-[10px] sm:text-xs font-bold text-purple-400 mb-2 flex items-center gap-1.5">
                    <Award className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-[10px] sm:text-xs text-slate-400"
                      >
                        <div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></div>
                        <span className="leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-[10px] sm:text-xs font-bold text-purple-400 mb-2">
                    Technologies & Tools
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

        {/* CTA Section */}
        <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 p-4 sm:p-6">
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
                className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-[11px] sm:text-sm font-semibold transition-all"
              >
                <Briefcase className="h-3 w-3 sm:h-4 sm:w-4" />
                Download Full Resume
              </a>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 text-[11px] sm:text-sm h-8 sm:h-9 px-3 sm:px-4 font-medium"
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
