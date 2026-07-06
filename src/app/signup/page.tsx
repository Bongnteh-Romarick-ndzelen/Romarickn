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
  Sparkles,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { authService } from "@/lib/services/auth.service";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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
  const { toast } = useToast();
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
        color: "bg-slate-200",
        textColor: "text-slate-400",
        icon: null,
      };
    if (strength <= 2)
      return {
        text: "Weak",
        color: "bg-red-500",
        textColor: "text-red-600",
        icon: Shield,
      };
    if (strength <= 3)
      return {
        text: "Good",
        color: "bg-yellow-500",
        textColor: "text-yellow-600",
        icon: Zap,
      };
    if (strength <= 4)
      return {
        text: "Very Good",
        color: "bg-blue-500",
        textColor: "text-blue-600",
        icon: Star,
      };
    return {
      text: "Excellent",
      color: "bg-green-500",
      textColor: "text-green-600",
      icon: Award,
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);
  const strengthInfo = getStrengthLabel(passwordStrength.strength);
  const StrengthIcon = strengthInfo.icon;
  const isPasswordValid = passwordStrength.strength >= 4;

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
        toast({
          variant: "success",
          title: "User Created!",
          description: "Account created Successfully, Please verify email",
        });
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

  const getProgressPercentage = () => {
    return (passwordStrength.strength / 5) * 100;
  };

  const PasswordRequirement = ({
    met,
    text,
  }: {
    met: boolean;
    text: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center gap-1.5 text-sm transition-all duration-200 ${
        met ? "text-green-600" : "text-slate-400"
      }`}
    >
      {met ? (
        <CheckCircle className="h-4 w-4" />
      ) : (
        <XCircle className="h-4 w-4" />
      )}
      <span className="font-semibold">{text}</span>
    </motion.div>
  );

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
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm font-bold mb-4 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4 pt-6 px-6 text-center">
            <div className="mx-auto mb-3 w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/25">
              <UserPlus className="h-7 w-7 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Create Account
            </CardTitle>
            <CardDescription className="text-base text-slate-600 font-semibold">
              Get started for free
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 px-6 pb-4">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 rounded-xl bg-red-50 border-2 border-red-200"
                >
                  <p className="text-base font-bold text-red-700">{error}</p>
                </motion.div>
              )}

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-bold text-slate-700">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="pl-10 py-3 h-12 text-base bg-white border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold transition-all duration-200"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
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
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-base font-bold text-slate-700">
                    Password
                  </Label>
                  {formData.password && (
                    <div
                      className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full ${strengthInfo.textColor} bg-opacity-10`}
                    >
                      {StrengthIcon && <StrengthIcon className="h-4 w-4" />}
                      <span>{strengthInfo.text}</span>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10 py-3 h-12 text-base bg-white border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold transition-all duration-200"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
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

                {/* Password Strength Bar */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full transition-all duration-500 ${strengthInfo.color}`}
                        style={{ width: `${getProgressPercentage()}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressPercentage()}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs font-semibold text-slate-400">Weak</span>
                      <span className="text-xs font-semibold text-slate-400">Good</span>
                      <span className="text-xs font-semibold text-slate-400">Very Good</span>
                      <span className="text-xs font-semibold text-slate-400">Excellent</span>
                    </div>
                  </div>
                )}

                {/* Password Requirements */}
                {(formData.password || formData.confirmPassword) && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 p-4 rounded-xl bg-slate-50 border-2 border-slate-200"
                  >
                    <p className="text-sm font-bold text-slate-700 mb-2">
                      Password must contain:
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
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
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 pt-3 border-t-2 border-slate-200"
                      >
                        <p className="text-sm font-bold text-green-600 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Excellent! Your password is strong
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-base font-bold text-slate-700">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className={`pl-10 pr-10 py-3 h-12 text-base bg-white border-2 focus:ring-2 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold transition-all duration-200 ${
                      formData.confirmPassword && !passwordsMatch
                        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                        : formData.confirmPassword &&
                            passwordsMatch &&
                            formData.password
                          ? "border-green-400 focus:border-green-400 focus:ring-green-100"
                          : "border-slate-200 focus:border-blue-400 focus:ring-blue-100"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && !passwordsMatch && (
                  <motion.p 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm font-bold text-red-600 flex items-center gap-2"
                  >
                    <XCircle className="h-4 w-4" />
                    Passwords do not match
                  </motion.p>
                )}
                {formData.confirmPassword &&
                  passwordsMatch &&
                  formData.password && (
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

              {/* Terms Agreement */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-0.5 h-4 w-4 rounded border-2 border-slate-300 bg-white text-blue-600 focus:ring-2 focus:ring-blue-200 focus:ring-offset-0"
                  required
                />
                <Label
                  htmlFor="terms"
                  className="text-sm font-semibold text-slate-600 cursor-pointer leading-tight"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="text-blue-600 hover:text-blue-700 font-bold"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-700 font-bold"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading || !isFormValid()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </CardContent>
          </form>

          {/* Google Signup */}
          <div className="px-6 pb-4">
            <div className="relative my-4">
              <Separator className="bg-slate-200" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm font-bold text-slate-500">
                Or sign up with
              </span>
            </div>

            <motion.button
              variant="outline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-800 border-2 border-slate-200 text-base font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
              onClick={handleGoogleSignup}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
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
              <span>Sign up with Google</span>
            </motion.button>
          </div>

          <CardFooter className="flex flex-col gap-2 justify-center pt-0 pb-6 px-6">
            <p className="text-base text-slate-600 font-semibold">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-bold transition-colors"
              >
                Sign in
              </Link>
            </p>
            <Link
              href="/resend-verification"
              className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Resend verification email
            </Link>
          </CardFooter>
        </Card>

        {/* Decorative elements */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500 font-semibold flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            Secure signup with email verification
          </p>
        </div>
      </motion.div>
    </div>
  );
}