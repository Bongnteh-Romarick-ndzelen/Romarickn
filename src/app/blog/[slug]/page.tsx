"use client";

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  Eye,
  MessageCircle,
  Calendar,
  ArrowLeft,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { postService } from "@/lib/services/post.service";

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
  comments: any[];
  _count: {
    likes: number;
    comments: number;
  };
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await postService.getPostBySlug(slug as string);
        console.log('Fetched post data:', JSON.stringify(data, null, 2));
        setPost(data);
        setLikesCount(data._count?.likes || 0);
      } catch (error) {
        console.error('Error fetching post:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  useEffect(() => {
    async function fetchComments() {
      if (!post?.id) return;
      try {
        const response = await fetch(`/api/comments/post/${post.id}`);
        const data = await response.json();
        console.log('Fetched comments:', JSON.stringify(data, null, 2));
        setComments(data.data?.comments || []);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setCommentsLoading(false);
      }
    }
    fetchComments();
  }, [post?.id]);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-slate-800 rounded w-32"></div>
            <div className="h-8 bg-slate-800 rounded w-3/4"></div>
            <div className="h-5 bg-slate-800 rounded w-1/2"></div>
            <div className="aspect-video bg-slate-800 rounded-lg"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-800 rounded"></div>
              <div className="h-4 bg-slate-800 rounded"></div>
              <div className="h-4 bg-slate-800 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog">
            <Button
              variant="ghost"
              size="sm"
              className="mb-5 -ml-2 text-slate-400 hover:text-white text-xs"
            >
              <ArrowLeft className="h-3.5 w-3.5 mr-1" />
              Back to Blog
            </Button>
          </Link>

          <article>
            {/* Header */}
            <header className="mb-6">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {(post.categories || []).map((cat: any) => (
                  <Link
                    key={cat.slug || cat}
                    href={`/category/${cat.slug || cat}`}
                  >
                    <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-[10px] px-2 py-0.5">
                      {cat.name || cat}
                    </Badge>
                  </Link>
                ))}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-400 text-xs">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {post.publishedAt
                      ? formatDate(post.publishedAt)
                      : "Not published"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{post.views} views</span>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="mb-6 rounded-xl overflow-hidden aspect-video">
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
              className="prose prose-invert prose-sm max-w-none 
                prose-headings:text-white prose-headings:font-semibold
                prose-h1:text-xl prose-h2:text-lg prose-h3:text-base
                prose-p:text-slate-300 prose-p:text-sm prose-p:leading-relaxed
                prose-a:text-purple-400 hover:prose-a:text-purple-300
                prose-code:text-purple-300 prose-code:bg-slate-800/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-slate-800/50 prose-pre:border prose-pre:border-slate-700
                prose-ul:text-slate-300 prose-ol:text-slate-300
                prose-li:text-sm prose-li:marker:text-purple-400
                prose-blockquote:border-l-purple-400 prose-blockquote:text-slate-300 prose-blockquote:text-sm"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {(post.tags || []).map((tag: any) => (
                <Link key={tag.slug || tag} href={`/tag/${tag.slug || tag}`}>
                  <Badge
                    variant="outline"
                    className="text-slate-400 border-slate-700 text-[10px] px-2 py-0.5"
                  >
                    #{tag.name || tag}
                  </Badge>
                </Link>
              ))}
            </div>

            <Separator className="my-6 bg-slate-800" />

            {/* Author & Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-purple-500/30">
                  <AvatarImage
                    src={post.author?.avatar}
                    alt={post.author?.name}
                  />
                  <AvatarFallback className="bg-purple-500/20 text-purple-300 text-xs">
                    {post.author?.name?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-slate-400 text-[10px]">Written by</p>
                  <h4 className="font-semibold text-sm text-white">
                    {post.author?.name || "Unknown"}
                  </h4>
                  <p className="text-slate-400 text-[10px] italic">
                    {post.author?.bio || ""}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`gap-1.5 text-xs h-8 ${liked ? "text-pink-400" : "text-slate-400 hover:text-pink-400"}`}
                >
                  <Heart
                    className={`h-3.5 w-3.5 ${liked ? "fill-pink-400" : ""}`}
                  />
                  <span>{likesCount}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`gap-1.5 text-xs h-8 ${bookmarked ? "text-purple-400" : "text-slate-400 hover:text-purple-400"}`}
                >
                  <Bookmark
                    className={`h-3.5 w-3.5 ${bookmarked ? "fill-purple-400" : ""}`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-slate-400 hover:text-emerald-400 text-xs h-8"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: post.title,
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  <Share2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            <Separator className="my-6 bg-slate-800" />

            {/* Comments Section */}
            <section id="comments">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="h-4 w-4 text-purple-400" />
                <h2 className="text-base font-semibold text-white">
                  Comments ({post._count?.comments || 0})
                </h2>
              </div>

              <div className="space-y-5">
                {/* Comment Form */}
                <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                  <p className="text-slate-400 text-xs mb-2">
                    Join the conversation
                  </p>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-purple-500/20 text-purple-300 text-[10px]">
                          Y
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <textarea
                          placeholder="Share your thoughts..."
                          className="w-full p-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white text-xs resize-none focus:border-purple-500 outline-none"
                          rows={2}
                        />
                        <div className="flex justify-end mt-2">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-xs h-7"
                          >
                            Post Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                 {/* Comments List */}
                 <div className="space-y-3">
                   {commentsLoading ? (
                     <div className="text-center py-6">
                       <p className="text-xs text-slate-400">Loading comments...</p>
                     </div>
                   ) : comments && comments.length > 0 ? (
                     comments.map((comment: any) => (
                       <div
                         key={comment.id}
                         className="flex gap-2 p-3 rounded-lg bg-slate-800/20"
                       >
                         <Avatar className="h-7 w-7">
                           <AvatarImage src={comment.user?.avatar || comment.author?.avatar} />
                           <AvatarFallback className="bg-purple-500/20 text-purple-300 text-[10px]">
                             {(comment.user?.name || comment.authorName || "U").charAt(0)}
                           </AvatarFallback>
                         </Avatar>
                         <div className="flex-1">
                           <div className="flex items-center gap-2 mb-0.5">
                             <h4 className="font-medium text-white text-xs">
                               {comment.user?.name || comment.authorName || "Anonymous"}
                             </h4>
                             <span className="text-slate-500 text-[9px]">
                               {comment.createdAt
                                 ? formatDate(comment.createdAt)
                                 : "Just now"}
                             </span>
                           </div>
                           <p className="text-slate-300 text-xs leading-relaxed">
                             {comment.content}
                           </p>
                           <button className="mt-1 text-[9px] text-slate-500 hover:text-purple-400 transition-colors">
                             Like ({comment.likes || 0})
                           </button>
                         </div>
                       </div>
                     ))
                   ) : (
                     <div className="text-center py-6">
                       <p className="text-xs text-slate-400">
                         No comments yet. Be the first to share your thoughts!
                       </p>
                     </div>
                   )}
                 </div>
              </div>
            </section>

            {/* Related Posts Suggestion */}
            <div className="mt-8 pt-5 border-t border-slate-800">
              <h3 className="text-sm font-semibold text-white mb-3">
                Continue Reading
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Placeholder for related posts - you can add logic to fetch related posts */}
                <div className="p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/40 transition-all group">
                  <h4 className="text-sm font-medium text-white mb-1 group-hover:text-purple-300 transition-colors line-clamp-1">
                    More articles coming soon
                  </h4>
                  <p className="text-slate-400 text-[10px] line-clamp-1">
                    Stay tuned for more content
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
