"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  Edit,
  Trash2,
  Star,
  FileText,
  Plus,
  Send,
  Archive,
  RefreshCw,
  Search,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { adminService } from "@/lib/services/admin.service";
import { postService } from "@/lib/services/post.service";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

interface Post {
  id: string;
  _id: string;
  title: string;
  slug: string;
  status: string;
  views: number;
  createdAt: string;
  featured: boolean;
  author: {
    name: string;
    email: string;
  };
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function DashboardPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [selectedPostTitle, setSelectedPostTitle] = useState<string>("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isPublishing, setIsPublishing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, [page, statusFilter]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllPosts(page, 20);

      let postsData = [];
      let paginationData = null;

      if (response.success && response.data) {
        if (Array.isArray(response.data)) {
          postsData = response.data;
          paginationData = response.pagination;
        } else if (response.data.posts && Array.isArray(response.data.posts)) {
          postsData = response.data.posts;
          paginationData = response.data.pagination;
        } else {
          postsData = [];
        }
      } else if (Array.isArray(response)) {
        postsData = response;
      } else if (response.posts && Array.isArray(response.posts)) {
        postsData = response.posts;
        paginationData = response.pagination;
      } else {
        postsData = [];
      }

      setPosts(postsData);
      if (paginationData) {
        setTotalPages(paginationData.pages || 1);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPostId) return;

    try {
      await adminService.deletePost(selectedPostId);
      toast({
        variant: "success",
        title: "Success",
        description: "Post deleted successfully",
      });
      fetchPosts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedPostId(null);
    }
  };

  const handlePublish = async () => {
    if (!selectedPostId) return;

    setIsPublishing(true);
    try {
      const response = await postService.publishPost(selectedPostId);
      if (response.success) {
        toast({
          title: "Success",
          description: `Post "${selectedPostTitle}" has been published and notifications sent to subscribers.`,
        });
        fetchPosts();
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to publish post",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish post",
        variant: "destructive",
      });
    } finally {
      setIsPublishing(false);
      setPublishDialogOpen(false);
      setSelectedPostId(null);
      setSelectedPostTitle("");
    }
  };

  const handleToggleFeatured = async (id: string, featured: boolean) => {
    try {
      await adminService.toggleFeatured(id);
      toast({
        title: "Success",
        description: featured
          ? "Post removed from featured"
          : "Post marked as featured",
      });
      fetchPosts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update post",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-2 border-emerald-200 text-sm font-bold px-3 py-1 rounded-xl">
            Published
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-amber-100 text-amber-700 border-2 border-amber-200 text-sm font-bold px-3 py-1 rounded-xl">
            Draft
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-100 text-slate-600 border-2 border-slate-200 text-sm font-bold px-3 py-1 rounded-xl">
            {status}
          </Badge>
        );
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading && posts.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-10 w-48 bg-slate-200" />
            <Skeleton className="h-5 w-64 mt-2 bg-slate-200" />
          </div>
          <Skeleton className="h-10 w-32 bg-slate-200 rounded-xl" />
        </div>
        <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full bg-slate-100 rounded-xl" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-6 pb-10"
    >
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

      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border-2 border-blue-200 mb-3">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">
              Content Management
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Posts
          </h1>
          <p className="text-lg text-slate-600 font-bold mt-1">
            Manage your blog posts, edit content, publish drafts, and track performance
          </p>
        </div>
        <Link href="/admin/dashboard/posts/new">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/25">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold h-11 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl h-11">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-slate-200 rounded-xl shadow-lg">
            <SelectItem value="all" className="font-bold">All</SelectItem>
            <SelectItem value="published" className="font-bold">Published</SelectItem>
            <SelectItem value="draft" className="font-bold">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={fetchPosts}
          variant="outline"
          className="border-2 border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300 font-bold rounded-xl px-5 h-11"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </motion.div>

      {/* Posts Table */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <CardHeader className="px-6 pt-6 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                  All Posts
                </CardTitle>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Total {filteredPosts.length} posts found
                </CardDescription>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-200 text-sm font-bold px-4 py-1.5 rounded-xl">
                <FileText className="h-4 w-4 mr-1.5" />
                {filteredPosts.length} Posts
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-xl font-bold text-slate-600">No posts found</p>
                <Link href="/admin/dashboard/posts/new">
                  <Button variant="link" className="text-blue-600 font-bold mt-2 text-base">
                    Create your first post →
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-slate-200 hover:bg-transparent">
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Title</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Author</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Status</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Views</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Featured</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Date</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.map((post, index) => (
                        <motion.tr
                          key={post._id || post.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-slate-100 hover:bg-slate-50/50 transition-all"
                        >
                          <TableCell className="font-bold text-slate-900">
                            <Link
                              href={`/blog/${post.slug || post._id}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {post.title}
                            </Link>
                          </TableCell>
                          <TableCell className="font-bold text-slate-600">
                            {post.author?.name || "Unknown"}
                          </TableCell>
                          <TableCell>{getStatusBadge(post.status)}</TableCell>
                          <TableCell className="font-bold text-slate-600">
                            {post.views || 0}
                          </TableCell>
                          <TableCell>
                            <button
                              onClick={() =>
                                handleToggleFeatured(
                                  post._id || post.id,
                                  post.featured,
                                )
                              }
                              className={`p-1.5 rounded-lg transition-all ${
                                post.featured 
                                  ? "text-amber-500 hover:text-amber-600 bg-amber-50" 
                                  : "text-slate-300 hover:text-amber-500 hover:bg-amber-50"
                              }`}
                            >
                              <Star
                                className={`h-5 w-5 ${post.featured ? "fill-amber-500" : ""}`}
                              />
                            </button>
                          </TableCell>
                          <TableCell className="font-bold text-slate-500 text-sm">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {post.status === "draft" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedPostId(post._id || post.id);
                                    setSelectedPostTitle(post.title);
                                    setPublishDialogOpen(true);
                                  }}
                                  className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg"
                                  title="Publish Post"
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                              )}
                              <Link
                                href={`/admin/dashboard/posts/edit/${post._id || post.id}`}
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link
                                href={`/blog/${post.slug || post._id}`}
                                target="_blank"
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                                onClick={() => {
                                  setSelectedPostId(post._id || post.id);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-slate-200">
                    <div className="text-sm font-bold text-slate-500">
                      Page {page} of {totalPages}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 disabled:opacity-50"
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={page === totalPages}
                        className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 disabled:opacity-50"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-slate-900 font-['Radley',serif]">
              Delete Post
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base font-bold text-slate-600 font-['Lato',sans-serif]">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl px-6"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Publish Confirmation Dialog */}
      <AlertDialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <AlertDialogContent className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-slate-900 font-['Radley',serif]">
              Publish Post
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base font-bold text-slate-600 font-['Lato',sans-serif]">
              Are you sure you want to publish "{selectedPostTitle}"? This will
              send email notifications to all subscribers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePublish}
              disabled={isPublishing}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-6"
            >
              {isPublishing ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Publish
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}