"use client";
import { useEffect, useState, type ReactNode } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  overlay?: boolean;
  message?: string;
  children?: ReactNode;
  fullscreen?: boolean;
}

const LoadingSpinner = ({
  size = "md",
  className = "",
  overlay = false,
  message = "Loading...",
  children,
  fullscreen = false,
}: LoadingSpinnerProps) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setShowSplash(false), 600);
    return () => clearTimeout(id);
  }, []);

  if (!children) {
    const sizeClasses = {
      sm: "h-6 w-6",
      md: "h-12 w-12",
      lg: "h-16 w-16",
    };

    const spinner = (
      <div
        className={`animate-spin rounded-full border-t-2 border-b-2 border-primary ${sizeClasses[size]}`}
      />
    );

    if (overlay) {
      return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center gap-4">
            {spinner}
            {message && (
              <p className="text-sm font-medium text-white animate-pulse">
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

  if (showSplash) {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white ${
          fullscreen ? "" : ""
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary" />
          {message && (
            <p className="text-sm font-medium text-slate-600 animate-pulse">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoadingSpinner;