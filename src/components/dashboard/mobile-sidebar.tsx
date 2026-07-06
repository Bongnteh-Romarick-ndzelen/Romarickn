"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  LayoutDashboard,
  Package,
  Users,
  FileText,
  MessageSquare,
  Settings,
  BarChart3,
  LogOut,
  Home,
  Mail,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/dashboard/posts", label: "Posts", icon: FileText },
  { href: "/admin/dashboard/users", label: "Users", icon: Users },
  { href: "/admin/dashboard/comments", label: "Comments", icon: MessageSquare, badge: "12" },
  { href: "/admin/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/dashboard/newsletter", label: "Newsletter", icon: TrendingUp },
  { href: "/admin/dashboard/subscribers", label: "Subscribers", icon: Mail, badge: "45" },
  { href: "/admin/dashboard/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
];

export function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  const initials = user?.name
    ? user.name
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD";

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Radley:ital@0;1&display=swap');
        
        .font-lato { font-family: 'Lato', sans-serif; }
        .font-radley { font-family: 'Radley', serif; }
      `}</style>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-10 w-10 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all border-2 border-transparent hover:border-blue-200"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-80 p-0 bg-white border-r-2 border-slate-200/80 shadow-xl"
        >
          <div className="flex flex-col h-full">
            {/* Logo Area */}
            <div className="p-5 border-b-2 border-slate-200 bg-white">
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative p-1.5 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                    <LayoutDashboard className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <span className="font-radley text-lg font-bold text-slate-900 tracking-tight">
                    Bongnteh
                  </span>
                  <p className="text-[10px] font-bold text-slate-500 font-lato">
                    Admin Panel
                  </p>
                </div>
              </Link>
            </div>

            {/* User Profile */}
            <div className="px-5 py-4 border-b-2 border-slate-200 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-blue-200">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-slate-900 font-lato">
                    {user?.name || "Admin User"}
                  </p>
                  <p className="text-xs font-bold text-slate-500 font-lato">
                    {user?.email || "admin@example.com"}
                  </p>
                </div>
                <Badge className="ml-auto bg-emerald-100 text-emerald-700 border-2 border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-lg">
                  <Activity className="h-2.5 w-2.5 mr-1" />
                  Live
                </Badge>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 bg-white">
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-all duration-200 font-lato",
                        isActive
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border-2 border-blue-200 shadow-sm"
                          : "text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 border-2 border-transparent",
                      )}
                    >
                      <Icon className={cn(
                        "h-4 w-4",
                        isActive ? "text-blue-600" : "text-slate-400"
                      )} />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge className={cn(
                          "text-[10px] font-bold px-2 py-0.5 rounded-lg",
                          isActive
                            ? "bg-blue-200 text-blue-700 border-0"
                            : "bg-slate-100 text-slate-600 border-0"
                        )}>
                          {item.badge}
                        </Badge>
                      )}
                      {isActive && (
                        <ChevronRight className="h-3.5 w-3.5 text-blue-400" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t-2 border-slate-200 bg-white flex-shrink-0">
              <Link href="/" onClick={() => setOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-bold font-lato border-2 border-transparent hover:border-blue-200"
                >
                  <Home className="mr-2 h-4 w-4" />
                  Back to Site
                </Button>
              </Link>
              <button
                onClick={handleLogout}
                className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-600 hover:text-red-700 hover:bg-red-50 border-2 border-transparent hover:border-red-200 transition-all duration-200 font-lato"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
              <div className="mt-4 pt-3 border-t-2 border-slate-200">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-slate-400 font-lato">
                    &copy; {new Date().getFullYear()} Bongnteh
                  </p>
                  <span className="text-[10px] font-bold text-slate-400 font-lato">
                    v2.0.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}