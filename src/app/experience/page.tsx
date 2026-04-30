
import { Header } from '@/components/portfolio/header';
import { Footer } from '@/components/portfolio/footer';
import { Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const experiences = [
  {
    role: 'Senior Full-Stack Developer',
    company: 'Tech Solutions Inc.',
    period: 'Jan 2021 - Present',
    description: 'Led the development of a scalable e-commerce platform using Next.js and Prisma. Architected and implemented key features, mentored junior developers, and improved application performance by 30%.',
    skills: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'Docker'],
  },
  {
    role: 'Frontend Developer',
    company: 'Creative Minds Agency',
    period: 'Jun 2018 - Dec 2020',
    description: 'Developed and maintained responsive user interfaces for various client websites using React. Collaborated with designers to translate mockups into high-quality code and improved user experience scores.',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Redux', 'Jest', 'Webpack'],
  },
  {
    role: 'Web Developer Intern',
    company: 'Innovate Startups',
    period: 'May 2017 - Aug 2017',
    description: 'Assisted in building and testing new features for a SaaS application. Gained hands-on experience with modern web technologies and agile development methodologies.',
    skills: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Git'],
  },
];

export default function ExperiencePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
          <header className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter text-white mb-4">
              My Experience
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
              A timeline of my professional journey and growth as a developer.
            </p>
          </header>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 -ml-px w-0.5 h-full bg-slate-700"></div>

            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-12">
                <div className="flex items-center">
                  {/* Circle on timeline */}
                  <div className="z-10 absolute left-6 md:left-1/2 -ml-3.5 flex items-center justify-center w-7 h-7 bg-blue-500 rounded-full ring-8 ring-slate-900">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>

                  <div className={`w-full p-6 bg-slate-900/50 border border-slate-800/50 rounded-lg shadow-md md:ml-auto md:w-1/2 ${index % 2 === 0 ? 'md:mr-auto md:ml-0 md:pr-12' : 'md:pl-12'}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <time className="text-sm font-normal text-slate-400 sm:order-first">{exp.period}</time>
                    </div>
                    <p className="text-base font-semibold text-blue-400 mb-3">{exp.company}</p>
                    <p className="text-slate-300 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
