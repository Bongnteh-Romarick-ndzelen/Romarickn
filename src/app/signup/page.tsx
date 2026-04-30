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
  UserPlus,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  Chrome,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { authService } from "@/lib/services/auth.service";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);
    setError("");

      try {
        await authService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Signup failed");
      } finally {
        setIsLoading(false);
      }
  };

  const handleGoogleSignup = () => {
    // Google OAuth implementation would go here
    alert("Google signup - Backend integration required");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[360px]">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-xs mb-3"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </Link>

        <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm rounded-xl">
          <CardHeader className="pb-4 pt-5 px-5 text-center">
            <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg font-bold text-white">
              Create account
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Get started for free
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-3 px-5 pb-4">
              {error && (
                <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded">
                  {error}
                </p>
              )}

              {/* Name Field */}
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-slate-300 text-xs">
                  Full name
                </Label>
                <div className="relative">
                  <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

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
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
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
                  <p className="text-[9px] text-slate-500">Min 6 characters</p>
                </div>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    className="pl-8 pr-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
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
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="confirmPassword"
                  className="text-slate-300 text-xs"
                >
                  Confirm password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="pl-8 pr-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-1.5 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-0.5 h-3 w-3 rounded border-slate-600 bg-slate-800/50 text-purple-600 focus:ring-purple-500"
                  required
                />
                <Label
                  htmlFor="terms"
                  className="text-[10px] text-slate-400 cursor-pointer leading-tight"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Privacy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm h-9"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </CardContent>
          </form>

          <div className="px-5 pb-4">
            <div className="relative my-3">
              <Separator className="bg-slate-800/50" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950/30 px-2 text-[10px] text-slate-500">
                Or sign up with
              </span>
            </div>

            <Button
              variant="outline"
              className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 text-sm h-9"
              onClick={handleGoogleSignup}
            >
              <Chrome className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          <CardFooter className="flex justify-center pt-0 pb-5 px-5">
            <p className="text-xs text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Sign in
              </Link>
              {" · "}
              <Link
                href="/resend-verification"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Resend verification
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
