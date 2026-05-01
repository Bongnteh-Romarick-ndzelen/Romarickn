"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
  Menu,
  LogOut,
  Settings,
  User,
  HelpCircle,
  Moon,
  Sun,
  Search,
  Code,
  LayoutDashboard,
  Activity,
  FileText,
  MessageSquare,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MobileSidebar } from "./mobile-sidebar";
import { useAuth } from "@/context/AuthContext";

function getInitials(name: string): string {
  if (!name) return "";
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function AdminHeader() {
  const { user, logout: authLogout } = useAuth();
  const [notifications, setNotifications] = useState(3);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const avatarSrc =
    user?.avatar ||
    "https://api.dicebear.com/7.x/avataaars/svg?seed=admin&backgroundColor=1e1b2a";
  const initials = user ? getInitials(user.name) : "AD";

  const handleLogout = () => {
    authLogout();
  };

  return (
    <header
      className={`
      sticky top-0 z-30 w-full transition-all duration-300
      ${
        isScrolled
          ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800/50 shadow-xl"
          : "bg-slate-950/90 border-b border-slate-800/30"
      }
    `}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left Section - Logo & Brand */}
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <MobileSidebar />

            {/* Logo */}
            <Link href="/admin" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg blur opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative p-1.5 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-amber-500/30">
                  <LayoutDashboard className="h-5 w-5 md:h-6 md:w-6 text-amber-400" />
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white text-base tracking-tight">
                    Bongnteh
                  </span>
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] px-1.5 py-0">
                    Admin
                  </Badge>
                </div>
                <p className="text-[10px] text-slate-500">
                  Dashboard Control Panel
                </p>
              </div>
            </Link>
          </div>

          {/* Center - Search Bar (hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                type="search"
                placeholder="Search dashboard..."
                className="w-full pl-9 pr-4 py-1.5 h-9 text-sm bg-slate-800/50 border-slate-700 focus:border-amber-500 text-white placeholder-slate-500 rounded-lg"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-slate-500 bg-slate-800/50 rounded border border-slate-700">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 bg-slate-900 border-slate-700"
              >
                <DropdownMenuLabel className="text-white flex items-center justify-between">
                  <span>Notifications</span>
                  <button className="text-xs text-amber-400 hover:text-amber-300">
                    Mark all read
                  </button>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-800" />
                <div className="max-h-96 overflow-y-auto">
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium text-white">
                        New user registered
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      A new user just signed up
                    </p>
                    <p className="text-[10px] text-slate-500">2 min ago</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span className="text-sm font-medium text-white">
                        New comment
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Someone commented on your post
                    </p>
                    <p className="text-[10px] text-slate-500">1 hour ago</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <span className="text-sm font-medium text-white">
                        System update
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Dashboard updated to version 2.0
                    </p>
                    <p className="text-[10px] text-slate-500">3 hours ago</p>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem className="justify-center text-amber-400 hover:text-amber-300">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 rounded-full pl-1 pr-3 py-1 h-auto hover:bg-slate-800 transition-all duration-200"
                >
                  <Avatar className="h-8 w-8 border-2 border-amber-500/30">
                    <AvatarImage src={avatarSrc} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-amber-600 to-orange-600 text-white text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white">
                      {user?.name || "Admin User"}
                    </p>
                    <p className="text-[10px] text-slate-400">Administrator</p>
                  </div>
                  <ChevronDown className="hidden md:block h-4 w-4 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 bg-slate-900 border-slate-700"
              >
                <DropdownMenuLabel className="text-white">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">
                      {user?.name || "Admin User"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {user?.email || "admin@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-800" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                  <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
