"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "ShieldEras — Cybersecurity",
    description:
      "Fullstack e-commerce and course platform with custom CMS, payment integration, and advanced security features.",
    emoji: "🛡️",
    imageUrl: "/projects/shielderas.png",
    imgBg: "linear-gradient(135deg, #0D1F2D, #0F2720)",
    tags: ["Next.js", "TypeScript", "Stripe"],
    featured: true,
  },
  {
    id: 2,
    title: "Brainy Quiz",
    description:
      "Educational platform for CGCE exam preparation with quizzes, IQ tests, and performance analytics.",
    emoji: "🧠",
    imageUrl: "/projects/Brainy-quiz.png",
    imgBg: "linear-gradient(135deg, #0D1627, #1A1040)",
    tags: ["Firebase", "Genkit", "Node.js"],
    featured: false,
  },
  {
    id: 3,
    title: "TiC Portal Platform",
    description:
      "Enterprise-grade course and internship management system with real-time analytics.",
    emoji: "📊",
    imageUrl: "/projects/tic-portal.png",
    imgBg: "linear-gradient(135deg, #0A1A2E, #0D2040)",
    tags: ["MongoDB", "Express", "Node.js"],
    featured: true,
  },
];

const skills = [
  {
    name: "Frontend Development",
    icon: "💻",
    desc: "React, Next.js, TypeScript, Tailwind, Framer Motion",
    level: 95,
    barColor: "from-green-400 to-green-600",
    iconBg: "bg-green-500/10",
  },
  {
    name: "Backend Engineering",
    icon: "⚡",
    desc: "Node.js, Python, Django, Express.js, GraphQL",
    level: 92,
    barColor: "from-blue-400 to-blue-600",
    iconBg: "bg-blue-500/10",
  },
  {
    name: "Database Management",
    icon: "🗄️",
    desc: "PostgreSQL, MongoDB, Prisma, Redis",
    level: 88,
    barColor: "from-emerald-400 to-emerald-600",
    iconBg: "bg-emerald-500/10",
  },
  {
    name: "Cloud & DevOps",
    icon: "☁️",
    desc: "AWS, Docker, Vercel, Render, Cloudinary",
    level: 85,
    barColor: "from-orange-400 to-orange-600",
    iconBg: "bg-orange-500/10",
  },
];

const testimonials = [
  {
    id: 1,
    initials: "AJ",
    name: "Alex Johnson",
    role: "CTO at TechVantage",
    quote:
      "One of the most talented developers I've had the pleasure of working with. Attention to detail is exceptional.",
  },
  {
    id: 2,
    initials: "SW",
    name: "Sarah Williams",
    role: "Product Director, InnovateLabs",
    quote:
      "Delivered ahead of schedule with outstanding quality. Technical expertise and communication are top-notch.",
  },
  {
    id: 3,
    initials: "MC",
    name: "Michael Chen",
    role: "Lead Architect, ScaleFlow",
    quote:
      "A game-changer for our project. Architecture decisions were brilliant and code was exceptionally clean.",
  },
];

const blogPosts = [
  {
    id: 1,
    emoji: "⚛️",
    imgBg: "from-indigo-900/40 to-purple-900/40",
    category: "Web Dev",
    title: "Building Scalable React Apps with Next.js 14",
    date: "Jan 15",
    readTime: "8 min",
    slug: "scalable-react-apps-nextjs-14",
  },
  {
    id: 2,
    emoji: "🚀",
    imgBg: "from-blue-900/40 to-cyan-900/40",
    category: "Performance",
    title: "The Future of Web Performance",
    date: "Jan 10",
    readTime: "10 min",
    slug: "future-web-performance",
  },
  {
    id: 3,
    emoji: "🔄",
    imgBg: "from-purple-900/40 to-pink-900/40",
    category: "React",
    title: "Modern State Management in React",
    date: "Jan 5",
    readTime: "7 min",
    slug: "state-management-react",
  },
  {
    id: 4,
    emoji: "🔷",
    imgBg: "from-cyan-900/40 to-blue-900/40",
    category: "TypeScript",
    title: "TypeScript Mastery for Enterprise",
    date: "Dec 28",
    readTime: "9 min",
    slug: "typescript-mastery",
  },
];

const stats = [
  { val: "5+", lbl: "Yrs Exp" },
  { val: "50+", lbl: "Projects" },
  { val: "40+", lbl: "Clients" },
  { val: "25+", lbl: "Articles" },
];

const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "AWS",
  "PostgreSQL",
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#111D3A] font-['DM_Sans',system-ui] overflow-x-hidden relative">
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 min-h-[90vh] flex flex-col justify-center">
        {/* Glow orbs */}
        <div className="absolute top-[-80px] right-[-60px] w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Desktop Layout - 50/50 split */}
        <div className="hidden md:flex md:flex-row md:justify-between md:items-center md:gap-12">
          {/* Left Column - 50% */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_#00FF88]" />
              <span className="text-xs font-medium text-green-400">
                Available for opportunities
              </span>
            </div>
            <p className="text-xs font-semibold tracking-[0.2em] text-green-500 uppercase mb-3">
              FULL-STACK DEVELOPER & ARCHITECT
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Bongnteh
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                Romarick
              </span>
            </h1>
            <p className="text-sm text-slate-400 mt-4 max-w-lg leading-relaxed">
              Building high-performance, scalable web applications that combine
              technical excellence with thoughtful user experiences. Based in
              Cameroon — working worldwide.
            </p>
            <div className="flex flex-wrap gap-2 mt-5">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg bg-green-500/5 border border-green-500/20 text-xs font-medium text-green-400"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <Link
                href="/projects"
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-green-500/25 transition-all"
              >
                View My Work →
              </Link>
              <Link
                href="/contact"
                className="px-6 py-2.5 border border-slate-700 text-slate-300 hover:bg-slate-800/50 rounded-lg text-sm font-medium transition-all"
              >
                ✉ Get In Touch
              </Link>
            </div>
          </div>

          {/* Right Column - 50% */}
          <div className="flex-1 flex flex-col items-center gap-5">
            {/* Avatar */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-2xl opacity-40" />
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-r from-green-500 to-blue-500 p-1">
                <Image
                  src="/romarick.jpeg"
                  alt="Bongnteh Romarick"
                  width={200}
                  height={200}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-[260px]">
              {stats.map((s) => (
                <div
                  key={s.lbl}
                  className="bg-slate-800/50 border border-green-500/10 rounded-xl p-3 text-center"
                >
                  <p className="text-lg font-bold text-white">{s.val}</p>
                  <p className="text-[10px] text-slate-400">{s.lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout - Image first then text */}
        <div className="md:hidden flex flex-col items-center text-center">
          {/* Avatar - First on mobile */}
          {/* Mobile Avatar - Image */}
          <div className="relative mb-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-2xl opacity-40" />
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-green-500 to-blue-500 p-1">
              <Image
                src="/romarick.jpeg"
                alt="Bongnteh Romarick"
                width={128}
                height={128}
                className="w-full h-full rounded-full object-cover"
                priority
              />
            </div>
          </div>
          {/* Mobile Stats */}
          <div className="grid grid-cols-4 gap-2 w-full max-w-[320px] mx-auto mb-6">
            {stats.map((s) => (
              <div
                key={s.lbl}
                className="bg-slate-800/50 border border-green-500/10 rounded-lg p-2 text-center"
              >
                <p className="text-sm font-bold text-white">{s.val}</p>
                <p className="text-[8px] text-slate-400">{s.lbl}</p>
              </div>
            ))}
          </div>
          {/* Text Content - Second on mobile */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-green-400">
              Available for opportunities
            </span>
          </div>
          <p className="text-xs font-semibold tracking-[0.2em] text-green-500 uppercase mb-3">
            FULL-STACK DEVELOPER & ARCHITECT
          </p>
          <h1 className="text-3xl font-bold text-white leading-tight">
            Bongnteh
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Romarick
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
            Building high-performance, scalable web applications that combine
            technical excellence with thoughtful user experiences. Based in
            Cameroon — working worldwide.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-5">
            {techStack.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-green-500/5 border border-green-500/20 text-[10px] font-medium text-green-400"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3 justify-center mt-6">
            <Link
              href="/projects"
              className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-xs font-semibold rounded-lg shadow-lg shadow-green-500/25 transition-all"
            >
              View My Work →
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2 border border-slate-700 text-slate-300 hover:bg-slate-800/50 rounded-lg text-xs font-medium transition-all"
            >
              ✉ Get In Touch
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[9px] text-slate-400 tracking-widest uppercase">
            scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-green-500 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── SKILLS SECTION ─────────────────────────────────────── */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-2">
            <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] font-semibold tracking-wide text-green-400 uppercase">
              Expertise
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white">
            Skills &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Technologies
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
          {skills.map((sk) => (
            <div
              key={sk.name}
              className="bg-slate-800/40 border border-slate-700/50 rounded-lg p-2.5 hover:border-green-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-6 h-6 rounded-md ${sk.iconBg} flex items-center justify-center`}
                  >
                    <span className="text-xs">{sk.icon}</span>
                  </div>
                  <p className="text-[10px] font-semibold text-white">
                    {sk.name}
                  </p>
                </div>
                <span className="text-[9px] font-bold text-green-400">
                  {sk.level}%
                </span>
              </div>

              <div className="h-1 bg-slate-700 rounded-full overflow-hidden mb-1.5">
                <div
                  className={`h-full bg-gradient-to-r ${sk.barColor} rounded-full transition-all duration-700`}
                  style={{ width: `${sk.level}%` }}
                />
              </div>

              <p className="text-[8px] text-slate-400 truncate">
                {sk.desc.split(",")[0]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS SECTION ─────────────────────────────────────── */}
      <section className="relative z-10 bg-slate-800/20 border-y border-slate-700/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-gradient-to-r from-green-500 to-transparent" />
              <span className="text-xs font-bold tracking-[0.2em] text-green-400 uppercase">
                Featured Work
              </span>
            </div>
            <Link
              href="/projects"
              className="text-xs text-slate-400 hover:text-green-400 transition-colors"
            >
              All projects ↗
            </Link>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Projects That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              Matter
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <div
                key={p.id}
                className="group bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden hover:border-green-500/30 transition-all hover:-translate-y-1 duration-300"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>
                <div className="p-4">
                  {p.featured && (
                    <span className="inline-block px-2 py-0.5 rounded bg-green-500/10 border border-green-500/30 text-[9px] font-medium text-green-400 mb-2">
                      ★ Featured
                    </span>
                  )}
                  <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-slate-700/50 text-[9px] text-slate-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1.5 text-xs font-semibold text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/10 transition-all">
                      Live Demo
                    </button>
                    <button className="flex-1 py-1.5 text-xs font-semibold text-slate-400 border border-slate-600 rounded-lg hover:bg-slate-700/50 transition-all">
                      Code
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG SECTION ─────────────────────────────────────── */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-gradient-to-r from-green-500 to-transparent" />
            <span className="text-xs font-bold tracking-[0.2em] text-green-400 uppercase">
              Latest Insights
            </span>
          </div>
          <Link
            href="/blog"
            className="text-xs text-slate-400 hover:text-green-400 transition-colors"
          >
            All articles ↗
          </Link>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
          From the Blog
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden hover:border-green-500/30 transition-all">
                <div
                  className={`h-20 flex items-center justify-center bg-gradient-to-br ${post.imgBg}`}
                >
                  <span className="text-2xl">{post.emoji}</span>
                </div>
                <div className="p-3">
                  <span className="inline-block px-2 py-0.5 rounded bg-blue-500/10 text-[9px] text-blue-400 mb-2">
                    {post.category}
                  </span>
                  <p className="text-xs font-semibold text-white mb-1 line-clamp-2 group-hover:text-green-400 transition-colors">
                    {post.title}
                  </p>
                  <p className="text-[10px] text-slate-400 mb-2">
                    {post.date} · {post.readTime}
                  </p>
                  <p className="text-[10px] text-green-400 group-hover:text-green-300">
                    Read more →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ─────────────────────────────────────── */}
      <section className="relative z-10 bg-slate-800/20 border-y border-slate-700/30 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-gradient-to-r from-green-500 to-transparent" />
            <span className="text-xs font-bold tracking-[0.2em] text-green-400 uppercase">
              Client Feedback
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            What People Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-5 hover:border-green-500/30 transition-all"
              >
                <div className="text-green-400 text-sm mb-3">★★★★★</div>
                <p className="text-xs text-slate-300 italic mb-4">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-slate-700/50">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{t.name}</p>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────── */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[250px] bg-green-500/5 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10">
            <div className="inline-flex p-2 rounded-xl bg-green-500/10 border border-green-500/20 mb-5">
              <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Ready to Build Something
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mt-1">
                Extraordinary?
              </span>
            </h2>
            <p className="text-sm text-slate-400 mb-6 max-w-md mx-auto">
              Available for freelance, contracts, and full-time remote roles.
              Let's turn your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-green-500/25 transition-all"
              >
                ✉ Start a Conversation
              </Link>
              <Link
                href="/experience"
                className="px-6 py-2.5 border border-slate-700 text-slate-300 hover:bg-slate-800/50 rounded-lg text-sm font-medium transition-all"
              >
                ↓ Download Resume
              </Link>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              or reach out at{" "}
              <span className="text-green-400">ndzelenromarick@gmail.com</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
