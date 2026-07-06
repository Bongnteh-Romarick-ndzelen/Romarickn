"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  ArrowUp,
  ArrowDown,
  Users,
  Eye,
  MessageSquare,
  Heart,
  TrendingUp,
  Calendar,
  Download,
  RefreshCw,
  Activity,
  Zap,
  Award,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
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
  Legend,
} from 'recharts';
import { adminService } from '@/lib/services/admin.service';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

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
    publishedAt: string;
  }>;
  popularCategories: Array<{
    _id: string;
    count: number;
  }>;
  recentActivity: {
    users: Array<{
      id: string;
      name: string;
      email: string;
      createdAt: string;
      role: string;
    }>;
    posts: Array<{
      id: string;
      title: string;
      status: string;
      views: number;
      createdAt: string;
    }>;
    comments: Array<{
      id: string;
      content: string;
      author: { name: string };
      post: { title: string };
    }>;
  };
}

interface TrafficStats {
  period: string;
  pageViews: Array<{
    _id: { year: number; month: number; day: number };
    views: number;
  }>;
  activeUsers: Array<{
    date: Date;
    activeCount: number;
  }>;
  topReferrers: Array<{
    source: string;
    count: number;
  }>;
  summary: {
    totalPageViews: number;
    avgDailyViews: number;
  };
}

const categoryColors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#06b6d4'];

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

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [traffic, setTraffic] = useState<TrafficStats | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [trafficLoading, setTrafficLoading] = useState(true);
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalytics();
    fetchTrafficStats();
  }, [period]);

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const response = await adminService.getDashboardAnalytics();
      console.log('Analytics response:', response);
      
      if (response.success && response.data) {
        setAnalytics(response.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast({
        title: 'Error',
        description: 'Failed to load analytics data',
        variant: 'destructive',
      });
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const fetchTrafficStats = async () => {
    setTrafficLoading(true);
    try {
      const response = await adminService.getTrafficStats(period);
      console.log('Traffic stats response:', response);
      
      if (response.success && response.data) {
        setTraffic(response.data);
      }
    } catch (error) {
      console.error('Error fetching traffic stats:', error);
    } finally {
      setTrafficLoading(false);
    }
  };

  const handleRefresh = () => {
    setAnalyticsLoading(true);
    setTrafficLoading(true);
    fetchAnalytics();
    fetchTrafficStats();
  };

  const statsCards = [
    {
      title: 'Total Users',
      value: analytics?.overview.totalUsers || 0,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Total Views',
      value: analytics?.overview.totalViews || 0,
      icon: Eye,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      title: 'Total Comments',
      value: analytics?.overview.totalComments || 0,
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Total Likes',
      value: analytics?.overview.totalLikes || 0,
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ];

  const todayStats = [
    {
      label: 'New Users',
      value: analytics?.today.newUsers || 0,
      icon: Users,
    },
    {
      label: 'New Posts',
      value: analytics?.today.newPosts || 0,
      icon: Eye,
    },
    {
      label: 'New Comments',
      value: analytics?.today.newComments || 0,
      icon: MessageSquare,
    },
    {
      label: 'New Subscribers',
      value: analytics?.today.newSubscribers || 0,
      icon: Heart,
    },
  ];

  // Prepare chart data
  const chartData = analytics?.weeklyData || [];
  
  // Prepare traffic chart data
  const trafficChartData = traffic?.pageViews?.map(item => ({
    date: `${item._id.month}/${item._id.day}`,
    views: item.views,
  })) || [];

  if (analyticsLoading) {
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
              Analytics Dashboard
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            Analytics <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Overview</span>
          </h1>
          <p className="text-lg text-slate-600 font-bold mt-1">
            Track your platform's performance and growth metrics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={(v: any) => setPeriod(v)}>
            <SelectTrigger className="w-40 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl px-4 py-2.5 h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-slate-200 rounded-xl shadow-lg">
              <SelectItem value="day" className="font-bold">Last 24 Hours</SelectItem>
              <SelectItem value="week" className="font-bold">Last 7 Days</SelectItem>
              <SelectItem value="month" className="font-bold">Last 30 Days</SelectItem>
              <SelectItem value="year" className="font-bold">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            className="h-11 w-11 rounded-xl border-2 border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </motion.div>

      {/* Main Stats Cards */}
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
                    <span className="text-sm font-bold text-emerald-600 flex items-center gap-0.5">
                      <ArrowUp className="h-4 w-4" />
                      +12%
                    </span>
                    <span className="text-sm font-bold text-slate-400">from last month</span>
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

      {/* Traffic Overview Chart */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2 font-['Radley',serif]">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Traffic Overview
            </CardTitle>
            <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
              Page views and user activity over time
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {trafficLoading ? (
              <div className="h-[350px] flex items-center justify-center">
                <Skeleton className="h-full w-full bg-slate-100 rounded-xl" />
              </div>
            ) : (
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficChartData}>
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
                    <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={3} fill="url(#viewsGradient)" name="Page Views" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
            
            {traffic?.summary && (
              <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t-2 border-slate-200">
                <div className="text-center">
                  <p className="text-3xl font-black text-slate-900">{traffic.summary.totalPageViews.toLocaleString()}</p>
                  <p className="text-sm font-bold text-slate-500">Total Page Views</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-slate-900">{traffic.summary.avgDailyViews}</p>
                  <p className="text-sm font-bold text-slate-500">Avg Daily Views</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Row */}
      <motion.div variants={staggerContainer} className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Activity */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                Weekly Activity
              </CardTitle>
              <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                User engagement over the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
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
                    <Bar dataKey="newUsers" fill="#6366f1" name="New Users" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="newPosts" fill="#8b5cf6" name="New Posts" radius={[4, 4, 0, 0]} />
                  </BarChart>
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
                Content Categories
              </CardTitle>
              <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                Distribution of content by category
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="h-[300px]">
                {analytics?.popularCategories && analytics.popularCategories.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analytics.popularCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="count"
                        nameKey="_id"
                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        labelLine={false}
                      >
                        {analytics.popularCategories.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
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
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-base font-bold text-slate-400">No category data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Top Referrers */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <CardHeader className="px-6 pt-6">
            <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2 font-['Radley',serif]">
              <Zap className="h-5 w-5 text-amber-500" />
              Top Referrers
            </CardTitle>
            <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
              Where your traffic is coming from
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-4">
              {(traffic?.topReferrers || []).map((referrer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border-2 border-slate-200/60 hover:border-blue-300 hover:bg-white transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-9 h-9 rounded-xl font-black text-sm ${
                      index === 0 ? "bg-amber-100 text-amber-700 border-2 border-amber-200" :
                      index === 1 ? "bg-slate-100 text-slate-700 border-2 border-slate-200" :
                      index === 2 ? "bg-orange-100 text-orange-700 border-2 border-orange-200" :
                      "bg-slate-50 text-slate-500 border-2 border-slate-200"
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-base font-bold text-slate-900 font-['Lato',sans-serif]">
                      {referrer.source}
                    </span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-200 text-sm font-bold px-4 py-1.5 rounded-xl">
                    {referrer.count.toLocaleString()} visits
                  </Badge>
                </motion.div>
              ))}
              {(!traffic?.topReferrers || traffic.topReferrers.length === 0) && (
                <div className="text-center py-12">
                  <Zap className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-base font-bold text-slate-500">No referrer data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Activity Summary */}
      <motion.div variants={staggerContainer} className="grid gap-6 lg:grid-cols-3">
        {/* Recent Users */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <CardHeader className="px-5 pt-5">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2 font-['Lato',sans-serif]">
                <Users className="h-4 w-4 text-blue-600" />
                Recent Users
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="space-y-3">
                {(analytics?.recentActivity?.users || []).slice(0, 5).map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-all">
                    <span className="text-sm font-bold text-slate-700 font-['Lato',sans-serif]">
                      {user.name}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
                {(!analytics?.recentActivity?.users || analytics.recentActivity.users.length === 0) && (
                  <p className="text-center text-sm font-bold text-slate-400 py-4">No recent users</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Posts */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <CardHeader className="px-5 pt-5">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2 font-['Lato',sans-serif]">
                <Eye className="h-4 w-4 text-purple-600" />
                Top Posts
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="space-y-3">
                {(analytics?.topPosts || []).slice(0, 5).map((post, index) => (
                  <div key={index} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-all">
                    <span className="text-sm font-bold text-slate-700 font-['Lato',sans-serif] line-clamp-1 flex-1 mr-2">
                      {post.title}
                    </span>
                    <span className="text-xs font-bold text-slate-400 whitespace-nowrap">
                      {post.views} views
                    </span>
                  </div>
                ))}
                {(!analytics?.topPosts || analytics.topPosts.length === 0) && (
                  <p className="text-center text-sm font-bold text-slate-400 py-4">No posts data</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Comments */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <CardHeader className="px-5 pt-5">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2 font-['Lato',sans-serif]">
                <MessageSquare className="h-4 w-4 text-green-600" />
                Recent Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="px-5 pb-5">
              <div className="space-y-3">
                {(analytics?.recentActivity?.comments || []).slice(0, 5).map((comment, index) => (
                  <div key={index} className="p-2.5 rounded-lg hover:bg-slate-50 transition-all">
                    <p className="text-sm font-bold text-slate-700 font-['Lato',sans-serif] line-clamp-1">
                      {comment.content}
                    </p>
                    <p className="text-xs font-bold text-slate-400 mt-0.5">
                      by {comment.author?.name || 'Anonymous'}
                    </p>
                  </div>
                ))}
                {(!analytics?.recentActivity?.comments || analytics.recentActivity.comments.length === 0) && (
                  <p className="text-center text-sm font-bold text-slate-400 py-4">No recent comments</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}