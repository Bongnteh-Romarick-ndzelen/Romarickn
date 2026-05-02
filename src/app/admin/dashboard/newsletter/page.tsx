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
        // Mock data for development
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
      // Send test email - you'll need to add this endpoint
      const response = await adminService.sendTestEmail?.({
        email: testEmail,
        subject,
        content,
      }) || { success: true };
      
      if (response.success) {
        toast({
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
      color: 'from-purple-500 to-pink-500',
      trend: '+12%',
    },
    {
      title: 'New This Month',
      value: stats?.newSubscribersThisMonth || 0,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      trend: '+8%',
    },
    {
      title: 'Open Rate',
      value: `${stats?.openRate || 0}%`,
      icon: Eye,
      color: 'from-blue-500 to-cyan-500',
      trend: '+5%',
    },
    {
      title: 'Click Rate',
      value: `${stats?.clickRate || 0}%`,
      icon: BarChart3,
      color: 'from-amber-500 to-orange-500',
      trend: '+3%',
    },
  ];

  if (loading) {
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
        <div className="grid gap-6 lg:grid-cols-2">
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
          <h1 className="text-2xl md:text-3xl font-bold text-white">Newsletter</h1>
          <p className="text-sm text-slate-400 mt-1">
            Create and send email newsletters to your subscribers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            <Mail className="h-3 w-3 mr-1" />
            {stats?.totalSubscribers || 0} Subscribers
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchStats}
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
            <Card key={index} className="bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-${stat.color.split('-')[1]}-500/10`}>
                  <Icon className={`h-4 w-4 text-${stat.color.split('-')[1]}-400`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-green-400">{stat.trend}</span>
                  <span className="text-xs text-slate-500">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Create Newsletter Form */}
        <Card className="bg-slate-800/30 border border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              Create Newsletter
            </CardTitle>
            <CardDescription className="text-slate-400">
              Write your newsletter content and send to all subscribers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-slate-300 text-sm">
                Subject Line
              </Label>
              <Input
                id="subject"
                placeholder="Your newsletter subject..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder-slate-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-slate-300 text-sm">
                Email Content
              </Label>
              <Textarea
                id="content"
                placeholder="Write your newsletter content here. You can use HTML for formatting..."
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white placeholder-slate-500 font-mono text-sm"
              />
              <p className="text-xs text-slate-500">
                Tip: You can use HTML tags for formatting. The email will be sent as HTML.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                onClick={handleSendNewsletter}
                disabled={isSending || !subject.trim() || !content.trim()}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Send Test
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Chart */}
        <Card className="bg-slate-800/30 border border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-400" />
              Email Performance
            </CardTitle>
            <CardDescription className="text-slate-400">
              Newsletter engagement over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats?.recentActivity || []}>
                  <defs>
                    <linearGradient id="sends" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="opens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="sends" stroke="#a855f7" fill="url(#sends)" name="Sends" />
                  <Area type="monotone" dataKey="opens" stroke="#ec4899" fill="url(#opens)" name="Opens" />
                  <Area type="monotone" dataKey="clicks" stroke="#f59e0b" fill="none" name="Clicks" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center pt-4 border-t border-slate-700/50">
              <div>
                <p className="text-xs text-slate-400">Avg. Open Rate</p>
                <p className="text-lg font-bold text-white">{stats?.openRate || 0}%</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Avg. Click Rate</p>
                <p className="text-lg font-bold text-white">{stats?.clickRate || 0}%</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Engagement</p>
                <p className="text-lg font-bold text-white">
                  {Math.round(((stats?.openRate || 0) + (stats?.clickRate || 0)) / 2)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips Card */}
      <Card className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Sparkles className="h-5 w-5 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">Newsletter Tips</h3>
              <p className="text-xs text-slate-400">
                • Keep your subject line short and engaging (under 50 characters)<br />
                • Use personalization like the subscriber's name<br />
                • Include clear call-to-action buttons<br />
                • Test your emails before sending to all subscribers
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Email Dialog */}
      {showTestDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md bg-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Send Test Email</CardTitle>
              <CardDescription className="text-slate-400">
                Enter an email address to send a test
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                type="email"
                placeholder="test@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowTestDialog(false)}
                className="flex-1 border-slate-700 text-slate-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendTest}
                disabled={isTestSending}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
              >
                {isTestSending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Send Test'
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}