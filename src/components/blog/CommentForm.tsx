'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

const commentFormSchema = z.object({
  content: z.string().min(3, 'Comment must be at least 3 characters.'),
  authorName: z.string().min(2, 'Name must be at least 2 characters.'),
  authorEmail: z.string().email('Please enter a valid email.'),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

interface CommentFormProps {
  postId: string;
  parentId?: string;
  onCommentSubmitted: (comment: any) => void;
}

export default function CommentForm({ postId, parentId, onCommentSubmitted }: CommentFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { content: '', authorName: '', authorEmail: '' },
  });

  const onSubmit = async (data: CommentFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, postId, parentId }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
      
      const newComment = await response.json();
      toast({
        title: 'Comment Submitted!',
        description: 'Your comment is awaiting moderation.',
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
          <div className="grid md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="authorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} className="bg-slate-800/50 border-slate-700" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your Email" {...field} className="bg-slate-800/50 border-slate-700" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
