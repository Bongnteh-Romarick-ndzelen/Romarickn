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

function PostCard({ post }: { post: Post }) {
  return (
    <Card className="group flex flex-col overflow-hidden bg-slate-800/40 border border-slate-700/50 transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-900/20 hover:-translate-y-1 rounded-xl">
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
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
            {post.categories && post.categories.length > 0 && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-purple-600/90 text-white text-[10px] px-2 py-0.5">
                  {post.categories[0].name}
                </Badge>
              </div>
            )}
          </div>
        </Link>
      </CardHeader>

      <CardContent className="p-4 flex-grow">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-2">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(post.publishedAt)}</span>
          <span>•</span>
          <Clock className="h-3 w-3" />
          <span>{post.readTime} min read</span>
        </div>

        <CardTitle className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>

        <p className="text-slate-400 text-xs line-clamp-2 mb-2 leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-1 mt-1">
          {post.categories?.slice(1, 3).map((cat, index) => (
            <Badge
              key={cat.slug || index}
              variant="outline"
              className="text-[9px] border-purple-500/30 text-purple-300 bg-purple-500/5 px-1.5 py-0"
            >
              {cat.name}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Avatar className="h-5 w-5 border border-purple-500/30">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="bg-purple-500/20 text-purple-300 text-[8px]">
                {post.author.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-[10px] text-slate-400 truncate max-w-[80px]">
              {post.author.name?.split(" ")[0]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-slate-400 hover:text-pink-400 transition-colors">
              <Heart className="h-3 w-3" />
              <span className="text-[9px]">{post._count?.likes || 0}</span>
            </div>
            <div className="flex items-center gap-0.5 text-slate-400 hover:text-blue-400 transition-colors">
              <MessageCircle className="h-3 w-3" />
              <span className="text-[9px]">{post._count?.comments || 0}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function PostCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden bg-slate-800/40 border border-slate-700/50 rounded-xl">
      <CardHeader className="p-0">
        <Skeleton className="aspect-video w-full" />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center gap-1.5 mb-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-3 rounded-full" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-2/3 mb-3" />
        <div className="flex gap-1">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-2.5 w-12" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-3 w-8" />
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
        const response = await postService.getPosts(page, 12);
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
  }, [page]);

  // Fixed filtering logic with null/undefined checks
  const filteredPosts = searchTerm
    ? posts.filter(
        (post) =>
          (post.title &&
            post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.excerpt &&
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.categories &&
            post.categories.some(
              (cat) =>
                cat?.name &&
                cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
            )),
      )
    : posts;

  // Get featured posts for hero section
  const featuredPosts = filteredPosts.slice(0, 4);
  const regularPosts = filteredPosts.slice(4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto max-w-7xl px-4 md:px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <Badge className="mb-3 bg-purple-500/10 text-purple-400 border-purple-500/30 px-3 py-0.5 text-xs">
            Latest Insights
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            From the{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto">
            Thoughts, tutorials, and deep dives into modern web development
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-sm mx-auto">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-9 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-purple-500 text-slate-300 rounded-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          </div>
        </div>

        {/* Featured Posts Section - 4 columns */}
        {!loading && featuredPosts.length > 0 && !searchTerm && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-3.5 w-3.5 text-purple-400" />
              <h2 className="text-sm font-semibold text-white">
                Featured Articles
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {featuredPosts.map((post, index) => (
                <PostCard key={post.id || index} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* All Posts Section */}
        <div>
          {!loading && regularPosts.length > 0 && !searchTerm && (
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-3.5 w-3.5 text-purple-400" />
              <h2 className="text-sm font-semibold text-white">Recent Posts</h2>
            </div>
          )}

          {searchTerm && filteredPosts.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-slate-400">
                Found {filteredPosts.length} result
                {filteredPosts.length !== 1 ? "s" : ""} for "{searchTerm}"
              </p>
            </div>
          )}

          {/* Posts Grid - 4 columns */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))
            ) : filteredPosts.length > 0 ? (
              (searchTerm ? filteredPosts : regularPosts).map((post, index) => (
                <PostCard key={post.id || index} post={post} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="inline-flex p-3 rounded-full bg-slate-800/50 mb-3">
                  <Search className="h-6 w-6 text-slate-500" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">
                  No posts found
                </h3>
                <p className="text-xs text-slate-400">
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
          filteredPosts.length > 0 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="border-slate-700 text-slate-300 hover:border-purple-500 hover:text-purple-300 rounded-full h-7 text-xs px-3"
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Prev
              </Button>
              <div className="flex items-center gap-1">
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
                        className={`w-7 h-7 p-0 rounded-full text-xs ${
                          pageNum === page
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "border-slate-700 text-slate-400 hover:border-purple-500 hover:text-purple-300"
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
                className="border-slate-700 text-slate-300 hover:border-purple-500 hover:text-purple-300 rounded-full h-7 text-xs px-3"
              >
                Next
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          )}

        {/* Stats Footer */}
        {!loading && posts.length > 0 && pagination && (
          <div className="mt-12 pt-5 border-t border-slate-800/50">
            <div className="flex flex-wrap justify-center gap-4 text-center text-slate-400 text-[10px]">
              <div className="flex items-center gap-1">
                <Rss className="h-3 w-3 text-purple-400" />
                <span>{pagination.total} articles published</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-3 w-3 text-pink-400" />
                <span>
                  {posts.reduce(
                    (sum, post) => sum + (post._count?.likes || 0),
                    0,
                  )}{" "}
                  total likes
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3 text-blue-400" />
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
