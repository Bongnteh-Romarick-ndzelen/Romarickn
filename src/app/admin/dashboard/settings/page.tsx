'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Save,
  Settings,
  User,
  Shield,
  Bell,
  Globe,
  Mail,
  Lock,
  Sparkles,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

export default function SettingsPage() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = (section: string) => {
    setIsSaving(true);
    setTimeout(() => {
      toast({
        variant: 'success',
        title: 'Settings Saved',
        description: `${section} settings have been updated successfully.`,
      });
      setIsSaving(false);
    }, 1000);
  };

  const handleTestEmail = () => {
    setIsLoading(true);
    setTimeout(() => {
      toast({
        variant: 'success',
        title: 'Test Email Sent',
        description: 'A test email has been sent to your email address.',
      });
      setIsLoading(false);
    }, 1000);
  };

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
              Settings
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-['Radley',serif]">
            Settings
          </h1>
          <p className="text-lg text-slate-600 font-bold mt-1 font-['Lato',sans-serif]">
            Manage your site preferences and account settings
          </p>
        </div>
        <Badge className="bg-emerald-100 text-emerald-700 border-2 border-emerald-200 font-bold px-4 py-1.5 rounded-xl text-sm">
          <RefreshCw className="h-4 w-4 mr-1.5" />
          All settings saved
        </Badge>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div variants={fadeInUp}>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="bg-white border-2 border-slate-200/80 rounded-2xl p-1.5 w-full justify-start overflow-x-auto">
            <TabsTrigger 
              value="general" 
              className="font-bold text-slate-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-xl px-4 py-2"
            >
              <Globe className="h-4 w-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger 
              value="account" 
              className="font-bold text-slate-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-xl px-4 py-2"
            >
              <User className="h-4 w-4 mr-2" />
              Account
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="font-bold text-slate-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-xl px-4 py-2"
            >
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="font-bold text-slate-600 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-xl px-4 py-2"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="mt-6">
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardHeader className="px-6 pt-6">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                    General Settings
                  </CardTitle>
                </div>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Manage your site title, description, and other general settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave('General'); }}>
                  <div className="space-y-2">
                    <Label htmlFor="site-title" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                      Site Title
                    </Label>
                    <Input 
                      id="site-title" 
                      defaultValue="Bongnteh Romarick" 
                      className="bg-white border-2 border-slate-200 text-slate-800 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-description" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                      Site Description
                    </Label>
                    <Textarea
                      id="site-description"
                      defaultValue="Full-Stack Developer & Tech Innovator - Building high-performance web applications."
                      className="bg-white border-2 border-slate-200 text-slate-800 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site-url" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                      Site URL
                    </Label>
                    <Input 
                      id="site-url" 
                      defaultValue="https://romarick.vercel.app" 
                      className="bg-white border-2 border-slate-200 text-slate-800 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Switch className="data-[state=checked]:bg-blue-600" defaultChecked />
                      <Label className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                        Enable maintenance mode
                      </Label>
                    </div>
                    <Badge className="bg-slate-100 text-slate-600 border-2 border-slate-200 font-bold px-3 py-1 rounded-xl text-sm">
                      Disabled
                    </Badge>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSaving}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-2.5 shadow-lg shadow-blue-600/25"
                  >
                    {isSaving ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save General Settings
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account" className="mt-6">
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardHeader className="px-6 pt-6">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                    Account Settings
                  </CardTitle>
                </div>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Update your account information and profile details.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave('Account'); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                        Full Name
                      </Label>
                      <Input 
                        id="name" 
                        defaultValue="Bongnteh Romarick" 
                        className="bg-white border-2 border-slate-200 text-slate-800 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                        Email Address
                      </Label>
                      <Input 
                        id="email" 
                        type="email" 
                        defaultValue="ndzelenromarick@gmail.com" 
                        className="bg-white border-2 border-slate-200 text-slate-800 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                      Username
                    </Label>
                    <Input 
                      id="username" 
                      defaultValue="romarick" 
                      className="bg-white border-2 border-slate-200 text-slate-800 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSaving}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-2.5 shadow-lg shadow-blue-600/25"
                  >
                    {isSaving ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Update Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="mt-6">
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardHeader className="px-6 pt-6">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                    Security Settings
                  </CardTitle>
                </div>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Manage your password and security preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave('Security'); }}>
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                      Current Password
                    </Label>
                    <Input 
                      id="current-password" 
                      type="password" 
                      placeholder="Enter current password"
                      className="bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                        New Password
                      </Label>
                      <Input 
                        id="new-password" 
                        type="password" 
                        placeholder="Enter new password"
                        className="bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                        Confirm New Password
                      </Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        placeholder="Confirm new password"
                        className="bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <Switch className="data-[state=checked]:bg-blue-600" />
                      <Label className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                        Enable Two-Factor Authentication
                      </Label>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700 border-2 border-amber-200 font-bold px-3 py-1 rounded-xl text-sm">
                      <Lock className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isSaving}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-2.5 shadow-lg shadow-blue-600/25"
                  >
                    {isSaving ? (
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Update Security
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications" className="mt-6">
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardHeader className="px-6 pt-6">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                    Notification Settings
                  </CardTitle>
                </div>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Configure how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave('Notification'); }}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border-2 border-slate-200/60">
                      <div>
                        <Label className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                          Email Notifications
                        </Label>
                        <p className="text-sm font-semibold text-slate-500">Receive notifications via email</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-blue-600" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border-2 border-slate-200/60">
                      <div>
                        <Label className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                          New Comments
                        </Label>
                        <p className="text-sm font-semibold text-slate-500">Get notified when someone comments</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-blue-600" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border-2 border-slate-200/60">
                      <div>
                        <Label className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                          New Subscribers
                        </Label>
                        <p className="text-sm font-semibold text-slate-500">Get notified when someone subscribes</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-blue-600" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border-2 border-slate-200/60">
                      <div>
                        <Label className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                          Contact Messages
                        </Label>
                        <p className="text-sm font-semibold text-slate-500">Get notified of new contact messages</p>
                      </div>
                      <Switch className="data-[state=checked]:bg-blue-600" defaultChecked />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <Button 
                      type="submit" 
                      disabled={isSaving}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-2.5 shadow-lg shadow-blue-600/25"
                    >
                      {isSaving ? (
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save Preferences
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleTestEmail}
                      disabled={isLoading}
                      className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl px-6 py-2.5 hover:bg-slate-50"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      {isLoading ? 'Sending...' : 'Send Test Email'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}