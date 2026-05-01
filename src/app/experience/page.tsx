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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
            <Briefcase className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-xs font-medium text-purple-300">
              Professional Journey
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Work{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            A timeline of my professional journey, achievements, and growth as a
            developer
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-12 max-w-2xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-3 rounded-xl bg-slate-800/30 border border-slate-700/50"
              >
                <div className="inline-flex p-1.5 rounded-lg bg-purple-500/10 mb-1">
                  <Icon className="h-4 w-4 text-purple-400" />
                </div>
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-[10px] text-slate-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card
              key={exp.id}
              className="group bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20 overflow-hidden"
            >
              <CardContent className="p-5 md:p-6">
                {/* Header with featured badge */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {exp.role}
                      </h3>
                      {exp.featured && (
                        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white text-[10px]">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-base font-medium text-purple-400 mt-1">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-1">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="h-3 w-3" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="h-3 w-3" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Achievements */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-purple-400 mb-2 flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-400"
                      >
                        <div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="text-xs font-semibold text-purple-400 mb-2">
                    Technologies & Tools
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-[10px] bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors"
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
        <div className="mt-12 text-center">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 p-6">
            <h3 className="text-base font-semibold text-white mb-2">
              Looking for more details?
            </h3>
            <p className="text-sm text-slate-300 mb-4">
              Download my full resume for a complete overview of my experience
              and qualifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium transition-all"
              >
                <Briefcase className="h-4 w-4" />
                Download Full Resume
              </a>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
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
