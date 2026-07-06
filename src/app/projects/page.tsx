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
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.3 }
  }
};

const statCardHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.3 }
  }
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header Section with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50/80 border-2 border-blue-200 backdrop-blur-sm mb-4">
            <Sparkles className="h-5 w-5 text-blue-500" />
            <span className="text-base font-black text-blue-700 uppercase tracking-wide">
              Portfolio Showcase
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 tracking-tight">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Projects
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-bold mt-4">
            A curated selection of projects showcasing my technical skills and
            creative solutions
          </p>
        </motion.div>

        {/* Stats Row with Animation */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10 max-w-5xl mx-auto"
        >
          {[
            { value: projects.length, label: "Total Projects", icon: Code2 },
            { value: featuredCount, label: "Featured", icon: Star },
            { value: `${allTechnologies.length}+`, label: "Technologies", icon: Rocket },
            { value: "100%", label: "Satisfaction", icon: Users },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.div
                  variants={statCardHover}
                  className="bg-white border-2 border-slate-200/80 rounded-2xl p-5 text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300"
                >
                  <div className="inline-flex p-3 rounded-xl bg-blue-50 text-blue-600 mb-2">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-4xl font-black text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-base font-bold text-slate-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Category Filters with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2.5 mb-10"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-xl text-base font-bold transition-all duration-200 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25"
                  : "bg-white border-2 border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid with Animation */}
        <motion.div
          ref={ref2}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={fadeInUp}
              whileHover="hover"
              initial="rest"
              animate="rest"
            >
              <motion.div
                variants={cardHover}
                className="group bg-white border-2 border-slate-200/80 transition-all duration-300 hover:border-blue-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden rounded-2xl"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image Section */}
                <CardHeader className="p-0 relative">
                  <div className="relative aspect-video overflow-hidden bg-slate-100">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 left-3 z-10">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 border-0 text-white text-sm font-black px-4 py-1.5 rounded-xl shadow-lg">
                          <Star className="h-4 w-4 mr-1.5 fill-current" />
                          Featured
                        </Badge>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3 z-10">
                      <Badge
                        variant="outline"
                        className="bg-white/90 backdrop-blur-sm border-2 border-white/30 text-slate-800 text-sm font-bold px-4 py-1.5 rounded-xl shadow-sm"
                      >
                        {project.category}
                      </Badge>
                    </div>

                    {/* Hover Overlay */}
                    <div
                      className={`absolute inset-0 bg-blue-600/90 backdrop-blur-sm flex items-center justify-center gap-5 transition-all duration-300 ${
                        hoveredCard === index ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Link href={project.liveUrl} target="_blank">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          className="px-6 py-3 rounded-xl bg-white text-slate-900 text-base font-bold hover:bg-slate-100 transition-all shadow-lg"
                        >
                          <Eye className="h-5 w-5 inline mr-2" />
                          Preview
                        </motion.button>
                      </Link>
                      <Link href={project.repoUrl} target="_blank">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          className="px-6 py-3 rounded-xl bg-slate-900 text-white text-base font-bold hover:bg-slate-800 transition-all shadow-lg"
                        >
                          <Github className="h-5 w-5 inline mr-2" />
                          Code
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 flex flex-col">
                  <CardTitle className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {project.title}
                  </CardTitle>

                  <p className="text-base text-slate-600 font-bold mb-3 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-sm font-bold bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-xl border-2 border-slate-200"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 4 && (
                      <Badge
                        variant="secondary"
                        className="text-sm font-bold bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-xl border-2 border-slate-200"
                      >
                        +{project.tags.length - 4}
                      </Badge>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto pt-4 border-t-2 border-slate-100">
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-bold h-11 rounded-xl shadow-lg shadow-blue-600/20 transition-all"
                      >
                        <ExternalLink className="mr-2 h-5 w-5" />
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
                        className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 text-base font-bold h-11 rounded-xl transition-all"
                      >
                        <Github className="mr-2 h-5 w-5" />
                        Code
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link with Animation
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/projects/all">
            <Button
              variant="link"
              className="text-blue-600 hover:text-blue-700 group text-lg font-bold"
            >
              View All Projects
              <ArrowRight className="ml-2 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div> */}

        {/* CTA Section with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/60 rounded-2xl p-10 text-center shadow-sm">
            <h3 className="text-3xl font-bold text-slate-900 mb-3">
              Have a project in mind?
            </h3>
            <p className="text-lg text-slate-600 font-bold mb-6 max-w-md mx-auto">
              Let's collaborate and bring your ideas to life. I'm available for
              freelance work and partnerships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all"
                >
                  Start a Project
                  <ArrowRight className="ml-2 h-5 w-5 inline" />
                </motion.button>
              </Link>
              <Link href="/experience">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4.5 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 text-lg font-bold rounded-xl transition-all"
                >
                  View My Experience
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}