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
  ArrowUpRight,
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
  },
];

const skills = [
  {
    name: "Frontend",
    icon: <Code className="h-4 w-4" />,
    description: "React, Next.js, TypeScript, Tailwind",
    level: 95,
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Backend",
    icon: <Server className="h-4 w-4" />,
    description: "Node.js, Python FastAPI, Django",
    level: 92,
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "Database",
    icon: <Database className="h-4 w-4" />,
    description: "PostgreSQL, MongoDB, Redis",
    level: 88,
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "Cloud & DevOps",
    icon: <LayoutPanelLeft className="h-4 w-4" />,
    description: "AWS, Docker, Kubernetes, CI/CD",
    level: 85,
    color: "from-orange-500 to-amber-600",
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
      "Learn how to leverage server components, parallel routes, and advanced patterns.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    category: "Web Dev",
    readTime: "8 min",
    date: "Jan 15, 2024",
    tags: ["Next.js", "React"],
    slug: "scalable-react-apps-nextjs-14",
  },
  {
    id: 2,
    title: "The Future of Web Performance: Core Web Vitals Deep Dive",
    excerpt:
      "Master Core Web Vitals optimization techniques that improve UX and SEO.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    category: "Performance",
    readTime: "10 min",
    date: "Jan 10, 2024",
    tags: ["Performance", "SEO"],
    slug: "future-web-performance-core-web-vitals",
  },
  {
    id: 3,
    title: "Modern State Management in React 2024",
    excerpt: "Comparing Zustand, Jotai, Redux Toolkit, and when to use each.",
    imageUrl:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    category: "React",
    readTime: "7 min",
    date: "Jan 5, 2024",
    tags: ["React", "Zustand"],
    slug: "state-management-modern-react-apps",
  },
  {
    id: 4,
    title: "TypeScript Mastery for Enterprise Applications",
    excerpt:
      "Advanced TypeScript patterns, generics, and utility types that transform your codebase.",
    imageUrl:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    category: "TypeScript",
    readTime: "9 min",
    date: "Dec 28, 2023",
    tags: ["TypeScript", "Enterprise"],
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
    <div className="min-h-screen bg-[#080b12] overflow-x-hidden font-sans">
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          {/* Mobile Avatar - Show on mobile only */}
          <div className="flex justify-center mb-8 lg:hidden">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/20 to-indigo-600/10 rounded-full blur-2xl" />
              <div className="relative w-32 h-32 rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl">
                <Avatar className="w-full h-full rounded-none">
                  <AvatarImage
                    src="/romarick.jpeg"
                    alt="Bongnteh Romarick"
                    className="object-cover w-full h-full"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white text-2xl font-black rounded-none">
                    BRN
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute -bottom-2 -right-2 p-2 bg-violet-600 rounded-xl shadow-lg">
                <Sparkles className="h-3.5 w-3.5 text-white" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
            {/* Text */}
            <div className="space-y-6 text-center lg:text-left">
              {/* Status pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-[11px] font-medium text-violet-300 tracking-wide mx-auto lg:mx-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for new projects
              </div>

              {/* Name */}
              <div>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase mb-2">
                  Full-Stack Developer & Architect
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05]">
                  <span className="text-white">Bongnteh</span>
                  <br />
                  <span
                    className="text-transparent bg-clip-text"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #c084fc 100%)",
                    }}
                  >
                    Romarick
                  </span>
                </h1>
              </div>

              <p className="text-sm text-slate-400 max-w-lg leading-relaxed mx-auto lg:mx-0">
                Building high-performance, scalable web applications that
                combine technical excellence with thoughtful user experiences.
                Based in Cameroon — working worldwide.
              </p>

              {/* Tech chips */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {[
                  "React",
                  "Next.js",
                  "Node.js",
                  "TypeScript",
                  "AWS",
                  "PostgreSQL",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-[10px] font-medium text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-1 justify-center lg:justify-start">
                <Link href="/projects">
                  <Button
                    size="sm"
                    className="text-xs h-9 px-5 bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/40 border-0 rounded-lg font-semibold"
                  >
                    View My Work
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs h-9 px-5 border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 rounded-lg font-semibold bg-transparent"
                  >
                    <Mail className="mr-1.5 h-3.5 w-3.5" />
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>

            {/* Desktop Avatar card - Hidden on mobile */}
            <div className="hidden lg:flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/20 to-indigo-600/10 rounded-full blur-2xl" />
                <div className="relative w-56 h-56 rounded-2xl overflow-hidden border border-slate-700/60 shadow-2xl">
                  <Avatar className="w-full h-full rounded-none">
                    <AvatarImage
                      src="/romarick.jpeg"
                      alt="Bongnteh Romarick"
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white text-2xl font-black rounded-none">
                      BRN
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="absolute -bottom-2 -right-2 p-2 bg-violet-600 rounded-xl shadow-lg">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-2 w-56">
                {[
                  { v: "5+", l: "Yrs Exp" },
                  { v: "50+", l: "Projects" },
                  { v: "40+", l: "Clients" },
                  { v: "25+", l: "Articles" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-2.5 text-center"
                  >
                    <p className="text-base font-black text-white leading-none">
                      {s.v}
                    </p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-violet-400" />
          <p className="text-[9px] text-slate-500 tracking-widest uppercase">
            Scroll
          </p>
        </div>
      </section>

      {/* ── STATS (mobile only) ───────────────────────── */}
      <section className="lg:hidden py-8 px-4 border-y border-slate-800/60 bg-slate-900/20">
        <div className="grid grid-cols-4 gap-2 max-w-7xl mx-auto">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="text-center">
                <p className="text-lg font-black text-white">{s.value}</p>
                <p className="text-[9px] text-slate-500 mt-0.5">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <div className="w-8 h-px bg-violet-500" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-violet-400 uppercase">
              Technical Expertise
            </span>
          </div>

          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-3">
                Full-Stack Mastery
                <br />
                <span className="text-slate-500 font-light text-xl">
                  across the entire spectrum
                </span>
              </h2>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Specialized in modern technologies that deliver measurable
                results — from pixel-perfect frontends to robust cloud
                infrastructure.
              </p>
            </div>

            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name} className="group">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-1.5 rounded-lg bg-gradient-to-br ${skill.color} bg-opacity-10`}
                      >
                        <div className="text-white">{skill.icon}</div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">
                          {skill.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-500`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/20 border-y border-slate-800/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 sm:mb-10 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-violet-500" />
              <span className="text-[10px] font-bold tracking-[0.25em] text-violet-400 uppercase">
                Featured Work
              </span>
            </div>
            <Link href="/projects">
              <button className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-violet-300 transition-colors font-medium">
                All projects <ArrowUpRight className="h-3 w-3" />
              </button>
            </Link>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
            Projects That
            <span
              className="text-transparent bg-clip-text ml-2"
              style={{
                backgroundImage: "linear-gradient(135deg, #a78bfa, #818cf8)",
              }}
            >
              Matter
            </span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/60 bg-slate-900/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-violet-900/10 hover:-translate-y-0.5"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-3 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/60 text-[9px] font-medium text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-slate-800/60">
                    <Link href={project.liveLink} className="flex-1">
                      <button className="w-full flex items-center justify-center gap-1 text-[10px] font-semibold text-violet-300 hover:text-violet-200 py-1.5 rounded-lg border border-violet-500/20 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all">
                        <ExternalLink className="h-3 w-3" />
                        Live Demo
                      </button>
                    </Link>
                    <Link href={project.githubLink} className="flex-1">
                      <button className="w-full flex items-center justify-center gap-1 text-[10px] font-semibold text-slate-400 hover:text-slate-200 py-1.5 rounded-lg border border-slate-700/40 hover:border-slate-600 hover:bg-slate-800/60 transition-all">
                        <Github className="h-3 w-3" />
                        Source
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ─────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 sm:mb-10 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-violet-500" />
              <span className="text-[10px] font-bold tracking-[0.25em] text-violet-400 uppercase">
                Latest Insights
              </span>
            </div>
            <Link href="/blog">
              <button className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-violet-300 transition-colors font-medium">
                All articles <ArrowUpRight className="h-3 w-3" />
              </button>
            </Link>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
            From the Blog
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="group flex flex-col h-full rounded-2xl border border-slate-800/60 bg-slate-900/40 hover:border-violet-500/30 hover:bg-slate-900/70 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-violet-600/90 text-[9px] font-semibold text-white">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-3.5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[9px] text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-2.5 w-2.5" /> {post.date}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-white mb-1.5 line-clamp-2 group-hover:text-violet-300 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700/50 text-[8px] text-slate-400 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1 mt-3 pt-2.5 border-t border-slate-800/60 text-[10px] font-semibold text-violet-400 group-hover:text-violet-300">
                      Read more{" "}
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/20 border-y border-slate-800/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <div className="w-8 h-px bg-violet-500" />
            <span className="text-[10px] font-bold tracking-[0.25em] text-violet-400 uppercase">
              Client Feedback
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
            What People Say
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="group relative p-5 rounded-2xl border border-slate-800/60 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70 transition-all duration-300"
              >
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                  "{t.content}"
                </p>

                <div className="flex items-center gap-2.5 pt-3 border-t border-slate-800/60">
                  <Avatar className="h-7 w-7 border border-slate-700">
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback className="bg-gradient-to-br from-violet-600 to-indigo-700 text-white text-[10px]">
                      {t.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-[11px] font-semibold text-white">
                      {t.name}
                    </p>
                    <p className="text-[9px] text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-violet-600/8 rounded-full blur-[80px]" />
        </div>
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#a78bfa 1px, transparent 1px), linear-gradient(90deg, #a78bfa 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 mb-5">
            <Heart className="h-5 w-5 text-pink-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
            Let's Build Something
            <span
              className="block text-transparent bg-clip-text mt-1"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #c084fc 100%)",
              }}
            >
              Extraordinary
            </span>
          </h2>

          <p className="text-xs text-slate-400 mb-8 max-w-sm mx-auto leading-relaxed">
            Have a project in mind? I'm available for freelance, contracts, and
            full-time remote roles. Let's turn your vision into reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button
                size="sm"
                className="h-9 px-6 text-xs bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/40 border-0 rounded-lg font-semibold"
              >
                <Mail className="mr-1.5 h-3.5 w-3.5" />
                Start a Conversation
              </Button>
            </Link>
            <Link href="/experience">
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-6 text-xs border-slate-700 text-slate-300 hover:bg-slate-800 hover:border-slate-600 rounded-lg font-semibold bg-transparent"
              >
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Download Resume
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
