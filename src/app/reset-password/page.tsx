"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
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
} from "lucide-react";
import { authService } from "@/lib/services/auth.service";

export default function ResetPasswordPage() {
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

  // Password strength calculator
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[360px]">
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-xs mb-3 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Forgot Password
          </Link>

          <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm rounded-xl shadow-2xl">
            <CardHeader className="pb-4 pt-5 px-5 text-center">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-pink-600 flex items-center justify-center shadow-lg shadow-red-500/25">
                <AlertCircle className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-white">
                Invalid Reset Link
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                Missing or invalid information
              </CardDescription>
            </CardHeader>

            <CardContent className="px-5 pb-4 text-center">
              <p className="text-sm text-slate-300">
                The password reset link is invalid or missing required
                information.
              </p>
            </CardContent>

            <CardFooter className="flex justify-center pb-5 px-5">
              <Button
                onClick={() => router.push("/forgot-password")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm h-9 shadow-lg shadow-purple-500/25"
              >
                Request New Reset Link
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[360px]">
          <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm rounded-xl shadow-2xl">
            <CardHeader className="pb-4 pt-5 px-5 text-center">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-white">
                Password Reset Successful
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                Your password has been updated
              </CardDescription>
            </CardHeader>

            <CardContent className="px-5 pb-4 text-center">
              <p className="text-sm text-slate-300 mb-3">
                Your password has been successfully reset.
              </p>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <p className="text-xs text-slate-400">
                  You can now sign in with your new password.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex justify-center pb-5 px-5">
              <Button
                onClick={() => router.push("/login")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm h-9 shadow-lg shadow-purple-500/25"
              >
                Sign In Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[360px]">
        <Link
          href="/login"
          className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-xs mb-3 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Login
        </Link>

        <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm rounded-xl shadow-2xl">
          <CardHeader className="pb-4 pt-5 px-5 text-center">
            <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg font-bold text-white">
              Set New Password
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Enter your new password
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-3 px-5 pb-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-300 text-xs">
                    New Password
                  </Label>
                  {password && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded ${
                        strength >= 4
                          ? "bg-green-500/20 text-green-400"
                          : strength >= 3
                            ? "bg-blue-500/20 text-blue-400"
                            : strength >= 2
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {getStrengthText()}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create new password"
                    className="pl-8 pr-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-slate-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
                {password && (
                  <div className="mt-1">
                    <div className="h-1 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(strength / 5) * 100}%` }}
                      />
                    </div>
                    <p className="text-[9px] text-slate-500 mt-1">
                      Password strength: {getStrengthText()}
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="confirmPassword"
                  className="text-slate-300 text-xs"
                >
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className={`pl-8 pr-8 py-1.5 h-9 text-sm bg-slate-800/50 border focus:ring-1 text-white placeholder-slate-500 ${
                      confirmPassword && password !== confirmPassword
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : confirmPassword && password === confirmPassword
                          ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                          : "border-slate-700 focus:border-purple-500 focus:ring-purple-500"
                    }`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-[10px] text-red-400 flex items-center gap-1 animate-in fade-in">
                    <AlertCircle className="h-3 w-3" />
                    Passwords do not match
                  </p>
                )}
                {confirmPassword &&
                  password === confirmPassword &&
                  password && (
                    <p className="text-[10px] text-green-400 flex items-center gap-1 animate-in fade-in">
                      <CheckCircle className="h-3 w-3" />
                      Passwords match
                    </p>
                  )}
              </div>

              {error && (
                <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm h-9 shadow-lg shadow-purple-500/25"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </CardContent>
          </form>

          <CardFooter className="flex justify-center pb-5 px-5">
            <p className="text-xs text-slate-400">
              Remembered your password?{" "}
              <Link
                href="/login"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
