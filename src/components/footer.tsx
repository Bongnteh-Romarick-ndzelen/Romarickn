"use client";

import { useState } from "react";
import {
  Code,
  Github,
  Mail,
  Phone,
  Heart,
  Linkedin,
  Twitter,
  Facebook,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscriptionService } from "@/lib/services/subscription.service";

function WhatsAppIcon(props: React.ComponentProps<"svg">) {
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
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await subscriptionService.subscribe(email);
      if (response.success) {
        setIsSuccess(true);
        setEmail("");
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setError(response.message || "Subscription failed");
        setTimeout(() => setError(""), 5000);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Subscription failed");
      setTimeout(() => setError(""), 5000);
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
    location: "Cameroon",
  };

  const telNumber = contactInfo.phone.replace("+", "");
  const whatsappNumber = contactInfo.whatsapp.replace("+", "");

  return (
    <footer className="border-t bg-slate-950/80 border-slate-800/50 mt-auto">
      <div className="container mx-auto px-4 py-10 md:py-12">
        {/* Main Footer Grid - Organized Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1 - Brand & About */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="p-1.5 rounded-md bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <Code className="h-5 w-5 text-purple-400" />
              </div>
              <span className="font-bold text-white text-sm">
                Bongnteh Romarick
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Full-stack developer passionate about building scalable web
              applications and creating impactful digital experiences.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-500">
              <MapPin className="h-3 w-3 text-purple-400" />
              <span>{contactInfo.location}</span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <Clock className="h-3 w-3 text-purple-400" />
              <span>UTC+1</span>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-xs text-slate-400 hover:text-purple-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-xs text-slate-400 hover:text-purple-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-xs text-slate-400 hover:text-purple-400 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/experience"
                  className="text-xs text-slate-400 hover:text-purple-400 transition-colors"
                >
                  Experience
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-xs text-slate-400 hover:text-purple-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-xs text-slate-400 hover:text-purple-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-400 hover:text-purple-400 transition-colors group"
                >
                  <Mail className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                  <span>{contactInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${telNumber}`}
                  className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-400 hover:text-purple-400 transition-colors group"
                >
                  <Phone className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                  <span>{contactInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center md:justify-start gap-2 text-xs text-slate-400 hover:text-emerald-400 transition-colors group"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-semibold text-white mb-4">
              Newsletter
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Subscribe to get notified about new posts.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder-slate-500 w-full"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm h-9"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Subscribing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    <Send className="h-3.5 w-3.5" />
                    Subscribe
                  </span>
                )}
              </Button>
            </form>
            {isSuccess && (
              <div className="mt-2 flex items-center justify-center md:justify-start gap-1.5 text-[10px] text-green-400">
                <CheckCircle className="h-3 w-3" />
                <span>Subscribed successfully!</span>
              </div>
            )}
            {error && (
              <div className="mt-2 flex items-center justify-center md:justify-start gap-1.5 text-[10px] text-red-400">
                <AlertCircle className="h-3 w-3" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Social Links Row */}
        <div className="py-4 border-t border-slate-800/50 flex flex-wrap justify-center gap-2">
          <Link
            href={`https://github.com/${contactInfo.github}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-300 rounded-full"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href={`https://linkedin.com/in/${contactInfo.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300 rounded-full"
              title="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href={`https://x.com/${contactInfo.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 transition-all duration-300 rounded-full"
              title="Twitter"
            >
              <Twitter className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href={`https://facebook.com/${contactInfo.facebook}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-600/10 transition-all duration-300 rounded-full"
              title="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Copyright Row */}
        <div className="pt-4 border-t border-slate-800/50 text-center">
          <p className="text-[10px] text-slate-500">
            &copy; {new Date().getFullYear()} Bongnteh Romarick Ndzelen. All
            rights reserved.
          </p>
          <p className="text-[9px] text-slate-600 mt-1 flex items-center justify-center gap-1">
            Made with <Heart className="h-2.5 w-2.5 text-pink-400" /> using
            Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
