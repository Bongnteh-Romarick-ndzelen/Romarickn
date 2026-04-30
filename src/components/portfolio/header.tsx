
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code, Menu, X, Sparkles, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLinks = ({ className, mobile = false }: { className?: string; mobile?: boolean }) => (
    <nav className={cn('flex items-center gap-1 md:gap-6', className)}>
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'transition-all duration-200 px-3 py-2 rounded-lg text-sm font-medium relative group',
            mobile 
              ? 'text-white hover:bg-slate-800 w-full justify-between flex'
              : 'hover:text-white',
            pathname === item.href 
              ? mobile
                ? 'bg-slate-800 text-white'
                : 'text-white'
              : mobile
                ? 'text-slate-300'
                : 'text-slate-400 hover:text-slate-300'
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex items-center gap-2">
            {mobile && <ChevronRight className="h-3 w-3" />}
            <span>{item.label}</span>
          </div>
          {!mobile && pathname === item.href && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          )}
          {!mobile && (
            <div className="absolute inset-x-3 -bottom-1 h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
          )}
          {mobile && <ChevronRight className="h-4 w-4 text-slate-500" />}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full transition-all duration-300',
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 shadow-lg' 
        : 'bg-slate-900/80 backdrop-blur-sm border-b border-slate-800/30'
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative p-1.5 rounded-md bg-gradient-to-br from-slate-800 to-slate-900">
                <Code className="h-5 w-5 md:h-6 md:w-6 text-blue-400" />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-white text-sm md:text-base leading-tight whitespace-nowrap">
                Bongnteh-Romarick
              </span>
              <span className="text-[11px] text-slate-400 hidden md:block truncate">
                Full-Stack Developer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
            <Link href="/contact" passHref>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Let's Talk
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="bg-slate-900 border-l border-slate-800/50 w-full max-w-[280px] sm:max-w-[320px] p-0"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="p-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900">
                      <Code className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">Bongnteh-Romarick</h3>
                      <p className="text-xs text-slate-400">Full-Stack Developer</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation */}
                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-1">
                    <NavLinks mobile className="flex-col items-start" />
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="p-6 border-t border-slate-800">
                  <Link href="/contact" passHref onClick={() => setIsMobileMenuOpen(false)}>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      Contact Me
                    </Button>
                  </Link>
                  <p className="text-xs text-slate-500 text-center mt-3">
                    Available for opportunities
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
