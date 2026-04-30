'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  postId: string;
  initialLikes: number;
}

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // In a real app, you'd check if the user has already liked this post
  // For now, we'll just use the local state `isLiked`

  const handleLike = async () => {
    setLoading(true);

    // This is a placeholder for getting the authenticated user ID.
    // In your real application, you would get this from your auth context.
    const userId = "mock-user-id"; 

    try {
      if (isLiked) {
        // Unlike the post
        const response = await fetch(`/api/posts/${postId}/likes`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }), // You'd send the actual user ID
        });

        if (!response.ok) throw new Error('Failed to unlike');
        
        setLikes(prev => prev - 1);
        setIsLiked(false);
      } else {
        // Like the post
        const response = await fetch(`/api/posts/${postId}/likes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }), // You'd send the actual user ID
        });
        
        if (!response.ok) throw new Error('Failed to like');

        setLikes(prev => prev + 1);
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
