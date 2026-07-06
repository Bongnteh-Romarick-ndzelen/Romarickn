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
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  Search,
  MoreVertical,
  Trash2,
  Mail,
  CheckCircle,
  XCircle,
  RefreshCw,
  Users,
  TrendingUp,
  Filter,
  Calendar,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import { adminService } from "@/lib/services/admin.service";
import { subscriptionService } from "@/lib/services/subscription.service";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "framer-motion";

interface Subscriber {
  _id: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  subscribedAt: string;
  unsubscribedAt?: string;
  createdAt: string;
}

interface SubscriberStats {
  total: number;
  active: number;
  inactive: number;
  verified: number;
  unverified: number;
  newToday: number;
  newThisWeek: number;
  newThisMonth: number;
  unsubscribedThisMonth: number;
  recentActivity: Array<{
    date: string;
    subscribers: number;
  }>;
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

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState<SubscriberStats | null>(null);
  const [selectedSubscriber, setSelectedSubscriber] =
    useState<Subscriber | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscribers();
    fetchStats();
  }, [page, statusFilter]);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await subscriptionService.getAllSubscribers(
        page,
        20,
        statusFilter,
        searchTerm,
      );
      console.log("Subscribers response:", response);

      if (response.success && response.data) {
        let subscribersData = [];
        let paginationData = null;

        if (Array.isArray(response.data.subscribers)) {
          subscribersData = response.data.subscribers;
          paginationData = response.data.pagination;
        } else if (Array.isArray(response.data)) {
          subscribersData = response.data;
          paginationData = response.pagination;
        } else {
          subscribersData = [];
        }

        setSubscribers(subscribersData);
        if (paginationData) {
          setTotalPages(paginationData.pages || 1);
        }
      } else {
        setSubscribers([]);
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      toast({
        title: "Error",
        description: "Failed to load subscribers",
        variant: "destructive",
      });
      setSubscribers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await subscriptionService.getSubscriberStats();
      console.log("Stats response:", response);

      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedSubscriber) return;

    try {
      const response = await subscriptionService.removeSubscriber(
        selectedSubscriber._id,
      );

      if (response.success) {
        toast({
          variant: "success",
          title: "Subscriber Removed",
          description: `${selectedSubscriber.email} has been removed from the list.`,
        });
        fetchSubscribers();
        fetchStats();
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to remove subscriber",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove subscriber",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedSubscriber(null);
    }
  };

  const handleExport = async () => {
    setExportLoading(true);
    try {
      window.open(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/subscribers/export`,
        "_blank",
      );

      toast({
        title: "Export Started",
        description: "Your CSV file is being downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export subscribers",
        variant: "destructive",
      });
    } finally {
      setExportLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchSubscribers();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const statsCards = [
    {
      title: "Total Subscribers",
      value: stats?.total || 0,
      icon: Users,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      trend: "+12%",
    },
    {
      title: "Active Subscribers",
      value: stats?.active || 0,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      trend: "+5%",
    },
    {
      title: "New This Month",
      value: stats?.newThisMonth || 0,
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      trend: "+8%",
    },
    {
      title: "Unsubscribed",
      value: stats?.unsubscribedThisMonth || 0,
      icon: XCircle,
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      trend: "-2%",
    },
  ];

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch =
      searchTerm === "" ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && sub.isActive) ||
      (statusFilter === "inactive" && !sub.isActive);
    return matchesSearch && matchesStatus;
  });

  if (loading && subscribers.length === 0) {
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
              Subscriber Management
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-['Radley',serif]">
            Subscribers
          </h1>
          <p className="text-lg text-slate-600 font-bold mt-1 font-['Lato',sans-serif]">
            Manage your newsletter subscribers
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={exportLoading}
            className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl px-5 py-2.5 hover:bg-slate-50 hover:border-slate-300 bg-white"
          >
            {exportLoading ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Download className="h-4 w-4 mr-2" />
            )}
            Export CSV
          </Button>
          <Button
            variant="outline"
            onClick={fetchSubscribers}
            className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl px-5 py-2.5 hover:bg-slate-50 hover:border-slate-300 bg-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
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
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-sm font-bold text-emerald-600">
                      {stat.trend}
                    </span>
                    <span className="text-sm font-bold text-slate-400">
                      vs last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Activity Chart */}
      {stats?.recentActivity && stats.recentActivity.length > 0 && (
        <motion.div variants={fadeInUp}>
          <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2 font-['Radley',serif]">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Subscriber Growth
              </CardTitle>
              <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                New subscribers over the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats.recentActivity}>
                    <defs>
                      <linearGradient id="subscribersGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} fontWeight={600} />
                    <YAxis stroke="#94a3b8" fontSize={12} fontWeight={600} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "2px solid #e2e8f0",
                        borderRadius: "12px",
                        padding: "12px",
                      }}
                      labelStyle={{ color: "#0f172a", fontWeight: 700 }}
                      itemStyle={{ color: "#475569", fontWeight: 600 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="subscribers"
                      stroke="#6366f1"
                      strokeWidth={3}
                      fill="url(#subscribersGradient)"
                      name="New Subscribers"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by email..."
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
            <SelectItem value="active" className="font-bold">Active</SelectItem>
            <SelectItem value="inactive" className="font-bold">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-2.5 shadow-lg shadow-blue-600/25"
        >
          Search
        </Button>
      </motion.div>

      {/* Subscribers Table */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <CardHeader className="px-6 pt-6 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                  All Subscribers
                </CardTitle>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Total {filteredSubscribers.length} subscribers found
                </CardDescription>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-200 font-bold px-4 py-1.5 rounded-xl text-sm">
                <Mail className="h-4 w-4 mr-1.5" />
                {filteredSubscribers.length} Subscribers
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {filteredSubscribers.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-xl font-bold text-slate-600">No subscribers found</p>
                {searchTerm && (
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("all");
                    }}
                    className="text-blue-600 font-bold mt-2 text-base"
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-slate-200 hover:bg-transparent">
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Email</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Status</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Verified</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Subscribed Date</TableHead>
                        <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubscribers.map((subscriber, index) => (
                        <motion.tr
                          key={subscriber._id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-slate-100 hover:bg-slate-50/50 transition-all"
                        >
                          <TableCell className="font-bold text-slate-900">
                            {subscriber.email}
                          </TableCell>
                          <TableCell>
                            {subscriber.isActive ? (
                              <Badge className="bg-emerald-100 text-emerald-700 border-2 border-emerald-200 font-bold px-3 py-1 rounded-xl text-sm">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Active
                              </Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-700 border-2 border-red-200 font-bold px-3 py-1 rounded-xl text-sm">
                                <XCircle className="h-3 w-3 mr-1" />
                                Inactive
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {subscriber.isVerified ? (
                              <CheckCircle className="h-5 w-5 text-emerald-500" />
                            ) : (
                              <XCircle className="h-5 w-5 text-amber-500" />
                            )}
                          </TableCell>
                          <TableCell className="font-bold text-slate-500 text-sm">
                            {formatDate(subscriber.subscribedAt)}
                          </TableCell>
                          <TableCell className="text-right">
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
                                  onClick={() => {
                                    setSelectedSubscriber(subscriber);
                                    setDeleteDialogOpen(true);
                                  }}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 font-bold rounded-lg cursor-pointer"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
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
              Remove Subscriber
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base font-bold text-slate-600 font-['Lato',sans-serif]">
              Are you sure you want to remove{" "}
              <span className="text-blue-600 font-bold">
                {selectedSubscriber?.email}
              </span>{" "}
              from your subscriber list? This action cannot be undone.
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
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}