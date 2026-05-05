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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const projects = [
  {
    title: "ShieldEras - Cybersecurity",
    description:
      "A fullstack featured e-commerce and online course management site with a custom CMS, payment integration, and a user-friendly interface. Built with performance and scalability in mind.",
    imageUrl:
      "/projects/shielderas.png",
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
    cardBg: "from-slate-800/30 to-slate-800/10",
  },
  {
    title: "Brainy Quiz",
    description:
      "A complete fullstack web app that helps Advanced and Ordinary level students to take past CGCE questions, answer quizzes, and test their IQ level.",
    imageUrl:
      "/projects/brainy-qiz.png",
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
    cardBg: "from-slate-800/25 to-slate-800/5",
  },
  {
    title: "TiC Portal Platform",
    description:
      "An advanced backend course management and internship management platform that helps students and others to manage internships online, enroll in courses with progress tracking, attendance records, and more.",
    imageUrl:
      "/projects/tic-portal.png",
    tags: ["MongoDB", "TypeScript", "Express.js", "Node.js", "Render"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2025",
    category: "Backend",
    cardBg: "from-slate-800/20 to-slate-800/5",
  },
  {
    title: "CyberLab",
    description:
      "A platform that enables users to take cyber challenges and complete them, join forums and discuss under particular topics, chat with mentors, and more.",
    imageUrl:
      "/projects/cyberlab.png",
    tags: ["React", "Vite", "Tailwind CSS", "Vercel", "TypeScript"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2025",
    category: "Web",
    cardBg: "from-slate-800/35 to-slate-800/10",
  },
  {
    title: "Resume Builder",
    description:
      "A SaaS platform that helps users build their resumes with different templates and an AI analyzer for optimization and improvement suggestions.",
    imageUrl:
      "/projects/resumatic.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Genkit"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2025",
    category: "Frontend",
    cardBg: "from-slate-800/15 to-slate-800/5",
  },
  {
    title: "Smart Land Registry",
    description:
      "A platform that helps communities settle and manage land disputes by registering land, selling and buying lands, uploading land ownership documents, and more.",
    imageUrl:
      "/projects/smartlandregistry.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2025",
    category: "Web",
    cardBg: "from-slate-800/25 to-slate-800/8",
  },
  {
    title: "Modern Design & Construction Enterprise",
    description:
      "A platform that helps Modern Design and Construction Enterprise advertise their products and services online to gain market reach and client engagement.",
    imageUrl:
      "/projects/moderndesign.png",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2025",
    category: "Web",
    cardBg: "from-slate-800/30 to-slate-800/5",
  },
  {
    title: "Mbinglo Football",
    description:
      "A platform that helps Mbinglo FC advertise and interact with fans, featuring past matches, upcoming matches, latest blog posts, chat section, and more.",
    imageUrl:
      "/projects/mbinglofc.png",
    tags: ["React", "Tailwind CSS", "Vite", "Node.js", "Render", "Vercel"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2025",
    category: "Full Stack",
    cardBg: "from-slate-800/20 to-slate-800/8",
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

// Dark gradient with high opacity
const cardBgVariants = [
  "bg-gradient-to-br from-slate-900/95 to-slate-900/85",
  "bg-gradient-to-br from-slate-900/90 to-slate-900/80",
  "bg-gradient-to-br from-slate-900/100 to-slate-900/90",
  "bg-gradient-to-br from-slate-900/85 to-slate-900/75",
  "bg-gradient-to-br from-slate-900/95 to-slate-900/85",
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Featured") return project.featured;
    return project.category === activeCategory;
  });

  const allTechnologies = [...new Set(projects.flatMap((p) => p.tags))];
  const featuredCount = projects.filter((p) => p.featured).length;

  return (
    <div className="min-h-screen bg-[#111D3A] relative overflow-hidden">
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(64,224,208,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(64,224,208,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Glow orbs */}
      <div className="absolute top-[-80px] right-[-60px] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-[10px] font-semibold tracking-wide text-teal-400 uppercase">
              Portfolio Showcase
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Projects
            </span>
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            A curated selection of projects showcasing my technical skills and
            creative solutions
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 sm:mb-10 max-w-3xl mx-auto">
          <div className="text-center p-3 rounded-xl bg-slate-800/20 border border-slate-700/30 backdrop-blur-sm">
            <div className="text-xl font-bold text-white">
              {projects.length}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              Total Projects
            </div>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-800/20 border border-slate-700/30 backdrop-blur-sm">
            <div className="text-xl font-bold text-white">{featuredCount}</div>
            <div className="text-[10px] text-slate-400 font-medium">
              Featured
            </div>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-800/20 border border-slate-700/30 backdrop-blur-sm">
            <div className="text-xl font-bold text-white">
              {allTechnologies.length}+
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              Technologies
            </div>
          </div>
          <div className="text-center p-3 rounded-xl bg-slate-800/20 border border-slate-700/30 backdrop-blur-sm">
            <div className="text-xl font-bold text-white">100%</div>
            <div className="text-[10px] text-slate-400 font-medium">
              Satisfaction
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25"
                  : "bg-slate-800/30 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.title}
              className={`group bg-gradient-to-br ${cardBgVariants[index % cardBgVariants.length]} border border-slate-700/30 transition-all duration-300 hover:border-teal-500/40 hover:shadow-2xl hover:shadow-teal-900/20 hover:-translate-y-1 overflow-hidden rounded-xl backdrop-blur-sm`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Section */}
              <CardHeader className="p-0 relative">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-white text-[10px] px-2 py-0.5 font-semibold">
                        <Star className="h-2 w-2 mr-1 fill-current" />
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <Badge
                      variant="outline"
                      className="bg-black/50 backdrop-blur-sm border-white/20 text-white text-[10px] px-2 py-0.5 font-medium"
                    >
                      {project.category}
                    </Badge>
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-teal-900/80 backdrop-blur-sm flex items-center justify-center gap-3 transition-all duration-300 ${
                      hoveredCard === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Link href={project.liveUrl} target="_blank">
                      <button className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-semibold hover:bg-slate-100 transition-all transform hover:scale-105">
                        <Eye className="h-3.5 w-3.5 inline mr-1" />
                        Preview
                      </button>
                    </Link>
                    <Link href={project.repoUrl} target="_blank">
                      <button className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-all transform hover:scale-105">
                        <Github className="h-3.5 w-3.5 inline mr-1" />
                        Code
                      </button>
                    </Link>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4 flex flex-col">
                <CardTitle className="text-sm font-bold text-white mb-2 group-hover:text-teal-400 transition-colors line-clamp-1">
                  {project.title}
                </CardTitle>

                <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[9px] bg-slate-700/50 text-slate-300 px-2 py-0.5 font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 4 && (
                    <Badge
                      variant="secondary"
                      className="text-[9px] bg-slate-700/50 text-slate-300 px-2 py-0.5 font-medium"
                    >
                      +{project.tags.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto pt-3 border-t border-slate-700/30">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-xs h-8 font-semibold rounded-lg"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Live Demo
                    </Button>
                  </Link>
                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 text-xs h-8 font-medium rounded-lg"
                    >
                      <Github className="mr-1 h-3 w-3" />
                      Code
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-10">
          <Link href="/projects/all">
            <Button
              variant="link"
              className="text-teal-400 hover:text-teal-300 group text-sm font-semibold"
            >
              View All Projects
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-xl p-6 text-center">
            <h3 className="text-base font-bold text-white mb-2">
              Have a project in mind?
            </h3>
            <p className="text-sm text-slate-300 mb-4 max-w-md mx-auto">
              Let's collaborate and bring your ideas to life. I'm available for
              freelance work and partnerships.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-sm h-9 px-4 font-semibold rounded-lg">
                  Start a Project
                  <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/experience">
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 text-sm h-9 px-4 font-medium rounded-lg"
                >
                  View My Experience
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
