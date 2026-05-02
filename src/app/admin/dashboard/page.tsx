"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  FileText,
  MessageSquare,
  Mail,
  TrendingUp,
  Eye,
  Heart,
  Calendar,
  ArrowUp,
  ArrowDown,
  Activity,
  Zap,
  Star,
  Award,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { adminService } from "@/lib/services/admin.service";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AnalyticsData {
  overview: {
    totalUsers: number;
    totalPosts: number;
    totalComments: number;
    totalSubscribers: number;
    totalViews: number;
    totalLikes: number;
  };
  today: {
    newUsers: number;
    newPosts: number;
    newComments: number;
    newSubscribers: number;
  };
  posts: {
    published: number;
    draft: number;
    pendingComments: number;
  };
  subscribers: {
    total: number;
    active: number;
  };
  weeklyData: Array<{
    date: string;
    newUsers: number;
    newPosts: number;
    newComments: number;
    views: number;
  }>;
  topPosts: Array<{
    title: string;
    views: number;
    likesCount: number;
  }>;
  popularCategories: Array<{
    _id: string;
    count: number;
  }>;
}

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">(
    "week",
  );

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await adminService.getDashboardAnalytics();
      if (response.success) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: "Total Users",
      value: data?.overview.totalUsers || 0,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Total Posts",
      value: data?.overview.totalPosts || 0,
      icon: FileText,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Total Comments",
      value: data?.overview.totalComments || 0,
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      trend: "-2%",
      trendUp: false,
    },
    {
      title: "Subscribers",
      value: data?.subscribers.active || 0,
      icon: Mail,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-500/10",
      trend: "+8%",
      trendUp: true,
    },
  ];

  const todayStats = [
    {
      label: "New Users",
      value: data?.today.newUsers || 0,
      icon: Users,
    },
    {
      label: "New Posts",
      value: data?.today.newPosts || 0,
      icon: FileText,
    },
    {
      label: "New Comments",
      value: data?.today.newComments || 0,
      icon: MessageSquare,
    },
    {
      label: "New Subscribers",
      value: data?.today.newSubscribers || 0,
      icon: Mail,
    },
  ];

  const chartData = data?.weeklyData || [];

  const categoryColors = [
    "#a855f7",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48 bg-slate-800" />
            <Skeleton className="h-4 w-64 mt-2 bg-slate-800" />
          </div>
          <Skeleton className="h-10 w-32 bg-slate-800" />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 bg-slate-800 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-96 bg-slate-800 rounded-xl" />
          <Skeleton className="h-96 bg-slate-800 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Welcome back, {user?.name?.split(" ")[0]}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Here's what's happening with your platform today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <Activity className="h-3 w-3 mr-1" />
            Live
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-700 text-slate-300"
          >
            <Calendar className="h-4 w-4 mr-2" />
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
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
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
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
                  <span
                    className={`text-xs flex items-center gap-0.5 ${stat.trendUp ? "text-green-400" : "text-red-400"}`}
                  >
                    {stat.trendUp ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    {stat.trend}
                  </span>
                  <span className="text-xs text-slate-500">
                    from last month
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Today's Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {todayStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-slate-800/20 border border-slate-700/50"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                    <p className="text-xl font-bold text-white mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Icon className="h-4 w-4 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Traffic Chart */}
        <Card className="bg-slate-800/30 border border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Traffic Overview</CardTitle>
            <CardDescription className="text-slate-400">
              Website visits and engagement over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="views" x1="0" y1="0" x2="0" y2="1">
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
                    dataKey="views"
                    stroke="#a855f7"
                    fill="url(#views)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Popular Categories */}
        <Card className="bg-slate-800/30 border border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Popular Categories</CardTitle>
            <CardDescription className="text-slate-400">
              Most viewed content categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.popularCategories || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="_id"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                    labelLine={false}
                  >
                    {(data?.popularCategories || []).map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={categoryColors[index % categoryColors.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "none",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Posts */}
      <Card className="bg-slate-800/30 border border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Top Performing Posts</CardTitle>
          <CardDescription className="text-slate-400">
            Most viewed content this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(data?.topPosts || []).map((post, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800/70 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.views} views
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.likesCount} likes
                      </span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  Trending
                </Badge>
              </div>
            ))}
            {data?.topPosts?.length === 0 && (
              <p className="text-center text-slate-400 py-8">
                No posts data available
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/dashboard/admin/posts/new">
          <Card className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-all">
                <FileText className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  Create New Post
                </p>
                <p className="text-xs text-slate-400">
                  Write and publish new content
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/admin/comments?status=pending">
          <Card className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 group-hover:bg-amber-500/20 transition-all">
                <MessageSquare className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  Moderate Comments
                </p>
                <p className="text-xs text-slate-400">
                  {data?.posts.pendingComments || 0} pending comments
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/admin/newsletter">
          <Card className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all cursor-pointer group">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10 group-hover:bg-green-500/20 transition-all">
                <Mail className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  Send Newsletter
                </p>
                <p className="text-xs text-slate-400">
                  {data?.subscribers.active || 0} active subscribers
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
