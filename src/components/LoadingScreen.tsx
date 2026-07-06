// components/LoadingSpinner.tsx
"use client";

import { useEffect, useState } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  overlay?: boolean;
  message?: string;
  children?: React.ReactNode;
  minimumLoadTime?: number;
}

export default function LoadingSpinner({
  size = "md",
  className = "",
  overlay = false,
  message = "Loading...",
  children,
  minimumLoadTime = 1500,
}: LoadingSpinnerProps) {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, minimumLoadTime);

    return () => clearTimeout(timer);
  }, [minimumLoadTime]);

  if (!mounted) return null;

  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-12 w-12 border-[3px]",
    lg: "h-16 w-16 border-4",
  };

  const spinner = (
    <div
      className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-600 ${sizeClasses[size]}`}
    />
  );

  // If children are provided, show loading then children
  if (children !== undefined) {
    if (isLoading) {
      return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center gap-4">
            {spinner}
            {message && (
              <p className="text-sm font-semibold text-slate-600 animate-pulse">
                {message}
              </p>
            )}
          </div>
        </div>
      );
    }
    return <>{children}</>;
  }

  // Standalone spinner
  if (overlay) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center gap-4">
          {spinner}
          {message && (
            <p className="text-sm font-semibold text-slate-600 animate-pulse">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {spinner}
    </div>
  );
}