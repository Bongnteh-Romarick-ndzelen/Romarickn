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
  MessageCircle,
  Bot,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscriptionService } from "@/lib/services/subscription.service";
import { AIAssistance } from "./AIAssistance";
import { useToast } from "@/hooks/use-toast";

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
        // Fixed: Remove variant: "success" - use default or just title
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

      <footer className="border-t bg-slate-950/80 border-slate-800/50 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          {/* Newsletter Subscription Section */}
          <div className="mb-4 sm:mb-5 md:mb-6 pb-3 sm:pb-4 border-b border-slate-800/50">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
              <div className="text-center lg:text-left">
                <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5">
                  Subscribe to newsletter
                </h3>
                <p className="text-[9px] sm:text-[10px] text-slate-400">
                  Get latest posts delivered to your inbox
                </p>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-row gap-2 w-full max-w-md"
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-500" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-7 sm:pl-8 py-1.5 h-8 sm:h-9 text-[10px] sm:text-xs bg-slate-800/50 border-slate-700 focus:border-teal-500 text-white placeholder:text-slate-500 rounded-lg"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-[10px] sm:text-xs h-8 sm:h-9 px-2.5 sm:px-3 rounded-lg font-semibold whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-1">
                      <div className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      <span className="hidden sm:inline">Sub...</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Send className="h-3 w-3" />
                      <span className="hidden sm:inline">Subscribe</span>
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="flex flex-col items-center justify-between gap-4 sm:gap-5 md:flex-row">
            {/* Brand & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
              <div className="flex items-center gap-1.5">
                <div className="p-1 rounded-md bg-gradient-to-br from-teal-500/20 to-cyan-500/20">
                  <Code className="h-3 w-3 text-teal-400" />
                </div>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-medium">
                  &copy; {new Date().getFullYear()} Bongnteh Romarick
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center gap-0.5">
              <Link href={`mailto:${contactInfo.email}`} passHref>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Email"
                  className="h-7 w-7 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                  title="Send me an email"
                >
                  <Mail className="h-3 w-3" />
                </Button>
              </Link>
              <Link href={`tel:${telNumber}`} passHref>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Phone"
                  className="h-7 w-7 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"
                  title="Call me"
                >
                  <Phone className="h-3 w-3" />
                </Button>
              </Link>
              <Link
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="WhatsApp"
                  className="h-7 w-7 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg"
                  title="Message me on WhatsApp"
                >
                  <WhatsAppIcon className="h-3 w-3" />
                </Button>
              </Link>
              <Link
                href={`https://github.com/${contactInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="GitHub"
                  className="h-7 w-7 text-slate-400 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg"
                  title="View my GitHub profile"
                >
                  <Github className="h-3 w-3" />
                </Button>
              </Link>
              <Link
                href={`https://linkedin.com/in/${contactInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="LinkedIn"
                  className="h-7 w-7 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="h-3 w-3" />
                </Button>
              </Link>
              <Link
                href={`https://x.com/${contactInfo.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Twitter"
                  className="h-7 w-7 text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg"
                  title="Follow me on X"
                >
                  <Twitter className="h-3 w-3" />
                </Button>
              </Link>
              <Link
                href={`https://facebook.com/${contactInfo.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Facebook"
                  className="h-7 w-7 text-slate-400 hover:text-blue-600 hover:bg-blue-600/10 rounded-lg"
                  title="Connect on Facebook"
                >
                  <Facebook className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
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