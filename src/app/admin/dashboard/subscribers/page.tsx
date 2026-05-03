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
      // Open export endpoint in new tab
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
      trend: "+12%",
    },
    {
      title: "Active Subscribers",
      value: stats?.active || 0,
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      trend: "+5%",
    },
    {
      title: "New This Month",
      value: stats?.newThisMonth || 0,
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
      trend: "+8%",
    },
    {
      title: "Unsubscribed",
      value: stats?.unsubscribedThisMonth || 0,
      icon: XCircle,
      color: "from-red-500 to-rose-500",
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Subscribers
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your newsletter subscribers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={exportLoading}
            className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
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
            className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
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
                <div
                  className={`p-2 rounded-lg bg-${stat.color.split("-")[1]}-500/10`}
                >
                  <Icon
                    className={`h-4 w-4 text-${stat.color.split("-")[1]}-400`}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {stat.value.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-green-400">{stat.trend}</span>
                  <span className="text-xs text-slate-500">vs last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Activity Chart */}
      {stats?.recentActivity && stats.recentActivity.length > 0 && (
        <Card className="bg-slate-800/30 border border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-400" />
              Subscriber Growth
            </CardTitle>
            <CardDescription className="text-slate-400">
              New subscribers over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.recentActivity}>
                  <defs>
                    <linearGradient
                      id="subscribers"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="subscribers"
                    stroke="#a855f7"
                    fill="url(#subscribers)"
                    name="New Subscribers"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search by email..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleSearch}
          className="bg-purple-600 hover:bg-purple-700"
        >
          Search
        </Button>
      </div>

      {/* Subscribers Table */}
      <Card className="bg-slate-800/30 border border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">All Subscribers</CardTitle>
          <CardDescription className="text-slate-400">
            Total {filteredSubscribers.length} subscribers found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredSubscribers.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="h-12 w-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No subscribers found</p>
              {searchTerm && (
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                  className="text-purple-400 mt-2"
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
                    <TableRow className="border-slate-700 hover:bg-transparent">
                      <TableHead className="text-slate-400">Email</TableHead>
                      <TableHead className="text-slate-400">Status</TableHead>
                      <TableHead className="text-slate-400">Verified</TableHead>
                      <TableHead className="text-slate-400">
                        Subscribed Date
                      </TableHead>
                      <TableHead className="text-slate-400 text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscribers.map((subscriber) => (
                      <TableRow
                        key={subscriber._id}
                        className="border-slate-700"
                      >
                        <TableCell className="text-white font-medium">
                          {subscriber.email}
                        </TableCell>
                        <TableCell>
                          {subscriber.isActive ? (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              Active
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {subscriber.isVerified ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <XCircle className="h-4 w-4 text-yellow-400" />
                          )}
                        </TableCell>
                         <TableCell className="text-slate-300 text-sm">
                           {formatDate(subscriber.subscribedAt)}
                         </TableCell>
                        <TableCell className="text-right">
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
                                onClick={() => {
                                  setSelectedSubscriber(subscriber);
                                  setDeleteDialogOpen(true);
                                }}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
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
              Remove Subscriber
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to remove{" "}
              <span className="text-purple-400">
                {selectedSubscriber?.email}
              </span>{" "}
              from your subscriber list? This action cannot be undone.
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
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
