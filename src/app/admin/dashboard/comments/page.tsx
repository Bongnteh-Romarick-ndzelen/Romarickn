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
import {
  CheckCircle,
  XCircle,
  Trash2,
  MessageSquare,
  Sparkles,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
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
import { motion } from "framer-motion";

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
        variant: "success",
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
        variant: "success",
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

  const getStatusBadge = (isApproved: boolean) => {
    return isApproved ? (
      <Badge className="bg-emerald-100 text-emerald-700 border-2 border-emerald-200 font-bold px-3 py-1 rounded-xl text-sm">
        <CheckCircle className="h-3 w-3 mr-1" />
        Approved
      </Badge>
    ) : (
      <Badge className="bg-amber-100 text-amber-700 border-2 border-amber-200 font-bold px-3 py-1 rounded-xl text-sm">
        <XCircle className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-10 w-48 bg-slate-200" />
            <Skeleton className="h-5 w-64 mt-2 bg-slate-200" />
          </div>
        </div>
        <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full bg-slate-100 rounded-xl" />
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
              Comment Moderation
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-['Radley',serif]">
            Comments
          </h1>
          <p className="text-lg text-slate-600 font-bold mt-1 font-['Lato',sans-serif]">
            Moderate user comments and manage comment approval
          </p>
        </div>
        <Button
          onClick={fetchComments}
          variant="outline"
          className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl px-5 py-2.5 hover:bg-slate-50 hover:border-slate-300 bg-white"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </motion.div>

      {/* Status Filter Tabs */}
      <motion.div variants={fadeInUp} className="flex flex-wrap gap-2">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setStatusFilter("all")}
          className={
            statusFilter === "all"
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl px-5 py-2.5 shadow-lg shadow-blue-600/25"
              : "border-2 border-slate-200 text-slate-600 font-bold rounded-xl px-5 py-2.5 hover:bg-slate-50 bg-white"
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
              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl px-5 py-2.5 shadow-lg shadow-amber-500/25"
              : "border-2 border-slate-200 text-slate-600 font-bold rounded-xl px-5 py-2.5 hover:bg-slate-50 bg-white"
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
              ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold rounded-xl px-5 py-2.5 shadow-lg shadow-emerald-500/25"
              : "border-2 border-slate-200 text-slate-600 font-bold rounded-xl px-5 py-2.5 hover:bg-slate-50 bg-white"
          }
        >
          Approved
        </Button>
      </motion.div>

      {/* Comments List */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <CardHeader className="px-6 pt-6 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                  All Comments
                </CardTitle>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Total {filteredComments.length} comments found
                </CardDescription>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-200 font-bold px-4 py-1.5 rounded-xl text-sm">
                <MessageSquare className="h-4 w-4 mr-1.5" />
                {filteredComments.length} Comments
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {filteredComments.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-xl font-bold text-slate-600">No comments found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredComments.map((comment, index) => (
                  <motion.div
                    key={comment._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="bg-white border-2 border-slate-200/60 hover:border-blue-300 hover:shadow-md transition-all rounded-xl">
                      <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Avatar className="h-9 w-9 border-2 border-blue-200">
                                {comment.author?.avatar && (
                                  <AvatarImage src={comment.author.avatar} />
                                )}
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm font-bold">
                                  {getInitials(comment.author?.name || "User")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-bold text-slate-900 font-['Lato',sans-serif]">
                                  {comment.author?.name || "Anonymous"}
                                </p>
                                <p className="text-xs font-bold text-slate-500">
                                  {comment.author?.email}
                                </p>
                              </div>
                            </div>
                            <p className="text-base font-semibold text-slate-700 mb-2 leading-relaxed">
                              {comment.content}
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                              <p className="text-sm font-bold text-slate-500">
                                On:{" "}
                                <span className="text-blue-600">
                                  {comment.post?.title || "Unknown post"}
                                </span>
                              </p>
                              <span className="text-slate-300">•</span>
                              <p className="text-sm font-bold text-slate-500">
                                {new Date(comment.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            {getStatusBadge(comment.isApproved)}
                            {!comment.isApproved && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleApprove(comment._id)}
                                className="border-2 border-emerald-200 text-emerald-600 font-bold rounded-xl px-4 py-1.5 hover:bg-emerald-50 hover:border-emerald-300 bg-white"
                              >
                                <CheckCircle className="h-4 w-4 mr-1.5" />
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
                              className="border-2 border-red-200 text-red-600 font-bold rounded-xl px-4 py-1.5 hover:bg-red-50 hover:border-red-300 bg-white"
                            >
                              <Trash2 className="h-4 w-4 mr-1.5" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

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
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-slate-900 font-['Radley',serif]">
              Delete Comment
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base font-bold text-slate-600 font-['Lato',sans-serif]">
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 bg-white">
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
    </motion.div>
  );
}