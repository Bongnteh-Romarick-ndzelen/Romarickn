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
import LikeButton from "@/components/blog/LikeButton";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  userHasLiked?: boolean;
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

// Animation variants - SIMPLIFIED for better performance
const fadeInUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const cardHover = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

function PostCard({ post, index }: { post: Post; index: number }) {
  const { user } = useAuth();
  const [imgError, setImgError] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px 0px',
  });

  // Check if image is from Cloudinary
  const isCloudinaryImage = (url: string) => {
    return url?.includes('res.cloudinary.com') || false;
  };

  const imageUrl = post.coverImage || '/placeholder-blog.png';
  const isCloudinary = isCloudinaryImage(imageUrl);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      whileHover="hover"
      className="h-full"
    >
      <motion.div
        variants={cardHover}
        className="group bg-white border-2 border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-300 flex flex-col h-full"
      >
        <CardHeader className="p-0 relative">
          <Link href={`/blog/${post.slug}`}>
            <div className="relative aspect-video overflow-hidden bg-slate-100">
              {!imgError ? (
                isCloudinary ? (
                  <img
                    src={imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => setImgError(true)}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <Image
                    src={imageUrl}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={() => setImgError(true)}
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                )
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <span className="text-4xl opacity-50">📝</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              {post.categories && post.categories.length > 0 && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 text-white text-sm font-black px-4 py-1.5 rounded-xl shadow-lg">
                    {post.categories[0].name}
                  </Badge>
                </div>
              )}
            </div>
          </Link>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 flex-grow">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-500 mb-2 flex-wrap">
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="text-xs sm:text-sm">{formatDate(post.publishedAt)}</span>
            <span className="hidden xs:inline">•</span>
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 hidden xs:inline" />
            <span className="text-xs sm:text-sm hidden xs:inline">{post.readTime} min read</span>
          </div>

          <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </CardTitle>

          <p className="text-sm sm:text-base text-slate-600 font-semibold line-clamp-2 mb-3 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-1">
            {post.categories?.slice(1, 3).map((cat, index) => (
              <Badge
                key={cat.slug || index}
                variant="outline"
                className="text-xs sm:text-sm font-bold border-blue-200 text-blue-700 bg-blue-50 px-2 sm:px-3 py-0.5 sm:py-1 rounded-xl"
              >
                {cat.name}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-4 sm:p-5 pt-0 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 border-2 border-blue-200 flex-shrink-0">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">
                {post.author.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-bold text-slate-600 truncate max-w-[80px] sm:max-w-[100px]">
              {post.author.name?.split(" ")[0]}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <LikeButton
              postId={post.id}
              initialLikes={post._count?.likes || 0}
              userHasLiked={post.userHasLiked || false}
              showDetails={true}
            />
            <div className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors">
              <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="text-xs sm:text-sm font-bold">
                {post._count?.comments || 0}
              </span>
            </div>
          </div>
        </CardFooter>
      </motion.div>
    </motion.div>
  );
}

function PostCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm h-full">
      <CardHeader className="p-0">
        <Skeleton className="aspect-video w-full" />
      </CardHeader>
      <CardContent className="p-4 sm:p-5 flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-3 rounded-full hidden xs:inline" />
          <Skeleton className="h-3 w-12 hidden xs:inline" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-2/3 mb-3" />
        <div className="flex gap-1.5">
          <Skeleton className="h-6 w-16 rounded-xl" />
          <Skeleton className="h-6 w-16 rounded-xl" />
        </div>
      </CardContent>
      <CardFooter className="p-4 sm:p-5 pt-0">
        <div className="flex items-center justify-between w-full flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-8" />
            </div>
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '100px 0px',
  });

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

  // Check if we should show featured section
  const showFeatured = !loading && featuredPosts.length > 0 && !searchTerm;
  const showRegular = !loading && regularPosts.length > 0 && !searchTerm;
  const showSearchResults = searchTerm && posts.length > 0;

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
        
        @media (max-width: 480px) {
          .xs\\:inline {
            display: inline !important;
          }
        }
      `}</style>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section - NO ANIMATION ON MOBILE */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2.5 rounded-full bg-blue-50/80 border-2 border-blue-200 backdrop-blur-sm mb-3 sm:mb-4">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            <span className="text-xs sm:text-base font-bold text-blue-700 uppercase tracking-wide">
              Latest Articles
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight">
            From the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Blog
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-bold mt-2 sm:mt-4 px-4">
            Insights, tutorials, and deep dives into web development, design,
            and technology.
          </p>
        </motion.div>

        {/* Search Bar - SIMPLIFIED ANIMATION */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          className="mb-8 sm:mb-10 max-w-md mx-auto"
        >
          <div className="relative">
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-10 sm:pl-12 pr-4 py-2 sm:py-3 h-10 sm:h-12 text-sm sm:text-base bg-white border-2 border-slate-200 focus:border-blue-400 text-slate-800 rounded-2xl shadow-sm font-semibold"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-slate-400" />
          </div>
        </motion.div>

        {/* Featured Posts Section */}
        {showFeatured && (
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
                Featured Articles
              </h2>
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {featuredPosts.map((post, index) => (
                <PostCard key={post.id || index} post={post} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* All Posts Section */}
        <div ref={ref}>
          {showRegular && (
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 flex-shrink-0" />
              <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
                Recent Posts
              </h2>
            </div>
          )}

          {showSearchResults && (
            <div className="mb-3 sm:mb-5">
              <p className="text-sm sm:text-base text-slate-600 font-bold">
                Found {posts.length} result{posts.length !== 1 ? "s" : ""} for "{searchTerm}"
              </p>
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <PostCardSkeleton key={i} />
              ))
            ) : posts.length > 0 ? (
              (searchTerm ? posts : regularPosts).map((post, index) => (
                <PostCard key={post.id || index} post={post} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 sm:py-16">
                <div className="inline-flex p-3 sm:p-4 rounded-2xl bg-slate-100 border-2 border-slate-200 mb-3 sm:mb-4">
                  <Search className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  No posts found
                </h3>
                <p className="text-base sm:text-lg text-slate-600 font-semibold">
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
            <div className="mt-8 sm:mt-12 flex justify-center items-center gap-1 sm:gap-2 flex-wrap">
              <Button
                variant="outline"
                size="default"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="border-2 border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 rounded-2xl h-9 sm:h-10 text-sm sm:text-base font-bold px-3 sm:px-5 transition-all"
              >
                <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Prev</span>
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
                        size="default"
                        onClick={() => setPage(pageNum)}
                        className={`w-8 h-8 sm:w-10 sm:h-10 p-0 rounded-2xl text-sm sm:text-base font-bold transition-all ${
                          pageNum === page
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25"
                            : "border-2 border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600"
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
                size="default"
                onClick={() =>
                  setPage((p) => Math.min(pagination.pages, p + 1))
                }
                disabled={page === pagination.pages}
                className="border-2 border-slate-200 text-slate-600 hover:border-blue-400 hover:text-blue-600 rounded-2xl h-9 sm:h-10 text-sm sm:text-base font-bold px-3 sm:px-5 transition-all"
              >
                <span className="hidden xs:inline">Next</span>
                <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          )}

        {/* Stats Footer */}
        {!loading && posts.length > 0 && pagination && (
          <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t-2 border-slate-200">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-center text-sm sm:text-base text-slate-600 font-bold">
              <div className="flex items-center gap-1 sm:gap-2">
                <Rss className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                <span>{pagination.total} articles published</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                <span>
                  {posts.reduce(
                    (sum, post) => sum + (post._count?.likes || 0),
                    0,
                  )}{" "}
                  total likes
                </span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
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