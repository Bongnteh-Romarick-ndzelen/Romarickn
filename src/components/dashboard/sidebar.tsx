"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  FileText,
  MessageSquare,
  Settings,
  BarChart3,
  LogOut,
  Code,
  Mail,
  TrendingUp,
  UserCheck,
  Newspaper,
  Heart,
  Star,
  Bell,
  Shield,
  Activity,
  Home,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Group menu items into sections
const menuSections = [
  {
    title: "Main",
    icon: LayoutDashboard,
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      {
        href: "/admin/dashboard/analytics",
        label: "Analytics",
        icon: BarChart3,
        badge: "New",
      },
    ],
  },
  {
    title: "Content",
    icon: FileText,
    items: [
      { href: "/admin/dashboard/posts", label: "Posts", icon: FileText },
      {
        href: "/admin/dashboard/comments",
        label: "Comments",
        icon: MessageSquare,
        badge: "12",
      },
    ],
  },
  {
    title: "Users",
    icon: Users,
    items: [
      { href: "/admin/dashboard/users", label: "Users", icon: Users },
      {
        href: "/admin/dashboard/subscribers",
        label: "Subscribers",
        icon: Mail,
        badge: "45",
      },
    ],
  },
  {
    title: "Marketing",
    icon: TrendingUp,
    items: [
      {
        href: "/admin/dashboard/newsletter",
        label: "Newsletter",
        icon: TrendingUp,
      },
    ],
  },
  {
    title: "System",
    icon: Settings,
    items: [
      { href: "/admin/dashboard/settings", label: "Settings", icon: Settings },
      { href: "/admin/dashboard/contacts", label: "Contacts", icon: MessageSquare },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Radley:ital@0;1&display=swap');
        
        .font-lato { font-family: 'Lato', sans-serif; }
        .font-radley { font-family: 'Radley', serif; }
      `}</style>

      <aside className="hidden lg:flex lg:w-64 flex-col border-r-2 border-slate-200/80 bg-slate-50/80 h-full shadow-sm">
        {/* Logo Area - Fixed at top */}
        <div className="p-4 border-b-2 border-slate-200 flex-shrink-0 bg-slate-50/80">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
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

        {/* Scrollable Menu Area */}
        <div className="flex-1 overflow-y-auto py-4 bg-slate-50/80">
          <nav className="space-y-6 px-3">
            {menuSections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-2 px-3 mb-2">
                  <div className="w-4 h-0.5 bg-blue-300"></div>
                  <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-wider font-lato">
                    {section.title}
                  </h3>
                  <div className="flex-1 h-0.5 bg-blue-300"></div>
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-black transition-all duration-200 font-lato",
                          isActive
                            ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-2 border-blue-300 shadow-md"
                            : "text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 border-2 border-transparent",
                        )}
                      >
                        <Icon className={cn(
                          "h-4 w-4",
                          isActive ? "text-blue-700" : "text-slate-500"
                        )} />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <Badge className={cn(
                            "text-[10px] font-black px-2 py-0.5 rounded-lg",
                            isActive
                              ? "bg-blue-200 text-blue-800 border-2 border-blue-300"
                              : "bg-slate-200 text-slate-700 border-0"
                          )}>
                            {item.badge}
                          </Badge>
                        )}
                        {isActive && (
                          <ChevronRight className="h-3.5 w-3.5 text-blue-600" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </nav>
        </div>

        {/* Footer Area - Fixed at bottom */}
        <div className="p-4 border-t-2 border-slate-200 flex-shrink-0 bg-slate-50/80">
          <Link href="/">
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl font-black font-lato border-2 border-transparent hover:border-blue-200"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Site
            </Button>
          </Link>
          <button
            onClick={logout}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-black text-red-600 hover:text-red-700 hover:bg-red-50 border-2 border-transparent hover:border-red-200 transition-all duration-200 font-lato"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
          <div className="mt-4 pt-3 border-t-2 border-slate-200">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black text-slate-500 font-lato">
                &copy; {new Date().getFullYear()} Bongnteh
              </p>
              <Badge className="bg-emerald-100 text-emerald-700 border-2 border-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-lg">
                <Activity className="h-2.5 w-2.5 mr-1" />
                Live
              </Badge>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}