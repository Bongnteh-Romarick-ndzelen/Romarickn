"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Github,
  ExternalLink,
  Eye,
  Star,
  Sparkles,
  Code2,
  Rocket,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const projects = [
  {
    title: "ShieldEras - Cybersecurity",
    description:
      "A fullstack featured e-commerce and online course management site with a custom CMS, payment integration, and a user-friendly interface. Built with performance and scalability in mind.",
    imageUrl: "/projects/shielderas.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Stripe",
      "MongoDB",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
    ],
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
    year: "2025",
    category: "Full Stack",
  },
  {
    title: "Brainy Quiz",
    description:
      "A complete fullstack web app that helps Advanced and Ordinary level students to take past CGCE questions, answer quizzes, and test their IQ level.",
    imageUrl: "/projects/Brainy-qiz.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "Node.js",
      "Tailwind CSS",
      "Genkit",
      "Cloudinary",
    ],
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
    year: "2025",
    category: "Full Stack",
  },
  {
    title: "TiC Portal Platform",
    description:
      "An advanced backend course management and internship management platform that helps students and others to manage internships online, enroll in courses with progress tracking, attendance records, and more.",
    imageUrl: "/projects/tic-portal.png",
    tags: ["MongoDB", "TypeScript", "Express.js", "Node.js", "Render"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2025",
    category: "Backend",
  },
  {
    title: "CyberLab",
    description:
      "A platform that enables users to take cyber challenges and complete them, join forums and discuss under particular topics, chat with mentors, and more.",
    imageUrl: "/projects/CYBERLAB.png",
    tags: ["React", "Vite", "Tailwind CSS", "Vercel", "TypeScript"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2025",
    category: "Web",
  },
  {
    title: "Resume Builder",
    description:
      "A SaaS platform that helps users build their resumes with different templates and an AI analyzer for optimization and improvement suggestions.",
    imageUrl: "/projects/resumatic.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Genkit"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2025",
    category: "Frontend",
  },
  {
    title: "Smart Land Registry",
    description:
      "A platform that helps communities settle and manage land disputes by registering land, selling and buying lands, uploading land ownership documents, and more.",
    imageUrl: "/projects/smartlandregistry.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2025",
    category: "Web",
  },
  {
    title: "Modern Design & Construction Enterprise",
    description:
      "A platform that helps Modern Design and Construction Enterprise advertise their products and services online to gain market reach and client engagement.",
    imageUrl: "/projects/moderndesign.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2025",
    category: "Web",
  },
  {
    title: "Mbinglo Football",
    description:
      "A platform that helps Mbinglo FC advertise and interact with fans, featuring past matches, upcoming matches, latest blog posts, chat section, and more.",
    imageUrl: "/projects/Mbinglofc.png",
    tags: ["React", "Tailwind CSS", "Vite", "Node.js", "Render", "Vercel"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2025",
    category: "Full Stack",
  },
];

const categories = [
  "All",
  "Featured",
  "Full Stack",
  "Frontend",
  "Backend",
  "Web",
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Featured") return project.featured;
    return project.category === activeCategory;
  });

  const allTechnologies = [...new Set(projects.flatMap((p) => p.tags))];
  const featuredCount = projects.filter((p) => p.featured).length;

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-blue-50/80 border-2 border-blue-200 backdrop-blur-sm mb-3 sm:mb-4">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            <span className="text-[10px] sm:text-base font-black text-blue-700 uppercase tracking-wide">
              Portfolio Showcase
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Projects
            </span>
          </h1>
          <p className="text-sm sm:text-xl text-slate-600 max-w-2xl mx-auto font-bold mt-2 sm:mt-4">
            A curated selection of projects showcasing my technical skills and
            creative solutions
          </p>
        </div>

        {/* Stats Row - FLEX ROW ON MOBILE, 4 COLUMNS ON DESKTOP */}
        <div className="flex flex-row flex-wrap justify-center gap-2 sm:grid sm:grid-cols-4 sm:gap-5 mb-6 sm:mb-10 max-w-5xl mx-auto">
          {[
            { value: projects.length, label: "Total Projects", icon: Code2 },
            { value: featuredCount, label: "Featured", icon: Star },
            { value: `${allTechnologies.length}+`, label: "Technologies", icon: Rocket },
            { value: "100%", label: "Satisfaction", icon: Users },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
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

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2.5 mb-6 sm:mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-2.5 sm:px-6 py-1 sm:py-2.5 rounded-xl text-[10px] sm:text-base font-bold ${
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25"
                  : "bg-white border-2 border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={project.title}
              className="bg-white border-2 border-slate-200/80 overflow-hidden rounded-2xl"
              onMouseEnter={() => !isMobile && setHoveredCard(index)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
              onTouchStart={() => {
                if (isMobile) {
                  setHoveredCard(hoveredCard === index ? null : index);
                }
              }}
            >
              {/* Image Section */}
              <div className="relative aspect-video overflow-hidden bg-slate-100">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  priority={index < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-white text-[8px] sm:text-sm font-black px-1.5 sm:px-4 py-0.5 sm:py-1.5 rounded-xl shadow-lg">
                      <Star className="h-2.5 w-2.5 sm:h-4 sm:w-4 mr-0.5 sm:mr-1.5 fill-current" />
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10">
                  <Badge
                    variant="outline"
                    className="bg-white/90 backdrop-blur-sm border-2 border-white/30 text-slate-800 text-[8px] sm:text-sm font-bold px-1.5 sm:px-4 py-0.5 sm:py-1.5 rounded-xl shadow-sm"
                  >
                    {project.category}
                  </Badge>
                </div>

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-blue-600/90 backdrop-blur-sm flex items-center justify-center gap-2 sm:gap-5 ${
                    (!isMobile && hoveredCard === index) || (isMobile && hoveredCard === index)
                      ? "opacity-100" 
                      : "opacity-0 pointer-events-none"
                  } transition-opacity duration-200`}
                >
                  <Link href={project.liveUrl} target="_blank">
                    <button 
                      className="px-2 sm:px-6 py-1 sm:py-3 rounded-xl bg-white text-slate-900 text-[10px] sm:text-base font-bold shadow-lg"
                    >
                      <Eye className="h-3.5 w-3.5 sm:h-5 sm:w-5 inline mr-0.5 sm:mr-2" />
                      Preview
                    </button>
                  </Link>
                  <Link href={project.repoUrl} target="_blank">
                    <button 
                      className="px-2 sm:px-6 py-1 sm:py-3 rounded-xl bg-slate-900 text-white text-[10px] sm:text-base font-bold shadow-lg"
                    >
                      <Github className="h-3.5 w-3.5 sm:h-5 sm:w-5 inline mr-0.5 sm:mr-2" />
                      Code
                    </button>
                  </Link>
                </div>
              </div>

              <div className="p-3 sm:p-6 flex flex-col min-w-0">
                <h3 className="text-sm sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-2 line-clamp-1 min-w-0">
                  {project.title}
                </h3>

                <p className="text-[10px] sm:text-base text-slate-600 font-bold mb-1.5 sm:mb-3 line-clamp-2 leading-relaxed break-words">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[8px] sm:text-sm font-bold bg-slate-100 text-slate-700 px-1.5 sm:px-3.5 py-0.5 sm:py-1.5 rounded-xl border-2 border-slate-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 4 && (
                    <Badge
                      variant="secondary"
                      className="text-[8px] sm:text-sm font-bold bg-slate-100 text-slate-700 px-1.5 sm:px-3.5 py-0.5 sm:py-1.5 rounded-xl border-2 border-slate-200"
                    >
                      +{project.tags.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-1.5 sm:gap-3 mt-auto pt-2 sm:pt-4 border-t-2 border-slate-100">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="flex-1 min-w-0"
                  >
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-[10px] sm:text-base font-bold h-7 sm:h-11 rounded-xl shadow-lg shadow-blue-600/20"
                    >
                      <ExternalLink className="mr-0.5 sm:mr-2 h-3.5 w-3.5 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">Live Demo</span>
                      <span className="sm:hidden">Demo</span>
                    </Button>
                  </Link>
                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    className="flex-1 min-w-0"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-2 border-slate-300 text-white hover:text-slate-900 hover:bg-slate-50 text-[10px] sm:text-base font-bold h-7 sm:h-11 rounded-xl"
                    >
                      <Github className="mr-0.5 sm:mr-2 h-3.5 w-3.5 sm:h-5 sm:w-5" />
                      <span className="hidden sm:inline">Code</span>
                      <span className="sm:hidden">Repo</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-10 sm:mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/60 rounded-2xl p-4 sm:p-10 text-center shadow-sm">
            <h3 className="text-lg sm:text-3xl font-bold text-slate-900 mb-1.5 sm:mb-3">
              Have a project in mind?
            </h3>
            <p className="text-sm sm:text-lg text-slate-600 font-bold mb-3 sm:mb-6 max-w-md mx-auto">
              Let's collaborate and bring your ideas to life. I'm available for
              freelance work and partnerships.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
              <Link href="/contact">
                <button className="px-4 sm:px-10 py-2 sm:py-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm sm:text-lg font-bold rounded-xl shadow-lg shadow-blue-600/25">
                  Start a Project
                  <ArrowRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 inline" />
                </button>
              </Link>
              <Link href="/experience">
                <button className="px-4 sm:px-10 py-2 sm:py-4.5 border-2 border-slate-300 text-slate-900  hover:text-slate-900 hover:bg-slate-50 text-sm sm:text-lg font-bold rounded-xl">
                  View My Experience
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}