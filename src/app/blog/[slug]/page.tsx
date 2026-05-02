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
  Copy,
  Check,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { postService } from "@/lib/services/post.service";
import { useToast } from "@/hooks/use-toast";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  coy,
  darcula,
  materialDark,
  oneDark,
  vsCodeDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyToClipboard } from "react-copy-to-clipboard";

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
  _count: {
    likes: number;
    comments: number;
  };
}

// Function to decode HTML entities
function decodeHtml(html: string) {
  if (!html) return "";
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedCode = code.replace(/\\n/g, '\n');

  return (
    <div className="relative group my-5">
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
      <div className="rounded-lg overflow-hidden border border-slate-700">
        <div className="bg-slate-800/50 px-3 py-1.5 border-b border-slate-700">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
            {language || 'javascript'}
          </span>
        </div>
        <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: '500px' }}>
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
    </div>
  );
}
// Custom component to render content with highlighted code blocks
function RenderContent({ html }: { html: string }) {
  // Parse HTML and find code blocks
  const processContent = (content: string) => {
    // Split by pre tags to identify code blocks
    const parts = content.split(/(<pre><code[^>]*>[\s\S]*?<\/code><\/pre>)/gi);

    return parts.map((part, index) => {
      // Check if this part is a code block
      const codeMatch = part.match(
        /<pre><code[^>]*>([\s\S]*?)<\/code><\/pre>/i,
      );

      if (codeMatch) {
        // Extract code and language
        let code = codeMatch[1];
        let language = "javascript";

        // Try to detect language from class
        const langMatch = part.match(/class="language-(\w+)"/);
        if (langMatch) {
          language = langMatch[1];
        }

        // Decode HTML entities in code
        code = code
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&");

        return <CodeBlock key={index} code={code} language={language} />;
      }

      // Regular HTML content
      return (
        <div
          key={index}
          dangerouslySetInnerHTML={{ __html: part }}
          className="[&_p]:text-slate-200 [&_p]:text-base [&_p]:leading-7 [&_p]:mb-5
            [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-8 [&_h1]:mb-4
            [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-4
            [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-6 [&_h3]:mb-3
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ul]:text-slate-200
            [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_ol]:text-slate-200
            [&_li]:my-1 [&_li_marker]:text-purple-400
            [&_a]:text-purple-400 [&_a]:no-underline hover:[&_a]:underline
            [&_blockquote]:border-l-4 [&_blockquote]:border-l-purple-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-300 [&_blockquote]:my-5
            [&_img]:rounded-lg [&_img]:my-6
            [&_hr]:border-slate-800 [&_hr]:my-8"
        />
      );
    });
  };

  return <>{processContent(html)}</>;
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const { toast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [renderedContent, setRenderedContent] = useState("");

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
      } catch (error) {
        console.error("Error fetching post:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [slug]);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
      setLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setLiked(true);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
    });
  };

  const handleShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied!" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-slate-800 rounded w-32"></div>
            <div className="h-10 bg-slate-800 rounded w-3/4"></div>
            <div className="flex gap-4">
              <div className="h-5 bg-slate-800 rounded w-32"></div>
              <div className="h-5 bg-slate-800 rounded w-32"></div>
            </div>
            <div className="aspect-video bg-slate-800 rounded-xl"></div>
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

  if (!post) return null;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 transition-all duration-200"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link href="/blog">
            <Button
              variant="ghost"
              size="sm"
              className="mb-6 -ml-2 text-slate-400 hover:text-white text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Blog
            </Button>
          </Link>

          <article>
            {/* Header */}
            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {(post.categories || []).map((cat: any) => (
                  <Badge
                    key={cat.slug}
                    className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs px-3 py-1"
                  >
                    {cat.name}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author?.avatar} />
                    <AvatarFallback className="bg-purple-500/20 text-purple-300 text-xs">
                      {post.author?.name?.charAt(0) || "A"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-white">
                    {post.author?.name}
                  </span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readTime} min read</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>
            </header>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="mb-8 rounded-xl overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-800">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`gap-2 ${liked ? "text-pink-400" : "text-slate-400"}`}
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-pink-400" : ""}`} />
                <span>{likesCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className={`gap-2 ${bookmarked ? "text-purple-400" : "text-slate-400"}`}
              >
                <Bookmark
                  className={`h-4 w-4 ${bookmarked ? "fill-purple-400" : ""}`}
                />
                <span>Save</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="gap-2 text-slate-400"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>

            {/* Post Content with Syntax Highlighting */}
            <div className="prose prose-invert prose-slate max-w-none">
              <RenderContent html={renderedContent} />
            </div>

            {/* Tags */}
            {(post.tags || []).length > 0 && (
              <div className="mt-8 pt-4 flex flex-wrap gap-2">
                {(post.tags || []).map((tag: any) => (
                  <Badge
                    key={tag.slug}
                    variant="outline"
                    className="text-slate-400 border-slate-700 text-xs px-3 py-1"
                  >
                    #{tag.name}
                  </Badge>
                ))}
              </div>
            )}

            <Separator className="my-8 bg-slate-800" />

            {/* Author Section */}
            <div className="bg-slate-800/30 rounded-xl p-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author?.avatar} />
                  <AvatarFallback className="bg-purple-500/20 text-purple-300 text-base">
                    {post.author?.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">
                    {post.author?.name}
                  </h4>
                  <p className="text-slate-400 text-sm">
                    {post.author?.bio ||
                      "Full-stack developer sharing insights about web development."}
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
