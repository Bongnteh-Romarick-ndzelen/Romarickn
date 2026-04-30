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
} from "lucide-react";
import { authService } from "@/lib/services/auth.service";

// Component that uses useSearchParams must be wrapped in Suspense
function VerifyEmailContent() {
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
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
    // Get email from localStorage or URL params
    const storedEmail = localStorage.getItem("pendingVerificationEmail");
    const emailParam = searchParams.get("email");
    
    if (storedEmail) {
      setEmail(storedEmail);
    } else if (emailParam) {
      setEmail(emailParam);
      localStorage.setItem("pendingVerificationEmail", emailParam);
    } else {
      // If no email found, redirect to signup
      router.push("/signup");
    }
  }, [router, searchParams]);

  // Auto-focus next input
  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
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
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit verification code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await authService.verifyEmail(email, code);
      setIsVerified(true);
      localStorage.removeItem("pendingVerificationEmail");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid verification code. Please try again.");
      // Clear code on error
      setVerificationCode(["", "", "", "", "", ""]);
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
      
      // Start countdown timer
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
      setResendMessage(err instanceof Error ? err.message : "Failed to resend code");
      setTimeout(() => setResendMessage(""), 5000);
    } finally {
      setResendLoading(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const digits = pastedData.split("");
    const newCode = [...verificationCode];
    
    for (let i = 0; i < 6 && i < digits.length; i++) {
      if (/\d/.test(digits[i])) {
        newCode[i] = digits[i];
      }
    }
    setVerificationCode(newCode);
    
    // Focus next empty field
    const nextEmptyIndex = newCode.findIndex(d => !d);
    if (nextEmptyIndex !== -1) {
      document.getElementById(`code-${nextEmptyIndex}`)?.focus();
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[400px] animate-in fade-in zoom-in duration-500">
          <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm rounded-2xl shadow-2xl">
            <CardHeader className="pb-4 pt-6 px-6 text-center">
              <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                <CheckCircle className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Email Verified!
              </CardTitle>
              <CardDescription className="text-slate-300 text-sm">
                Your email has been successfully verified
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 pb-4 text-center">
              <p className="text-slate-300 text-sm mb-3">
                Thank you for verifying your email address.
              </p>
              <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
                <p className="text-xs text-slate-400">
                  You now have full access to:
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  <span className="text-xs text-purple-300">✓ Comment on posts</span>
                  <span className="text-xs text-purple-300">✓ Like content</span>
                  <span className="text-xs text-purple-300">✓ Get newsletter updates</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-3 pb-6 px-6">
              <Button
                onClick={() => router.push("/login")}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25"
              >
                Sign In to Your Account
              </Button>
              <Link
                href="/"
                className="text-xs text-slate-400 hover:text-white text-center transition-colors"
              >
                ← Back to Home
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  const codeComplete = verificationCode.every(digit => digit !== "");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[400px]">
        <Link
          href="/signup"
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-4 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Signup
        </Link>

        <Card className="bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm rounded-2xl shadow-2xl">
          <CardHeader className="pb-4 pt-6 px-6 text-center">
            <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Mail className="h-7 w-7 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-slate-300 text-sm">
              Enter the 6-digit code sent to your email
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleVerify}>
            <CardContent className="space-y-5 px-6 pb-5">
              {error && (
                <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {resendMessage && (
                <div className={`flex items-center gap-2 text-sm p-3 rounded-xl ${
                  resendMessage.includes("sent") 
                    ? "text-green-400 bg-green-500/10 border border-green-500/20" 
                    : "text-red-400 bg-red-500/10 border border-red-500/20"
                }`}>
                  {resendMessage.includes("sent") ? (
                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span>{resendMessage}</span>
                </div>
              )}

              <div className="text-center">
                <p className="text-sm text-slate-300 mb-1">We sent a code to:</p>
                <p className="text-base font-medium text-white bg-slate-800/50 inline-block px-4 py-1 rounded-full">
                  {email}
                </p>
              </div>

              {/* 6-Digit Code Input */}
              <div className="space-y-3">
                <Label className="text-slate-300 text-sm text-center block">
                  Verification Code
                </Label>
                <div 
                  className="flex justify-center gap-2"
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
                      onChange={(e) => handleCodeChange(index, e.target.value.replace(/\D/g, ""))}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-12 text-center text-2xl font-bold bg-slate-800/50 border border-slate-600 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white transition-all"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
                  <Shield className="h-3 w-3" />
                  Enter the 6-digit code from your email
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !codeComplete}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed h-11 text-base"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Verifying...
                  </span>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </CardContent>
          </form>

          <CardFooter className="flex flex-col gap-3 pb-6 px-6">
            <div className="text-center">
              <p className="text-sm text-slate-400">
                Didn't receive the code?{" "}
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={resendLoading || countdown > 0}
                  className="text-purple-400 hover:text-purple-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors inline-flex items-center gap-1"
                >
                  {resendLoading ? (
                    <RefreshCw className="h-3 w-3 animate-spin" />
                  ) : countdown > 0 ? (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Resend in {countdown}s
                    </span>
                  ) : (
                    "Resend Code"
                  )}
                </button>
              </p>
            </div>
            <div className="text-center">
              <p className="text-[11px] text-slate-500">
                Check your spam folder if you don't see the email in your inbox
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-[360px]">
          <Card className="bg-slate-800/30 border border-slate-700/50 rounded-xl">
            <CardContent className="py-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
              <p className="text-sm text-slate-400 mt-4">Loading...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}