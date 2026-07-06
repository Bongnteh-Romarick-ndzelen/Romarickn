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
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscriptionService } from "@/lib/services/subscription.service";
import { AIAssistance } from "./AIAssistance";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
  const { toast } = useToast();
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
        toast({
          variant: "success",
          title: "Success! 🎉",
          description: "You have been subscribed to the newsletter.",
        });
        setEmail("");
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        toast({
          title: "Subscription Failed",
          description: response.message || "Subscription failed",
          variant: "destructive",
        });
        setError(response.message || "Subscription failed");
        setTimeout(() => setError(""), 5000);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Subscription failed";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      setError(errorMessage);
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
  };

  const telNumber = contactInfo.phone.replace("+", "");
  const whatsappNumber = contactInfo.whatsapp.replace("+", "");

  return (
    <>
      {/* AI Chat Assistant */}
      <AIAssistance />

      <footer className="border-t-2 bg-slate-900 border-slate-800/50 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
          {/* Newsletter Subscription Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-slate-700/50"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 mb-1">
                  <Sparkles className="h-5 w-5 text-teal-400" />
                  <h3 className="font-['Radley',serif] text-xl sm:text-2xl font-bold text-white">
                    Stay Updated
                  </h3>
                </div>
                <p className="font-['Lato',sans-serif] text-base sm:text-lg font-bold text-slate-300">
                  Get the latest posts delivered to your inbox
                </p>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 w-full max-w-lg"
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 pr-4 py-3 h-12 text-base bg-slate-800/50 border-slate-700 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 text-white placeholder:text-slate-500 rounded-xl font-['Lato',sans-serif] font-semibold"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-base font-bold h-12 px-6 rounded-xl shadow-lg shadow-teal-500/25 transition-all whitespace-nowrap font-['Lato',sans-serif]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span>Subscribing...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Subscribe
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Main Footer Content */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center justify-between gap-5 sm:gap-6 md:flex-row"
          >
            {/* Brand & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20">
                  <Code className="h-5 w-5 text-teal-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-['Radley',serif] text-lg font-bold text-white">
                    Bongnteh Romarick
                  </span>
                  <span className="font-['Lato',sans-serif] text-sm font-semibold text-slate-400">
                    Full-Stack Developer
                  </span>
                </div>
              </div>
              <p className="font-['Lato',sans-serif] text-sm font-bold text-slate-400">
                &copy; {new Date().getFullYear()} All rights reserved.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <Link href={`mailto:${contactInfo.email}`} passHref>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Email"
                  className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-slate-700 hover:border-red-500/30"
                  title="Send me an email"
                >
                  <Mail className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link href={`tel:${telNumber}`} passHref>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Phone"
                  className="p-2.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all border border-slate-700 hover:border-blue-500/30"
                  title="Call me"
                >
                  <Phone className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="WhatsApp"
                  className="p-2.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all border border-slate-700 hover:border-emerald-500/30"
                  title="Message me on WhatsApp"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link
                href={`https://github.com/${contactInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub"
                  className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-all border border-slate-700 hover:border-slate-500"
                  title="View my GitHub profile"
                >
                  <Github className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link
                href={`https://linkedin.com/in/${contactInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                  className="p-2.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all border border-slate-700 hover:border-blue-500/30"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link
                href={`https://x.com/${contactInfo.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Twitter"
                  className="p-2.5 text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 rounded-xl transition-all border border-slate-700 hover:border-sky-500/30"
                  title="Follow me on X"
                >
                  <Twitter className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link
                href={`https://facebook.com/${contactInfo.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Facebook"
                  className="p-2.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all border border-slate-700 hover:border-blue-500/30"
                  title="Connect on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 pt-5 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <span className="font-['Lato',sans-serif] text-sm font-bold text-slate-400">
                Built with
              </span>
              <Heart className="h-4 w-4 text-red-400 fill-red-400" />
              <span className="font-['Lato',sans-serif] text-sm font-bold text-slate-400">
                using Next.js & Tailwind CSS
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-['Lato',sans-serif] text-sm font-bold text-slate-500">
                v2.0.0
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <Link
                href="/privacy"
                className="font-['Lato',sans-serif] text-sm font-bold text-slate-400 hover:text-teal-400 transition-colors"
              >
                Privacy
              </Link>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <Link
                href="/terms"
                className="font-['Lato',sans-serif] text-sm font-bold text-slate-400 hover:text-teal-400 transition-colors"
              >
                Terms
              </Link>
            </div>
          </motion.div>
        </div>
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(20, 184, 166, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(20, 184, 166, 0.7);
        }
      `}</style>
    </>
  );
}