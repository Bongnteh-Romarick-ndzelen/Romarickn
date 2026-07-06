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
    tags: ["Next.js", "TypeScript", "Stripe"],
    featured: true,
  },
  {
    id: 2,
    title: "Brainy Quiz",
    description:
      "Educational platform for CGCE exam preparation with quizzes, IQ tests, and performance analytics.",
    emoji: "🧠",
    imageUrl: "/projects/Brainy-qiz.png",
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
    tags: ["MongoDB", "Express", "Node.js"],
    featured: true,
  },
  {
    id: 4,
    title: "EcoTrack Dashboard",
    description:
      "Environmental monitoring platform with real-time data visualization and analytics for sustainability projects.",
    emoji: "🌱",
    imageUrl: "/projects/ecotrack.png",
    tags: ["React", "D3.js", "Python"],
    featured: false,
  },
  {
    id: 5,
    title: "MediConnect Hub",
    description:
      "Telemedicine platform connecting patients with healthcare providers through secure video consultations.",
    emoji: "🏥",
    imageUrl: "/projects/mediconnect.png",
    tags: ["Next.js", "WebRTC", "Node.js"],
    featured: false,
  },
  {
    id: 6,
    title: "FinFlow Analytics",
    description:
      "Financial management system with AI-powered insights, automated reporting, and portfolio tracking.",
    emoji: "💰",
    imageUrl: "/projects/finflow.png",
    tags: ["Vue.js", "Django", "PostgreSQL"],
    featured: true,
  },
];

const skills = [
  {
    name: "Frontend Development",
    icon: "💻",
    desc: "React, Next.js, TypeScript, Tailwind, Framer Motion",
    level: 95,
    barColor: "from-blue-600 to-indigo-600",
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    name: "Backend Engineering",
    icon: "⚡",
    desc: "Node.js, Python, Django, Express.js, GraphQL",
    level: 92,
    barColor: "from-indigo-600 to-purple-600",
    iconBg: "bg-indigo-50 text-indigo-600",
  },
  {
    name: "Database Management",
    icon: "🗄️",
    desc: "PostgreSQL, MongoDB, Prisma, Redis",
    level: 88,
    barColor: "from-purple-600 to-pink-600",
    iconBg: "bg-purple-50 text-purple-600",
  },
  {
    name: "Cloud & DevOps",
    icon: "☁️",
    desc: "AWS, Docker, Vercel, Render, Cloudinary",
    level: 85,
    barColor: "from-teal-500 to-emerald-600",
    iconBg: "bg-teal-50 text-teal-600",
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
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
    
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?page=1&limit=4`);
        const data = await response.json();
        setBlogPosts(data.data?.posts || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleImageError = (src: string) => {
    setImgErrors(prev => ({ ...prev, [src]: true }));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-blue-500 selection:text-white overflow-x-hidden">
      
      {/* Google Fonts Loader */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Radley:ital@0;1&display=swap');
        
        h1, h2, h3, h4, .font-heading {
          font-family: 'Radley', serif !important;
          font-weight: 700 !important;
        }
        p, span, div, a, button, label, .font-body {
          font-family: 'Lato', sans-serif !important;
        }
        .text-thick {
          font-weight: 700 !important;
        }
        .text-medium {
          font-weight: 600 !important;
        }
      `}</style>

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 min-h-[95vh] flex flex-col justify-center relative">
        {/* Modern Blur Gradients */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-blue-200/40 to-indigo-200/30 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-purple-200/30 rounded-full blur-[120px] pointer-events-none" />

        {/* Desktop Layout - 50/50 Splitting */}
        <div className="hidden md:flex md:flex-row md:justify-between md:items-center md:gap-16 relative z-10">
          {/* Left Column - 50% */}
          <div className="flex-1 space-y-7">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-blue-50/80 border border-blue-200 backdrop-blur-sm transition-all hover:bg-blue-50">
              <span className="w-3 h-3 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-sm font-bold text-blue-800 tracking-wide uppercase">
                Available for elite opportunities
              </span>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm font-black tracking-[0.3em] text-indigo-600 uppercase">
                FULL-STACK DEVELOPER & ARCHITECT
              </p>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-slate-900 leading-[1.08] tracking-tight">
                Bongnteh
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Romarick
                </span>
              </h1>
            </div>

            <p className="text-xl text-slate-700 max-w-xl leading-relaxed font-bold">
              Building high-performance, scalable web applications that combine
              technical excellence with thoughtful user experiences. Based in
              Cameroon — engineered for the global scale.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="px-4 py-2 rounded-xl bg-white border-2 border-slate-200 shadow-sm text-sm font-bold text-slate-700 hover:border-blue-400 hover:shadow-md transition-all"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Link
                href="/projects"
                className="px-10 py-4 bg-slate-900 text-white hover:bg-blue-600 text-base font-bold rounded-2xl shadow-lg shadow-slate-900/20 hover:shadow-blue-600/30 transition-all duration-300"
              >
                View My Work &rarr;
              </Link>
              <Link
                href="/contact"
                className="px-10 py-4 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-2xl text-base font-bold transition-all shadow-sm"
              >
                ✉ Get In Touch
              </Link>
            </div>
          </div>

          {/* Right Column - 50% */}
          <div className="flex-1 flex flex-col items-center gap-10">
            {/* Premium Avatar Frame */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full bg-white p-2 shadow-2xl">
                {!imgErrors['/romarick.jpeg'] ? (
                  <Image
                    src="/romarick.jpeg"
                    alt="Bongnteh Romarick"
                    width={288}
                    height={288}
                    className="w-full h-full rounded-full object-cover border-4 border-white shadow-inner"
                    priority
                    unoptimized={true}
                    onError={() => handleImageError('/romarick.jpeg')}
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                )}
              </div>
            </div>
            {/* Premium Stats Grid */}
            <div className="grid grid-cols-2 gap-5 w-full max-w-[340px]">
              {stats.map((s) => (
                <div
                  key={s.lbl}
                  className="bg-white border-2 border-slate-100 rounded-2xl p-5 text-center shadow-md shadow-slate-100/50 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 group"
                >
                  <p className="text-4xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">{s.val}</p>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-1">{s.lbl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col items-center text-center relative z-10 space-y-8">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-xl opacity-30" />
            <div className="relative w-44 h-44 rounded-full bg-white p-1.5 shadow-2xl">
              {!imgErrors['/romarick.jpeg'] ? (
                <Image
                  src="/romarick.jpeg"
                  alt="Bongnteh Romarick"
                  width={176}
                  height={176}
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                  priority
                  unoptimized={true}
                  onError={() => handleImageError('/romarick.jpeg')}
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <span className="text-4xl">👤</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 w-full max-w-[380px] mx-auto">
            {stats.map((s) => (
              <div key={s.lbl} className="bg-white border-2 border-slate-200/60 rounded-xl p-3 text-center shadow-sm">
                <p className="text-2xl font-black text-slate-900">{s.val}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-tight mt-0.5">{s.lbl}</p>
              </div>
            ))}
          </div>

          <div className="space-y-5 px-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border-2 border-blue-100">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-sm font-bold text-blue-700 tracking-wide">Available for roles</span>
            </div>
            <p className="text-sm font-black tracking-[0.25em] text-indigo-600 uppercase">FULL-STACK ARCHITECT</p>
            <h1 className="text-5xl font-bold text-slate-900 leading-tight">
              Bongnteh <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Romarick</span>
            </h1>
            <p className="text-lg text-slate-700 max-w-sm mx-auto leading-relaxed font-bold">
              Building high-performance, scalable web applications that combine technical excellence with thoughtful UX.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center max-w-xs">
            {techStack.map((t) => (
              <span key={t} className="px-3.5 py-1.5 rounded-xl bg-white border-2 border-slate-200 text-sm font-bold text-slate-700">
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs pt-2">
            <Link href="/projects" className="w-full px-6 py-4 bg-slate-900 text-white text-base font-bold rounded-2xl text-center shadow-md">
              View Work &rarr;
            </Link>
            <Link href="/contact" className="w-full px-6 py-4 bg-white border-2 border-slate-200 text-slate-700 text-base font-bold rounded-2xl text-center shadow-sm">
              ✉ Get In Touch
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hidden lg:flex">
          <span className="text-[10px] text-slate-400 tracking-[0.3em] uppercase font-black">Scroll Down</span>
          <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
        </div>
      </section>

      {/* ── SKILLS SECTION ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-white rounded-3xl shadow-sm border-2 border-slate-100">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border-2 border-indigo-100 mb-4">
            <div className="w-2 h-2 rounded-full bg-indigo-500" />
            <span className="text-sm font-black tracking-widest text-indigo-700 uppercase">Expertise</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Skills & <span className="text-indigo-600">Technologies</span>
          </h2>
          <p className="text-lg text-slate-600 mt-4 max-w-xl mx-auto font-bold">
            Modern production-ready architectures built using robust structural engineering methodologies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((sk) => (
            <div
              key={sk.name}
              className="bg-slate-50/50 border-2 border-slate-200/60 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 group hover:border-blue-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl ${sk.iconBg} flex items-center justify-center text-2xl shadow-sm`}>
                    {sk.icon}
                  </div>
                  <p className="text-base font-black text-slate-800 tracking-tight">{sk.name}</p>
                </div>
                <span className="text-lg font-black text-slate-400 group-hover:text-blue-600 transition-colors">{sk.level}%</span>
              </div>

              <div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full bg-gradient-to-r ${sk.barColor} rounded-full transition-all duration-1000`}
                  style={{ width: `${sk.level}%` }}
                />
              </div>

              <p className="text-base text-slate-600 leading-relaxed font-bold">{sk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS SECTION ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-1 bg-indigo-500" />
              <span className="text-sm font-black tracking-[0.2em] text-indigo-600 uppercase">Featured Showcases</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              Architectures That <span className="text-blue-600">Perform</span>
            </h2>
          </div>
          <Link href="/projects" className="inline-flex items-center text-base font-bold text-blue-600 hover:text-blue-700 transition-colors group">
            View All Production Code <span className="transform group-hover:translate-x-1 transition-transform ml-2">&rarr;</span>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p) => (
            <div
              key={p.id}
              className="group bg-white border-2 border-slate-200/70 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-slate-300/80 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden bg-slate-100">
                {!imgErrors[p.imageUrl] ? (
                  <Image
                    src={p.imageUrl}
                    alt={p.title}
                    width={500}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                    unoptimized={true}
                    onError={() => handleImageError(p.imageUrl)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <span className="text-4xl opacity-50">📁</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                {p.featured && (
                  <span className="absolute top-4 right-4 px-4 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-black tracking-widest uppercase shadow-lg shadow-blue-600/30">
                    ★ Featured
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-base text-slate-600 font-bold leading-relaxed line-clamp-2">
                    {p.description}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="px-3 py-1.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-sm font-bold text-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button className="flex-1 py-3 text-sm font-black tracking-wider uppercase text-white bg-slate-900 rounded-2xl hover:bg-blue-600 transition-colors shadow-sm">
                      Live Demo
                    </button>
                    <button className="flex-1 py-3 text-sm font-black tracking-wider uppercase text-slate-700 border-2 border-slate-200 rounded-2xl hover:bg-slate-50 transition-colors">
                      Repository
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLOG SECTION ─────────────────────────────────────── */}
      <section className="bg-white border-y-2 border-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-1 bg-blue-500" />
                <span className="text-sm font-black tracking-[0.2em] text-blue-600 uppercase">Intellectual Capital</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">Engineering Journals</h2>
            </div>
            <Link href="/blog" className="text-base font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              Read Entire Archive &rarr;
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              [...Array(4)].map((_, index) => (
                <div key={index} className="bg-slate-50 border-2 border-slate-200 rounded-2xl overflow-hidden">
                  <div className="h-48 bg-slate-200 animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-slate-200 rounded w-16 animate-pulse" />
                    <div className="h-6 bg-slate-200 rounded w-5/6 animate-pulse" />
                    <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse" />
                  </div>
                </div>
              ))
            ) : blogPosts.length === 0 ? (
              <div className="col-span-full text-center py-16 text-slate-400 font-bold border-2 border-dashed border-slate-200 rounded-2xl">
                No articles published currently. Check back shortly.
              </div>
            ) : (
              blogPosts.map((post: any) => {
                const imageUrl = post.coverImage || '/placeholder-blog.png';
                return (
                  <Link key={post._id || post.id} href={`/blog/${post.slug}`} className="group">
                    <div className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-slate-300 transition-all duration-300">
                      <div className="h-48 relative overflow-hidden bg-slate-100">
                        {!imgErrors[imageUrl] ? (
                          <Image
                            src={imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            unoptimized={true}
                            onError={() => handleImageError(imageUrl)}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                            <span className="text-4xl opacity-50">📝</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5 space-y-3">
                        <span className="inline-block px-3 py-1 rounded-xl bg-indigo-50 text-xs font-black tracking-wide text-indigo-700 uppercase border-2 border-indigo-100">
                          {post.categories?.[0]?.name || 'General'}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-slate-500 font-bold">
                          {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} &middot; {post.readTime || '5 min'} read
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS SECTION ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center mb-16 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-0.5 bg-slate-300" />
            <span className="text-sm font-black tracking-[0.25em] text-slate-500 uppercase">Client Feedback</span>
            <div className="w-8 h-0.5 bg-slate-300" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Endorsements of <span className="text-purple-600">Trust</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border-2 border-slate-200/80 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex text-amber-400 gap-1 text-lg font-bold mb-5">★★★★★</div>
                <p className="text-lg text-slate-700 font-bold leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4 pt-6 mt-6 border-t-2 border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-base font-black text-white shadow-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="text-base font-black text-slate-800 tracking-tight">{t.name}</p>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-slate-950 rounded-3xl p-8 sm:p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <div className="inline-flex p-4 rounded-2xl bg-white/5 border-2 border-white/10 backdrop-blur-md mx-auto">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
              Ready to construct something <span className="text-indigo-400 block sm:inline">extraordinary?</span>
            </h2>
            
            <p className="text-xl text-slate-300 max-w-xl mx-auto font-bold leading-relaxed">
              Available for specialized consulting, structural contracts, and premium distributed remote infrastructure assignments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/contact"
                className="px-10 py-5 bg-white text-slate-950 hover:bg-indigo-50 text-base font-black rounded-2xl shadow-lg transition-all"
              >
                ✉ Initialize Briefing
              </Link>
              <Link
                href="/experience"
                className="px-10 py-5 bg-white/5 border-2 border-white/10 hover:bg-white/10 text-white text-base font-black rounded-2xl transition-all"
              >
                &darr; Dossier Resume
              </Link>
            </div>

            <p className="text-sm text-slate-500 pt-2 tracking-wide font-bold">
              Direct routing: <span className="text-slate-300 font-black">ndzelenromarick@gmail.com</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}