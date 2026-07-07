"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Zap,
  Database,
  Cloud,
  Briefcase,
  Rocket,
  Heart,
  BookOpen,
  Github,
  Gamepad2,
  Music,
  Camera,
  Plane,
  Dumbbell,
  Palette,
  Award,
  Mic2,
  Trophy,
  GraduationCap,
  Sparkles,
  Quote,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";

const skills = [
  {
    name: "Frontend Development",
    icon: Code2,
    desc: "React, Next.js, TypeScript, Tailwind, Framer Motion",
    level: 95,
    barColor: "from-blue-600 to-indigo-600",
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    name: "Backend Engineering",
    icon: Zap,
    desc: "Node.js, Python, Django, Express.js, GraphQL",
    level: 92,
    barColor: "from-indigo-600 to-purple-600",
    iconBg: "bg-indigo-50 text-indigo-600",
  },
  {
    name: "Database Management",
    icon: Database,
    desc: "PostgreSQL, MongoDB, Prisma, Redis",
    level: 88,
    barColor: "from-purple-600 to-pink-600",
    iconBg: "bg-purple-50 text-purple-600",
  },
  {
    name: "Cloud & DevOps",
    icon: Cloud,
    desc: "AWS, Docker, Vercel, Render, Cloudinary",
    level: 85,
    barColor: "from-teal-500 to-emerald-600",
    iconBg: "bg-teal-50 text-teal-600",
  },
];

const stats = [
  { label: "Years Experience", value: "5+", icon: Briefcase },
  { label: "Projects Completed", value: "50+", icon: Rocket },
  { label: "Happy Clients", value: "40+", icon: Heart },
  { label: "Tech Articles", value: "25+", icon: BookOpen },
];

const hobbies = [
  { name: "Reading Tech Blogs", desc: "Always learning new tech", icon: BookOpen },
  { name: "Open Source", desc: "Contributing to community", icon: Github },
  { name: "Gaming", desc: "Strategy & RPG games", icon: Gamepad2 },
  { name: "Music Production", desc: "Creating beats", icon: Music },
  { name: "Photography", desc: "Street & nature", icon: Camera },
  { name: "Traveling", desc: "Exploring new places", icon: Plane },
  { name: "Fitness", desc: "Staying active", icon: Dumbbell },
  { name: "Digital Art", desc: "Creative design", icon: Palette },
];

const achievements = [
  { title: "Open Source Contributor", desc: "Contributed to 10+ projects", icon: Github },
  { title: "Tech Speaker", desc: "Spoke at 5+ conferences", icon: Mic2 },
  { title: "Hackathon Winner", desc: "Won 3 hackathons", icon: Trophy },
  { title: "Certified Developer", desc: "AWS & MongoDB certified", icon: GraduationCap },
];

const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Tailwind CSS",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "AWS",
  "GraphQL",
];

export default function AboutPage() {
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

      {/* ── HERO SECTION ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 lg:py-24">
        <div className="text-center space-y-2 sm:space-y-5">
          <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-blue-50/80 border-2 border-blue-200 backdrop-blur-sm mb-2 sm:mb-3">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
            <span className="text-[10px] sm:text-base font-black text-blue-700 uppercase tracking-wide">
              Get to Know Me
            </span>
          </div>
          <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Me
            </span>
          </h1>
          <p className="text-sm sm:text-xl text-slate-600 max-w-2xl mx-auto font-bold px-4">
            A passionate developer dedicated to creating impactful digital
            experiences. My journey into programming started with a simple "Hello, World!" and has since evolved 
            into a career where I solve complex problems and build applications that make a difference.
          </p>
        </div>
      </section>

      {/* ── STATS ROW ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-5 max-w-5xl mx-auto">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white border-2 border-slate-200/80 rounded-xl p-2 sm:p-6 text-center shadow-sm"
              >
                <div className="inline-flex p-1.5 sm:p-3.5 rounded-lg bg-blue-50 text-blue-600 mb-1 sm:mb-3">
                  <Icon className="h-4 w-4 sm:h-7 sm:w-7" />
                </div>
                <div className="text-lg sm:text-4xl font-black text-slate-900 leading-none">
                  {stat.value}
                </div>
                <div className="text-[8px] sm:text-base font-bold text-slate-500 uppercase tracking-wide mt-1 sm:mt-1.5 leading-tight px-0.5">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left Column - Profile & Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Profile Card */}
            <div className="bg-white border-2 border-slate-200/80 rounded-2xl p-5 sm:p-8 text-center shadow-sm">
              <div className="relative inline-block mx-auto mb-4 sm:mb-5">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full blur-2xl opacity-30" />
                <div className="relative w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-1 sm:p-1.5 shadow-xl">
                  <Image
                    src="/romarick.jpeg"
                    alt="Bongnteh Romarick"
                    width={144}
                    height={144}
                    className="w-full h-full rounded-full object-cover border-4 border-white"
                  />
                </div>
              </div>
              <h2 className="text-xl sm:text-3xl font-bold text-slate-900">
                Bongnteh Romarick
              </h2>
              <p className="text-base sm:text-xl font-bold text-blue-600">
                Full-Stack Developer
              </p>
              <div className="flex items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base text-slate-600 font-bold mt-2 sm:mt-3">
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                  Cameroon
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1 sm:gap-1.5">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                  5+ Years
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mt-4 sm:mt-6">
                <Link href="/contact">
                  <Button className="px-5 sm:px-8 py-2.5 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm sm:text-base font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                    Contact
                  </Button>
                </Link>
                <Link href="/experience">
                  <Button
                    variant="outline"
                    className="px-5 sm:px-8 py-2.5 sm:py-4 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 text-sm sm:text-base font-bold rounded-xl transition-all"
                  >
                    Experience
                  </Button>
                </Link>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white border-2 border-slate-200/80 rounded-2xl p-4 sm:p-6 text-center shadow-sm">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500" />
                <span className="text-sm sm:text-base font-black text-emerald-600">
                  Available for Work
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-slate-500">
                Open to freelance opportunities and collaborations
              </p>
            </div>

            {/* Hobbies */}
            <div className="bg-white border-2 border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm">
              <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-3 sm:mb-5 flex items-center gap-2">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                Hobbies & Interests
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {hobbies.map((hobby, idx) => {
                  const Icon = hobby.icon;
                  return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200/60 overflow-hidden min-w-0"
                  >
                    <div className="p-1.5 sm:p-2.5 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm sm:text-base font-bold text-slate-800 truncate">
                        {hobby.name}
                      </p>
                      <p className="text-[10px] sm:text-sm font-semibold text-slate-500 truncate">
                        {hobby.desc}
                      </p>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white border-2 border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm">
              <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-3 sm:mb-5 flex items-center gap-2">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {achievements.map((ach, idx) => {
                  const Icon = ach.icon;
                  return (
                  <div
                    key={idx}
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200/60 overflow-hidden min-w-0"
                  >
                    <div className="p-1.5 sm:p-2.5 rounded-lg bg-purple-50 text-purple-600 flex-shrink-0">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm sm:text-base font-bold text-slate-800 truncate">
                        {ach.title}
                      </p>
                      <p className="text-[10px] sm:text-sm font-semibold text-slate-500 truncate">
                        {ach.desc}
                      </p>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Bio & Skills */}
          <div className="space-y-4 sm:space-y-6">
            {/* Bio */}
            <div className="bg-white border-2 border-slate-200/80 rounded-2xl p-5 sm:p-8 shadow-sm">
              <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-3 sm:mb-5 flex items-center gap-2">
                <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                My Journey
              </h3>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-lg text-slate-700 leading-relaxed font-bold">
                <p>
                  Hello! I'm a full-stack developer with a deep-seated passion
                  for building things for the web. My journey into programming
                  started with a simple "Hello, World!" and has since evolved
                  into a career where I solve complex problems and build
                  applications that make a difference.
                </p>
                <p>
                  I thrive on bridging the gap between an idea and a
                  fully-realized product. Whether it's architecting a robust
                  backend, crafting a pixel-perfect UI, or optimizing database
                  performance, I'm always eager to learn and apply new
                  technologies.
                </p>
                <p>
                  Beyond the code, I believe in the power of community and
                  knowledge sharing. My blog serves as a platform where I
                  document my learnings and connect with fellow developers.
                </p>
              </div>
            </div>

            {/* Skills Cards */}
            {skills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border-2 border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div
                        className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl ${skill.iconBg} flex items-center justify-center shadow-sm`}
                      >
                        <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
                      </div>
                      <div>
                        <p className="text-sm sm:text-lg font-black text-slate-800">
                          {skill.name}
                        </p>
                        <p className="text-[10px] sm:text-base font-bold text-slate-500">
                          {skill.desc}
                        </p>
                      </div>
                    </div>
                    <span className="text-base sm:text-xl font-black text-blue-600">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2 sm:h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.barColor} rounded-full`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {/* Tech Stack Tags */}
            <div className="bg-white border-2 border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-sm">
              <h3 className="text-base sm:text-xl font-bold text-slate-900 mb-3 sm:mb-5 flex items-center gap-2">
         ork With
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2.5">
                {techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-xl bg-blue-50 border-2 border-blue-200 text-[10px] sm:text-base font-bold text-blue-700 hover:bg-blue-100 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUOTE SECTION ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/60 rounded-2xl p-6 sm:p-10 text-center shadow-sm">
          <div className="inline-flex p-2.5 sm:p-3.5 rounded-2xl bg-blue-100 border-2 border-blue-200 mb-3 sm:mb-5">
            <Quote className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
          </div>
          <p className="text-xl sm:text-2xl text-slate-700 font-bold max-w-3xl mx-auto leading-relaxed">
            "Code is not just about solving problems, it's about creating
            solutions that make people's lives better."
          </p>
          <p className="text-base sm:text-xl font-black text-blue-600 mt-3 sm:mt-4">
            - Bongnteh Romarick
          </p>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 pb-16 sm:pb-20">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/60 rounded-2xl p-6 sm:p-10 text-center shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 sm:mb-3">
            Want to know more?
          </h3>
          <p className="text-sm sm:text-lg text-slate-600 font-bold mb-4 sm:mb-6 max-w-md mx-auto">
            Check out my projects or get in touch to discuss potential
            collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
            <Link href="/projects">
              <button className="px-6 sm:px-10 py-3 sm:py-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm sm:text-lg font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all">
                View My Work →
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 sm:px-10 py-3 sm:py-4.5 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 text-sm sm:text-lg font-bold rounded-xl transition-all">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 inline mr-1.5 sm:mr-2" />
                Contact Me
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}