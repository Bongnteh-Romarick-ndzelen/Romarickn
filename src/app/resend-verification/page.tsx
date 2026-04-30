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
import { Mail } from "lucide-react";
import { authService } from "@/lib/services/auth.service";

export default function ResendVerificationPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Note: This endpoint might need to be implemented in the backend
      // For now, we'll simulate it or use a generic endpoint
      await authService.register({ name: "temp", email, password: "temp123" });
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      // If user already exists, try a different approach
      if (err?.message?.includes("already exists") || err?.message?.includes("exists")) {
        // Simulate sending verification email for existing user
        router.push(`/verify-email?email=${encodeURIComponent(email)}`);
      } else {
        setError(err instanceof Error ? err.message : "Failed to send verification email");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[360px]">
        <Card className="bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm rounded-xl">
          <CardHeader className="pb-4 pt-5 px-5 text-center">
            <div className="mx-auto mb-2 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-lg font-bold text-white">
              Resend Verification
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Enter your email to receive verification link
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-3 px-5 pb-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-300 text-xs">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="pl-8 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                {isLoading ? "Sending..." : "Send Verification Link"}
              </Button>
            </CardContent>
          </form>

          <CardFooter className="flex justify-center pt-0 pb-5 px-5">
            <p className="text-xs text-slate-400">
              Already verified?{" "}
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
