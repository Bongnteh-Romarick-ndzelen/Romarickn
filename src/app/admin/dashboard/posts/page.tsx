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
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            Published
          </Badge>
        );
      case "draft":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Draft
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
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
            <Skeleton className="h-8 w-48 bg-slate-800" />
            <Skeleton className="h-4 w-64 mt-2 bg-slate-800" />
          </div>
          <Skeleton className="h-10 w-32 bg-slate-800" />
        </div>
        <Card className="bg-slate-800/30 border border-slate-700/50">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full bg-slate-800" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Posts</h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your blog posts, edit content, publish drafts, and track
            performance
          </p>
        </div>
        <Link href="/admin/dashboard/posts/new">
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-800/50 border-slate-700 text-white placeholder-slate-500"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 bg-slate-800/50 border-slate-700 text-white">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={fetchPosts}
          variant="outline"
          className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Posts Table */}
      <Card className="bg-slate-800/30 border border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">All Posts</CardTitle>
          <CardDescription className="text-slate-400">
            Total {filteredPosts.length} posts found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No posts found</p>
              <Link href="/admin/dashboard/posts/new">
                <Button variant="link" className="text-purple-400 mt-2">
                  Create your first post
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-transparent">
                      <TableHead className="text-slate-400">Title</TableHead>
                      <TableHead className="text-slate-400">Author</TableHead>
                      <TableHead className="text-slate-400">Status</TableHead>
                      <TableHead className="text-slate-400">Views</TableHead>
                      <TableHead className="text-slate-400">Featured</TableHead>
                      <TableHead className="text-slate-400">Date</TableHead>
                      <TableHead className="text-slate-400 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPosts.map((post) => (
                      <TableRow
                        key={post._id || post.id}
                        className="border-slate-700"
                      >
                        <TableCell className="font-medium text-white">
                          <Link
                            href={`/blog/${post.slug || post._id}`}
                            className="hover:text-purple-400 transition-colors"
                          >
                            {post.title}
                          </Link>
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {post.author?.name || "Unknown"}
                        </TableCell>
                        <TableCell>{getStatusBadge(post.status)}</TableCell>
                        <TableCell className="text-slate-300">
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
                            className={`p-1 rounded-lg transition-all ${post.featured ? "text-amber-400 hover:text-amber-300" : "text-slate-500 hover:text-amber-400"}`}
                          >
                            <Star
                              className={`h-5 w-5 ${post.featured ? "fill-amber-400" : ""}`}
                            />
                          </button>
                        </TableCell>
                        <TableCell className="text-slate-300 text-sm">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {post.status === "draft" && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setSelectedPostId(post._id || post.id);
                                  setSelectedPostTitle(post.title);
                                  setPublishDialogOpen(true);
                                }}
                                className="h-8 w-8 text-slate-400 hover:text-green-400"
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
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-blue-400"
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
                                size="icon"
                                className="h-8 w-8 text-slate-400 hover:text-green-400"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-400 hover:text-red-400"
                              onClick={() => {
                                setSelectedPostId(post._id || post.id);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                  <div className="text-sm text-slate-400">
                    Page {page} of {totalPages}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="border-slate-700 text-slate-300"
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
                      className="border-slate-700 text-slate-300"
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Post
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Publish Confirmation Dialog */}
      <AlertDialog open={publishDialogOpen} onOpenChange={setPublishDialogOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Publish Post
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to publish "{selectedPostTitle}"? This will
              send email notifications to all subscribers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handlePublish}
              disabled={isPublishing}
              className="bg-green-600 hover:bg-green-700 text-white"
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
    </div>
  );
}
