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
  Mail,
  FolderOpen,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-slate-50/50 selection:bg-blue-500 selection:text-white flex items-center justify-center px-4 py-8 relative overflow-hidden">
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Radley:ital@0;1&display=swap');
        
        h1, h2, h3, h4, .font-heading {
          font-family: 'Radley', serif !important;
          font-weight: 700 !important;
        }
        p, span, div, a, button, label, .font-body {
          font-family: 'Lato', sans-serif !important;
        }
      `}</style>

      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-blue-100/40 to-indigo-100/30 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-purple-100/30 rounded-full blur-[120px]" />
      </div>

      {/* Animated Glow that follows mouse */}
      <div
        className="absolute w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none transition-all duration-300 z-0"
        style={{
          left: mousePosition.x - 160,
          top: mousePosition.y - 160,
        }}
      />

      <div className="w-full max-w-md text-center relative z-10">
        {/* 404 Text with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-6"
        >
          <div className="text-8xl md:text-9xl font-black text-slate-200/50 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              404
            </div>
          </div>
        </motion.div>

        {/* Icon Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-3 mb-5"
        >
          <div className="p-2 rounded-full bg-blue-50 border-2 border-blue-200">
            <Compass className="h-5 w-5 text-blue-600" />
          </div>
          <div className="p-2 rounded-full bg-indigo-50 border-2 border-indigo-200">
            <Search className="h-5 w-5 text-indigo-600" />
          </div>
          <div className="p-2 rounded-full bg-purple-50 border-2 border-purple-200">
            <AlertTriangle className="h-5 w-5 text-purple-600" />
          </div>
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3 mb-6"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Page Not Found
          </h1>
          <p className="text-base text-slate-600 font-bold max-w-sm mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-sm font-bold text-slate-400">Error 404</p>
        </motion.div>

        {/* Navigation Buttons
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white border-2 border-slate-200/80 rounded-2xl p-5 shadow-sm mb-5"
        >
          <p className="text-sm font-bold text-slate-600 mb-3 flex items-center justify-center gap-2">
            <Zap className="h-4 w-4 text-blue-500" />
            Quick Navigation
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold h-10 rounded-xl shadow-lg shadow-blue-600/20 transition-all">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/blog">
              <Button
                variant="outline"
                className="w-full border-2 border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-bold h-10 rounded-xl transition-all"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Blog
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="outline"
                className="w-full border-2 border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-bold h-10 rounded-xl transition-all"
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                Projects
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="w-full border-2 border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-bold h-10 rounded-xl transition-all"
              >
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </Button>
            </Link>
          </div>
        </motion.div> */}

        {/* Go Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col items-center gap-2"
        >
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back to Previous Page
          </button>
          <p className="text-sm font-semibold text-slate-500">
            If you believe this is an error, please{" "}
            <Link href="/contact" className="text-blue-600 hover:text-blue-700 font-bold">
              contact me
            </Link>
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 pt-4 border-t-2 border-slate-200"
        >
          <p className="text-sm font-bold text-slate-500">
            &copy; {new Date().getFullYear()} Bongnteh Romarick. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}