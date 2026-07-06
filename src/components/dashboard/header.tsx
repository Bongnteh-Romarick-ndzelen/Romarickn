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
import { motion } from "framer-motion";

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
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Radley:ital@0;1&display=swap');
        
        .font-lato { font-family: 'Lato', sans-serif; }
        .font-radley { font-family: 'Radley', serif; }
      `}</style>

      <header
        className={`
          sticky top-0 z-30 w-full transition-all duration-300
          ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md border-b-2 border-slate-200/80 shadow-sm"
              : "bg-white/90 border-b-2 border-slate-200/50"
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
              <Link href="/admin" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  <div className="relative p-1.5 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                    <LayoutDashboard className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-center gap-2">
                    <span className="font-radley text-lg font-bold text-slate-900 tracking-tight">
                      Bongnteh
                    </span>
                    <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-200 text-[10px] font-bold px-2.5 py-0.5 rounded-xl">
                      Admin
                    </Badge>
                  </div>
                  <p className="text-xs font-bold text-slate-500 font-lato">
                    Dashboard Control Panel
                  </p>
                </div>
              </Link>
            </div>

            {/* Center - Search Bar (hidden on mobile) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="search"
                  placeholder="Search dashboard..."
                  className="w-full pl-9 pr-4 py-2 h-10 text-sm bg-slate-50 border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold font-lato"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold text-slate-500 bg-slate-100 rounded-lg border-2 border-slate-200">
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
                    className="relative h-10 w-10 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all border-2 border-transparent hover:border-blue-200"
                  >
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-white">
                        {notifications}
                      </span>
                    )}
                    <span className="sr-only">Notifications</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-80 bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl p-2"
                >
                  <DropdownMenuLabel className="text-slate-900 flex items-center justify-between font-radley text-base">
                    <span className="font-bold">Notifications</span>
                    <button className="text-sm font-bold text-blue-600 hover:text-blue-700 font-lato">
                      Mark all read
                    </button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-200" />
                  <div className="max-h-96 overflow-y-auto space-y-1">
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-blue-50 rounded-xl transition-all">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
                        <span className="text-sm font-bold text-slate-900 font-lato">
                          New user registered
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-500 font-lato">
                        A new user just signed up
                      </p>
                      <p className="text-xs font-bold text-slate-400 font-lato">
                        2 min ago
                      </p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-blue-50 rounded-xl transition-all">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-bold text-slate-900 font-lato">
                          New comment
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-500 font-lato">
                        Someone commented on your post
                      </p>
                      <p className="text-xs font-bold text-slate-400 font-lato">
                        1 hour ago
                      </p>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer hover:bg-blue-50 rounded-xl transition-all">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-purple-500"></div>
                        <span className="text-sm font-bold text-slate-900 font-lato">
                          System update
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-500 font-lato">
                        Dashboard updated to version 2.0
                      </p>
                      <p className="text-xs font-bold text-slate-400 font-lato">
                        3 hours ago
                      </p>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator className="bg-slate-200" />
                  <DropdownMenuItem className="justify-center text-blue-600 hover:text-blue-700 font-bold font-lato rounded-xl">
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 rounded-full pl-1.5 pr-4 py-1.5 h-auto hover:bg-blue-50 transition-all duration-200 border-2 border-transparent hover:border-blue-200"
                  >
                    <Avatar className="h-9 w-9 border-2 border-blue-200">
                      <AvatarImage src={avatarSrc} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-bold text-slate-900 font-lato">
                        {user?.name || "Admin User"}
                      </p>
                      <p className="text-xs font-bold text-slate-500 font-lato">
                        Administrator
                      </p>
                    </div>
                    <ChevronDown className="hidden md:block h-4 w-4 text-slate-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64 bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl p-2"
                >
                  <DropdownMenuLabel className="text-slate-900 font-radley">
                    <div className="flex flex-col space-y-1">
                      <p className="text-base font-bold">
                        {user?.name || "Admin User"}
                      </p>
                      <p className="text-sm font-bold text-slate-500 font-lato">
                        {user?.email || "admin@example.com"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-200" />
                  <DropdownMenuItem className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl cursor-pointer font-bold font-lato">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl cursor-pointer font-bold font-lato">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl cursor-pointer font-bold font-lato">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-200" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl cursor-pointer font-bold font-lato"
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
    </>
  );
}