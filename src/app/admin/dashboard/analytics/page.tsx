'use client';

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

const categoryColors = ['#a855f7', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#06b6d4'];

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [traffic, setTraffic] = useState<TrafficStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [trafficLoading, setTrafficLoading] = useState(true);
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalytics();
    fetchTrafficStats();
  }, [period]);

  const fetchAnalytics = async () => {
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
      setLoading(false);
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
    setLoading(true);
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
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Total Views',
      value: analytics?.overview.totalViews || 0,
      icon: Eye,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Total Comments',
      value: analytics?.overview.totalComments || 0,
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Total Likes',
      value: analytics?.overview.totalLikes || 0,
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      bgColor: 'bg-red-500/10',
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
          <h1 className="text-2xl md:text-3xl font-bold text-white">Analytics Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            Track your platform's performance and growth metrics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={(v: any) => setPeriod(v)}>
            <SelectTrigger className="w-36 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700">
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="year">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            className="border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 text-${stat.color.split('-')[1]}-400`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-green-400 flex items-center gap-0.5">
                    <ArrowUp className="h-3 w-3" />
                    +12%
                  </span>
                  <span className="text-xs text-slate-500">from last month</span>
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
            <Card key={index} className="bg-slate-800/20 border border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">{stat.label}</p>
                    <p className="text-xl font-bold text-white mt-1">{stat.value}</p>
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

      {/* Traffic Overview Chart */}
      <Card className="bg-slate-800/30 border border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-400" />
            Traffic Overview
          </CardTitle>
          <CardDescription className="text-slate-400">
            Page views and user activity over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          {trafficLoading ? (
            <div className="h-[300px] flex items-center justify-center">
              <Skeleton className="h-full w-full bg-slate-800" />
            </div>
          ) : (
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficChartData}>
                  <defs>
                    <linearGradient id="views" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#a855f7" fill="url(#views)" name="Page Views" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
          
          {traffic?.summary && (
            <div className="mt-4 grid grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{traffic.summary.totalPageViews.toLocaleString()}</p>
                <p className="text-xs text-slate-400">Total Page Views</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{traffic.summary.avgDailyViews}</p>
                <p className="text-xs text-slate-400">Avg Daily Views</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Activity */}
        <Card className="bg-slate-800/30 border border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Weekly Activity</CardTitle>
            <CardDescription className="text-slate-400">
              User engagement over the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="newUsers" fill="#a855f7" name="New Users" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="newPosts" fill="#ec4899" name="New Posts" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Popular Categories */}
        <Card className="bg-slate-800/30 border border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white">Content Categories</CardTitle>
            <CardDescription className="text-slate-400">
              Distribution of content by category
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                      labelStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-slate-400">No category data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Referrers */}
      <Card className="bg-slate-800/30 border border-slate-700/50">
        <CardHeader>
          <CardTitle className="text-white">Top Referrers</CardTitle>
          <CardDescription className="text-slate-400">
            Where your traffic is coming from
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(traffic?.topReferrers || []).map((referrer, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-white font-medium">{referrer.source}</span>
                </div>
                <Badge className="bg-purple-500/20 text-purple-400">
                  {referrer.count.toLocaleString()} visits
                </Badge>
              </div>
            ))}
            {(!traffic?.topReferrers || traffic.topReferrers.length === 0) && (
              <p className="text-center text-slate-400 py-8">No referrer data available</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Users */}
        <Card className="bg-slate-800/30 border border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-400" />
              Recent Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(analytics?.recentActivity?.users || []).slice(0, 5).map((user, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300">{user.name}</span>
                  <span className="text-xs text-slate-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card className="bg-slate-800/30 border border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="h-4 w-4 text-purple-400" />
              Top Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(analytics?.topPosts || []).slice(0, 5).map((post, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-slate-300 line-clamp-1 flex-1">{post.title}</span>
                  <span className="text-xs text-slate-500">{post.views} views</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Comments */}
        <Card className="bg-slate-800/30 border border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-green-400" />
              Recent Comments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(analytics?.recentActivity?.comments || []).slice(0, 5).map((comment, index) => (
                <div key={index} className="text-sm">
                  <p className="text-slate-300 line-clamp-1">{comment.content}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    by {comment.author?.name || 'Anonymous'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}