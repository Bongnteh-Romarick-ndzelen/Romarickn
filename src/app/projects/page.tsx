
import { Header } from '@/components/portfolio/header';
import { Footer } from '@/components/portfolio/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Project One',
    description: 'A brief description of the first project, highlighting the key technologies and challenges.',
    imageUrl: 'https://picsum.photos/seed/project1/600/400',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Project Two',
    description: 'A brief description of the second project, focusing on the outcomes and user impact.',
    imageUrl: 'https://picsum.photos/seed/project2/600/400',
    tags: ['React', 'Node.js', 'Prisma'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Project Three',
    description: 'A brief description of the third project, detailing the unique features and architecture.',
    imageUrl: 'https://picsum.photos/seed/project3/600/400',
    tags: ['Firebase', 'Genkit', 'AI'],
    liveUrl: '#',
    repoUrl: '#',
  },
];

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
          <header className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4">
              My Work
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
              A selection of projects that showcase my passion for building software.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.title} className="group flex flex-col overflow-hidden bg-slate-900/50 border-slate-800/50 transition-all duration-300 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-900/20 hover:-translate-y-1">
                <CardHeader className="p-0 relative">
                  <Link href={project.liveUrl} passHref target="_blank" rel="noopener noreferrer">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover aspect-video transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                </CardHeader>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-800/50">
                    <Link href={project.liveUrl} passHref target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="default">
                        Live Demo <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={project.repoUrl} passHref target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline" className="bg-transparent border-slate-700">
                        <Github className="mr-2 h-4 w-4" /> Source
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
