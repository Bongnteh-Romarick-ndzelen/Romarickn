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
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

export default function AboutPage() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ref3, inView3] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24"
      >
        <div className="text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-50/80 border-2 border-blue-200 backdrop-blur-sm mb-3">
            <Sparkles className="h-5 w-5 text-blue-500" />
            <span className="text-base font-black text-blue-700 uppercase tracking-wide">
              Get to Know Me
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900 tracking-tight">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Me
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-bold text-start">
            A passionate developer dedicated to creating impactful digital
            experiences. My journey into programming started with a simple "Hello, World!" and has since evolved 
            into a career where I solve complex problems and build applications that make a difference.
          </p>
        </div>
      </motion.section>

      {/* ── STATS ROW ─────────────────────────────────────────── - Fixed shaking */}
      <motion.section
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 group"
              >
                <div className="inline-flex p-3.5 rounded-xl bg-blue-50 text-blue-600 mb-3">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="text-4xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-base font-bold text-slate-500 uppercase tracking-wider mt-1.5">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ── MAIN CONTENT ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Profile & Info */}
          <motion.div
            ref={ref2}
            initial="hidden"
            animate={inView2 ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Profile Card - Removed whileHover from the motion.div wrapper */}
            <motion.div variants={fadeInUp} className="bg-white border-2 border-slate-200/80 rounded-2xl p-8 text-center shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300">
              <div className="relative inline-block mx-auto mb-5">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full blur-2xl opacity-30" />
                <div className="relative w-36 h-36 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 p-1.5 shadow-xl">
                  <Image
                    src="/romarick.jpeg"
                    alt="Bongnteh Romarick"
                    width={144}
                    height={144}
                    className="w-full h-full rounded-full object-cover border-4 border-white"
                  />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-slate-900">
                Bongnteh Romarick
              </h2>
              <p className="text-xl font-bold text-blue-600">
                Full-Stack Developer
              </p>
              <div className="flex items-center justify-center gap-4 text-base text-slate-600 font-bold mt-3">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-5 w-5" />
                  Cameroon
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-5 w-5" />
                  5+ Years
                </span>
              </div>
              <div className="flex gap-4 justify-center mt-6">
                <Link href="/contact">
                  <Button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all">
                    <Mail className="h-5 w-5 mr-2" />
                    Contact
                  </Button>
                </Link>
                <Link href="/experience">
                  <Button
                    variant="outline"
                    className="px-8 py-4 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 text-base font-bold rounded-xl transition-all"
                  >
                    Experience
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div variants={fadeInUp} className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-base font-black text-emerald-600">
                  Available for Work
                </span>
              </div>
              <p className="text-base font-bold text-slate-500">
                Open to freelance opportunities and collaborations
              </p>
            </motion.div>

            {/* Hobbies - Fixed */}
            <motion.div 
              variants={fadeInUp} 
              className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-500" />
                Hobbies & Interests
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {hobbies.map((hobby, idx) => {
                  const Icon = hobby.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200/60 hover:border-blue-300 hover:bg-white transition-all duration-200"
                    >
                      <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 flex-shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-base font-bold text-slate-800 truncate">
                          {hobby.name}
                        </p>
                        <p className="text-sm font-semibold text-slate-500 truncate">
                          {hobby.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={fadeInUp} className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <Award className="h-6 w-6 text-amber-500" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((ach, idx) => {
                  const Icon = ach.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200/60 hover:border-purple-300 hover:bg-white transition-all duration-200"
                    >
                      <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600 flex-shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-base font-bold text-slate-800 truncate">
                          {ach.title}
                        </p>
                        <p className="text-sm font-semibold text-slate-500 truncate">
                          {ach.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Bio & Skills */}
          <motion.div
            ref={ref3}
            initial="hidden"
            animate={inView3 ? "visible" : "hidden"}
            variants={staggerContainer}
            className="space-y-6"
          >
            {/* Bio */}
            <motion.div variants={fadeInUp} className="bg-white border-2 border-slate-200/80 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <Rocket className="h-6 w-6 text-blue-600" />
                My Journey
              </h3>
              <div className="space-y-4 text-lg text-slate-700 leading-relaxed font-bold">
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
            </motion.div>

            {/* Skills Cards */}
            {skills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl ${skill.iconBg} flex items-center justify-center shadow-sm`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-lg font-black text-slate-800">
                          {skill.name}
                        </p>
                        <p className="text-base font-bold text-slate-500">
                          {skill.desc}
                        </p>
                      </div>
                    </div>
                    <span className="text-xl font-black text-blue-600">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skill.barColor} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </motion.div>
              );
            })}

            {/* Tech Stack Tags */}
            <motion.div variants={fadeInUp} className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
              <h3 className="text-xl font-bold text-slate-900 mb-5 flex items-center gap-2">
                <Code2 className="h-6 w-6 text-blue-600" />
                Technologies I Work With
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-5 py-2.5 rounded-xl bg-blue-50 border-2 border-blue-200 text-base font-bold text-blue-700 hover:bg-blue-100 transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── QUOTE SECTION ───────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/60 rounded-2xl p-10 text-center shadow-sm">
          <div className="inline-flex p-3.5 rounded-2xl bg-blue-100 border-2 border-blue-200 mb-5">
            <Quote className="h-7 w-7 text-blue-600" />
          </div>
          <p className="text-2xl text-slate-700 font-bold max-w-3xl mx-auto leading-relaxed">
            "Code is not just about solving problems, it's about creating
            solutions that make people's lives better."
          </p>
          <p className="text-xl font-black text-blue-600 mt-4">
            - Bongnteh Romarick
          </p>
        </div>
      </motion.section>

      {/* ── CTA SECTION ─────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-20"
      >
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/60 rounded-2xl p-10 text-center shadow-sm">
          <h3 className="text-3xl font-bold text-slate-900 mb-3">
            Want to know more?
          </h3>
          <p className="text-lg text-slate-600 font-bold mb-6 max-w-md mx-auto">
            Check out my projects or get in touch to discuss potential
            collaboration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all"
              >
                View My Work →
              </motion.button>
            </Link>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4.5 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 text-lg font-bold rounded-xl transition-all"
              >
                <Mail className="h-5 w-5 inline mr-2" />
                Contact Me
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}