"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const skills = [
  {
    name: "Frontend",
    icon: "💻",
    desc: "React, Next.js, TypeScript, Tailwind CSS",
    level: 95,
    barColor: "from-teal-400 to-cyan-400",
  },
  {
    name: "Backend",
    icon: "⚡",
    desc: "Node.js, Express, Prisma, GraphQL",
    level: 92,
    barColor: "from-teal-400 to-cyan-400",
  },
  {
    name: "Database",
    icon: "🗄️",
    desc: "PostgreSQL, MongoDB, Redis",
    level: 88,
    barColor: "from-teal-400 to-cyan-400",
  },
  {
    name: "Cloud & DevOps",
    icon: "☁️",
    desc: "AWS, Docker, Vercel, Firebase",
    level: 85,
    barColor: "from-teal-400 to-cyan-400",
  },
];

const stats = [
  { label: "Years Experience", value: "5+", icon: "💼" },
  { label: "Projects Completed", value: "50+", icon: "🚀" },
  { label: "Happy Clients", value: "40+", icon: "❤️" },
  { label: "Tech Articles", value: "25+", icon: "📚" },
];

const hobbies = [
  {
    name: "Reading Tech Blogs",
    desc: "Always learning new tech",
    icon: "📖",
    color: "blue",
  },
  {
    name: "Open Source",
    desc: "Contributing to community",
    icon: "🐙",
    color: "gray",
  },
  { name: "Gaming", desc: "Strategy & RPG games", icon: "🎮", color: "purple" },
  {
    name: "Music Production",
    desc: "Creating beats",
    icon: "🎵",
    color: "green",
  },
  { name: "Photography", desc: "Street & nature", icon: "📷", color: "amber" },
  {
    name: "Traveling",
    desc: "Exploring new places",
    icon: "✈️",
    color: "indigo",
  },
  { name: "Fitness", desc: "Staying active", icon: "💪", color: "red" },
  { name: "Digital Art", desc: "Creative design", icon: "🎨", color: "pink" },
];

const achievements = [
  {
    title: "Open Source Contributor",
    desc: "Contributed to 10+ projects",
    icon: "🐙",
  },
  { title: "Tech Speaker", desc: "Spoke at 5+ conferences", icon: "🎤" },
  { title: "Hackathon Winner", desc: "Won 3 hackathons", icon: "🏆" },
  { title: "Certified Developer", desc: "AWS & MongoDB certified", icon: "🎓" },
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

// Dark gradient with high opacity
const cardBgVariants = [
  "bg-gradient-to-br from-slate-900/95 to-slate-900/85",
  "bg-gradient-to-br from-slate-900/90 to-slate-900/80",
  "bg-gradient-to-br from-slate-900/100 to-slate-900/90",
  "bg-gradient-to-br from-slate-900/85 to-slate-900/75",
  "bg-gradient-to-br from-slate-900/95 to-slate-900/85",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#111D3A] relative overflow-hidden">
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(64,224,208,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(64,224,208,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Glow orbs */}
      <div className="absolute top-[-80px] right-[-60px] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10">
        {/* ── HERO SECTION ─────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-[10px] font-semibold tracking-wide text-teal-400 uppercase">
                Get to Know Me
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
              About{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                Me
              </span>
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              A passionate developer dedicated to creating impactful digital
              experiences
            </p>
          </div>
        </section>

        {/* ── STATS ROW ─────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-3 text-center hover:border-teal-500/30 transition-all backdrop-blur-sm"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-[10px] text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MAIN CONTENT ───────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Profile & Info */}
            <div className="space-y-5">
              {/* Profile Card */}
              <div
                className={`bg-gradient-to-br ${cardBgVariants[0]} border border-slate-700/30 rounded-xl p-6 text-center hover:border-teal-500/40 transition-all backdrop-blur-sm`}
              >
                <div className="relative inline-block mx-auto mb-4">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full blur opacity-30" />
                  <div className="relative w-28 h-28 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 p-1">
                    <Image
                      src="/romarick.jpeg"
                      alt="Bongnteh Romarick"
                      width={108}
                      height={108}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
                <h2 className="text-lg font-bold text-white">
                  Bongnteh Romarick
                </h2>
                <p className="text-sm text-teal-400 font-semibold">
                  Full-Stack Developer
                </p>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-2">
                  <span>📍 Cameroon</span>
                  <span>•</span>
                  <span>📅 5+ Years</span>
                </div>
                <div className="flex gap-3 justify-center mt-4">
                  <Link href="/contact">
                    <Button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-xs font-semibold rounded-lg">
                      ✉ Contact
                    </Button>
                  </Link>
                  <Link href="/experience">
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-medium rounded-lg"
                    >
                      Experience
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-slate-800/20 border border-slate-700/30 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-xs font-semibold text-teal-400">
                    Available for Work
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Open to freelance opportunities and collaborations
                </p>
              </div>

              {/* Hobbies */}
              <div
                className={`bg-gradient-to-br ${cardBgVariants[1]} border border-slate-700/30 rounded-xl p-5 backdrop-blur-sm`}
              >
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span>❤️</span> Hobbies & Interests
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {hobbies.map((hobby, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800/60 transition-all"
                    >
                      <span className="text-lg">{hobby.icon}</span>
                      <div>
                        <p className="text-[11px] font-semibold text-white">
                          {hobby.name}
                        </p>
                        <p className="text-[8px] text-slate-400">
                          {hobby.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div
                className={`bg-gradient-to-br ${cardBgVariants[2]} border border-slate-700/30 rounded-xl p-5 backdrop-blur-sm`}
              >
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span>🏆</span> Achievements
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {achievements.map((ach, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800/60 transition-all"
                    >
                      <span className="text-lg">{ach.icon}</span>
                      <div>
                        <p className="text-[11px] font-semibold text-white">
                          {ach.title}
                        </p>
                        <p className="text-[8px] text-slate-400">{ach.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Bio & Skills */}
            <div className="space-y-5">
              {/* Bio */}
              <div
                className={`bg-gradient-to-br ${cardBgVariants[3]} border border-slate-700/30 rounded-xl p-6 backdrop-blur-sm`}
              >
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span>🚀</span> My Journey
                </h3>
                <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
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
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${cardBgVariants[idx % cardBgVariants.length]} border border-slate-700/30 rounded-xl p-4 hover:border-teal-500/40 transition-all backdrop-blur-sm`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                        <span className="text-lg">{skill.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {skill.name}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {skill.desc}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-teal-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.barColor} rounded-full transition-all duration-700`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}

              {/* Tech Stack Tags */}
              <div
                className={`bg-gradient-to-br ${cardBgVariants[4]} border border-slate-700/30 rounded-xl p-5 backdrop-blur-sm`}
              >
                <h3 className="text-sm font-bold text-white mb-3">
                  🛠️ Technologies I Work With
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-teal-500/10 border border-teal-500/20 text-[10px] font-medium text-teal-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── QUOTE SECTION ─────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-xl p-6 text-center">
            <div className="inline-flex p-2 rounded-full bg-teal-500/20 mb-3">
              <svg
                className="w-5 h-5 text-teal-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 11h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z"
                />
                <path d="M3 9.5L10 3" />
                <path d="M18 11h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" />
                <path d="M11 9.5L18 3" />
              </svg>
            </div>
            <p className="text-sm text-slate-300 italic max-w-2xl mx-auto">
              "Code is not just about solving problems, it's about creating
              solutions that make people's lives better."
            </p>
            <p className="text-xs text-teal-400 mt-2 font-semibold">
              - Bongnteh Romarick
            </p>
          </div>
        </section>

        {/* ── CTA SECTION ───────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-xl p-6 text-center">
            <h3 className="text-base font-bold text-white mb-2">
              Want to know more?
            </h3>
            <p className="text-xs text-slate-300 mb-4 max-w-md mx-auto">
              Check out my projects or get in touch to discuss potential
              collaboration.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/projects">
                <Button className="px-5 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-sm font-semibold rounded-lg">
                  View My Work →
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium rounded-lg"
                >
                  ✉ Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}