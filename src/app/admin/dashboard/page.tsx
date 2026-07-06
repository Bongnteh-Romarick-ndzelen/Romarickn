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
  Sparkles,
  ChevronRight,
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
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
import { motion } from "framer-motion";

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
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Total Posts",
      value: data?.overview.totalPosts || 0,
      icon: FileText,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Total Comments",
      value: data?.overview.totalComments || 0,
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      trend: "-2%",
      trendUp: false,
    },
    {
      title: "Subscribers",
      value: data?.subscribers.active || 0,
      icon: Mail,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
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

  const categoryColors = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-10 w-56 bg-slate-200" />
            <Skeleton className="h-5 w-72 mt-2 bg-slate-200" />
          </div>
          <Skeleton className="h-12 w-40 bg-slate-200 rounded-xl" />
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-36 bg-slate-200 rounded-2xl" />
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <Skeleton className="h-96 bg-slate-200 rounded-2xl" />
          <Skeleton className="h-96 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-7 pb-10"
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
              Admin Dashboard
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">{user?.name?.split(" ")[0]}</span>
          </h1>
          <p className="text-lg text-slate-600 font-bold mt-1">
            Here's what's happening with your platform today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-emerald-100 text-emerald-700 border-2 border-emerald-200 text-sm font-bold px-4 py-1.5 rounded-xl">
            <Activity className="h-4 w-4 mr-1.5" />
            Live
          </Badge>
          <Button
            variant="outline"
            className="border-2 border-slate-200 text-slate-700 font-bold rounded-xl px-5 py-2.5 hover:bg-slate-50"
          >
            <Calendar className="h-5 w-5 mr-2" />
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={staggerContainer} className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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
                    <span
                      className={`text-sm font-bold flex items-center gap-0.5 ${stat.trendUp ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {stat.trendUp ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                      {stat.trend}
                    </span>
                    <span className="text-sm font-bold text-slate-400">
                      from last month
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Today's Stats */}
      <motion.div variants={staggerContainer} className="grid gap-4 md:grid-cols-4">
        {todayStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-wider font-['Lato',sans-serif]">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-black text-slate-900 mt-1 font-['Lato',sans-serif]">
                        {stat.value}
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-blue-50">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Section */}
      <motion.div variants={staggerContainer} className="grid gap-6 lg:grid-cols-2">
        {/* Traffic Chart */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                Traffic Overview
              </CardTitle>
              <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                Website visits and engagement over time
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
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
                      dataKey="views"
                      stroke="#6366f1"
                      strokeWidth={3}
                      fill="url(#viewsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Popular Categories */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                Popular Categories
              </CardTitle>
              <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                Most viewed content categories
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="h-[320px]">
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
                        backgroundColor: "#ffffff",
                        border: "2px solid #e2e8f0",
                        borderRadius: "12px",
                        padding: "12px",
                      }}
                      labelStyle={{ color: "#0f172a", fontWeight: 700 }}
                      itemStyle={{ color: "#475569", fontWeight: 600 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Top Posts */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <CardHeader className="px-6 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                  Top Performing Posts
                </CardTitle>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Most viewed content this month
                </CardDescription>
              </div>
              <Badge className="bg-blue-50 text-blue-700 border-2 border-blue-200 text-sm font-bold px-4 py-1.5 rounded-xl">
                <TrendingUp className="h-4 w-4 mr-1.5" />
                Trending
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-4">
              {(data?.topPosts || []).map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border-2 border-slate-200/60 hover:border-blue-300 hover:bg-white transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-9 h-9 rounded-xl font-black text-sm ${
                      index === 0 ? "bg-amber-100 text-amber-700 border-2 border-amber-200" :
                      index === 1 ? "bg-slate-100 text-slate-700 border-2 border-slate-200" :
                      index === 2 ? "bg-orange-100 text-orange-700 border-2 border-orange-200" :
                      "bg-slate-50 text-slate-500 border-2 border-slate-200"
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-base font-bold text-slate-900 font-['Lato',sans-serif]">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                          <Eye className="h-4 w-4" />
                          {post.views} views
                        </span>
                        <span className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                          <Heart className="h-4 w-4 text-red-500" />
                          {post.likesCount} likes
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`text-sm font-bold px-4 py-1.5 rounded-xl ${
                    index === 0 ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-200" :
                    "bg-blue-50 text-blue-700 border-2 border-blue-200"
                  }`}>
                    {index === 0 ? "🏆 Top" : "Popular"}
                  </Badge>
                </motion.div>
              ))}
              {data?.topPosts?.length === 0 && (
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-base font-bold text-slate-500">No posts data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={staggerContainer} className="grid gap-5 md:grid-cols-3">
        <motion.div variants={fadeInUp}>
          <Link href="/dashboard/admin/posts/new">
            <Card className="bg-white border-2 border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer group hover:shadow-xl rounded-2xl">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-all">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-slate-900 font-['Lato',sans-serif]">
                    Create New Post
                  </p>
                  <p className="text-sm font-semibold text-slate-500">
                    Write and publish new content
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Link href="/dashboard/admin/comments?status=pending">
            <Card className="bg-white border-2 border-slate-200/80 hover:border-amber-300 transition-all cursor-pointer group hover:shadow-xl rounded-2xl">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-50 group-hover:bg-amber-100 transition-all">
                  <MessageSquare className="h-6 w-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-slate-900 font-['Lato',sans-serif]">
                    Moderate Comments
                  </p>
                  <p className="text-sm font-semibold text-slate-500">
                    {data?.posts.pendingComments || 0} pending comments
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-amber-600 transition-colors" />
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Link href="/dashboard/admin/newsletter">
            <Card className="bg-white border-2 border-slate-200/80 hover:border-green-300 transition-all cursor-pointer group hover:shadow-xl rounded-2xl">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-50 group-hover:bg-green-100 transition-all">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-bold text-slate-900 font-['Lato',sans-serif]">
                    Send Newsletter
                  </p>
                  <p className="text-sm font-semibold text-slate-500">
                    {data?.subscribers.active || 0} active subscribers
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-green-600 transition-colors" />
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}