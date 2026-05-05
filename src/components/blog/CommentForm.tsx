'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { commentService } from '@/lib/services/comment.service';
import type { CreateCommentData } from '@/types/comment';

const commentFormSchema = z.object({
  content: z.string().min(3, 'Comment must be at least 3 characters.'),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onCommentSubmitted: (comment: any) => void;
  userId?: string;
}

export default function CommentForm({ postId, parentId, onCommentSubmitted, userId }: CommentFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { content: '' },
  });

  const onSubmit = async (data: CommentFormValues) => {
    if (!userId) {
      toast({
        title: 'Authentication required',
        description: 'Please log in to post a comment.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const commentData: CreateCommentData = {
        content: data.content,
        postId,
        parentCommentId: parentId,
        userId,
      };
      const newComment = await commentService.createComment(commentData);
      toast({
        variant: 'success',
        title: 'Comment Submitted!',
        description: 'Your comment has been posted.',
      });
      form.reset();
      onCommentSubmitted(newComment);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not submit your comment. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userId) {
    return (
      <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-700/50 text-center">
        <p className="text-slate-400 mb-4">Please log in to post a comment.</p>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg bg-slate-800/30 border border-slate-700/50">
      <h3 className="text-lg font-semibold mb-4">Leave a Reply</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Comment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your comment here..."
                    className="bg-slate-800/50 border-slate-700"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
