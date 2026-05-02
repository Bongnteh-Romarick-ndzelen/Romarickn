'use client';

import { useState } from 'react';
import { Code, Github, Mail, Phone, Heart, Linkedin, Twitter, Facebook, Send, CheckCircle, AlertCircle, MapPin, Clock, MessageCircle, Bot, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { subscriptionService } from '@/lib/services/subscription.service';
import { MyAIAssistance } from './AIAssistance';

function WhatsAppIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
    )
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await subscriptionService.subscribe(email);
      if (response.success) {
        setIsSuccess(true);
        setEmail('');
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError(response.message || 'Subscription failed');
        setTimeout(() => setError(''), 5000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Subscription failed');
      setTimeout(() => setError(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = {
    email: "ndzelenromarick@gmail.com",
    phone: "+237676154253",
    whatsapp: "+237676154253",
    github: "bongnteh-romarick-ndzelen",
    linkedin: "bongnteh-romarick-ndzelen-b2946023b",
    twitter: "BongntehNdzelen",
    facebook: "Romarick10",
  };

  const telNumber = contactInfo.phone.replace('+', '');
  const whatsappNumber = contactInfo.whatsapp.replace('+', '');

  return (
    <>
      {/* AI Chat Assistant */}
      <MyAIAssistance />
      
      <footer className="border-t bg-slate-950/80 border-slate-800/50 mt-auto">
        <div className="container mx-auto px-4 py-10 md:py-12">
          
          {/* Newsletter Subscription Section */}
          <div className="mb-8 pb-6 border-b border-slate-800/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-sm font-semibold text-white mb-1">Subscribe to my newsletter</h3>
                <p className="text-xs text-slate-400">Get the latest posts delivered right to your inbox.</p>
              </div>
              
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <div className="flex-1 relative">
                  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder-slate-500"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm h-9 px-4 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-1.5">
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Subscribing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <Send className="h-3.5 w-3.5" />
                      Subscribe
                    </span>
                  )}
                </Button>
              </form>
            </div>
            
            {/* Success/Error Messages */}
            {isSuccess && (
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-green-400 bg-green-500/10 p-2 rounded-lg animate-in fade-in duration-300">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Successfully subscribed! Welcome to my newsletter.</span>
              </div>
            )}
            {error && (
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-red-400 bg-red-500/10 p-2 rounded-lg animate-in fade-in duration-300">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Main Footer Content */}
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            {/* Brand & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  <Code className="h-4 w-4 text-purple-400" />
                </div>
                <p className="text-xs text-slate-400">
                  &copy; {new Date().getFullYear()} Bongnteh Romarick Ndzelen
                </p>
              </div>
              <p className="text-[10px] text-slate-500 flex items-center gap-1">
                Made with <Heart className="h-2.5 w-2.5 text-pink-400" /> using Next.js & Tailwind
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-1">
              <Link href={`mailto:${contactInfo.email}`} passHref>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Email"
                  className="h-8 w-8 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                  title="Send me an email"
                >
                  <Mail className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href={`tel:${telNumber}`} passHref>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Phone"
                  className="h-8 w-8 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
                  title="Call me"
                >
                  <Phone className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" passHref>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="WhatsApp"
                  className="h-8 w-8 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300"
                  title="Message me on WhatsApp"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href={`https://github.com/${contactInfo.github}`} target="_blank" rel="noopener noreferrer" passHref>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="GitHub"
                  className="h-8 w-8 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300"
                  title="View my GitHub profile"
                >
                  <Github className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href={`https://linkedin.com/in/${contactInfo.linkedin}`} target="_blank" rel="noopener noreferrer" passHref>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="LinkedIn"
                  className="h-8 w-8 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href={`https://x.com/${contactInfo.twitter}`} target="_blank" rel="noopener noreferrer" passHref>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Twitter"
                  className="h-8 w-8 text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-all duration-300"
                  title="Follow me on X"
                >
                  <Twitter className="h-3.5 w-3.5" />
                </Button>
              </Link>
              <Link href={`https://facebook.com/${contactInfo.facebook}`} target="_blank" rel="noopener noreferrer" passHref>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Facebook"
                  className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-600/10 transition-all duration-300"
                  title="Connect on Facebook"
                >
                  <Facebook className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Contact Info */}
          <div className="mt-5 pt-4 border-t border-slate-800/30">
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <Mail className="h-3 w-3" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-purple-400 transition-colors">
                  {contactInfo.email}
                </a>
              </div>
              <div className="hidden md:block text-slate-600">•</div>
              <div className="flex items-center gap-1.5">
                <Phone className="h-3 w-3" />
                <a href={`tel:${telNumber}`} className="hover:text-purple-400 transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="hidden md:block text-slate-600">•</div>
              <div className="flex items-center gap-1.5">
                <Code className="h-3 w-3" />
                <a href={`https://github.com/${contactInfo.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">
                  @{contactInfo.github.split('-')[0]}
                </a>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
}