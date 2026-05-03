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

// Tech icons evenly distributed around the circle (360 degrees)
const techIconsOuter = [
  { Icon: SiReact, color: "#61DAFB", angle: 0 },
  { Icon: SiNodedotjs, color: "#339933", angle: 30 },
  { Icon: SiTailwindcss, color: "#06B6D4", angle: 60 },
  { Icon: SiNextdotjs, color: "#FFFFFF", angle: 90 },
  { Icon: SiTypescript, color: "#3178C6", angle: 120 },
  { Icon: SiMongodb, color: "#47A248", angle: 150 },
  { Icon: SiPostgresql, color: "#336791", angle: 180 },
  { Icon: SiDocker, color: "#2496ED", angle: 210 },
  { Icon: SiGraphql, color: "#E10098", angle: 240 },
  { Icon: SiPython, color: "#3776AB", angle: 270 },
  { Icon: SiDjango, color: "#092E20", angle: 300 },
  { Icon: SiFastapi, color: "#009688", angle: 330 },
];

const techIconsInner = [
  { Icon: SiReact, color: "#61DAFB", angle: 15 },
  { Icon: SiNodedotjs, color: "#339933", angle: 75 },
  { Icon: SiTailwindcss, color: "#06B6D4", angle: 135 },
  { Icon: SiTypescript, color: "#3178C6", angle: 195 },
  { Icon: SiMongodb, color: "#47A248", angle: 255 },
  { Icon: SiDocker, color: "#2496ED", angle: 315 },
];

export function LoadingScreenSpinner({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("");

  const loadingMessages = [
    "Initializing components...",
    "Loading modules...",
    "Preparing experience...",
    "Almost ready...",
    "Welcome!",
  ];

  useEffect(() => {
    setIsLoading(true);
    setProgress(0);

    let messageIndex = 0;
    setLoadingMessage(loadingMessages[0]);

    const messageInterval = setInterval(() => {
      messageIndex++;
      if (messageIndex < loadingMessages.length) {
        setLoadingMessage(loadingMessages[messageIndex]);
      }
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 8;
      });
    }, 100);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        clearInterval(messageInterval);
        clearInterval(progressInterval);
      }, 500);
    }, 3000);

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
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
            className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden"
          >
            {/* Animated background particles */}
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-purple-500/20 rounded-full"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                  }}
                  animate={{
                    y: [null, -200, -400],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            <div className="relative">
              {/* Outer Floating Tech Icons */}
              {techIconsOuter.map(({ Icon, color, angle }, index) => {
                const radian = (angle * Math.PI) / 180;
                const radius = 140;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;

                return (
                  <motion.div
                    key={`outer-${index}`}
                    className="absolute"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 1, 0],
                      scale: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 0.1,
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="relative">
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          delay: index * 0.1,
                          repeat: Infinity,
                        }}
                      >
                        <Icon
                          className="w-7 h-7 md:w-8 md:h-8"
                          style={{ color }}
                        />
                      </motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{
                          duration: 2,
                          delay: index * 0.1,
                          repeat: Infinity,
                        }}
                        className="absolute inset-0 rounded-full"
                        style={{
                          backgroundColor: color,
                          filter: "blur(6px)",
                          zIndex: -1,
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}

              {/* Inner Floating Tech Icons */}
              {techIconsInner.map(({ Icon, color, angle }, index) => {
                const radian = (angle * Math.PI) / 180;
                const radius = 90;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;

                return (
                  <motion.div
                    key={`inner-${index}`}
                    className="absolute"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 0.7, 0.7, 0],
                      scale: [0, 0.8, 0.8, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      delay: index * 0.15 + 0.5,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5 md:w-6 md:h-6 opacity-60"
                      style={{ color }}
                    />
                  </motion.div>
                );
              })}

              {/* Main Spinner Container - Reduced Size */}
              <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center">
                {/* Spinner Layer 1 - Outer */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-28 h-28 md:w-32 md:h-32"
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="rgba(139, 92, 246, 0.15)"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2.5"
                      strokeDasharray="264"
                      strokeDashoffset="66"
                      strokeLinecap="round"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        dur="1.5s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </motion.div>

                {/* Spinner Layer 2 - Middle */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="absolute w-20 h-20 md:w-24 md:h-24"
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill="none"
                      stroke="rgba(236, 72, 153, 0.15)"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="30"
                      fill="none"
                      stroke="url(#gradient2)"
                      strokeWidth="2.5"
                      strokeDasharray="188"
                      strokeDashoffset="47"
                      strokeLinecap="round"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="360 50 50"
                        to="0 50 50"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </motion.div>

                {/* Spinner Layer 3 - Inner */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-14 h-14 md:w-16 md:h-16"
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="18"
                      fill="none"
                      stroke="rgba(139, 92, 246, 0.15)"
                      strokeWidth="3"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="18"
                      fill="none"
                      stroke="url(#gradient3)"
                      strokeWidth="3"
                      strokeDasharray="113"
                      strokeDashoffset="28"
                      strokeLinecap="round"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        dur="0.7s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                </motion.div>

                {/* Center Logo */}
                <div className="absolute w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-slate-800 to-slate-900 rounded-full border-2 border-purple-500/40 flex items-center justify-center shadow-lg">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Pulsing background glow */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-20"
                />

                {/* Gradient Definitions */}
                <svg className="absolute" style={{ width: 0, height: 0 }}>
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    <linearGradient
                      id="gradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient
                      id="gradient3"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Brand Text and Progress */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-center"
              >
                {/* <h3 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Romarick
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Full-Stack Developer
                </p> */}

                {/* Progress Bar */}
                {/* <div className="mt-3 w-40 md:w-48 mx-auto">
                  <div className="h-0.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <p className="text-[9px] text-slate-500 mt-1.5">
                    {loadingMessage} {Math.floor(progress)}%
                  </p>
                </div> */}

                {/* Loading dots */}
                <div className="flex justify-center gap-1 mt-2">
                  <motion.div
                    animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="w-1 h-1 rounded-full bg-purple-500"
                  />
                  <motion.div
                    animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: 0.15,
                    }}
                    className="w-1 h-1 rounded-full bg-pink-500"
                  />
                  <motion.div
                    animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                    className="w-1 h-1 rounded-full bg-purple-500"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && children}
    </>
  );
}
