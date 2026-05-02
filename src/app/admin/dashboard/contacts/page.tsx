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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Search,
  MoreVertical,
  Trash2,
  CheckCircle,
  XCircle,
  RefreshCw,
  MessageSquare,
  Eye,
  Send,
  Filter,
  Calendar,
  User,
  AtSign,
  FileText,
  Archive,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils";
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
import {
  contactService,
  Contact,
  ContactStats,
} from "@/lib/services/contact.service";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState<ContactStats | null>(null);
  const [isSendingReply, setIsSendingReply] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [page, statusFilter]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await contactService.getAllContacts(
        page,
        20,
        statusFilter,
        searchTerm,
      );

      if (response.success) {
        setContacts(response.data.contacts || []);
        setTotalPages(response.data.pagination?.pages || 1);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      toast({
        title: "Error",
        description: "Failed to load contacts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await contactService.getContactStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await contactService.updateContactStatus(id, status);
      if (response.success) {
        toast({
          title: "Status Updated",
          description: `Contact marked as ${status}`,
        });
        fetchContacts();
        fetchStats();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const handleReply = async () => {
    if (!selectedContact || !replyMessage.trim()) return;

    setIsSendingReply(true);
    try {
      const response = await contactService.replyToContact(
        selectedContact._id,
        replyMessage,
      );

      if (response.success) {
        toast({
          title: "Reply Sent",
          description: `Reply sent to ${selectedContact.email}`,
        });
        setIsReplyDialogOpen(false);
        setReplyMessage("");
        fetchContacts();
        fetchStats();
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to send reply",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply",
        variant: "destructive",
      });
    } finally {
      setIsSendingReply(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedContact) return;

    try {
      const response = await contactService.deleteContact(selectedContact._id);
      if (response.success) {
        toast({
          title: "Contact Deleted",
          description: "Contact has been removed",
        });
        setDeleteDialogOpen(false);
        fetchContacts();
        fetchStats();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete contact",
        variant: "destructive",
      });
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchContacts();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Pending
          </Badge>
        );
      case "read":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Read
          </Badge>
        );
      case "replied":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            Replied
          </Badge>
        );
      case "archived":
        return (
          <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">
            Archived
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const statsCards = [
    {
      title: "Pending",
      value: stats?.pending || 0,
      icon: MessageSquare,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
      textColor: "text-yellow-400",
      description: "Awaiting response",
    },
    {
      title: "Read",
      value: stats?.read || 0,
      icon: Eye,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-400",
      description: "Been viewed",
    },
    {
      title: "Replied",
      value: stats?.replied || 0,
      icon: Mail,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      textColor: "text-green-400",
      description: "Response sent",
    },
    {
      title: "Archived",
      value: stats?.archived || 0,
      icon: Archive,
      color: "from-slate-500 to-gray-500",
      bgColor: "bg-slate-500/10",
      textColor: "text-slate-400",
      description: "Closed",
    },
  ];

  if (loading && contacts.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-48 bg-slate-800" />
          <Skeleton className="h-4 w-64 mt-2 bg-slate-800" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 bg-slate-800 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 bg-slate-800 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Contact Messages
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage and respond to user inquiries
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.textColor}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-9 bg-slate-800/50 border-slate-700 text-white placeholder-slate-500"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 bg-slate-800/50 border-slate-700 text-white">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleSearch}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Search
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setPage(1);
            fetchContacts();
          }}
          className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Contacts Table */}
      <Card className="bg-slate-800/30 border border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">All Messages</CardTitle>
          <CardDescription className="text-slate-400">
            Total {stats?.total || 0} messages received
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No messages found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-transparent">
                      <TableHead className="text-slate-400">Name</TableHead>
                      <TableHead className="text-slate-400">Email</TableHead>
                      <TableHead className="text-slate-400">Subject</TableHead>
                      <TableHead className="text-slate-400">Status</TableHead>
                      <TableHead className="text-slate-400">Date</TableHead>
                      <TableHead className="text-slate-400 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact._id} className="border-slate-700">
                        <TableCell className="font-medium text-white">
                          {contact.name}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {contact.email}
                        </TableCell>
                        <TableCell className="text-slate-300 max-w-[200px] truncate">
                          {contact.subject}
                        </TableCell>
                        <TableCell>{getStatusBadge(contact.status)}</TableCell>
                        <TableCell className="text-slate-300 text-sm">
                          {formatDate(contact.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedContact(contact);
                                setIsViewDialogOpen(true);
                                if (contact.status === "pending") {
                                  handleStatusChange(contact._id, "read");
                                }
                              }}
                              className="h-8 w-8 text-slate-400 hover:text-blue-400"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedContact(contact);
                                setIsReplyDialogOpen(true);
                              }}
                              className="h-8 w-8 text-slate-400 hover:text-green-400"
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="bg-slate-900 border-slate-700"
                              >
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(contact._id, "read")
                                  }
                                  className="text-blue-400 hover:text-blue-300"
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  Mark as Read
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(contact._id, "archived")
                                  }
                                  className="text-slate-400 hover:text-slate-300"
                                >
                                  <Archive className="mr-2 h-4 w-4" />
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedContact(contact);
                                    setDeleteDialogOpen(true);
                                  }}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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

      {/* View Contact Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Message Details</DialogTitle>
            <DialogDescription className="text-slate-400">
              View complete message information
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-400 text-xs">Name</Label>
                  <p className="text-white text-sm">{selectedContact.name}</p>
                </div>
                <div>
                  <Label className="text-slate-400 text-xs">Email</Label>
                  <p className="text-white text-sm">{selectedContact.email}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-slate-400 text-xs">Subject</Label>
                  <p className="text-white text-sm">
                    {selectedContact.subject}
                  </p>
                </div>
                <div className="col-span-2">
                  <Label className="text-slate-400 text-xs">Message</Label>
                  <div className="bg-slate-800/50 p-3 rounded-lg mt-1">
                    <p className="text-slate-300 text-sm whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-slate-400 text-xs">Status</Label>
                  <div className="mt-1">
                    {getStatusBadge(selectedContact.status)}
                  </div>
                </div>
                <div>
                  <Label className="text-slate-400 text-xs">Received</Label>
                  <p className="text-white text-sm">
                    {formatDate(selectedContact.createdAt)}
                  </p>
                </div>
                {selectedContact.replyMessage && (
                  <div className="col-span-2">
                    <Label className="text-slate-400 text-xs">Reply Sent</Label>
                    <div className="bg-purple-500/10 border border-purple-500/20 p-3 rounded-lg mt-1">
                      <p className="text-purple-300 text-sm whitespace-pre-wrap">
                        {selectedContact.replyMessage}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">
                        Sent on:{" "}
                        {selectedContact.repliedAt
                          ? formatDate(selectedContact.repliedAt)
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              Reply to {selectedContact?.name}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Send a response to this inquiry
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="bg-slate-800/50 p-3 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Original Message:</p>
                <p className="text-slate-300 text-sm">
                  {selectedContact.message}
                </p>
              </div>
              <div>
                <Label
                  htmlFor="reply"
                  className="text-slate-300 text-sm mb-2 block"
                >
                  Your Reply
                </Label>
                <Textarea
                  id="reply"
                  placeholder="Type your response here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={6}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReplyDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReply}
              disabled={!replyMessage.trim() || isSendingReply}
              className="bg-gradient-to-r from-purple-600 to-pink-600"
            >
              {isSendingReply ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Message
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete this message from{" "}
              {selectedContact?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 text-slate-300 border-slate-700">
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
