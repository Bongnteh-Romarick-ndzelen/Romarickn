// components/AIAssistance.tsx (Updated trigger button only)
"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function AIAssistance() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-50"
    >
      <Link href="/ai-assistance">
        <Button
          className="rounded-full w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:scale-110"
        >
          <div className="relative">
            <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </div>
        </Button>
      </Link>
    </motion.div>
  );
}