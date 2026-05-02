"use client";

import { useState, useEffect } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, XCircle, Trash2, MessageSquare } from "lucide-react";
import { adminService } from "@/lib/services/admin.service";
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

interface Comment {
  _id: string;
  content: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  post: {
    title: string;
    slug: string;
  };
  isApproved: boolean;
  createdAt: string;
}

function getInitials(name: string): string {
  if (!name) return "";
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function DashboardCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchComments();
  }, [page, statusFilter]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllComments(page, 20);
      console.log("Comments response:", response);

      let commentsData: Comment[] = [];
      let paginationData = null;

      if (response && response.success && response.data) {
        if (Array.isArray(response.data)) {
          commentsData = response.data;
          paginationData = response.pagination;
        } else if (
          response.data.comments &&
          Array.isArray(response.data.comments)
        ) {
          commentsData = response.data.comments;
          paginationData = response.data.pagination;
        } else {
          commentsData = [];
        }
      } else if (response && Array.isArray(response)) {
        commentsData = response;
      } else if (
        response &&
        response.comments &&
        Array.isArray(response.comments)
      ) {
        commentsData = response.comments;
        paginationData = response.pagination;
      } else {
        commentsData = [];
      }

      setComments(commentsData);
      if (paginationData) {
        setTotalPages(paginationData.pages || 1);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast({
        title: "Error",
        description: "Failed to load comments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await adminService.approveComment(id);
      toast({
        title: "Success",
        description: "Comment approved",
      });
      fetchComments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve comment",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedCommentId) return;

    try {
      await adminService.deleteComment(selectedCommentId);
      toast({
        title: "Success",
        description: "Comment deleted successfully",
      });
      fetchComments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete comment",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedCommentId(null);
    }
  };

  const filteredComments =
    statusFilter === "all"
      ? comments
      : comments.filter((c) =>
          statusFilter === "approved" ? c.isApproved : !c.isApproved,
        );

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 bg-slate-800" />
          <Skeleton className="h-4 w-64 mt-2 bg-slate-800" />
        </div>
        <Card className="bg-slate-800/30 border border-slate-700/50">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full bg-slate-800" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Comments</h1>
        <p className="text-sm text-slate-400 mt-1">
          Moderate user comments and manage comment approval
        </p>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("all")}
          className={
            statusFilter === "all"
              ? "bg-purple-600"
              : "border-slate-700 text-slate-300"
          }
        >
          All
        </Button>
        <Button
          variant={statusFilter === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("pending")}
          className={
            statusFilter === "pending"
              ? "bg-yellow-600"
              : "border-slate-700 text-slate-300"
          }
        >
          Pending
        </Button>
        <Button
          variant={statusFilter === "approved" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("approved")}
          className={
            statusFilter === "approved"
              ? "bg-green-600"
              : "border-slate-700 text-slate-300"
          }
        >
          Approved
        </Button>
      </div>

      <Card className="bg-slate-800/30 border border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">All Comments</CardTitle>
          <CardDescription className="text-slate-400">
            Total {filteredComments.length} comments found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredComments.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No comments found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredComments.map((comment) => (
                <Card
                  key={comment._id}
                  className="bg-slate-800/20 border border-slate-700/50"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="h-8 w-8">
                            {comment.author?.avatar && (
                              <AvatarImage src={comment.author.avatar} />
                            )}
                            <AvatarFallback className="bg-purple-500/20 text-purple-400 text-xs">
                              {getInitials(comment.author?.name || "User")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {comment.author?.name || "Anonymous"}
                            </p>
                            <p className="text-xs text-slate-400">
                              {comment.author?.email}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-slate-300 mb-2">
                          {comment.content}
                        </p>
                        <p className="text-xs text-slate-500">
                          On:{" "}
                          <span className="text-purple-400">
                            {comment.post?.title || "Unknown post"}
                          </span>
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {!comment.isApproved && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(comment._id)}
                            className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedCommentId(comment._id);
                            setDeleteDialogOpen(true);
                          }}
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

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
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="border-slate-700 text-slate-300"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Comment
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete this comment? This action cannot
              be undone.
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
    </div>
  );
}
