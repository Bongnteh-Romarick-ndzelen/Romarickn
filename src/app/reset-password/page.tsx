"use client";

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
import { Lock } from "lucide-react";
import { authService } from "@/lib/services/auth.service";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!token) {
      setError("Invalid reset token");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authService.resetPassword(token, password);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[360px]">
          <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm rounded-xl">
            <CardHeader className="pb-4 pt-5 px-5 text-center">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-pink-600 flex items-center justify-center">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-white">
                Invalid Reset Link
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                Missing or invalid token
              </CardDescription>
            </CardHeader>

            <CardContent className="px-5 pb-4 text-center">
              <p className="text-sm text-slate-400">
                The password reset link is invalid or has expired.
              </p>
            </CardContent>

            <CardFooter className="flex justify-center pb-5 px-5">
              <Button
                onClick={() => router.push("/forgot-password")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm h-9"
              >
                Request New Link
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
          <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm rounded-xl">
            <CardHeader className="pb-4 pt-5 px-5 text-center">
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                <Lock className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-white">
                Password Reset Successful
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                Your password has been updated
              </CardDescription>
            </CardHeader>

            <CardContent className="px-5 pb-4 text-center">
              <p className="text-sm text-slate-400 mb-4">
                Your password has been successfully reset.
              </p>
              <p className="text-xs text-slate-500">
                You can now sign in with your new password.
              </p>
            </CardContent>

            <CardFooter className="flex justify-center pb-5 px-5">
              <Button
                onClick={() => router.push("/login")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm h-9"
              >
                Sign In
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
        <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm rounded-xl">
          <CardHeader className="pb-4 pt-5 px-5 text-center">
            <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
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
                <Label htmlFor="password" className="text-slate-300 text-xs">
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-slate-300 text-xs">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm h-9"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </CardContent>
          </form>

          <CardFooter className="flex justify-center pt-0 pb-5 px-5">
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
