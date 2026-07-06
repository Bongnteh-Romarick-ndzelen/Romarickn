"use client";

import { useState, useEffect, Suspense } from "react";
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
  Mail,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  Shield,
  Clock,
  Sparkles,
} from "lucide-react";
import { authService } from "@/lib/services/auth.service";
import { motion } from "framer-motion";

function VerifyEmailContent() {
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedEmail = localStorage.getItem("pendingVerificationEmail");
    const emailParam = searchParams.get("email");

    if (storedEmail) {
      setEmail(storedEmail);
    } else if (emailParam) {
      setEmail(emailParam);
      localStorage.setItem("pendingVerificationEmail", emailParam);
    } else {
      router.push("/signup");
    }
  }, [router, searchParams]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 4) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = verificationCode.join("");
    if (code.length !== 5) {
      setError("Please enter the complete 5-digit verification code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authService.verifyEmail(email, code);
      setIsVerified(true);
      localStorage.removeItem("pendingVerificationEmail");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid verification code. Please try again.",
      );
      setVerificationCode(["", "", "", "", ""]);
      document.getElementById("code-0")?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email || countdown > 0) return;

    setResendLoading(true);
    setResendMessage("");

    try {
      await authService.resendVerificationCode(email);
      setResendMessage("✓ New verification code sent to your email!");
      setCountdown(60);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setTimeout(() => setResendMessage(""), 5000);
    } catch (err) {
      setResendMessage(
        err instanceof Error ? err.message : "Failed to resend code",
      );
      setTimeout(() => setResendMessage(""), 5000);
    } finally {
      setResendLoading(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 5);
    const digits = pastedData.split("");
    const newCode = [...verificationCode];

    for (let i = 0; i < 5 && i < digits.length; i++) {
      if (/\d/.test(digits[i])) {
        newCode[i] = digits[i];
      }
    }
    setVerificationCode(newCode);

    const nextEmptyIndex = newCode.findIndex((d) => !d);
    if (nextEmptyIndex !== -1) {
      document.getElementById(`code-${nextEmptyIndex}`)?.focus();
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-slate-50/50 selection:bg-blue-500 selection:text-white overflow-x-hidden flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[420px]"
        >
          <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-4 pt-6 px-6 text-center">
              <div className="mx-auto mb-3 w-16 h-16 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/25">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-slate-900">
                Email Verified!
              </CardTitle>
              <CardDescription className="text-base text-slate-600 font-semibold">
                Your email has been successfully verified
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-4 text-center">
              <p className="text-base text-slate-600 font-semibold mb-4">
                Thank you for verifying your email address.
              </p>
              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-4 mb-4">
                <p className="text-sm font-bold text-slate-700 mb-2">
                  You now have full access to:
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="text-sm font-semibold text-blue-600">
                    ✓ Comment on posts
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    ✓ Like content
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    ✓ Get newsletter updates
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pb-6 px-6">
              <motion.button
                onClick={() => router.push("/login")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all"
              >
                Sign In to Your Account
              </motion.button>
              <Link
                href="/"
                className="text-base font-bold text-slate-600 hover:text-blue-600 text-center transition-colors"
              >
                ← Back to Home
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  const codeComplete = verificationCode.every((digit) => digit !== "");

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
          href="/signup"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 text-sm font-bold mb-4 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Signup
        </Link>

        <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-4 pt-6 px-6 text-center">
            <div className="mx-auto mb-3 w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/25">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-base text-slate-600 font-semibold">
              Enter the 5-digit code sent to your email
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleVerify}>
            <CardContent className="space-y-5 px-6 pb-5">
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

              {resendMessage && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 text-base font-bold p-3 rounded-xl border-2 ${
                    resendMessage.includes("sent")
                      ? "text-green-700 bg-green-50 border-green-200"
                      : "text-red-700 bg-red-50 border-red-200"
                  }`}
                >
                  {resendMessage.includes("sent") ? (
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  )}
                  <span>{resendMessage}</span>
                </motion.div>
              )}

              <div className="text-center">
                <p className="text-base font-semibold text-slate-600 mb-1">
                  We sent a code to:
                </p>
                <p className="text-lg font-bold text-slate-800 bg-slate-100 border-2 border-slate-200 inline-block px-4 py-1.5 rounded-xl">
                  {email}
                </p>
              </div>

              <div className="space-y-3">
                <Label className="text-base font-bold text-slate-700 text-center block">
                  Verification Code
                </Label>
                <div
                  className="flex justify-center gap-3"
                  onPaste={handlePaste}
                >
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) =>
                        handleCodeChange(
                          index,
                          e.target.value.replace(/\D/g, ""),
                        )
                      }
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-14 h-14 text-center text-2xl font-bold bg-white border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-4 focus:ring-blue-100 text-slate-800 transition-all"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
                <p className="text-sm font-semibold text-slate-500 text-center flex items-center justify-center gap-1.5">
                  <Shield className="h-4 w-4" />
                  Enter the 5-digit code from your email
                </p>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading || !codeComplete}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-blue-600/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Verifying...
                  </span>
                ) : (
                  "Verify Email"
                )}
              </motion.button>
            </CardContent>
          </form>

          <CardFooter className="flex flex-col gap-3 pb-6 px-6">
            <div className="text-center">
              <p className="text-base text-slate-600 font-semibold">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendLoading || countdown > 0}
                  className="text-blue-600 hover:text-blue-700 font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1.5"
                >
                  {resendLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : countdown > 0 ? (
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      Resend in {countdown}s
                    </span>
                  ) : (
                    "Resend Code"
                  )}
                </button>
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-slate-500">
                Check your spam folder if you don't see the email in your inbox
              </p>
            </div>
          </CardFooter>
        </Card>

        {/* Decorative elements */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500 font-semibold flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-500" />
            Secure email verification
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50/50 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-[400px]">
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-lg">
              <CardContent className="py-12 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent mx-auto"></div>
                <p className="text-base font-bold text-slate-600 mt-4">Loading...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}