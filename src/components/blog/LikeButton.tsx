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
  showDetails?: boolean;
}

interface Likers {
  _id: string;
  name: string;
  avatar?: string;
}

export default function LikeButton({
  postId,
  initialLikes,
  userHasLiked = false,
  showDetails = false,
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(userHasLiked);
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [likers, setLikers] = useState<Likers[]>([]);
  const [fetchingLikers, setFetchingLikers] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  // Fetch likers when hovering
  const fetchLikers = async () => {
    if (likers.length > 0 || fetchingLikers) return;

    setFetchingLikers(true);
    try {
      // Get post details to fetch likes array
      const response = await postService.getPostById(postId);
      if (response?.data?.likes && Array.isArray(response.data.likes)) {
        // Get unique likers with names (limit to 10 for display)
        const uniqueLikers = response.data.likes
          .filter((like: any) => like?.name)
          .slice(0, 10)
          .map((like: any) => ({
            _id: like._id,
            name: like.name,
            avatar: like.avatar,
          }));
        setLikers(uniqueLikers);
      }
    } catch (error) {
      console.error("Error fetching likers:", error);
    } finally {
      setFetchingLikers(false);
    }
  };

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
      setLikes(result.likesCount);
      setIsLiked(result.liked);

      // Refresh likers list after like/unlike
      if (showDetails) {
        setLikers([]); // Clear cache to fetch fresh data next time
        if (result.liked) {
          // If liked, add current user to likers list optimistically
          const currentUser = {
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
          };
          setLikers((prev) => [currentUser, ...prev]);
        } else if (!result.liked) {
          // If unliked, remove current user from likers list
          setLikers((prev) => prev.filter((l) => l._id !== user._id));
        }
      }
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

  const handleMouseEnter = () => {
    if (showDetails && likes > 0) {
      setShowTooltip(true);
      fetchLikers();
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Generate tooltip text
  const getTooltipText = () => {
    if (likes === 0) return "No likes yet";

    const currentUserLiked = isLiked;
    const otherLikersCount = likers.filter((l) => l._id !== user?._id).length;

    if (currentUserLiked) {
      if (otherLikersCount === 0) {
        return "Liked by you";
      } else if (otherLikersCount === 1) {
        return `Liked by you and ${otherLikersCount} other`;
      } else {
        return `Liked by you and ${otherLikersCount} others`;
      }
    } else {
      if (likers.length === 0) return `${likes} likes`;
      if (likers.length === 1) {
        return `Liked by ${likers[0]?.name}`;
      }
      return `Liked by ${likers[0]?.name} and ${likers.length - 1} others`;
    }
  };

  // Get likers names for display
  const getLikersNames = () => {
    const currentUserLiked = isLiked;
    const otherLikers = likers.filter((l) => l._id !== user?._id);

    if (currentUserLiked && otherLikers.length > 0) {
      const names = otherLikers.slice(0, 3).map((l) => l.name);
      return names.join(", ");
    } else if (!currentUserLiked && likers.length > 0) {
      const names = likers.slice(0, 3).map((l) => l.name);
      return names.join(", ");
    }
    return "";
  };

  return (
    <div className="relative inline-block">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        disabled={loading}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "gap-2 transition-all duration-200 group relative",
          isLiked ? "text-pink-500" : "text-slate-400 hover:text-pink-400",
          loading && "opacity-50 cursor-not-allowed",
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-all duration-200",
            isLiked && "fill-pink-500 scale-110",
          )}
        />
        <span className="text-sm font-medium">
          {likes}
          <span className="text-xs text-slate-500 ml-1">
            {likes === 1 ? "like" : "likes"}
          </span>
        </span>
      </Button>

      {/* Tooltip showing who liked */}
      {showDetails && showTooltip && likes > 0 && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 min-w-[200px] max-w-[280px] bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-50">
          <div className="p-3">
            <div className="text-xs text-slate-400 mb-2">
              {getTooltipText()}
            </div>
            {getLikersNames() && (
              <div className="text-[10px] text-slate-500">
                {getLikersNames()}
                {likers.length > 3 && ` and ${likers.length - 3} more`}
              </div>
            )}
          </div>
          <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-900 border-r border-b border-slate-700 rotate-45"></div>
        </div>
      )}
    </div>
  );
}
