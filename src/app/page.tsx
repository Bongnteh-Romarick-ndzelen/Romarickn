"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Code,
  Server,
  Database,
  LayoutPanelLeft,
  Quote,
  Star,
  Mail,
  Download,
  Sparkles,
  ChevronRight,
  Calendar,
  Clock,
  BookOpen,
  Zap,
  Briefcase,
  Users,
  Heart,
  TrendingUp,
  Award,
} from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Nexus AI Platform",
    description:
      "Enterprise-grade AI analytics dashboard with real-time insights and predictive modeling.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    tags: ["React", "Next.js", "Tailwind CSS", "Python FastAPI"],
    liveLink: "#",
    githubLink: "#",
    featured: true,
  },
  {
    id: 2,
    title: "FlowCRM Suite",
    description:
      "Modern CRM solution with microservices architecture and real-time collaboration.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    tags: ["TypeScript", "Node.js", "GraphQL", "PostgreSQL"],
    liveLink: "#",
    githubLink: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Artivive Mobile",
    description:
      "Cross-platform art marketplace with AR preview and digital wallet integration.",
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop",
    tags: ["React Native", "GraphQL", "Stripe", "Redis"],
    liveLink: "#",
    githubLink: "#",
    featured: true,
  },
];

const skills = [
  {
    name: "Frontend",
    icon: <Code className="h-5 w-5" />,
    description: "React, Next.js, TypeScript, Tailwind",
    level: 95,
  },
  {
    name: "Backend",
    icon: <Server className="h-5 w-5" />,
    description: "Node.js, Python FastAPI, Django",
    level: 92,
  },
  {
    name: "Database",
    icon: <Database className="h-5 w-5" />,
    description: "PostgreSQL, MongoDB, Redis",
    level: 88,
  },
  {
    name: "Cloud & DevOps",
    icon: <LayoutPanelLeft className="h-5 w-5" />,
    description: "AWS, Docker, Kubernetes, CI/CD",
    level: 85,
  },
];

const testimonials = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "CTO at TechVantage",
    content:
      "Bongnteh delivered exceptional work on our AI platform. His technical expertise and problem-solving skills are world-class.",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=7c3aed",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Product Director at InnovateLabs",
    content:
      "One of the most talented full-stack developers I've worked with. His code is clean, scalable, and he communicates complex ideas with clarity.",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=7c3aed",
    rating: 5,
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Lead Architect at ScaleFlow",
    content:
      "Bongnteh's architecture decisions saved us months of development time. His deep understanding of modern web technologies is impressive.",
    avatar:
      "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=7c3aed",
    rating: 5,
  },
];

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with Next.js 14",
    excerpt:
      "Learn how to leverage server components, parallel routes, and advanced patterns for enterprise-grade applications.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    category: "Web Development",
    readTime: "8 min read",
    date: "Jan 15, 2024",
    author: "Bongnteh Romarick",
    tags: ["Next.js", "React", "TypeScript"],
    slug: "scalable-react-apps-nextjs-14",
  },
  {
    id: 2,
    title: "The Future of Web Performance: Core Web Vitals Deep Dive",
    excerpt:
      "Master Core Web Vitals optimization techniques that actually improve user experience and SEO rankings.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Performance",
    readTime: "10 min read",
    date: "Jan 10, 2024",
    author: "Bongnteh Romarick",
    tags: ["Performance", "SEO", "Web Vitals"],
    slug: "future-web-performance-core-web-vitals",
  },
  {
    id: 3,
    title: "Modern State Management in React 2024",
    excerpt:
      "Comparing Zustand, Jotai, Redux Toolkit, and when to use each for optimal developer experience.",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    category: "React",
    readTime: "7 min read",
    date: "Jan 5, 2024",
    author: "Bongnteh Romarick",
    tags: ["React", "State Management", "Zustand"],
    slug: "state-management-modern-react-apps",
  },
  {
    id: 4,
    title: "TypeScript Mastery for Enterprise Applications",
    excerpt:
      "Advanced TypeScript patterns, generics, and utility types that transform your codebase quality.",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    category: "TypeScript",
    readTime: "9 min read",
    date: "Dec 28, 2023",
    author: "Bongnteh Romarick",
    tags: ["TypeScript", "Best Practices", "Enterprise"],
    slug: "typescript-best-practices-enterprise",
  },
];

const stats = [
  { label: "Years Experience", value: "5+", icon: Briefcase },
  { label: "Projects Completed", value: "50+", icon: Code },
  { label: "Happy Clients", value: "40+", icon: Users },
  { label: "Tech Articles", value: "25+", icon: BookOpen },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 md:pt-28 pb-16 px-4 md:px-6">
        <div className="absolute top-20 -left-32 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 -right-32 w-72 h-72 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-purple-500/10 rounded-full border border-purple-500/30">
                <Zap className="h-3.5 w-3.5 text-yellow-400" />
                <span className="text-xs font-medium text-purple-300">
                  Full-Stack Architect & Innovator
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                Bongnteh
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Romarick
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Building{" "}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  high-performance
                </span>{" "}
                web applications that scale and inspire.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/projects">
                  <Button
                    size="default"
                    className="w-full sm:w-auto text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25"
                  >
                    Explore My Work
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="default"
                    className="w-full sm:w-auto text-sm border-slate-600 text-white hover:bg-slate-800 hover:border-purple-500"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Avatar */}
            <div className="relative flex justify-center items-center order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition duration-500"></div>
                <Avatar className="h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 border-4 border-slate-800 shadow-2xl relative">
                  <AvatarImage
                    src="/romarick.jpeg"
                    alt="Bongnteh Romarick"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl">
                    BRN
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 shadow-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 md:px-6 border-y border-slate-800/50 bg-slate-900/20">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="inline-flex p-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 mb-2 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-0.5">
                    {stat.value}
                  </h3>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-purple-500/10 text-purple-400 border-purple-500/30 px-3 py-0.5 text-xs">
              Technical Expertise
            </Badge>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              Mastery Across the
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Full Stack
              </span>
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Specialized in modern technologies that deliver exceptional
              results
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="group relative p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20 hover:-translate-y-1"
              >
                <div className="text-purple-400 mb-2 p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 inline-block">
                  {skill.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-1">
                  {skill.name}
                </h3>
                <p className="text-slate-400 text-xs mb-3">
                  {skill.description}
                </p>
                <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="text-right text-[10px] text-slate-500 mt-1">
                  {skill.level}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-16 px-4 md:px-6 bg-slate-900/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-purple-500/10 text-purple-400 border-purple-500/30 px-3 py-0.5 text-xs">
              Featured Work
            </Badge>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              Projects That Make an Impact
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Real-world solutions that solve complex problems
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="group flex flex-col overflow-hidden bg-slate-800/40 border border-slate-700/50 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-900/20 hover:-translate-y-1 rounded-xl"
              >
                <CardHeader className="p-0 relative">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white text-[10px] px-2 py-0.5">
                        Featured
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-base font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </CardTitle>
                  <p className="text-slate-400 text-xs mb-3 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] bg-slate-700/60 text-slate-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                  <Link href={project.liveLink} passHref className="flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs border-slate-600 hover:border-purple-500 hover:bg-purple-500/10 h-8"
                    >
                      <ExternalLink className="mr-1 h-3 w-3" />
                      Live Demo
                    </Button>
                  </Link>
                  <Link href={project.githubLink} passHref className="flex-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-xs text-slate-300 hover:text-white hover:bg-slate-800 h-8"
                    >
                      <Github className="mr-1 h-3 w-3" />
                      Source
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/projects">
              <Button
                variant="link"
                className="text-sm text-purple-400 hover:text-purple-300 group"
              >
                View All Projects
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-purple-500/10 text-purple-400 border-purple-500/30 px-3 py-0.5 text-xs">
              Latest Insights
            </Badge>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              From the Blog
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Thoughts, tutorials, and deep dives into modern web development
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="group flex flex-col overflow-hidden bg-slate-800/40 border border-slate-700/50 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-900/20 hover:-translate-y-1 rounded-xl"
              >
                <CardHeader className="p-0 relative">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-purple-600/90 text-white text-[10px] px-2 py-0.5">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-2">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
                    {post.title}
                  </CardTitle>
                  <p className="text-slate-400 text-xs line-clamp-2 mb-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[9px] border-purple-500/30 text-purple-300 bg-purple-500/5 px-1.5 py-0"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Link href={`/blog/${post.slug}`} className="w-full">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 text-xs h-8"
                    >
                      Read Article
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/blog">
              <Button
                variant="link"
                className="text-sm text-purple-400 hover:text-purple-300 group"
              >
                View All Articles
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 md:px-6 bg-slate-900/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-10">
            <Badge className="mb-3 bg-purple-500/10 text-purple-400 border-purple-500/30 px-3 py-0.5 text-xs">
              Testimonials
            </Badge>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
              What People Say
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              Building lasting relationships through exceptional work
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/50 transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-900/10 group"
              >
                <Quote className="h-6 w-6 text-purple-500/30 mb-3 group-hover:scale-110 transition-transform" />
                <div className="flex gap-0.5 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-slate-300 text-xs italic mb-4 leading-relaxed line-clamp-4">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-2 pt-3 border-t border-slate-700/50">
                  <Avatar className="h-8 w-8 border border-purple-500/30">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                      {testimonial.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-white text-xs">
                      {testimonial.name}
                    </h4>
                    <p className="text-slate-400 text-[10px]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <Heart className="h-8 w-8 text-pink-500 mx-auto mb-4 animate-pulse" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
            Let's Create Something
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Extraordinary Together
            </span>
          </h2>
          <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto">
            Have a project in mind? I'm just a message away. Let's turn your
            vision into reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button
                size="default"
                className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25"
              >
                <Mail className="mr-2 h-4 w-4" />
                Start a Conversation
              </Button>
            </Link>
            <Link href="/experience">
              <Button
                variant="outline"
                size="default"
                className="text-sm border-slate-600 text-white hover:bg-slate-800 hover:border-purple-500"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
