
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/editor/RichTextEditor';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function NewPostPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent, publish: boolean) => {
    e.preventDefault();
    setIsSubmitting(true);

    const postData = {
      title,
      excerpt,
      content,
      published: publish,
    };

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        toast({
          title: 'Success!',
          description: `Post has been ${publish ? 'published' : 'saved as a draft'}.`,
        });
        router.push('/dashboard/posts');
        router.refresh(); // Refresh server components
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
      }
    } catch (error: any) {
      console.error('Failed to create post:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <div className="flex items-center space-x-2 shrink-0">
          <Switch 
            id="publish-switch" 
            checked={published}
            onCheckedChange={setPublished}
          />
          <Label htmlFor="publish-switch">Publish Immediately</Label>
        </div>
      </div>
      <form className="space-y-6">
        <div>
          <Input
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold h-auto p-2 bg-slate-800/30 border-slate-700"
          />
        </div>
        <div>
          <Textarea
            placeholder="Post Excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="bg-slate-800/30 border-slate-700"
          />
        </div>
        <div>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Start writing your amazing post..."
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" onClick={(e) => handleSubmit(e, false)} disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button type="submit" onClick={(e) => handleSubmit(e, true)} disabled={isSubmitting}>
            {isSubmitting ? 'Publishing...' : 'Publish Post'}
          </Button>
        </div>
      </form>
    </div>
  );
}
