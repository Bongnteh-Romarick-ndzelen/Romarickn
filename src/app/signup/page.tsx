"use client";

import { useState, useEffect } from "react";
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
  CheckCircle,
  XCircle,
  Shield,
  Zap,
  Star,
  Award,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { authService } from "@/lib/services/auth.service";
import { useAuth } from "@/context/AuthContext";

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
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const router = useRouter();
  const { login: authLogin } = useAuth();

  // Password validation checks
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      upperCase: /[A-Z]/.test(password),
      lowerCase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    if (checks.length) strength++;
    if (checks.upperCase) strength++;
    if (checks.lowerCase) strength++;
    if (checks.number) strength++;
    if (checks.specialChar) strength++;

    return { strength, checks };
  };

  const getStrengthLabel = (strength: number) => {
    if (strength === 0)
      return {
        text: "No password",
        color: "bg-slate-600",
        textColor: "text-slate-400",
        icon: null,
      };
    if (strength <= 2)
      return {
        text: "Weak",
        color: "bg-red-500",
        textColor: "text-red-400",
        icon: Shield,
      };
    if (strength <= 3)
      return {
        text: "Good",
        color: "bg-yellow-500",
        textColor: "text-yellow-400",
        icon: Zap,
      };
    if (strength <= 4)
      return {
        text: "Very Good",
        color: "bg-blue-500",
        textColor: "text-blue-400",
        icon: Star,
      };
    return {
      text: "Excellent",
      color: "bg-green-500",
      textColor: "text-green-400",
      icon: Award,
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthInfo = getStrengthLabel(passwordStrength.strength);
  const StrengthIcon = strengthInfo.icon;
  const isPasswordValid = passwordStrength.strength >= 4;

  // Check if passwords match - runs on every keystroke
  useEffect(() => {
    if (formData.confirmPassword) {
      setPasswordsMatch(formData.password === formData.confirmPassword);
    } else {
      setPasswordsMatch(true);
    }
  }, [formData.password, formData.confirmPassword]);

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      isPasswordValid &&
      passwordsMatch
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setError("Please create a stronger password");
      return;
    }

    if (!passwordsMatch) {
      setError("Passwords don't match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      if (response.success) {
        // Don't auto-login, just redirect to verification
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
      } else {
        setError(response.message || "Signup failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  // Get progress percentage
  const getProgressPercentage = () => {
    return (passwordStrength.strength / 5) * 100;
  };

  // Password requirement component
  const PasswordRequirement = ({
    met,
    text,
  }: {
    met: boolean;
    text: string;
  }) => (
    <div
      className={`flex items-center gap-1.5 text-[10px] transition-all duration-200 ${
        met ? "text-green-400" : "text-slate-500"
      }`}
    >
      {met ? (
        <CheckCircle className="h-3 w-3 animate-in fade-in zoom-in" />
      ) : (
        <XCircle className="h-3 w-3" />
      )}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[400px]">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-slate-400 hover:text-white text-xs mb-3 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </Link>

        <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm rounded-xl shadow-2xl">
          <CardHeader className="pb-4 pt-5 px-5 text-center">
            <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
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
                <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20 animate-in fade-in">
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
                    className="pl-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-slate-500 transition-all duration-200"
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
                    className="pl-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-slate-500 transition-all duration-200"
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
                    Password Strength
                  </Label>
                  {formData.password && (
                    <div
                      className={`flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full ${strengthInfo.textColor} bg-opacity-10`}
                    >
                      {StrengthIcon && <StrengthIcon className="h-3 w-3" />}
                      <span>{strengthInfo.text}</span>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    className="pl-8 pr-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-slate-500 transition-all duration-200"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Bar */}
                {formData.password && (
                  <div className="mt-1">
                    <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ease-out ${strengthInfo.color}`}
                        style={{ width: `${getProgressPercentage()}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-[9px] text-slate-500">Weak</span>
                      <span className="text-[9px] text-slate-500">Good</span>
                      <span className="text-[9px] text-slate-500">
                        Very Good
                      </span>
                      <span className="text-[9px] text-slate-500">
                        Excellent
                      </span>
                    </div>
                  </div>
                )}

                {/* Password Requirements - Shows as you type */}
                <div className="mt-2 p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-[10px] text-slate-400 mb-2">
                    Password must contain:
                  </p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    <PasswordRequirement
                      met={passwordStrength.checks.length}
                      text="At least 8 characters"
                    />
                    <PasswordRequirement
                      met={passwordStrength.checks.upperCase}
                      text="Uppercase letter"
                    />
                    <PasswordRequirement
                      met={passwordStrength.checks.lowerCase}
                      text="Lowercase letter"
                    />
                    <PasswordRequirement
                      met={passwordStrength.checks.number}
                      text="Number"
                    />
                    <PasswordRequirement
                      met={passwordStrength.checks.specialChar}
                      text="Special character"
                    />
                  </div>
                  {formData.password && isPasswordValid && (
                    <div className="mt-2 pt-1.5 border-t border-slate-700/50 animate-in fade-in">
                      <p className="text-[10px] text-green-400 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Excellent! Your password is strong
                      </p>
                    </div>
                  )}
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
                    className={`pl-8 pr-8 py-1.5 h-9 text-sm bg-slate-800/50 border focus:ring-1 text-white placeholder-slate-500 transition-all duration-200 ${
                      formData.confirmPassword && !passwordsMatch
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : formData.confirmPassword &&
                            passwordsMatch &&
                            formData.password
                          ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                          : "border-slate-700 focus:border-purple-500 focus:ring-purple-500"
                    }`}
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                      <Eye className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && !passwordsMatch && (
                  <p className="text-[10px] text-red-400 flex items-center gap-1 animate-in fade-in">
                    <XCircle className="h-3 w-3" />
                    Passwords do not match
                  </p>
                )}
                {formData.confirmPassword &&
                  passwordsMatch &&
                  formData.password && (
                    <p className="text-[10px] text-green-400 flex items-center gap-1 animate-in fade-in">
                      <CheckCircle className="h-3 w-3" />
                      Passwords match
                    </p>
                  )}
              </div>

              {/* Terms Agreement */}
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

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !isFormValid()}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm h-9 shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </CardContent>
          </form>

          {/* Google Signup */}
          <div className="px-5 pb-4">
            <div className="relative my-3">
              <Separator className="bg-slate-700" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800/30 px-2 text-[10px] text-slate-500">
                Or sign up with
              </span>
            </div>

            <Button
              variant="outline"
              className="w-full bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-500 border-slate-300 text-sm h-9 transition-all duration-200"
              onClick={handleGoogleSignup}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
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