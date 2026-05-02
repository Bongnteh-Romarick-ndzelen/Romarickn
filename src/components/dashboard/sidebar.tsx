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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

// Group menu items into sections
const menuSections = [
  {
    title: "Main",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      {
        href: "/admin/dashboard/analytics",
        label: "Analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/dashboard/posts", label: "Posts", icon: FileText },
      {
        href: "/admin/dashboard/comments",
        label: "Comments",
        icon: MessageSquare,
      },
    ],
  },
  {
    title: "Users",
    items: [
      { href: "/admin/dashboard/users", label: "Users", icon: Users },
      {
        href: "/admin/dashboard/subscribers",
        label: "Subscribers",
        icon: Mail,
      },
    ],
  },
  {
    title: "Marketing",
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
    <aside className="hidden lg:flex lg:w-64 flex-col border-r border-slate-800 bg-slate-900/50 h-full">
      {/* Logo Area - Fixed at top */}
      <div className="p-4 border-b border-slate-800 flex-shrink-0">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/30">
            <LayoutDashboard className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <span className="font-bold text-white text-base">Bongnteh</span>
            <p className="text-[10px] text-slate-500">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Scrollable Menu Area */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-6 px-3">
          {menuSections.map((section, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                        isActive
                          ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-400 border-l-2 border-amber-500"
                          : "text-slate-400 hover:text-white hover:bg-slate-800",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Area - Fixed at bottom */}
      <div className="p-4 border-t border-slate-800 flex-shrink-0">
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <Code className="mr-2 h-4 w-4" />
            Back to Site
          </Button>
        </Link>
        <button
          onClick={logout}
          className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
        <p className="text-[10px] text-slate-600 text-center mt-4">
          &copy; {new Date().getFullYear()} Bongnteh
        </p>
      </div>
    </aside>
  );
}
