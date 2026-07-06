"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { authService } from "@/lib/services/auth.service";
import { motion } from "framer-motion";

export default function ResendVerificationPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      await authService.resendVerificationCode(email);
      setIsSuccess(true);
    } catch (err: any) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send verification email",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50/50 selection:bg-blue-500 selection:text-white overflow-x-hidden flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px]"
        >
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm font-bold mb-4 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Login
          </Link>

          <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4 pt-6 px-6 text-center">
              <div className="mx-auto mb-3 w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/25">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Verification Code Sent!
              </CardTitle>
              <CardDescription className="text-base text-slate-600 font-semibold">
                Check your email for the verification code
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-4 text-center">
              <p className="text-base text-slate-600 font-semibold mb-4">
                We've sent a verification code to{" "}
                <span className="text-blue-600 font-bold">{email}</span>
              </p>
              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 mb-4">
                <p className="text-sm font-bold text-slate-600">
                  Please enter the 5-digit code on the verification page to
                  complete your registration.
                </p>
              </div>
              <p className="text-sm font-semibold text-slate-500">
                The code will expire in 10 minutes
              </p>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pb-6 px-6">
              <motion.button
                onClick={() =>
                  router.push(
                    `/verify-email?email=${encodeURIComponent(email)}`,
                  )
                }
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all"
              >
                Go to Verification
              </motion.button>
              <motion.button
                onClick={() => router.push("/login")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-800 text-base font-bold rounded-xl transition-all"
              >
                Back to Login
              </motion.button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-blue-500 selection:text-white overflow-x-hidden flex items-center justify-center px-4 py-8">
      
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[440px]"
      >
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm font-bold mb-4 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Login
        </Link>

        <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4 pt-6 px-6 text-center">
            <div className="mx-auto mb-3 w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/25">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Resend Verification Code
            </CardTitle>
            <CardDescription className="text-base text-slate-600 font-semibold">
              Enter your email to receive a new verification code
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 px-6 pb-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-bold text-slate-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10 py-3 h-12 text-base bg-white border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold transition-all duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-base font-bold text-red-700 bg-red-50 p-3 rounded-xl border-2 border-red-200"
                >
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-3">
                <p className="text-sm font-semibold text-slate-600 text-center">
                  A new 5-digit verification code will be sent to your email
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Sending...
                  </span>
                ) : (
                  "Send Verification Code"
                )}
              </motion.button>
            </CardContent>
          </form>

          <CardFooter className="flex flex-wrap justify-center gap-2 pb-6 px-6">
            <p className="text-base text-slate-600 font-semibold">
              Already verified?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-bold transition-colors"
              >
                Sign in
              </Link>
            </p>
            <span className="text-slate-300 font-semibold">·</span>
            <Link
              href="/signup"
              className="text-base font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Create account
            </Link>
          </CardFooter>
        </Card>

        {/* Decorative elements */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500 font-semibold flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            Verify your email to get started
          </p>
        </div>
      </motion.div>
    </div>
  );
}