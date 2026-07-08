"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Menu,
  X,
  Sparkles,
  ChevronRight,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Heart,
  UserCircle,
  Home,
  Info,
  Briefcase,
  Code,
  FolderOpen,
  Mail,
  ChevronDown,
  Download,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { authService } from "@/lib/services/auth.service";
import { motion, AnimatePresence } from "framer-motion";
import { API_BASE_URL } from "@/lib/api";

const menuItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/projects", label: "Projects", icon: FolderOpen },
  { href: "/experience", label: "Experience", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: Code },
  { href: "/contact", label: "Contact", icon: Mail },
];

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

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout: authLogout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      authLogout();
      router.push("/");
      setIsMobileMenuOpen(false);
    }
  };

  const handleDownloadResume = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/resume/download`);
      if (!response.ok) throw new Error("Failed to download resume");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Bongnteh_Romarick_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const avatarSrc = user?.avatar;
  const initials = user ? getInitials(user.name) : "";
  const isAdmin = user?.role === "admin";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b-2 border-slate-200/80 shadow-sm"
          : "bg-white/90 backdrop-blur-sm border-b-2 border-slate-200/50",
      )}
    >
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&family=Radley:ital@0;1&display=swap');
        
        .font-lato { font-family: 'Lato', sans-serif; }
        .font-radley { font-family: 'Radley', serif; }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-all duration-500 group-hover:scale-110"></div>
              <div className="relative duration-300">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={40}
                  height={40}
                  className="h-9 w-9 md:h-10 md:w-10 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-radley text-xl md:text-2xl font-bold text-slate-900 leading-tight tracking-tight group-hover:text-blue-600 transition-colors duration-300">
                Romarick
              </span>
              <span className="font-lato text-[10px] md:text-xs font-bold text-slate-500 hidden sm:block">
                Full-Stack Developer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 rounded-xl font-extrabold text-sm transition-all duration-200 font-lato",
                      isActive
                        ? "text-blue-600 bg-blue-50/80"
                        : "text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadResume}
              className="hidden md:inline-flex font-lato font-bold text-white hover:text-blue-100 hover:border-blue-600 rounded-xl gap-2"
            >
              <Download className="h-4 w-4" />
              Resume
            </Button>

            {/* Auth Section - Desktop */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-blue-50/50 transition-all"
                  >
                    <Avatar className="h-9 w-9 border-2 border-blue-200">
                      {avatarSrc && <AvatarImage src={avatarSrc} alt={user.name} />}
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-bold text-sm text-slate-700 font-lato hidden lg:block">
                      {user.name?.split(" ")[0]}
                    </span>
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64 bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl p-2"
                >
                  <DropdownMenuLabel className="px-3 py-2">
                    <div className="flex flex-col space-y-1">
                      <p className="font-radley text-base font-bold text-slate-900">
                        {user.name}
                      </p>
                      <p className="font-lato text-sm font-semibold text-slate-500">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-200" />
                  <DropdownMenuItem className="font-lato font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl cursor-pointer px-3 py-2.5">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <Link href="/profile" className="w-full">
                      View Profile
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem className="font-lato font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl cursor-pointer px-3 py-2.5">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <Link href="/admin/dashboard" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="font-lato font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl cursor-pointer px-3 py-2.5">
                    <Heart className="mr-2 h-4 w-4" />
                    <Link href="/saved" className="w-full">
                      Saved Posts
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-200" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="font-lato font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl cursor-pointer px-3 py-2.5"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" passHref>
                  <Button
                    variant="ghost"
                    className="font-lato font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl px-5"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button className="font-lato font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl px-6 shadow-lg shadow-blue-600/25 transition-all">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile: Menu Button + Auth */}
          <div className="flex md:hidden items-center gap-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full p-0 hover:bg-blue-50"
                  >
                    <Avatar className="h-8 w-8 border-2 border-blue-200">
                      {avatarSrc && <AvatarImage src={avatarSrc} alt={user.name} />}
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-xs font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl p-2"
                >
                  <DropdownMenuLabel className="px-3 py-2">
                    <div className="flex flex-col space-y-1">
                      <p className="font-radley text-base font-bold text-slate-900">
                        {user.name}
                      </p>
                      <p className="font-lato text-sm font-semibold text-slate-500">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-200" />
                  <DropdownMenuItem className="font-lato font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl cursor-pointer px-3 py-2.5">
                    <UserCircle className="mr-2 h-4 w-4" />
                    <Link href="/profile" className="w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem className="font-lato font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl cursor-pointer px-3 py-2.5">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <Link href="/admin/dashboard" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-slate-200" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="font-lato font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl cursor-pointer px-3 py-2.5"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login" passHref>
                <Button
                  variant="ghost"
                  className="font-lato font-bold text-slate-600 hover:text-blue-600 text-sm h-8 px-3"
                >
                  Login
                </Button>
              </Link>
             )}

             <Button
               variant="ghost"
               size="icon"
               onClick={handleDownloadResume}
               className="h-9 w-9 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
               title="Download Resume"
             >
               <Download className="h-5 w-5" />
             </Button>

             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[300px] sm:w-[350px] bg-white border-l-2 border-slate-200 p-0"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-4 border-b-2 border-slate-200">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="font-radley text-xl font-bold text-slate-900">
                        Romarick
                      </span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl font-extrabold text-base transition-all duration-200 font-lato",
                            isActive
                              ? "bg-blue-50 text-blue-600"
                              : "text-slate-600 hover:text-blue-600 hover:bg-blue-50/50"
                          )}
                        >
                          <Icon className="h-5 w-5" />
                          {item.label}
                          {isActive && (
                            <div className="ml-auto h-2 w-2 rounded-full bg-blue-600" />
                          )}
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Mobile Footer */}
                  <div className="p-4 border-t-2 border-slate-200">
                    {!user && (
                      <div className="flex flex-col gap-2">
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button className="w-full font-lato font-bold bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl">
                            Login
                          </Button>
                        </Link>
                        <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button className="w-full font-lato font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-blue-600/25">
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    )}
                    {user && (
                      <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
                        <Avatar className="h-10 w-10 border-2 border-blue-200">
                          {avatarSrc && <AvatarImage src={avatarSrc} alt={user.name} />}
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm font-bold">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-radley text-sm font-bold text-slate-900 truncate">
                            {user.name}
                          </p>
                          <p className="font-lato text-xs font-semibold text-slate-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}