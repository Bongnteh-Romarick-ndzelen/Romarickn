

'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock, Eye, MessageCircle, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import LikeButton from '@/components/blog/LikeButton';
import CommentList from '@/components/blog/CommentList';
import CommentForm from '@/components/blog/CommentForm';
import Link from 'next/link';
import { postService } from '@/lib/services/post.service';

// Define the shape of your post data
interface Post {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  views: number;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  categories: { name: string; slug: string }[];
  tags: { name: string; slug: string }[];
  comments: any[]; // Define a proper type for comments
  _count: {
    likes: number;
    comments: number;
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await postService.getPostBySlug(params.slug);
        setPost(data);
      } catch (error) {
        console.error(error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-10 bg-slate-700 rounded w-3/4"></div>
            <div className="h-6 bg-slate-700 rounded w-1/2"></div>
            <div className="aspect-video bg-slate-700 rounded-lg"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded"></div>
              <div className="h-4 bg-slate-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    // This will be caught by the notFound() in the fetch function
    return null;
  }
  
  const handleCommentSubmitted = (newComment: any) => {
    // For now, just refetch everything.
    // A more optimized approach would be to just add the comment to the state.
    // This requires the comment to be approved first to show up.
    // We can add it optimistically if we change the backend logic.
    fetch(`/api/posts/${params.slug}`).then(res => res.json()).then(data => setPost(data));
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <article>
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((cat) => (
                  <Link key={cat.slug} href={`/category/${cat.slug}`} passHref>
                    <Badge variant="secondary">{cat.name}</Badge>
                  </Link>
                ))}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="mb-8 rounded-lg overflow-hidden aspect-video">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            )}

            {/* Post Content */}
            <div
              className="prose prose-invert prose-lg max-w-none prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-blockquote:border-l-blue-400"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link key={tag.slug} href={`/tag/${tag.slug}`} passHref>
                  <Badge variant="outline" className="text-slate-300"># {tag.name}</Badge>
                </Link>
              ))}
            </div>

            <Separator className="my-8" />

            {/* Author & Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-slate-400 text-sm">Written by</p>
                  <h4 className="font-semibold text-lg text-white">{post.author.name}</h4>
                  <p className="text-slate-400 text-sm italic">{post.author.bio}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LikeButton postId={post.id} initialLikes={post._count.likes} />
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Comments Section */}
            <section id="comments">
              <h2 className="text-2xl font-bold mb-6">Comments ({post._count.comments})</h2>
              <div className="space-y-8">
                <CommentForm postId={post.id} onCommentSubmitted={handleCommentSubmitted} />
                <CommentList comments={post.comments} />
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>
  );
}

    
