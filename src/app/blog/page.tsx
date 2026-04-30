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
  User,
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
    <Card className="group flex flex-col overflow-hidden bg-slate-800/30 border-slate-700/50 transition-all duration-300 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-900/20 hover:-translate-y-2">
      <CardHeader className="p-0 relative">
        <Link href={`/blog/${post.slug}`} passHref>
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={
                post.coverImage ||
                "https://picsum.photos/seed/blog-fallback/600/400"
              }
              alt={post.title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
         <div className="mb-3">
          {post.categories?.slice(0, 2).map((cat, index) => (
            <Link key={cat.slug || index} href={`/blog?category=${cat.slug}`} passHref>
              <Badge
                variant="secondary"
                className="mr-2 text-xs bg-slate-700/50 text-slate-300"
              >
                {cat.name}
              </Badge>
            </Link>
          ))}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-slate-400 mb-4 line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="p-6 pt-4 flex flex-col items-start gap-4">
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="bg-purple-500/20 text-purple-300">
                {post.author.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
        </div>
        <div className="w-full flex justify-between items-center text-sm text-slate-400 border-t border-slate-700/50 pt-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Heart className="h-4 w-4" />
              <span>{post._count?.likes || 0}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" />
              <span>{post._count?.comments || 0}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function PostCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden bg-slate-800/30 border border-slate-700/50 rounded-lg">
      <Skeleton className="aspect-video w-full" />
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-3">
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <div className="flex-grow"></div>
        <div className="flex items-center gap-4 text-sm text-slate-400 mt-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="p-6 border-t border-slate-700/50 flex justify-between items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
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
        const response = await postService.getPosts(page, 6);

        // Handle different response structures
        let postsData = [];
        let paginationData = null;

        if (response && response.data) {
          // Check if response.data is an array or has posts property
          if (Array.isArray(response.data)) {
            postsData = response.data;
            paginationData = response.pagination;
          } else if (
            response.data.posts &&
            Array.isArray(response.data.posts)
          ) {
            postsData = response.data.posts;
            paginationData = response.data.pagination;
          } else if (response.posts && Array.isArray(response.posts)) {
            postsData = response.posts;
            paginationData = response.pagination;
          } else {
            postsData = [];
          }
        } else if (Array.isArray(response)) {
          postsData = response;
        } else {
          postsData = [];
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

  // Filter posts based on search term (client-side filtering)
  const filteredPosts = searchTerm
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.categories?.some((cat) =>
            cat.name.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      )
    : posts;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12 lg:py-16">
        {/* Header */}
        <header className="mb-8 md:mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
            <Rss className="h-3 w-3 md:h-4 md:w-4 text-purple-400" />
            <span className="text-xs md:text-sm text-purple-300">
              From My Desk
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white mb-3">
            The{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto">
            Insights, tutorials, and reflections on web development, design, and
            technology.
          </p>
        </header>

        {/* Search & Filter */}
        <div className="mb-8 md:mb-12 max-w-lg mx-auto">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-10 bg-slate-800/50 border-slate-700 focus:border-purple-500 text-slate-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          </div>
        </div>

        {/* Posts Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <PostCardSkeleton key={i} />
            ))
           ) : filteredPosts.length > 0 ? (
             filteredPosts.map((post, index) => <PostCard key={post.id || index} post={post} />)
           ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-400">No posts found.</p>
            </div>
          )}
        </main>

        {/* Pagination */}
        {!loading &&
          pagination &&
          pagination.pages > 1 &&
          filteredPosts.length > 0 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="border-slate-700 text-slate-300 hover:border-purple-500 hover:text-purple-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <span className="text-slate-400 text-sm">
                Page{" "}
                <span className="text-white font-medium">
                  {pagination.page}
                </span>{" "}
                of{" "}
                <span className="text-white font-medium">
                  {pagination.pages}
                </span>
              </span>
              <Button
                variant="outline"
                onClick={() =>
                  setPage((p) => Math.min(pagination.pages, p + 1))
                }
                disabled={page === pagination.pages}
                className="border-slate-700 text-slate-300 hover:border-purple-500 hover:text-purple-300"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
      </div>
    </div>
  );
}
