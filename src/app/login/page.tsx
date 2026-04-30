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
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ArrowLeft,
  Chrome,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { authService } from "@/lib/services/auth.service";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authService.login({ email, password });
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Google OAuth implementation would go here
    alert("Google login - Backend integration required");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[360px]">
        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-xs mb-3 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </Link>

        <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm rounded-xl">
          <CardHeader className="pb-4 pt-5 px-5 text-center">
            <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <LogIn className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg font-bold text-white">
              Welcome back
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Sign in to your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-3 px-5 pb-4">
              {error && (
                <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded">
                  {error}
                </p>
              )}
              
              {/* Email Field */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-300 text-xs">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-300 text-xs">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-[10px] text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-8 pr-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm h-9"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </CardContent>
          </form>

          {/* Google Login Only */}
          <div className="px-5 pb-4">
            <div className="relative my-3">
              <Separator className="bg-slate-700" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800/30 px-2 text-[10px] text-slate-500">
                Or continue with
              </span>
            </div>

            <Button
              variant="outline"
              className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 text-sm h-9"
              onClick={handleGoogleLogin}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <CardFooter className="flex justify-center pt-0 pb-5 px-5">
            <p className="text-xs text-slate-400">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Sign up
              </Link>
              {" · "}
              <Link
                href="/forgot-password"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Forgot password?
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

