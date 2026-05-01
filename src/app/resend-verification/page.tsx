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
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { authService } from "@/lib/services/auth.service";

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
      // Call the resend verification endpoint
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
              <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg font-bold text-white">
                Verification Code Sent!
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                Check your email for the verification code
              </CardDescription>
            </CardHeader>

            <CardContent className="px-5 pb-4 text-center">
              <p className="text-sm text-slate-300 mb-3">
                We've sent a verification code to{" "}
                <span className="text-purple-400 font-medium">{email}</span>
              </p>
              <div className="bg-slate-800/50 rounded-lg p-3 mb-3">
                <p className="text-xs text-slate-400">
                  Please enter the 5-digit code on the verification page to
                  complete your registration.
                </p>
              </div>
              <p className="text-[10px] text-slate-500">
                The code will expire in 10 minutes
              </p>
            </CardContent>

            <CardFooter className="flex flex-col gap-2 pb-5 px-5">
              <Button
                onClick={() =>
                  router.push(
                    `/verify-email?email=${encodeURIComponent(email)}`,
                  )
                }
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm h-9"
              >
                Go to Verification
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/login")}
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 text-sm h-9"
              >
                Back to Login
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
              <Mail className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg font-bold text-white">
              Resend Verification Code
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Enter your email to receive a new verification code
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-3 px-5 pb-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-300 text-xs">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-slate-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="bg-slate-800/50 rounded-lg p-2.5">
                <p className="text-[10px] text-slate-400 text-center">
                  A new 5-digit verification code will be sent to your email
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm h-9 shadow-lg shadow-purple-500/25"
              >
                {isLoading ? "Sending..." : "Send Verification Code"}
              </Button>
            </CardContent>
          </form>

          <CardFooter className="flex justify-center pb-5 px-5">
            <p className="text-xs text-slate-400">
              Already verified?{" "}
              <Link
                href="/login"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Sign in
              </Link>
              {" · "}
              <Link
                href="/signup"
                className="text-purple-400 hover:text-purple-300 font-medium"
              >
                Create account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
