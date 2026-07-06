"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
  SiDjango,
  SiFastapi,
  SiTypescript,
  SiNextdotjs,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGraphql,
  SiPython,
} from "react-icons/si";
import { Code, Sparkles, Zap, Rocket } from "lucide-react";

const loadingMessages = [
  "Warming up the engines...",
  "Loading your experience...",
  "Almost there...",
  "Ready to go!",
];

export function LoadingScreenSpinner({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);
    setMessageIndex(0);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 5 + 2;
      });
    }, 80);

    // Message rotation
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1000);

    // Completion timer
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        clearInterval(progressInterval);
        clearInterval(messageInterval);
      }, 400);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
          >
            <div className="relative flex flex-col items-center">
              {/* Background glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[500px] h-[500px] bg-gradient-to-r from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl" />
              </div>

              {/* Logo/Icon with pulse */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-600/20">
                  <Code className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
              </motion.div>

              {/* Brand Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center z-10"
              >
                <h1 className="font-radley text-2xl md:text-3xl font-bold text-slate-900">
                  Bongnteh <span className="text-blue-600">Romarick</span>
                </h1>
                <p className="font-lato text-sm font-semibold text-slate-500 mt-1">
                  Full-Stack Developer
                </p>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 w-64 md:w-80 z-10"
              >
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-lato text-xs font-bold text-slate-500">
                    {loadingMessages[messageIndex]}
                  </span>
                  <span className="font-lato text-xs font-bold text-blue-600">
                    {Math.floor(Math.min(progress, 100))}%
                  </span>
                </div>
              </motion.div>

              {/* Loading dots */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center gap-2 mt-4 z-10"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -4, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-blue-600"
                  />
                ))}
              </motion.div>

              {/* Floating tech icons - subtle background decoration */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[
                  { Icon: SiReact, color: "#61DAFB", x: 10, y: 10, size: 20 },
                  { Icon: SiNodedotjs, color: "#339933", x: 90, y: 15, size: 18 },
                  { Icon: SiTailwindcss, color: "#06B6D4", x: 5, y: 85, size: 22 },
                  { Icon: SiNextdotjs, color: "#000000", x: 92, y: 80, size: 20 },
                  { Icon: SiTypescript, color: "#3178C6", x: 15, y: 50, size: 16 },
                  { Icon: SiMongodb, color: "#47A248", x: 85, y: 50, size: 18 },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.15, 0.15, 0],
                      scale: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 4,
                      delay: index * 0.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="absolute"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <item.Icon 
                      className={`w-${Math.floor(item.size/2)} h-${Math.floor(item.size/2)}`} 
                      style={{ color: item.color, opacity: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && children}
    </>
  );
}