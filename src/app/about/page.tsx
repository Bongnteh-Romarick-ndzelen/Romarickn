
import { Header } from '@/components/portfolio/header';
import { Footer } from '@/components/portfolio/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Code, Cpu, Dna, PenTool, Server } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const skills = {
  frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
  backend: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'REST APIs'],
  tools: ['Git', 'Docker', 'Vercel', 'Firebase', 'Stripe'],
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
          {/* Header */}
          <header className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4">
              About Me
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
              A developer driven by curiosity and a passion for creating meaningful digital experiences.
            </p>
          </header>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Left Column: Bio & Story */}
            <div className="md:col-span-2 space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-slate-700">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bongnteh" alt="Bongnteh Romarick" />
                  <AvatarFallback>BR</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h2 className="text-3xl font-bold text-white">Bongnteh Romarick Ndzelen</h2>
                  <p className="text-blue-400">Full-Stack Developer</p>
                  <p className="text-slate-400 mt-1">Based in Cameroon</p>
                </div>
              </div>

              <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                <p>
                  Hello! I'm a full-stack developer with a deep-seated passion for building things for the web. My journey into programming started with a simple "Hello, World!" and has since evolved into a career where I get to solve complex problems and build applications that make a difference.
                </p>
                <p>
                  I thrive on the challenge of bridging the gap between an idea and a fully-realized product. Whether it's architecting a robust backend, crafting a pixel-perfect UI, or optimizing database performance, I'm always eager to learn and apply new technologies to create efficient, scalable, and user-friendly solutions.
                </p>
                 <p>
                  Beyond the code, I am a firm believer in the power of community and knowledge sharing. This belief is what drives my blog, where I document my learnings, share insights, and connect with fellow developers.
                </p>
              </div>
            </div>

            {/* Right Column: Skills */}
            <div className="space-y-8">
              <Card className="bg-slate-900/50 border-slate-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-400" />
                    <span>Frontend</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {skills.frontend.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-green-400" />
                    <span>Backend</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {skills.backend.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-purple-400" />
                    <span>Tools & Platforms</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {skills.tools.map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
