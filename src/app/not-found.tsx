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
    <div className="min-h-screen bg-[#111D3A] flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(64,224,208,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(64,224,208,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Glow orbs */}
      <div className="absolute top-[-80px] right-[-60px] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Animated Glow that follows mouse */}
      <div
        className="absolute w-64 h-64 bg-teal-500/5 rounded-full filter blur-3xl pointer-events-none transition-all duration-300 z-0"
        style={{
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
        }}
      />

      <div className="w-full max-w-sm text-center relative z-10">
        {/* 404 Text with Animation */}
        <div className="relative mb-4">
          <div className="text-7xl md:text-8xl font-black text-teal-500/10 select-none animate-pulse">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-7xl md:text-8xl font-black bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              404
            </div>
          </div>
        </div>

        {/* Icon Row - Smaller */}
        <div className="flex justify-center gap-2 mb-4">
          <div className="p-1.5 rounded-full bg-teal-500/10 border border-teal-500/20">
            <Compass className="h-3.5 w-3.5 text-teal-400" />
          </div>
          <div className="p-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            <Search className="h-3.5 w-3.5 text-cyan-400" />
          </div>
          <div className="p-1.5 rounded-full bg-teal-500/10 border border-teal-500/20">
            <AlertTriangle className="h-3.5 w-3.5 text-teal-400" />
          </div>
        </div>

        {/* Main Message - Compact */}
        <div className="space-y-1.5 mb-5">
          <h1 className="text-lg font-bold text-white">Page Not Found</h1>
          <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-[9px] text-slate-500">Error 404</p>
        </div>

        {/* Navigation Buttons - Compact */}
        <div className="bg-slate-800/30 border border-slate-700/40 rounded-lg p-2.5 mb-4">
          <p className="text-[9px] text-slate-400 mb-2 flex items-center justify-center gap-1.5">
            <Zap className="h-2.5 w-2.5 text-teal-400" />
            Quick Navigation
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white text-[10px] h-7 rounded-md">
                <Home className="mr-1 h-3 w-3" />
                Home
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 text-[10px] h-7 rounded-md"
              >
                <Code className="mr-1 h-3 w-3" />
                Blog
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 text-[10px] h-7 rounded-md"
              >
                Projects
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 text-[10px] h-7 rounded-md"
              >
                Contact
              </Button>
            </Link>
          </div>
        </div>

        {/* Go Back Button */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-1.5 text-[9px] text-slate-400 hover:text-teal-400 transition-colors"
          >
            <ArrowLeft className="h-2.5 w-2.5" />
            Go Back to Previous Page
          </button>
          <p className="text-[8px] text-slate-600">
            If you believe this is an error, please{" "}
            <Link href="/contact" className="text-teal-400 hover:text-teal-300">
              contact me
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800/30">
          <p className="text-[7px] text-slate-600">
            &copy; {new Date().getFullYear()} Bongnteh Romarick. All rights
            reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
