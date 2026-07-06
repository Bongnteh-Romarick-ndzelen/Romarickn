"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { authService } from "@/lib/services/auth.service";
import { motion } from "framer-motion";

function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (!email || !code) {
      setError("Invalid reset link. Please request a new password reset.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authService.resetPassword(email, code, password);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    return strength;
  };

  const strength = getPasswordStrength();
  const getStrengthColor = () => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    if (strength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Good";
    if (strength <= 4) return "Very Good";
    return "Excellent";
  };

  if (!email || !code) {
    return (
      <div className="min-h-screen bg-slate-50/50 selection:bg-blue-500 selection:text-white overflow-x-hidden flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[400px]"
        >
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm font-bold mb-4 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Forgot Password
          </Link>

          <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4 pt-6 px-6 text-center">
              <div className="mx-auto mb-3 w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center shadow-lg shadow-red-500/25">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Invalid Reset Link
              </CardTitle>
              <CardDescription className="text-base text-slate-600 font-semibold">
                Missing or invalid information
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-4 text-center">
              <p className="text-base text-slate-600 font-semibold">
                The password reset link is invalid or missing required
                information.
              </p>
            </CardContent>

            <CardFooter className="flex justify-center pb-6 px-6">
              <motion.button
                onClick={() => router.push("/forgot-password")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all"
              >
                Request New Reset Link
              </motion.button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50/50 selection:bg-blue-500 selection:text-white overflow-x-hidden flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px]"
        >
          <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4 pt-6 px-6 text-center">
              <div className="mx-auto mb-3 w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/25">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                Password Reset Successful
              </CardTitle>
              <CardDescription className="text-base text-slate-600 font-semibold">
                Your password has been updated
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-4 text-center">
              <p className="text-base text-slate-600 font-semibold mb-4">
                Your password has been successfully reset.
              </p>
              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4">
                <p className="text-sm font-bold text-slate-600">
                  You can now sign in with your new password.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center pb-6 px-6">
              <motion.button
                onClick={() => router.push("/login")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="py-3 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-base font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all"
              >
                Sign In Now
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
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Set New Password
            </CardTitle>
            <CardDescription className="text-base text-slate-600 font-semibold">
              Enter your new password
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 px-6 pb-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-base font-bold text-slate-700">
                    New Password
                  </Label>
                  {password && (
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full ${
                        strength >= 4
                          ? "bg-green-100 text-green-700"
                          : strength >= 3
                            ? "bg-blue-100 text-blue-700"
                            : strength >= 2
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                      }`}
                    >
                      {getStrengthText()}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create new password"
                    className="pl-10 pr-10 py-3 h-12 text-base bg-white border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold transition-all duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {password && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-2"
                  >
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full transition-all duration-500 ${getStrengthColor()}`}
                        style={{ width: `${(strength / 5) * 100}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(strength / 5) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm font-semibold text-slate-500 mt-1">
                      Password strength: {getStrengthText()}
                    </p>
                  </motion.div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-base font-bold text-slate-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className={`pl-10 pr-10 py-3 h-12 text-base bg-white border-2 focus:ring-2 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold transition-all duration-200 ${
                      confirmPassword && password !== confirmPassword
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : confirmPassword && password === confirmPassword
                          ? "border-green-400 focus:border-green-400 focus:ring-green-100"
                          : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm font-bold text-red-600 flex items-center gap-2"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Passwords do not match
                  </motion.p>
                )}
                {confirmPassword &&
                  password === confirmPassword &&
                  password && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm font-bold text-green-600 flex items-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Passwords match
                    </motion.p>
                  )}
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
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </motion.button>
            </CardContent>
          </form>

          <CardFooter className="flex justify-center pb-6 px-6">
            <p className="text-base text-slate-600 font-semibold">
              Remembered your password?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-bold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Decorative elements */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500 font-semibold flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            Secure password reset
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
            <p className="text-slate-600 mt-4 text-base font-bold">Loading...</p>
          </div>
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}