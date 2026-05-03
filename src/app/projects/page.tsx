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
    title: "Nexus AI Platform",
    description:
      "Enterprise-grade AI analytics dashboard with real-time insights and predictive modeling. Processed over 1M requests daily with 99.9% uptime.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Python FastAPI",
      "PostgreSQL",
    ],
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
    year: "2024",
  },
  {
    title: "FlowCRM Suite",
    description:
      "Modern CRM solution with microservices architecture and real-time collaboration. Used by 500+ businesses worldwide.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["React", "Node.js", "GraphQL", "PostgreSQL", "Redis"],
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
    year: "2023",
  },
  {
    title: "Artivive Mobile",
    description:
      "Cross-platform art marketplace with AR preview and digital wallet integration. 100K+ downloads on App Store and Google Play.",
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop",
    tags: ["React Native", "GraphQL", "Stripe", "Redis", "AWS"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2024",
  },
  {
    title: "CloudScale DevOps",
    description:
      "Infrastructure automation platform with CI/CD pipelines and monitoring. Achieved 99.99% uptime for all client applications.",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    tags: ["Docker", "Kubernetes", "AWS", "Terraform", "GitHub Actions"],
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
    year: "2023",
  },
  {
    title: "EcoTrack Dashboard",
    description:
      "Sustainability tracking platform for businesses to monitor and reduce their carbon footprint with actionable insights.",
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
    tags: ["Next.js", "TypeScript", "Prisma", "Chart.js", "Tailwind"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2024",
  },
  {
    title: "FinFlow Banking",
    description:
      "Modern banking dashboard with real-time transactions, analytics, and secure authentication.",
    imageUrl:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop",
    tags: ["React", "Express", "MongoDB", "JWT", "WebSocket"],
    liveUrl: "#",
    repoUrl: "#",
    featured: false,
    year: "2023",
  },
];

const categories = ["All", "Featured", "Full Stack", "Mobile", "DevOps"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Featured") return project.featured;
    return false;
  });

  return (
    <div
      className="min-h-screen bg-[#080b12]"
      style={{
        fontFamily:
          "'Noto Sans', 'Roboto', system-ui, -apple-system, sans-serif",
      }}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
            <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-400" />
            <span className="text-[10px] sm:text-xs font-medium text-purple-300">
              Portfolio Showcase
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-white mb-3">
            My{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            A curated selection of projects showcasing my technical skills and
            creative solutions
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10 max-w-3xl mx-auto">
          <div className="text-center p-2 sm:p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
            <div className="text-base sm:text-xl font-black text-white">
              {projects.length}
            </div>
            <div className="text-[8px] sm:text-[10px] text-slate-400 font-medium">
              Total Projects
            </div>
          </div>
          <div className="text-center p-2 sm:p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
            <div className="text-base sm:text-xl font-black text-white">
              {projects.filter((p) => p.featured).length}
            </div>
            <div className="text-[8px] sm:text-[10px] text-slate-400 font-medium">
              Featured
            </div>
          </div>
          <div className="text-center p-2 sm:p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
            <div className="text-base sm:text-xl font-black text-white">
              12+
            </div>
            <div className="text-[8px] sm:text-[10px] text-slate-400 font-medium">
              Technologies
            </div>
          </div>
          <div className="text-center p-2 sm:p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
            <div className="text-base sm:text-xl font-black text-white">
              100%
            </div>
            <div className="text-[8px] sm:text-[10px] text-slate-400 font-medium">
              Satisfaction
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-8 sm:mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-xs font-semibold transition-all duration-200 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25"
                  : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.title}
              className="group bg-slate-800/30 border border-slate-700/50 transition-all duration-300 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-900/20 hover:-translate-y-1 overflow-hidden rounded-xl"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Section with Overlay */}
              <CardHeader className="p-0 relative">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-3 left-3 z-10">
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-white text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 font-semibold">
                        <Star className="h-2 w-2 sm:h-2.5 sm:w-2.5 mr-1 fill-current" />
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Year Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <Badge
                      variant="outline"
                      className="bg-black/50 backdrop-blur-sm border-white/20 text-white text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 font-medium"
                    >
                      {project.year}
                    </Badge>
                  </div>

                  {/* Hover Overlay with Quick Actions */}
                  <div
                    className={`absolute inset-0 bg-purple-900/80 backdrop-blur-sm flex items-center justify-center gap-3 transition-all duration-300 ${
                      hoveredCard === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white text-slate-900 text-[10px] sm:text-xs font-semibold hover:bg-slate-100 transition-all transform hover:scale-105">
                        <Eye className="h-3 w-3 sm:h-3.5 sm:w-3.5 inline mr-1" />
                        Preview
                      </button>
                    </Link>
                    <Link
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-slate-800 text-white text-[10px] sm:text-xs font-semibold hover:bg-slate-700 transition-all transform hover:scale-105">
                        <Github className="h-3 w-3 sm:h-3.5 sm:w-3.5 inline mr-1" />
                        Code
                      </button>
                    </Link>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-3 sm:p-4 flex-grow flex flex-col">
                <CardTitle className="text-xs sm:text-sm md:text-base font-bold text-white mb-1.5 sm:mb-2 group-hover:text-purple-300 transition-colors line-clamp-1">
                  {project.title}
                </CardTitle>

                <p className="text-[10px] sm:text-xs text-slate-400 mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[8px] sm:text-[9px] bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors px-1.5 sm:px-2 py-0 font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 4 && (
                    <Badge
                      variant="secondary"
                      className="text-[8px] sm:text-[9px] bg-slate-700/50 text-slate-300 px-1.5 sm:px-2 py-0 font-medium"
                    >
                      +{project.tags.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-auto pt-2 sm:pt-3 border-t border-slate-700/50">
                  <Link
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      variant="default"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-[10px] sm:text-xs h-7 sm:h-8 font-semibold"
                    >
                      <ExternalLink className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      Live Demo
                    </Button>
                  </Link>
                  <Link
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 text-[10px] sm:text-xs h-7 sm:h-8 font-medium"
                    >
                      <Github className="mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      Source
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8 sm:mt-10">
          <Link href="/projects/all">
            <Button
              variant="link"
              className="text-purple-400 hover:text-purple-300 group text-xs sm:text-sm font-semibold"
            >
              View All Projects
              <ArrowRight className="ml-1.5 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="mt-10 sm:mt-12">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 p-4 sm:p-6 text-center">
            <div className="relative z-10">
              <h3 className="text-sm sm:text-base font-bold text-white mb-2">
                Have a project in mind?
              </h3>
              <p className="text-[11px] sm:text-sm text-slate-300 mb-3 sm:mb-4 max-w-md mx-auto">
                Let's collaborate and bring your ideas to life. I'm available
                for freelance work and partnerships.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4 font-semibold">
                    Start a Project
                    <ArrowRight className="ml-1.5 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </Link>
                <Link href="/experience">
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4 font-medium"
                  >
                    View My Experience
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
