'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { postService } from '@/lib/services/post.service';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  // In a real app, you'd check if the user has already liked this post
  // For now, we'll just use the local state `isLiked`

  const handleLike = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'You must be logged in to like a post.',
      });
      router.push('/login');
      return;
    }

    setLoading(true);

    try {
      if (isLiked) {
        // Unlike the post
        const result = await postService.unlikePost(postId);
        setLikes(result.likesCount);
        setIsLiked(false);
      } else {
        // Like the post
        const result = await postService.likePost(postId);
        setLikes(result.likesCount);
        setIsLiked(true);
      }
    } catch (error) {
      // Because we require authentication, we'll show a toast.
      // In a real app, this logic would be more robust.
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'You must be logged in to like a post.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLike} disabled={loading}>
      <Heart className={cn("mr-2 h-4 w-4", isLiked && "fill-red-500 text-red-500")} />
      {likes} Likes
    </Button>
  );
}
