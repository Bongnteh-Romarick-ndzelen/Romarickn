"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  ArrowLeft,
  Search,
  Code,
  Sparkles,
  AlertTriangle,
  Compass,
  Zap,
} from "lucide-react";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Animated Glow that follows mouse */}
      <div
        className="absolute w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl pointer-events-none transition-all duration-300"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
        }}
      />

      <div className="w-full max-w-md text-center relative z-10">
        {/* 404 Text with Animation */}
        <div className="relative mb-6">
          <div className="text-8xl md:text-9xl font-black text-purple-500/20 select-none animate-pulse">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl md:text-9xl font-black bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
              404
            </div>
          </div>
        </div>

        {/* Icon Row */}
        <div className="flex justify-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Compass className="h-5 w-5 text-purple-400 animate-pulse" />
          </div>
          <div className="p-2 rounded-full bg-pink-500/10 border border-pink-500/20">
            <Search className="h-5 w-5 text-pink-400" />
          </div>
          <div className="p-2 rounded-full bg-purple-500/10 border border-purple-500/20">
            <AlertTriangle className="h-5 w-5 text-purple-400 animate-pulse" />
          </div>
        </div>

        {/* Main Message */}
        <div className="space-y-3 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Lost in Space?
          </h1>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            The page you're looking for seems to have wandered off into the
            digital void.
          </p>
          <p className="text-xs text-slate-500">Error 404: Page not found</p>
        </div>

        {/* Search Suggestion */}
        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 mb-6">
          <p className="text-xs text-slate-400 mb-3 flex items-center justify-center gap-2">
            <Zap className="h-3.5 w-3.5 text-purple-400" />
            Quick Navigation
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs h-9">
                <Home className="mr-1.5 h-3.5 w-3.5" />
                Home
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 text-xs h-9"
              >
                <Code className="mr-1.5 h-3.5 w-3.5" />
                Blog
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 text-xs h-9"
              >
                Projects
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 text-xs h-9"
              >
                Contact
              </Button>
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-purple-400 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Go Back to Previous Page
          </button>
          <p className="text-[10px] text-slate-600">
            If you believe this is an error, please{" "}
            <Link
              href="/contact"
              className="text-purple-400 hover:text-purple-300"
            >
              contact me
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800/50">
          <p className="text-[10px] text-slate-600">
            &copy; {new Date().getFullYear()} Bongnteh Romarick. All rights
            reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 2s ease infinite;
        }
      `}</style>
    </div>
  );
}
