'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  MoreVertical,
  Trash2,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { adminService } from '@/lib/services/admin.service';
import { PaginatedResponse, ApiError } from '@/types/common';
import { Comment } from '@/types/comment';

interface CommentsResponse extends PaginatedResponse<Comment> {}

type SortField = 'author' | 'comment' | 'post' | 'status' | 'date';
type SortDirection = 'asc' | 'desc';

export default function DashboardCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const router = useRouter();
  const { toast } = useToast();

  // Sorting state
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Bulk selection state
  const [selectedComments, setSelectedComments] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  // Dialog states
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);

  const fetchComments = async (currentPage: number = 1, search: string = '', status: 'all' | 'approved' | 'pending' = 'all') => {
    try {
      setLoading(true);
      const data = await adminService.getAllComments(currentPage, limit);
      let filteredData = data.data;

      // Apply search filter
      if (search.trim()) {
        const query = search.toLowerCase();
        filteredData = data.data.filter(
          (comment: Comment) =>
            comment.authorName.toLowerCase().includes(query) ||
            comment.content.toLowerCase().includes(query) ||
            (comment.user?.name?.toLowerCase().includes(query) || false)
        );
      }

      // Apply status filter
      if (status !== 'all') {
        const isApproved = status === 'approved';
        filteredData = filteredData.filter(
          (comment: Comment) => comment.isApproved === isApproved
        );
      }

      // Apply sorting
      const sortedData = [...filteredData].sort((a: Comment, b: Comment) => {
        let aVal: any;
        let bVal: any;

        switch (sortField) {
          case 'author':
            aVal = a.authorName?.toLowerCase() || '';
            bVal = b.authorName?.toLowerCase() || '';
            break;
          case 'comment':
            aVal = a.content?.toLowerCase() || '';
            bVal = b.content?.toLowerCase() || '';
            break;
          case 'post':
            aVal = a.postId?.toLowerCase() || '';
            bVal = b.postId?.toLowerCase() || '';
            break;
          case 'status':
            aVal = a.isApproved;
            bVal = b.isApproved;
            break;
          case 'date':
          default:
            aVal = new Date(a.createdAt).getTime();
            bVal = new Date(b.createdAt).getTime();
            break;
        }

        if (typeof aVal === 'string') {
          if (sortDirection === 'asc') {
            return aVal.localeCompare(bVal);
          } else {
            return bVal.localeCompare(aVal);
          }
        } else {
          if (sortDirection === 'asc') {
            return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
          } else {
            return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
          }
        }
      });

      setComments(sortedData);
      setTotal(data.pagination.total);
      setPages(data.pagination.pages);
      setPage(data.pagination.page);
      // Clear selection when data changes
      setSelectedComments(new Set());
      setSelectAll(false);
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not load comments data.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments(page, searchQuery, statusFilter);
  }, [page, toast]);

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      setPage(1);
      fetchComments(1, searchQuery, statusFilter);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, statusFilter]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSelectComment = (commentId: string) => {
    const newSelected = new Set(selectedComments);
    if (newSelected.has(commentId)) {
      newSelected.delete(commentId);
    } else {
      newSelected.add(commentId);
    }
    setSelectedComments(newSelected);
    setSelectAll(newSelected.size === comments.length && comments.length > 0);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedComments(new Set());
      setSelectAll(false);
    } else {
      const allIds = new Set(comments.map((c) => c.id));
      setSelectedComments(allIds);
      setSelectAll(true);
    }
  };

  const handleApproveComment = async (commentId: string) => {
    try {
      await adminService.approveComment(commentId);
      setComments(
        comments.map((comment) =>
          comment.id === commentId ? { ...comment, isApproved: true } : comment
        )
      );
      setSelectedComments((prev) => {
        const next = new Set(prev);
        next.delete(commentId);
        return next;
      });
      toast({
        title: 'Comment Approved',
        description: 'The comment has been successfully approved.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Could not approve the comment.',
      });
    }
  };

  const handleBulkApprove = async () => {
    if (selectedComments.size === 0) return;
    try {
      await adminService.bulkApproveComments(Array.from(selectedComments));
      setComments(
        comments.map((comment) =>
          selectedComments.has(comment.id)
            ? { ...comment, isApproved: true }
            : comment
        )
      );
      setSelectedComments(new Set());
      setSelectAll(false);
      setBulkDialogOpen(false);
      toast({
        title: 'Comments Approved',
        description: `${selectedComments.size} comment(s) have been successfully approved.`,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Could not approve the selected comments.',
      });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await adminService.deleteComment(commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
      setSelectedComments((prev) => {
        const next = new Set(prev);
        next.delete(commentId);
        return next;
      });
      toast({
        title: 'Comment Deleted',
        description: 'The comment has been successfully deleted.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Could not delete the comment.',
      });
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  };

  const getStatusBadge = (isApproved: boolean) => {
    if (isApproved) {
      return (
        <Badge
          variant="default"
          className="bg-green-500/20 text-green-400 border-green-500/30"
        >
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      );
    }
    return (
      <Badge
        variant="secondary"
        className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      >
        <Clock className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
  };

  if (loading && page === 1) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Comments</h1>
        </div>
        <div className="border border-slate-700 rounded-lg">
          <div className="p-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <div className="h-10 bg-slate-800/50 rounded-lg w-full"></div>
              </div>
              <div className="h-10 bg-slate-800/50 rounded-lg w-full sm:w-48"></div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  {['', 'Author', 'Comment', 'Post', 'Status', 'Date', 'Actions'].map(
                    (header) => (
                      <th
                        key={header}
                        className="text-left p-4 text-slate-400 font-medium"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-slate-800/50">
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="p-4">
                        <div className="h-4 bg-slate-800/50 rounded w-24"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Comments</h1>
        {selectedComments.size > 0 && (
          <Button
            onClick={() => setBulkDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Bulk Approve ({selectedComments.size})
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search by author or comment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-slate-900 border-slate-700"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as 'all' | 'approved' | 'pending');
            setPage(1);
          }}
          className="bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-600"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      {/* Comments Table */}
      <div className="border border-slate-700 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-700 hover:bg-transparent">
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-green-500 focus:ring-green-500"
                />
              </TableHead>
              <TableHead
                className="cursor-pointer text-slate-300"
                onClick={() => handleSort('author')}
              >
                <div className="flex items-center gap-2">
                  Author
                  {getSortIcon('author')}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-slate-300"
                onClick={() => handleSort('comment')}
              >
                <div className="flex items-center gap-2">
                  Comment
                  {getSortIcon('comment')}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-slate-300"
                onClick={() => handleSort('post')}
              >
                <div className="flex items-center gap-2">
                  Post
                  {getSortIcon('post')}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-slate-300"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center gap-2">
                  Status
                  {getSortIcon('status')}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer text-slate-300"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-2">
                  Date
                  {getSortIcon('date')}
                </div>
              </TableHead>
              <TableHead className="text-slate-300">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-12 text-slate-400"
                >
                  <AlertCircle className="h-8 w-8 mx-auto mb-2 text-slate-600" />
                  No comments found
                </TableCell>
              </TableRow>
            ) : (
              comments.map((comment) => (
                <TableRow
                  key={comment.id}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                >
                  <TableCell className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedComments.has(comment.id)}
                      onChange={() => handleSelectComment(comment.id)}
                      className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-green-500 focus:ring-green-500"
                    />
                  </TableCell>
                  <TableCell className="font-medium text-slate-200">
                    {comment.authorName}
                    {comment.user && (
                      <span className="text-slate-400 text-sm ml-1">
                        (Registered)
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-400 max-w-xs truncate">
                    {comment.content}
                  </TableCell>
                  <TableCell className="text-slate-400 font-mono text-sm">
                    {comment.postId}
                  </TableCell>
                  <TableCell>{getStatusBadge(comment.isApproved)}</TableCell>
                  <TableCell className="text-slate-400">
                    {formatDate(comment.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 bg-slate-900 border-slate-700"
                      >
                        <DropdownMenuLabel className="text-slate-300">
                          Actions
                        </DropdownMenuLabel>
                        {!comment.isApproved && (
                          <DropdownMenuItem
                            onClick={() => handleApproveComment(comment.id)}
                            className="cursor-pointer"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </DropdownMenuItem>
                        )}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-red-500 cursor-pointer">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-slate-900 border-slate-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-slate-400">
                                This action cannot be undone. This will
                                permanently delete the comment by{' '}
                                <span className="font-medium text-white">
                                  {comment.authorName}
                                </span>{' '}
                                and remove it from the system.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteComment(comment.id)}
                                className="bg-red-600 text-white hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-slate-400">
            Showing {comments.length} of {total} comments
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              {[...Array(pages)].map((_, i) => {
                const pageNum = i + 1;
                if (
                  pageNum === 1 ||
                  pageNum === pages ||
                  (pageNum >= page - 1 && pageNum <= page + 1)
                ) {
                  return (
                    <Button
                      key={pageNum}
                      variant={page === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPage(pageNum)}
                      className={`w-8 h-8 ${
                        page === pageNum
                          ? 'bg-slate-800 text-white border-slate-700'
                          : 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                }
                if (pageNum === page - 2 || pageNum === page + 2) {
                  return (
                    <span
                      key={pageNum}
                      className="px-2 text-slate-500 text-sm"
                    >
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              disabled={page >= pages}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Bulk Approve Dialog */}
      <Dialog open={bulkDialogOpen} onOpenChange={setBulkDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Bulk Approve Comments</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to approve {selectedComments.size} selected
              comment(s)? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setBulkDialogOpen(false)}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkApprove}
              className="bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
