"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Twitter
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'Framer Motion'],
  backend: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'REST APIs', 'GraphQL'],
  tools: ['Git', 'Docker', 'Vercel', 'Firebase', 'Stripe', 'AWS'],
  design: ['Figma', 'Adobe XD', 'Responsive Design', 'UI/UX Principles', 'Prototyping'],
};

const stats = [
  { label: 'Years Experience', value: '5+', icon: Briefcase },
  { label: 'Projects Completed', value: '50+', icon: Rocket },
  { label: 'Happy Clients', value: '40+', icon: Heart },
  { label: 'Coffee Consumed', value: '∞', icon: PenTool },
];

const interests = [
  { name: 'Open Source', icon: Github, color: 'from-gray-500 to-slate-500' },
  { name: 'Tech Writing', icon: PenTool, color: 'from-blue-500 to-cyan-500' },
  { name: 'AI & ML', icon: Cpu, color: 'from-purple-500 to-pink-500' },
  { name: 'Photography', icon: Camera, color: 'from-amber-500 to-orange-500' },
];

function Camera(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16 lg:py-20">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span className="text-xs font-medium text-purple-300">Get to Know Me</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            About <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Me</span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
            A passionate developer dedicated to creating impactful digital experiences
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10 max-w-3xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center p-3 rounded-xl bg-slate-800/30 border border-slate-700/50">
                <div className="inline-flex p-1.5 rounded-lg bg-purple-500/10 mb-1">
                  <Icon className="h-4 w-4 text-purple-400" />
                </div>
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-[10px] text-slate-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Profile & Info */}
          <div className="lg:col-span-1 space-y-5">
            {/* Profile Card */}
            <Card className="bg-slate-800/30 border border-slate-700/50 overflow-hidden">
              <CardContent className="p-5 text-center">
                <div className="relative inline-block mx-auto">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur opacity-30"></div>
                  <Avatar className="h-24 w-24 mx-auto border-4 border-slate-800 relative">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bongnteh&backgroundColor=7c3aed" alt="Bongnteh Romarick" />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl">BR</AvatarFallback>
                  </Avatar>
                </div>
                
                <h2 className="text-lg font-bold text-white mt-3">Bongnteh Romarick</h2>
                <p className="text-sm text-purple-400">Full-Stack Developer</p>
                
                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 mt-2">
                  <MapPin className="h-3 w-3" />
                  <span>Cameroon</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  <Calendar className="h-3 w-3" />
                  <span>5+ Years</span>
                </div>
                
                <div className="flex justify-center gap-2 mt-4">
                  <Link href="/contact">
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs h-8">
                      <Mail className="mr-1.5 h-3 w-3" />
                      Contact
                    </Button>
                  </Link>
                  <Link href="/experience">
                    <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 text-xs h-8">
                      Experience
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Availability Card */}
            <Card className="bg-slate-800/30 border border-slate-700/50">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-medium text-green-400">Available for Work</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Open to freelance opportunities and collaborations
                </p>
              </CardContent>
            </Card>

            {/* Interests Card */}
            <Card className="bg-slate-800/30 border border-slate-700/50">
              <CardHeader className="pb-2 pt-4 px-4">
                <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-400" />
                  Interests
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4 px-4">
                <div className="grid grid-cols-2 gap-2">
                  {interests.map((interest, index) => {
                    const Icon = interest.icon;
                    return (
                      <div key={index} className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-800/50">
                        <div className={`p-1 rounded bg-gradient-to-r ${interest.color} bg-opacity-10`}>
                          <Icon className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-[10px] text-slate-300">{interest.name}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Bio & Skills */}
          <div className="lg:col-span-2 space-y-5">
            {/* Bio Section */}
            <Card className="bg-slate-800/30 border border-slate-700/50">
              <CardContent className="p-5">
                <h3 className="text-base font-semibold text-white mb-3 flex items-center gap-2">
                  <Rocket className="h-4 w-4 text-purple-400" />
                  My Journey
                </h3>
                <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                  <p>
                    Hello! I'm a full-stack developer with a deep-seated passion for building things for the web. 
                    My journey into programming started with a simple "Hello, World!" and has since evolved into 
                    a career where I get to solve complex problems and build applications that make a difference.
                  </p>
                  <p>
                    I thrive on the challenge of bridging the gap between an idea and a fully-realized product. 
                    Whether it's architecting a robust backend, crafting a pixel-perfect UI, or optimizing database 
                    performance, I'm always eager to learn and apply new technologies to create efficient, scalable, 
                    and user-friendly solutions.
                  </p>
                  <p>
                    Beyond the code, I am a firm believer in the power of community and knowledge sharing. 
                    My blog serves as a platform where I document my learnings, share insights, and connect with 
                    fellow developers.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Skills Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Frontend Skills */}
              <Card className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                    <Code className="h-4 w-4 text-blue-400" />
                    Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4 px-4">
                  <div className="flex flex-wrap gap-1.5">
                    {skills.frontend.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-[10px] bg-slate-700/50 text-slate-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Backend Skills */}
              <Card className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                    <Server className="h-4 w-4 text-green-400" />
                    Backend
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4 px-4">
                  <div className="flex flex-wrap gap-1.5">
                    {skills.backend.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-[10px] bg-slate-700/50 text-slate-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tools & Platforms */}
              <Card className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-purple-400" />
                    Tools & Platforms
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4 px-4">
                  <div className="flex flex-wrap gap-1.5">
                    {skills.tools.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-[10px] bg-slate-700/50 text-slate-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Design & UX */}
              <Card className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
                <CardHeader className="pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                    <PenTool className="h-4 w-4 text-amber-400" />
                    Design & UX
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4 px-4">
                  <div className="flex flex-wrap gap-1.5">
                    {skills.design.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-[10px] bg-slate-700/50 text-slate-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-10">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20 p-6 text-center">
            <div className="relative z-10">
              <h3 className="text-base font-semibold text-white mb-2">
                Want to know more?
              </h3>
              <p className="text-sm text-slate-300 mb-4 max-w-md mx-auto">
                Check out my projects or get in touch to discuss potential collaboration.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/projects">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    View My Work
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
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