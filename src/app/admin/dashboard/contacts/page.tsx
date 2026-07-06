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
  Sparkles,
  ChevronRight,
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
import { motion } from "framer-motion";

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
          variant: "success",
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
          variant: "success",
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
          variant: "success",
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
          <Badge className="bg-amber-100 text-amber-700 border-2 border-amber-200 font-bold px-3 py-1 rounded-xl text-sm">
            Pending
          </Badge>
        );
      case "read":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-200 font-bold px-3 py-1 rounded-xl text-sm">
            Read
          </Badge>
        );
      case "replied":
        return (
          <Badge className="bg-emerald-100 text-emerald-700 border-2 border-emerald-200 font-bold px-3 py-1 rounded-xl text-sm">
            Replied
          </Badge>
        );
      case "archived":
        return (
          <Badge className="bg-slate-100 text-slate-600 border-2 border-slate-200 font-bold px-3 py-1 rounded-xl text-sm">
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
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
      description: "Awaiting response",
    },
    {
      title: "Read",
      value: stats?.read || 0,
      icon: Eye,
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      description: "Been viewed",
    },
    {
      title: "Replied",
      value: stats?.replied || 0,
      icon: Mail,
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      description: "Response sent",
    },
    {
      title: "Archived",
      value: stats?.archived || 0,
      icon: Archive,
      bgColor: "bg-slate-50",
      textColor: "text-slate-600",
      description: "Closed",
    },
  ];

  if (loading && contacts.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-10 w-48 bg-slate-200" />
            <Skeleton className="h-5 w-64 mt-2 bg-slate-200" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 bg-slate-100 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-96 bg-slate-100 rounded-2xl" />
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
              Contact Management
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-['Radley',serif]">
            Contact Messages
          </h1>
          <p className="text-lg text-slate-600 font-bold mt-1 font-['Lato',sans-serif]">
            Manage and respond to user inquiries
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
            setPage(1);
            fetchContacts();
          }}
          className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl px-5 py-2.5 hover:bg-slate-50 hover:border-slate-300 bg-white"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={staggerContainer} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="bg-white border-2 border-slate-200/80 hover:border-blue-300 transition-all duration-300 hover:shadow-xl rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2 px-6 pt-5">
                  <CardTitle className="text-base font-bold text-slate-600 font-['Lato',sans-serif]">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2.5 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.textColor}`} />
                  </div>
                </CardHeader>
                <CardContent className="px-6 pb-5">
                  <div className="text-3xl font-black text-slate-900 font-['Lato',sans-serif]">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-slate-500 mt-1">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-9 bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold h-11 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl h-11">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-slate-200 rounded-xl shadow-lg">
            <SelectItem value="all" className="font-bold">All</SelectItem>
            <SelectItem value="pending" className="font-bold">Pending</SelectItem>
            <SelectItem value="read" className="font-bold">Read</SelectItem>
            <SelectItem value="replied" className="font-bold">Replied</SelectItem>
            <SelectItem value="archived" className="font-bold">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-2.5 shadow-lg shadow-blue-600/25"
        >
          Search
        </Button>
      </motion.div>

      {/* Contacts Table */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <CardHeader className="px-6 pt-6 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                  All Messages
                </CardTitle>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Total {stats?.total || 0} messages received
                </CardDescription>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-200 font-bold px-4 py-1.5 rounded-xl text-sm">
                <Mail className="h-4 w-4 mr-1.5" />
                {contacts.length} Messages
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {contacts.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-xl font-bold text-slate-600">No messages found</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-slate-200 hover:bg-transparent">
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Name</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Email</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Subject</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Status</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Date</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact, index) => (
                        <motion.tr
                          key={contact._id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-slate-100 hover:bg-slate-50/50 transition-all"
                        >
                          <TableCell className="font-bold text-slate-900">
                            {contact.name}
                          </TableCell>
                          <TableCell className="font-bold text-slate-600">
                            {contact.email}
                          </TableCell>
                          <TableCell className="font-bold text-slate-600 max-w-[200px] truncate">
                            {contact.subject}
                          </TableCell>
                          <TableCell>{getStatusBadge(contact.status)}</TableCell>
                          <TableCell className="font-bold text-slate-500 text-sm">
                            {formatDate(contact.createdAt)}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedContact(contact);
                                  setIsViewDialogOpen(true);
                                  if (contact.status === "pending") {
                                    handleStatusChange(contact._id, "read");
                                  }
                                }}
                                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg"
                                title="View message"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedContact(contact);
                                  setIsReplyDialogOpen(true);
                                }}
                                className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg"
                                title="Reply"
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600 rounded-lg"
                                  >
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-white border-2 border-slate-200 rounded-xl shadow-lg p-1">
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(contact._id, "read")
                                    }
                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold rounded-lg cursor-pointer"
                                  >
                                    <Eye className="mr-2 h-4 w-4" />
                                    Mark as Read
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      handleStatusChange(contact._id, "archived")
                                    }
                                    className="text-slate-600 hover:text-slate-700 hover:bg-slate-50 font-bold rounded-lg cursor-pointer"
                                  >
                                    <Archive className="mr-2 h-4 w-4" />
                                    Archive
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      setSelectedContact(contact);
                                      setDeleteDialogOpen(true);
                                    }}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 font-bold rounded-lg cursor-pointer"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
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

      {/* View Contact Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900 font-['Radley',serif]">
              Message Details
            </DialogTitle>
            <DialogDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
              View complete message information
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Name</Label>
                  <p className="text-base font-bold text-slate-900">{selectedContact.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Email</Label>
                  <p className="text-base font-bold text-slate-900">{selectedContact.email}</p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Subject</Label>
                  <p className="text-base font-bold text-slate-900">
                    {selectedContact.subject}
                  </p>
                </div>
                <div className="col-span-2">
                  <Label className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Message</Label>
                  <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-xl mt-1">
                    <p className="text-base font-semibold text-slate-700 whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Status</Label>
                  <div className="mt-1">
                    {getStatusBadge(selectedContact.status)}
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Received</Label>
                  <p className="text-base font-bold text-slate-900">
                    {formatDate(selectedContact.createdAt)}
                  </p>
                </div>
                {selectedContact.replyMessage && (
                  <div className="col-span-2">
                    <Label className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Reply Sent</Label>
                    <div className="bg-emerald-50 border-2 border-emerald-200 p-4 rounded-xl mt-1">
                      <p className="text-base font-semibold text-emerald-700 whitespace-pre-wrap">
                        {selectedContact.replyMessage}
                      </p>
                      <p className="text-sm font-bold text-slate-500 mt-2">
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
            <Button onClick={() => setIsViewDialogOpen(false)} className="font-bold rounded-xl px-6">
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900 font-['Radley',serif]">
              Reply to {selectedContact?.name}
            </DialogTitle>
            <DialogDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
              Send a response to this inquiry
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="bg-slate-50 border-2 border-slate-200 p-4 rounded-xl">
                <p className="text-sm font-bold text-slate-500 mb-1 font-['Lato',sans-serif]">Original Message:</p>
                <p className="text-base font-semibold text-slate-700">
                  {selectedContact.message}
                </p>
              </div>
              <div>
                <Label htmlFor="reply" className="text-base font-bold text-slate-700 font-['Lato',sans-serif] block mb-2">
                  Your Reply
                </Label>
                <Textarea
                  id="reply"
                  placeholder="Type your response here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={6}
                  className="bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-3">
            <Button
              variant="outline"
              onClick={() => setIsReplyDialogOpen(false)}
              className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReply}
              disabled={!replyMessage.trim() || isSendingReply}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 shadow-lg shadow-blue-600/25"
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
        <AlertDialogContent className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-slate-900 font-['Radley',serif]">
              Delete Message
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base font-bold text-slate-600 font-['Lato',sans-serif]">
              Are you sure you want to delete this message from{" "}
              <span className="text-blue-600 font-bold">{selectedContact?.name}</span>? This action cannot be undone.
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