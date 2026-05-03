"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { postService } from "@/lib/services/post.service";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
  userHasLiked?: boolean;
}

export default function LikeButton({
  postId,
  initialLikes,
  userHasLiked = false,
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(userHasLiked);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  const handleLike = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "You must be logged in to like a post.",
      });
      router.push("/login");
      return;
    }

    if (loading) return;

    setLoading(true);

    const previousLiked = isLiked;
    const previousLikes = likes;

    // Optimistic update
    setIsLiked(!isLiked);
    setLikes((prev) => (previousLiked ? prev - 1 : prev + 1));

    try {
      const result = await postService.toggleLike(postId);
      console.log("Result:", result);

      // IMPORTANT: Extract data from the response structure
      // Your API returns: { success: true, message: '...', data: { liked: true, likesCount: 5 } }
      const responseData = result.data || result;

      setLikes(responseData.likesCount);
      setIsLiked(responseData.liked);
    } catch (error: any) {
      console.error("Error updating like:", error);
      // Revert on error
      setIsLiked(previousLiked);
      setLikes(previousLikes);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error?.message || "Could not update like. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLike}
      disabled={loading}
      className={cn(
        "gap-2 transition-all duration-200",
        isLiked ? "text-pink-400" : "text-slate-400 hover:text-pink-400",
        loading && "opacity-50 cursor-not-allowed",
      )}
    >
      <Heart
        className={cn(
          "h-4 w-4 transition-all duration-200",
          isLiked && "fill-pink-400 scale-110",
        )}
      />
      <span>{likes}</span>
    </Button>
  );
}
