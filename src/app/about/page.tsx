"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Briefcase,
  Code,
  Cpu,
  PenTool,
  Server,
  Database,
  Cloud,
  Rocket,
  Heart,
  MapPin,
  Calendar,
  Award,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Coffee,
  Music,
  BookOpen,
  Gamepad2,
  Camera,
  Globe,
  Users,
  Zap,
  Star,
  Film,
  Plane,
  Dumbbell,
  Palette,
  Mic,
  Headphones,
  Trophy,
  Smile,
  ThumbsUp,
  Mountain,
  Bike,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const skills = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Redux",
    "Framer Motion",
  ],
  backend: [
    "Node.js",
    "Express",
    "Prisma",
    "PostgreSQL",
    "REST APIs",
    "GraphQL",
  ],
  tools: ["Git", "Docker", "Vercel", "Firebase", "Stripe", "AWS"],
  design: [
    "Figma",
    "Adobe XD",
    "Responsive Design",
    "UI/UX Principles",
    "Prototyping",
  ],
};

const stats = [
  { label: "Years Experience", value: "5+", icon: Briefcase },
  { label: "Projects Completed", value: "50+", icon: Rocket },
  { label: "Happy Clients", value: "40+", icon: Heart },
  { label: "Tech Articles", value: "25+", icon: BookOpen },
];

const hobbies = [
  {
    name: "Reading Tech Blogs",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
    description: "Always learning new tech",
  },
  {
    name: "Open Source",
    icon: Github,
    color: "from-gray-500 to-slate-500",
    description: "Contributing to community",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    color: "from-purple-500 to-pink-500",
    description: "Strategy & RPG games",
  },
  {
    name: "Music Production",
    icon: Music,
    color: "from-green-500 to-emerald-500",
    description: "Creating beats",
  },
  {
    name: "Photography",
    icon: Camera,
    color: "from-amber-500 to-orange-500",
    description: "Street & nature",
  },
  {
    name: "Traveling",
    icon: Plane,
    color: "from-indigo-500 to-blue-500",
    description: "Exploring new places",
  },
  {
    name: "Fitness",
    icon: Dumbbell,
    color: "from-red-500 to-orange-500",
    description: "Staying active",
  },
  {
    name: "Digital Art",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    description: "Creative design",
  },
];

const likes = [
  { name: "Coffee", icon: Coffee, emoji: "☕" },
  { name: "Podcasts", icon: Headphones, emoji: "🎧" },
  { name: "Sci-Fi Movies", icon: Film, emoji: "🎬" },
  { name: "Chess", icon: Trophy, emoji: "♟️" },
  { name: "Nature", icon: Mountain, emoji: "⛰️" },
  { name: "Coding", icon: Code, emoji: "💻" },
];

const achievements = [
  {
    title: "Open Source Contributor",
    description: "Contributed to 10+ open source projects",
    icon: Github,
  },
  {
    title: "Tech Speaker",
    description: "Spoke at 5+ tech conferences",
    icon: Mic,
  },
  { title: "Hackathon Winner", description: "Won 3 hackathons", icon: Trophy },
  {
    title: "Certified Developer",
    description: "AWS & MongoDB certified",
    icon: Award,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080b12]">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
            <Sparkles className="h-3 w-3 text-purple-400" />
            <span className="text-[10px] sm:text-xs font-medium text-purple-300">
              Get to Know Me
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
            About{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Me
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            A passionate developer dedicated to creating impactful digital
            experiences
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-2 sm:p-3 rounded-xl bg-slate-800/30 border border-slate-700/50"
              >
                <div className="inline-flex p-1.5 rounded-lg bg-purple-500/10 mb-1">
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-400" />
                </div>
                <div className="text-base sm:text-lg font-black text-white">
                  {stat.value}
                </div>
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          {/* Left Column: Profile & Info */}
          <div className="lg:col-span-1 space-y-4 lg:space-y-5">
            {/* Profile Card */}
            <Card className="bg-slate-800/30 border border-slate-700/50 overflow-hidden">
              <CardContent className="p-4 sm:p-5 text-center">
                <div className="relative inline-block mx-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-30"></div>
                  <Avatar className="h-20 w-20 sm:h-24 sm:w-24 mx-auto border-4 border-slate-800 relative">
                    <AvatarImage src="/romarick.jpeg" alt="Bongnteh Romarick" />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg sm:text-xl font-black">
                      BR
                    </AvatarFallback>
                  </Avatar>
                </div>

                <h2 className="text-base sm:text-lg font-black text-white mt-3">
                  Bongnteh Romarick
                </h2>
                <p className="text-xs sm:text-sm text-purple-400 font-semibold">
                  Full-Stack Developer
                </p>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-2">
                  <MapPin className="h-3 w-3" />
                  <span>Cameroon</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  <Calendar className="h-3 w-3" />
                  <span>5+ Years</span>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  <Link href="/contact">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs h-8 px-3 sm:px-4 font-semibold"
                    >
                      <Mail className="mr-1.5 h-3 w-3" />
                      Contact
                    </Button>
                  </Link>
                  <Link href="/experience">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-700 text-slate-300 text-xs h-8 px-3 sm:px-4 font-medium"
                    >
                      Experience
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Availability Card */}
            <Card className="bg-slate-800/30 border border-slate-700/50">
              <CardContent className="p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] sm:text-xs font-semibold text-green-400">
                    Available for Work
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-400">
                  Open to freelance opportunities and collaborations
                </p>
              </CardContent>
            </Card>

            {/* Hobbies Card - New */}
            <Card className="bg-slate-800/30 border border-slate-700/50">
              <CardHeader className="pb-2 pt-3 sm:pt-4 px-3 sm:px-4">
                <CardTitle className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                  <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-pink-400" />
                  Hobbies & Interests
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3 sm:pb-4 px-3 sm:px-4">
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {hobbies.map((hobby, index) => {
                    const Icon = hobby.icon;
                    return (
                      <div
                        key={index}
                        className="group p-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all duration-300"
                      >
                        <div className="flex items-center gap-1.5">
                          <div
                            className={`p-1 rounded bg-gradient-to-r ${hobby.color} bg-opacity-10`}
                          >
                            <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] sm:text-[10px] font-semibold text-slate-300 truncate">
                              {hobby.name}
                            </p>
                            <p className="text-[7px] sm:text-[8px] text-slate-500 truncate">
                              {hobby.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Likes Card - New */}
            <Card className="bg-slate-800/30 border border-slate-700/50">
              <CardHeader className="pb-2 pt-3 sm:pt-4 px-3 sm:px-4">
                <CardTitle className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                  <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400" />
                  Things I Love
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-3 sm:pb-4 px-3 sm:px-4">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {likes.map((like, index) => {
                    const Icon = like.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800/50"
                      >
                        <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-purple-400" />
                        <span className="text-[9px] sm:text-[10px] text-slate-300 font-medium">
                          {like.name}
                        </span>
                        <span className="text-[8px] sm:text-[9px]">
                          {like.emoji}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Bio & Skills */}
          <div className="lg:col-span-2 space-y-4 lg:space-y-5">
            {/* Bio Section */}
            <Card className="bg-slate-800/30 border border-slate-700/50">
              <CardContent className="p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-black text-white mb-3 flex items-center gap-2">
                  <Rocket className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-400" />
                  My Journey
                </h3>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <p>
                    Hello! I'm a full-stack developer with a deep-seated passion
                    for building things for the web. My journey into programming
                    started with a simple "Hello, World!" and has since evolved
                    into a career where I get to solve complex problems and
                    build applications that make a difference.
                  </p>
                  <p>
                    I thrive on the challenge of bridging the gap between an
                    idea and a fully-realized product. Whether it's architecting
                    a robust backend, crafting a pixel-perfect UI, or optimizing
                    database performance, I'm always eager to learn and apply
                    new technologies to create efficient, scalable, and
                    user-friendly solutions.
                  </p>
                  <p>
                    Beyond the code, I am a firm believer in the power of
                    community and knowledge sharing. My blog serves as a
                    platform where I document my learnings, share insights, and
                    connect with fellow developers.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements Section - New */}
            <Card className="bg-slate-800/30 border border-slate-700/50">
              <CardContent className="p-4 sm:p-5">
                <h3 className="text-sm sm:text-base font-black text-white mb-3 flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-yellow-400" />
                  Achievements
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                  {achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50"
                      >
                        <div className="p-1.5 rounded-lg bg-purple-500/10">
                          <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-[10px] sm:text-xs font-semibold text-white">
                            {achievement.title}
                          </p>
                          <p className="text-[8px] sm:text-[9px] text-slate-500">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Frontend Skills */}
              <Card className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                <CardHeader className="pb-2 pt-3 sm:pt-4 px-3 sm:px-4">
                  <CardTitle className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                    <Code className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
                    Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-3 sm:pb-4 px-3 sm:px-4">
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {skills.frontend.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-[9px] sm:text-[10px] bg-slate-700/50 text-slate-300 px-1.5 sm:px-2 py-0.5 font-medium"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Backend Skills */}
              <Card className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                <CardHeader className="pb-2 pt-3 sm:pt-4 px-3 sm:px-4">
                  <CardTitle className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                    <Server className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-400" />
                    Backend
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-3 sm:pb-4 px-3 sm:px-4">
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {skills.backend.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-[9px] sm:text-[10px] bg-slate-700/50 text-slate-300 px-1.5 sm:px-2 py-0.5 font-medium"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tools & Platforms */}
              <Card className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                <CardHeader className="pb-2 pt-3 sm:pt-4 px-3 sm:px-4">
                  <CardTitle className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                    <Briefcase className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-purple-400" />
                    Tools & Platforms
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-3 sm:pb-4 px-3 sm:px-4">
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {skills.tools.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-[9px] sm:text-[10px] bg-slate-700/50 text-slate-300 px-1.5 sm:px-2 py-0.5 font-medium"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Design & UX */}
              <Card className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                <CardHeader className="pb-2 pt-3 sm:pt-4 px-3 sm:px-4">
                  <CardTitle className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                    <PenTool className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
                    Design & UX
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-3 sm:pb-4 px-3 sm:px-4">
                  <div className="flex flex-wrap gap-1 sm:gap-1.5">
                    {skills.design.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-[9px] sm:text-[10px] bg-slate-700/50 text-slate-300 px-1.5 sm:px-2 py-0.5 font-medium"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Quote Section - New */}
        <div className="mt-8 sm:mt-10 lg:mt-12">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 p-5 sm:p-6 text-center">
            <div className="relative z-10">
              <div className="inline-flex p-2 rounded-full bg-purple-500/20 mb-3">
                <Quote className="h-4 w-4 text-purple-400" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 italic max-w-2xl mx-auto">
                "Code is not just about solving problems, it's about creating
                solutions that make people's lives better."
              </p>
              <p className="text-[10px] sm:text-xs text-purple-400 mt-2 font-semibold">
                - Bongnteh Romarick
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 sm:mt-10 lg:mt-12">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 p-4 sm:p-6 text-center">
            <div className="relative z-10">
              <h3 className="text-sm sm:text-base font-black text-white mb-2">
                Want to know more?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-3 sm:mb-4 max-w-md mx-auto">
                Check out my projects or get in touch to discuss potential
                collaboration.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <Link href="/projects">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4 font-semibold">
                    View My Work
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs sm:text-sm h-8 sm:h-9 px-3 sm:px-4 font-medium"
                  >
                    Contact Me
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

// Quote icon component
function Quote(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10 11h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" />
      <path d="M3 9.5L10 3" />
      <path d="M18 11h-4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1z" />
      <path d="M11 9.5L18 3" />
    </svg>
  );
}
