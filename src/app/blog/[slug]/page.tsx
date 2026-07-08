"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  Eye,
  Calendar,
  ArrowLeft,
  Heart,
  Share2,
  Bookmark,
  Copy,
  Check,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Reply,
  MoreVertical,
} from "lucide-react";
import { formatDate, getBaseUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { postService } from "@/lib/services/post.service";
import { commentService } from "@/lib/services/comment.service";
import { useToast } from "@/hooks/use-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useAuth } from "@/context/AuthContext";
import LikeButton from '@/components/blog/LikeButton';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { motion } from "framer-motion";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  views: number;
  userHasLiked?: boolean;
  author?: {
    id: string;
    name: string;
    avatar: string;
    bio?: string;
  };
  categories?: { name: string; slug: string }[];
  tags?: { name: string; slug: string }[];
  _count?: {
    likes: number;
    comments: number;
  };
}

function decodeHtml(html: string) {
  if (!html) return "";
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedCode = code
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "  ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative group my-5"
    >
      <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-md bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-green-400" />
          ) : (
            <Copy className="h-3.5 w-3.5 text-slate-300" />
          )}
        </button>
      </div>
      <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm">
        <div className="bg-slate-50 px-3 py-1.5 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-600 font-mono uppercase tracking-wider font-bold">
              {language || "javascript"}
            </span>
            <span className="text-[9px] text-slate-400 font-semibold">
              {formattedCode.split("\n").length} lines
            </span>
          </div>
        </div>
        <div className="overflow-x-auto" style={{ maxHeight: "500px" }}>
          <SyntaxHighlighter
            language={language || "javascript"}
            style={vscDarkPlus}
            showLineNumbers={true}
            wrapLines={true}
            wrapLongLines={true}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: "13px",
              fontFamily: "'Fira Code', 'Cascadia Code', monospace",
              background: "#0f172a",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
            lineNumberStyle={{
              minWidth: "2.5em",
              paddingRight: "1em",
              color: "#64748b",
              fontSize: "12px",
              background: "#0f172a",
            }}
          >
            {formattedCode}
          </SyntaxHighlighter>
        </div>
      </div>
    </motion.div>
  );
}

function RenderContent({ html, url }: { html: string; url?: string }) {
  const processContent = (content: string) => {
    let decodedContent = content;
    
    decodedContent = decodedContent
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&ldquo;/g, '"')
      .replace(/&rdquo;/g, '"')
      .replace(/&lsquo;/g, "'")
      .replace(/&rsquo;/g, "'");

    if (url) {
      decodedContent = decodedContent.replace(/<img[^>]*>/gi, (match) => {
        return `<a href="${url}">${match}</a>`;
      });
    }

    const parts = decodedContent.split(/(<pre><code[^>]*>[\s\S]*?<\/code><\/pre>)/gi);

    return parts.map((part, index) => {
      const codeMatch = part.match(
        /<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/i,
      );

      if (codeMatch) {
        let code = codeMatch[1];
        let language = "javascript";

        const langMatch = part.match(/class="language-(\w+)"/);
        if (langMatch) {
          language = langMatch[1];
        }

        code = code
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\\n/g, '\n');

        return <CodeBlock key={index} code={code} language={language} />;
      }

      return (
        <div
          key={index}
          dangerouslySetInnerHTML={{ __html: part }}
          className="[&_p]:text-slate-700 [&_p]:text-base [&_p]:leading-7 [&_p]:mb-5 [&_p]:font-semibold
            [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:mt-8 [&_h1]:mb-4
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-6 [&_h3]:mb-3
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ul]:text-slate-700 [&_ul]:font-semibold
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_ol]:text-slate-700 [&_ol]:font-semibold
            [&_li]:my-1 [&_li_marker]:text-blue-600
            [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:underline [&_a]:font-bold
            [&_blockquote]:border-l-4 [&_blockquote]:border-l-blue-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-600 [&_blockquote]:my-5 [&_blockquote]:font-semibold
            [&_img]:rounded-lg [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto [&_img]:shadow-md
            [&_hr]:border-slate-200 [&_hr]:my-8
            [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:text-blue-700 [&_code]:font-bold
            [&_strong]:text-slate-900 [&_strong]:font-bold
            [&_em]:text-slate-600 [&_em]:italic"
        />
      );
    });
  };

  return <>{processContent(html)}</>;
}

// Comment Component
function CommentItem({ comment, currentUserId, onReply }: any) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <div className="flex gap-3">
        <Avatar className="h-9 w-9 border-2 border-blue-100 flex-shrink-0">
          <AvatarImage src={comment.author?.avatar} />
          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">
            {comment.author?.name?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-slate-800">
              {comment.author?.name || "Anonymous"}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-400">
              {formatDate(comment.createdAt)}
            </span>
            {comment.author?.id === currentUserId && (
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-[10px] font-bold px-2 py-0 rounded-full">
                You
              </Badge>
            )}
          </div>
          <p className="text-sm text-slate-700 font-semibold mt-1 leading-relaxed">
            {comment.content}
          </p>
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <ThumbsUp className={`h-3.5 w-3.5 ${liked ? "fill-blue-600 text-blue-600" : ""}`} />
              <span>{likesCount}</span>
            </button>
            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <Reply className="h-3.5 w-3.5" />
              Reply
            </button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3"
            >
              <CommentForm
                postId={comment.postId}
                parentCommentId={comment.id}
                onCommentSubmitted={() => {
                  setShowReplyForm(false);
                  onReply();
                }}
                userId={currentUserId}
                isReply={true}
              />
            </motion.div>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-3 pl-4 border-l-2 border-slate-200 space-y-3">
              {comment.replies.map((reply: any) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  currentUserId={currentUserId}
                  onReply={onReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Comment Form Component
function CommentForm({ 
  postId, 
  parentCommentId, 
  onCommentSubmitted, 
  userId,
  isReply = false 
}: any) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const newComment = await commentService.createComment({
        postId,
        content: content.trim(),
        parentCommentId: parentCommentId || null,
      });
      setContent("");
      onCommentSubmitted(newComment);
      toast({
        variant: "success",
        title: "Comment posted",
        description: "Your comment has been added successfully.",
      });
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post comment. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="h-9 w-9 border-2 border-blue-100 flex-shrink-0">
          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">
            {userId?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={isReply ? "Write a reply..." : "Write a comment..."}
            rows={isReply ? 2 : 3}
            className="w-full px-4 py-2.5 text-sm text-slate-700 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none font-semibold placeholder:text-slate-400"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-slate-400 font-semibold">
              {content.length} characters
            </span>
            <Button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-bold rounded-xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Posting...
                </span>
              ) : (
                isReply ? "Reply" : "Post Comment"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const { toast } = useToast();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [renderedContent, setRenderedContent] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await postService.getPostBySlug(slug as string);
        const decoded = decodeHtml(data.content);
        setPost(data);
        setRenderedContent(decoded);
        setLikesCount(data._count?.likes || 0);
        setLiked(data.userHasLiked || false);
      } catch (error) {
        console.error("Error fetching post:", error);
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
      setCommentsLoading(true);
      try {
        const response = await commentService.getComments(post.id, 1, 50);
        const commentsData = response as any;
        setComments(commentsData.data?.comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setCommentsLoading(false);
      }
    }
    fetchComments();
  }, [post?.id]);

  const handleLike = async () => {
    if (!post || !user) return;
    try {
      const response = await postService.toggleLike(post.id);
      setLiked(response.liked);
      setLikesCount(response.likesCount);
    } catch (error) {
      console.error("Error updating like:", error);
      toast({
        title: "Error",
        description: "Could not update like. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      variant: "default",
      title: bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: bookmarked ? "Post removed from bookmarks" : "Post added to bookmarks",
    });
  };

  const handleCommentSubmitted = (newComment: any) => {
    if (newComment.parentCommentId) {
      setComments((prev) => {
        const updateComments = (commentsList: any[]): any[] => {
          return commentsList.map((comment) => {
            if (comment.id === newComment.parentCommentId) {
              return {
                ...comment,
                replies: [...(comment.replies || []), newComment],
              };
            }
            if (comment.replies && comment.replies.length > 0) {
              return {
                ...comment,
                replies: updateComments(comment.replies),
              };
            }
            return comment;
          });
        };
        return updateComments(prev);
      });
    } else {
      setComments((prev) => [newComment, ...prev]);
    }
  };

  const refreshComments = async () => {
    if (!post?.id) return;
    try {
      const response = await commentService.getComments(post.id, 1, 50);
      const commentsData = response as any;
      setComments(commentsData.data?.comments || []);
    } catch (error) {
      console.error("Error refreshing comments:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50/50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-slate-200 rounded w-32"></div>
            <div className="h-10 bg-slate-200 rounded w-3/4"></div>
            <div className="flex gap-4">
              <div className="h-5 bg-slate-200 rounded w-32"></div>
              <div className="h-5 bg-slate-200 rounded w-32"></div>
            </div>
            <div className="aspect-video bg-slate-200 rounded-xl"></div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const isCloudinaryImage = (url: string) => {
    return url?.includes('res.cloudinary.com') || false;
  };

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-blue-500 selection:text-white overflow-x-hidden">
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Radley:ital@0;1&display=swap');
        
        h1, h2, h3, h4, .font-heading {
          font-family: 'Radley', serif !important;
          font-weight: 700 !important;
        }
        p, span, div, a, button, label, .font-body {
          font-family: 'Lato', sans-serif !important;
        }
      `}</style>

      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-50 transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/blog">
              <Button
                variant="ghost"
                size="sm"
                className="mb-6 -ml-2 text-slate-600 hover:text-blue-600 text-sm font-bold"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {(post.categories || []).map((cat: any, index: number) => (
                  <Badge
                    key={cat.slug || index}
                    className="bg-blue-100 text-blue-700 border-blue-200 text-sm font-bold px-4 py-1.5 rounded-xl"
                  >
                    {cat.name}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-slate-600 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-blue-200">
                    <AvatarImage src={post.author?.avatar} />
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">
                      {post.author?.name?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-bold text-slate-800">
                    {post.author?.name}
                  </span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
                <span className="text-slate-300">•</span>
                <div className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            {post.coverImage && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8 rounded-2xl overflow-hidden shadow-lg border-2 border-slate-200"
              >
                {!imgError ? (
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={1200}
                    height={630}
                    className="w-full h-auto object-cover"
                    priority
                    unoptimized={isCloudinaryImage(post.coverImage)}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <span className="text-4xl opacity-50">📝</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-slate-200"
            >
              <LikeButton
                postId={post.id}
                initialLikes={post._count?.likes || 0}
                userHasLiked={post.userHasLiked || false}
                showDetails={true}
              />

              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className={`gap-2 font-bold ${bookmarked ? "text-blue-600" : "text-slate-600"}`}
              >
                <Bookmark
                  className={`h-4 w-4 ${bookmarked ? "fill-blue-600" : ""}`}
                />
                <span>Save</span>
              </Button>

              <ShareButtons
                title={post.title}
                description={
                  post.excerpt ||
                  post.content?.substring(0, 160).replace(/<[^>]*>/g, "")
                }
                imageUrl={post.coverImage}
                url={`${getBaseUrl()}/blog/${post.slug}`}
                slug={post.slug}
              />
            </motion.div>

            {/* Post Content */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="prose max-w-none"
            >
              <RenderContent html={renderedContent} url={`${getBaseUrl()}/blog/${post.slug}`} />
            </motion.div>

            {/* Tags */}
            {(post.tags || []).length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="mt-8 pt-4 flex flex-wrap gap-2"
              >
                {(post.tags || []).map((tag: any, index: number) => (
                  <Badge
                    key={tag.slug || index}
                    variant="outline"
                    className="text-slate-600 border-slate-300 text-sm font-bold px-4 py-1.5 rounded-xl"
                  >
                    #{tag.name}
                  </Badge>
                ))}
              </motion.div>
            )}

            {/* Comments Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12 pt-8 border-t-2 border-slate-200"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <h3 className="text-2xl font-bold text-slate-900">
                    Comments
                  </h3>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-sm font-bold px-3 py-1 rounded-full">
                    {comments.length}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={refreshComments}
                  className="text-sm font-bold text-slate-500 hover:text-blue-600"
                >
                  Refresh
                </Button>
              </div>

              {/* Comment Form */}
              <div className="mb-8 bg-white border-2 border-slate-200/80 rounded-2xl p-5 shadow-sm">
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-500" />
                  Join the discussion
                </h4>
                <CommentForm
                  postId={post.id}
                  onCommentSubmitted={handleCommentSubmitted}
                  userId={user?._id}
                  isReply={false}
                />
              </div>

              {/* Comments List */}
              <div className="mt-6 space-y-4">
                {commentsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white border-2 border-slate-200/80 rounded-2xl p-5 animate-pulse">
                        <div className="flex gap-3">
                          <div className="h-9 w-9 bg-slate-200 rounded-full"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-4 bg-slate-200 rounded w-32"></div>
                            <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                            <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : comments.length > 0 ? (
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-white border-2 border-slate-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                        <CommentItem
                          comment={comment}
                          currentUserId={user?._id}
                          onReply={refreshComments}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white border-2 border-slate-200/80 rounded-2xl">
                    <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <h4 className="text-lg font-bold text-slate-700">No comments yet</h4>
                    <p className="text-sm text-slate-500 font-semibold">
                      Be the first to share your thoughts!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            <Separator className="my-8 bg-slate-200" />

            {/* Author Section */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="bg-white border-2 border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-blue-200">
                  <AvatarImage src={post.author?.avatar} />
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-base font-bold">
                    {post.author?.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-900">
                    {post.author?.name}
                  </h4>
                  <p className="text-base text-slate-600 font-semibold">
                    {post.author?.bio ||
                      "Full-stack developer sharing insights about web development."}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.article>
        </div>
      </div>
    </div>
  );
}