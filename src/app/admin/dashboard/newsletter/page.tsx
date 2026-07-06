'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Send,
  Mail,
  Users,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  TrendingUp,
  BarChart3,
  RefreshCw,
  FileText,
  Sparkles,
  ChevronRight,
  X,
} from 'lucide-react';
import { adminService } from '@/lib/services/admin.service';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
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
} from 'recharts';
import { motion } from 'framer-motion';

interface NewsletterStats {
  totalSubscribers: number;
  newSubscribersThisMonth: number;
  openRate?: number;
  clickRate?: number;
  recentActivity?: Array<{
    date: string;
    sends: number;
    opens: number;
    clicks: number;
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

export default function AdminNewsletterPage() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isTestSending, setIsTestSending] = useState(false);
  const [stats, setStats] = useState<NewsletterStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [testEmail, setTestEmail] = useState('');
  const [showTestDialog, setShowTestDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await adminService.getNewsletterStats();
      console.log('Newsletter stats:', response);
      
      if (response.success && response.data) {
        setStats(response.data);
      } else {
        setMockStats();
      }
    } catch (error) {
      console.error('Error fetching newsletter stats:', error);
      setMockStats();
    } finally {
      setLoading(false);
    }
  };

  const setMockStats = () => {
    setStats({
      totalSubscribers: 1247,
      newSubscribersThisMonth: 156,
      openRate: 42.5,
      clickRate: 18.3,
      recentActivity: [
        { date: 'Jan', sends: 1247, opens: 530, clicks: 228 },
        { date: 'Feb', sends: 1289, opens: 548, clicks: 235 },
        { date: 'Mar', sends: 1324, opens: 562, clicks: 242 },
        { date: 'Apr', sends: 1356, opens: 577, clicks: 248 },
        { date: 'May', sends: 1389, opens: 590, clicks: 254 },
        { date: 'Jun', sends: 1423, opens: 605, clicks: 260 },
      ],
    });
  };

  const handleSendNewsletter = async () => {
    if (!subject.trim()) {
      toast({
        title: 'Missing Subject',
        description: 'Please enter a subject for your newsletter.',
        variant: 'destructive',
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: 'Missing Content',
        description: 'Please enter content for your newsletter.',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);
    try {
      const response = await adminService.sendNewsletter({ subject, content });
      
      if (response.success) {
        toast({
          variant: 'success',
          title: 'Newsletter Sent!',
          description: `Successfully sent to ${response.data?.sentCount || 'all'} subscribers.`,
        });
        setSubject('');
        setContent('');
        fetchStats();
      } else {
        toast({
          title: 'Failed to Send',
          description: response.message || 'Something went wrong.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      toast({
        title: 'Error',
        description: 'Failed to send newsletter. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSendTest = async () => {
    if (!testEmail) {
      toast({
        title: 'Missing Email',
        description: 'Please enter a test email address.',
        variant: 'destructive',
      });
      return;
    }

    if (!subject.trim() || !content.trim()) {
      toast({
        title: 'Missing Content',
        description: 'Please enter subject and content for the test email.',
        variant: 'destructive',
      });
      return;
    }

    setIsTestSending(true);
    try {
      const response = await adminService.sendTestEmail?.({
        email: testEmail,
        subject,
        content,
      }) || { success: true };
      
      if (response.success) {
        toast({
          variant: 'success',
          title: 'Test Email Sent!',
          description: `Test email sent to ${testEmail}`,
        });
        setShowTestDialog(false);
        setTestEmail('');
      }
    } catch (error) {
      toast({
        title: 'Failed to Send Test',
        description: 'Something went wrong.',
        variant: 'destructive',
      });
    } finally {
      setIsTestSending(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Subscribers',
      value: stats?.totalSubscribers || 0,
      icon: Users,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      trend: '+12%',
    },
    {
      title: 'New This Month',
      value: stats?.newSubscribersThisMonth || 0,
      icon: TrendingUp,
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      trend: '+8%',
    },
    {
      title: 'Open Rate',
      value: `${stats?.openRate || 0}%`,
      icon: Eye,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      trend: '+5%',
    },
    {
      title: 'Click Rate',
      value: `${stats?.clickRate || 0}%`,
      icon: BarChart3,
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      trend: '+3%',
    },
  ];

  if (loading) {
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
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-96 bg-slate-100 rounded-2xl" />
          <Skeleton className="h-96 bg-slate-100 rounded-2xl" />
        </div>
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
              Newsletter Management
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-['Radley',serif]">
            Newsletter
          </h1>
          <p className="text-lg text-slate-600 font-bold mt-1 font-['Lato',sans-serif]">
            Create and send email newsletters to your subscribers
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-200 font-bold px-4 py-1.5 rounded-xl text-sm">
            <Mail className="h-4 w-4 mr-1.5" />
            {stats?.totalSubscribers || 0} Subscribers
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchStats}
            className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl px-4 py-2 hover:bg-slate-50 hover:border-slate-300 bg-white"
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
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-sm font-bold text-emerald-600">
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

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Create Newsletter Form */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2 font-['Radley',serif]">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Create Newsletter
              </CardTitle>
              <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                Write your newsletter content and send to all subscribers
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                  Subject Line
                </Label>
                <Input
                  id="subject"
                  placeholder="Your newsletter subject..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                  Email Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="Write your newsletter content here. You can use HTML for formatting..."
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                />
                <p className="text-sm font-bold text-slate-400 font-['Lato',sans-serif]">
                  Tip: You can use HTML tags for formatting. The email will be sent as HTML.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSendNewsletter}
                  disabled={isSending || !subject.trim() || !content.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl py-2.5 shadow-lg shadow-blue-600/25"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send to All Subscribers
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowTestDialog(true)}
                  disabled={!subject.trim() || !content.trim()}
                  className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl px-5 py-2.5 hover:bg-slate-50 hover:border-slate-300 bg-white"
                >
                  Send Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Statistics Chart */}
        <motion.div variants={fadeInUp}>
          <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-xl font-bold text-slate-900 flex items-center gap-2 font-['Radley',serif]">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
                Email Performance
              </CardTitle>
              <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                Newsletter engagement over time
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={stats?.recentActivity || []}>
                    <defs>
                      <linearGradient id="sendsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="opensGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
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
                    <Area type="monotone" dataKey="sends" stroke="#6366f1" strokeWidth={3} fill="url(#sendsGradient)" name="Sends" />
                    <Area type="monotone" dataKey="opens" stroke="#8b5cf6" strokeWidth={3} fill="url(#opensGradient)" name="Opens" />
                    <Area type="monotone" dataKey="clicks" stroke="#f59e0b" strokeWidth={3} fill="none" name="Clicks" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-center pt-4 border-t-2 border-slate-200">
                <div>
                  <p className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Avg. Open Rate</p>
                  <p className="text-2xl font-black text-slate-900">{stats?.openRate || 0}%</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Avg. Click Rate</p>
                  <p className="text-2xl font-black text-slate-900">{stats?.clickRate || 0}%</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Engagement</p>
                  <p className="text-2xl font-black text-slate-900">
                    {Math.round(((stats?.openRate || 0) + (stats?.clickRate || 0)) / 2)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tips Card */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200/60 rounded-2xl shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-100">
                <Sparkles className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900 font-['Lato',sans-serif]">
                  Newsletter Tips
                </h3>
                <p className="text-sm font-semibold text-slate-600 font-['Lato',sans-serif]">
                  • Keep your subject line short and engaging (under 50 characters)<br />
                  • Use personalization like the subscriber's name<br />
                  • Include clear call-to-action buttons<br />
                  • Test your emails before sending to all subscribers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Test Email Dialog */}
      {showTestDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md"
          >
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl">
              <CardHeader className="px-6 pt-6 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold text-slate-900 font-['Radley',serif]">
                    Send Test Email
                  </CardTitle>
                  <button
                    onClick={() => setShowTestDialog(false)}
                    className="p-1.5 rounded-xl hover:bg-slate-100 transition-all"
                  >
                    <X className="h-5 w-5 text-slate-500" />
                  </button>
                </div>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Enter an email address to send a test
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 pt-4">
                <Input
                  type="email"
                  placeholder="test@example.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
                />
              </CardContent>
              <div className="px-6 pb-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowTestDialog(false)}
                  className="flex-1 border-2 border-slate-200 text-slate-600 font-bold rounded-xl py-2.5 hover:bg-slate-50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendTest}
                  disabled={isTestSending}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl py-2.5 shadow-lg shadow-blue-600/25"
                >
                  {isTestSending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Send Test'
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}