"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingScreen";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { toast } = useToast();
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const session = searchParams.get("session");

    if (!token) {
      setError("Google authentication failed. Please try again.");
      setTimeout(() => router.push("/login?google=error"), 1500);
      return;
    }

    const finalizeLogin = async () => {
      try {
        localStorage.setItem("token", token);
        if (session) localStorage.setItem("sessionId", session);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();

        if (data.success && data.data) {
          const userData = {
            _id: data.data._id,
            name: data.data.name,
            email: data.data.email,
            role: data.data.role || "user",
            avatar: data.data.avatar || "",
            bio: data.data.bio || "",
            isActive: data.data.isActive ?? true,
            isEmailVerified: data.data.isEmailVerified ?? true,
            createdAt: data.data.createdAt || new Date().toISOString(),
            updatedAt: data.data.updatedAt || new Date().toISOString(),
          };

          login(userData, token);
          toast({
            variant: "success",
            title: "Login success",
            description: "Signed in with Google successfully",
          });
          router.push("/");
        } else {
          throw new Error(data.message || "Failed to fetch user");
        }
      } catch (err: any) {
        localStorage.removeItem("token");
        setError(err.message || "Google authentication failed");
        setTimeout(() => router.push("/login?google=error"), 1500);
      }
    };

    finalizeLogin();
  }, [searchParams, router, login, toast]);

  return (
    <div className="min-h-screen bg-slate-50/50 flex items-center justify-center px-4">
      {error ? (
        <div className="text-center">
          <p className="text-lg font-bold text-red-700">{error}</p>
          <p className="text-sm text-slate-500 mt-2">
            Redirecting to login...
          </p>
        </div>
      ) : (
        <LoadingSpinner size="lg" message="Signing you in with Google..." />
      )}
    </div>
  );
}
