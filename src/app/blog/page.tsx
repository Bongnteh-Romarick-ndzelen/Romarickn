"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Clock,
  MessageCircle,
  Heart,
  Search,
  Rss,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { postService } from "@/lib/services/post.service";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  author: {
    name: string;
    avatar: string;
  };
  categories: { name: string; slug: string }[];
  _count: {
    comments: number;
    likes: number;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// Card background variants
const cardBgVariants = [
  "bg-black",
 
];

function PostCard({ post }: { post: Post }) {
  return (
    <Card className="group flex flex-col overflow-hidden bg-slate-900/85 border border-slate-700/40 transition-all duration-300 hover:border-teal-500/50 hover:shadow-xl hover:shadow-teal-900/20 hover:-translate-y-1 rounded-xl backdrop-blur-sm">
      <CardHeader className="p-0 relative">
        <Link href={`/blog/${post.slug}`}>
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={
                post.coverImage ||
                "https://picsum.photos/seed/blog-fallback/600/400"
              }
              alt={post.title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            {post.categories && post.categories.length > 0 && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-gradient-to-r from-teal-500 to-cyan-500 border-0 text-white text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 font-medium">
                  {post.categories[0].name}
                </Badge>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-3 sm:p-4 flex-grow">
        <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-slate-400 mb-1.5 sm:mb-2">
          <Calendar className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          <span>{formatDate(post.publishedAt)}</span>
          <span>•</span>
          <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          <span>{post.readTime} min read</span>
        </div>

        <CardTitle className="text-xs sm:text-sm font-bold text-white mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-teal-300 transition-colors leading-snug">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>

        <p className="text-slate-400 text-[10px] sm:text-xs line-clamp-2 mb-2 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-1 mt-1">
          {post.categories?.slice(1, 3).map((cat, index) => (
            <Badge
              key={cat.slug || index}
              variant="outline"
              className="text-[8px] sm:text-[9px] border-teal-500/30 text-teal-300 bg-teal-500/5 px-1 sm:px-1.5 py-0 font-medium"
            >
              {cat.name}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-3 sm:p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <Avatar className="h-4 w-4 sm:h-5 sm:w-5 border border-teal-500/30">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="bg-teal-500/20 text-teal-300 text-[7px] sm:text-[8px] font-bold">
                {post.author.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-[9px] sm:text-[10px] text-slate-400 truncate max-w-[60px] sm:max-w-[80px]">
              {post.author.name?.split(" ")[0]}
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-0.5 text-slate-400 hover:text-teal-400 transition-colors">
              <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="text-[8px] sm:text-[9px] font-medium">
                {post._count?.likes || 0}
              </span>
            </div>
            <div className="flex items-center gap-0.5 text-slate-400 hover:text-teal-400 transition-colors">
              <MessageCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
              <span className="text-[8px] sm:text-[9px] font-medium">
                {post._count?.comments || 0}
              </span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function PostCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden bg-slate-800/85 border border-slate-700/40 rounded-xl backdrop-blur-sm">
      <CardHeader className="p-0">
        <Skeleton className="aspect-video w-full" />
      </CardHeader>
      <CardContent className="p-3 sm:p-4 flex-grow">
        <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2">
          <Skeleton className="h-2.5 sm:h-3 w-12 sm:w-16" />
          <Skeleton className="h-2.5 sm:h-3 w-2.5 sm:w-3 rounded-full" />
          <Skeleton className="h-2.5 sm:h-3 w-10 sm:w-12" />
        </div>
        <Skeleton className="h-3 sm:h-4 w-3/4 mb-1.5 sm:mb-2" />
        <Skeleton className="h-2.5 sm:h-3 w-full mb-1" />
        <Skeleton className="h-2.5 sm:h-3 w-2/3 mb-2 sm:mb-3" />
        <div className="flex gap-1">
          <Skeleton className="h-3 sm:h-4 w-10 sm:w-12" />
          <Skeleton className="h-3 sm:h-4 w-10 sm:w-12" />
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-4 w-4 sm:h-5 sm:w-5 rounded-full" />
            <Skeleton className="h-2 sm:h-2.5 w-10 sm:w-12" />
          </div>
          <div className="flex gap-1.5 sm:gap-2">
            <Skeleton className="h-2.5 sm:h-3 w-6 sm:w-8" />
            <Skeleton className="h-2.5 sm:h-3 w-6 sm:w-8" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await postService.getPosts(page, 8, searchTerm);
        const responseData = response as any;

        let postsData = [];
        let paginationData = null;

        if (responseData?.data) {
          if (Array.isArray(responseData.data)) {
            postsData = responseData.data;
            paginationData = responseData.pagination;
          } else if (
            responseData.data.posts &&
            Array.isArray(responseData.data.posts)
          ) {
            postsData = responseData.data.posts;
            paginationData = responseData.data.pagination;
          } else if (responseData.posts && Array.isArray(responseData.posts)) {
            postsData = responseData.posts;
            paginationData = responseData.pagination;
          }
        }

        setPosts(postsData);
        setPagination(paginationData);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
        setPagination(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [page, searchTerm]);

  const featuredPosts = posts.slice(0, 4);
  const regularPosts = posts.slice(4);

  return (
    <div className="min-h-screen bg-[#111D3A] relative overflow-hidden">
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(64,224,208,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(64,224,208,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Glow orbs */}
      <div className="absolute top-[-80px] right-[-60px] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-teal-500/10 rounded-full border border-teal-500/20">
            <Sparkles className="h-3 w-3 text-teal-400" />
            <span className="text-[10px] sm:text-xs font-medium text-teal-300">
              Latest Articles
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            From the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Blog
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Insights, tutorials, and deep dives into web development, design,
            and technology.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 sm:mb-8 max-w-sm mx-auto">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-8 sm:pl-9 py-1.5 h-8 sm:h-9 text-xs sm:text-sm bg-slate-800/50 border-slate-700 focus:border-teal-500 text-slate-300 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-3 sm:h-3.5 w-3 sm:w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Featured Posts Section - 4 columns */}
        {!loading && featuredPosts.length > 0 && !searchTerm && (
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-teal-400" />
              <h2 className="text-xs sm:text-sm font-bold text-white">
                Featured Articles
              </h2>
            </div>
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {featuredPosts.map((post, index) => (
                <PostCard key={post.id || index} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* All Posts Section */}
        <div>
           {!loading && regularPosts.length > 0 && !searchTerm && (
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Zap className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-teal-400" />
              <h2 className="text-xs sm:text-sm font-bold text-white">
                Recent Posts
              </h2>
            </div>
          )}

          {searchTerm && posts.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] sm:text-xs text-slate-400">
                Found {posts.length} result{posts.length !== 1 ? "s" : ""} for "{searchTerm}"
              </p>
            </div>
          )}

          {/* Posts Grid - 4 columns */}
          <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))
            ) : posts.length > 0 ? (
              (searchTerm ? posts : regularPosts).map((post, index) => (
                <PostCard key={post.id || index} post={post} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 sm:py-12">
                <div className="inline-flex p-2.5 sm:p-3 rounded-full bg-slate-800/50 mb-3">
                  <Search className="h-5 w-5 sm:h-6 sm:w-6 text-slate-500" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                  No posts found
                </h3>
                <p className="text-[10px] sm:text-xs text-slate-400">
                  Try adjusting your search or browse all articles.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {!loading &&
           pagination &&
           pagination.pages > 1 &&
           posts.length > 0 && (
            <div className="mt-8 sm:mt-12 flex justify-center items-center gap-1.5 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="border-slate-700 text-slate-300 hover:border-teal-500 hover:text-teal-300 rounded-full h-6 sm:h-7 text-[10px] sm:text-xs px-2.5 sm:px-3 font-medium"
              >
                <ArrowLeft className="mr-0.5 sm:mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
                Prev
              </Button>
              <div className="flex items-center gap-0.5 sm:gap-1">
                {Array.from(
                  { length: Math.min(5, pagination.pages) },
                  (_, i) => {
                    let pageNum = page;
                    if (pagination.pages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= pagination.pages - 2) {
                      pageNum = pagination.pages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }

                    return (
                      <Button
                        key={i}
                        variant={pageNum === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(pageNum)}
                        className={`w-6 h-6 sm:w-7 sm:h-7 p-0 rounded-full text-[10px] sm:text-xs font-semibold ${
                          pageNum === page
                            ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white"
                            : "border-slate-700 text-slate-400 hover:border-teal-500 hover:text-teal-300"
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  },
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((p) => Math.min(pagination.pages, p + 1))
                }
                disabled={page === pagination.pages}
                className="border-slate-700 text-slate-300 hover:border-teal-500 hover:text-teal-300 rounded-full h-6 sm:h-7 text-[10px] sm:text-xs px-2.5 sm:px-3 font-medium"
              >
                Next
                <ArrowRight className="ml-0.5 sm:ml-1 h-2.5 w-2.5 sm:h-3 sm:w-3" />
              </Button>
            </div>
          )}

        {/* Stats Footer */}
        {!loading && posts.length > 0 && pagination && (
          <div className="mt-8 sm:mt-12 pt-4 sm:pt-5 border-t border-slate-700/30">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-center text-slate-400 text-[8px] sm:text-[10px] font-medium">
              <div className="flex items-center gap-1">
                <Rss className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-teal-400" />
                <span>{pagination.total} articles published</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-teal-400" />
                <span>
                  {posts.reduce(
                    (sum, post) => sum + (post._count?.likes || 0),
                    0,
                  )}{" "}
                  total likes
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-teal-400" />
                <span>
                  {posts.reduce(
                    (sum, post) => sum + (post._count?.comments || 0),
                    0,
                  )}{" "}
                  comments
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}