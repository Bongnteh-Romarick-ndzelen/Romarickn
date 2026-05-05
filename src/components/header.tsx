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

  const avatarSrc = user?.avatar;
  const initials = user ? getInitials(user.name) : "";
  const isAdmin = user?.role === "admin";

  const NavLinks = ({
    className,
    mobile = false,
  }: {
    className?: string;
    mobile?: boolean;
  }) => (
    <nav className={cn("flex items-center gap-1 md:gap-4", className)}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "transition-all duration-200 px-3 py-2 rounded-lg font-extrabold text-sm relative group",
              mobile
                ? "text-white hover:bg-slate-800 w-full justify-between flex"
                : "hover:text-white",
              pathname === item.href
                ? mobile
                  ? "bg-slate-800 text-white"
                  : "text-white"
                : mobile
                  ? "text-slate-300"
                  : "text-slate-400 hover:text-slate-300",
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center gap-2">
              {mobile && <ChevronRight className="h-3 w-3" />}
              {mobile && <Icon className="h-4 w-4" />}
              <span>{item.label}</span>
            </div>
            {!mobile && pathname === item.href && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
            )}
            {!mobile && (
              <div className="absolute inset-x-3 -bottom-1 h-0.5 bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
            )}
            {mobile && <ChevronRight className="h-4 w-4 text-slate-500" />}
          </Link>
        );
      })}
    </nav>
  );

  // Mobile user menu button (when logged in on mobile)
  const MobileUserMenu = () => {
    const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

    if (!user) return null;

    return (
      <DropdownMenu
        open={isMobileDropdownOpen}
        onOpenChange={setIsMobileDropdownOpen}
      >
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-9 w-9 rounded-full p-0 hover:bg-slate-800"
          >
            <Avatar className="h-8 w-8 border-2 border-teal-500/30">
              {avatarSrc && <AvatarImage src={avatarSrc} alt={user.name} />}
              <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-56 bg-slate-900 border-slate-700 shadow-xl"
        >
          <DropdownMenuLabel className="text-white">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-800" />
          <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <Link
              href="/profile"
              className="w-full"
              onClick={() => setIsMobileDropdownOpen(false)}
            >
              View Profile
            </Link>
          </DropdownMenuItem>
          {isAdmin && (
            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <Link
                href="/admin/dashboard"
                className="w-full"
                onClick={() => setIsMobileDropdownOpen(false)}
              >
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator className="bg-slate-800" />
          <DropdownMenuItem
            onClick={() => {
              handleLogout();
              setIsMobileDropdownOpen(false);
            }}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 shadow-lg"
          : "bg-slate-900/80 backdrop-blur-sm border-b border-slate-800/30",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with Romarick text */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition-all duration-500 group-hover:scale-110"></div>
              <div className="relative duration-300">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={36}
                  height={36}
                  className="h-8 w-8 md:h-9 md:w-9 object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg md:text-xl text-white leading-tight tracking-tight group-hover:bg-gradient-to-r group-hover:from-teal-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                Romarick
              </span>
              <span className="text-[9px] md:text-[10px] text-slate-400 hidden sm:block">
                Full-Stack Developer
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NavLinks />

            {/* Auth Section - Desktop */}
            {user ? (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-9 w-9 rounded-full p-0 hover:bg-slate-800"
                    >
                      <Avatar className="h-9 w-9 border-2 border-teal-500/30">
                        {avatarSrc && (
                          <AvatarImage src={avatarSrc} alt={user.name} />
                        )}
                        <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white text-sm">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 bg-slate-900 border-slate-700 shadow-xl"
                  >
                    <DropdownMenuLabel className="text-white">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <Link href="/profile" className="w-full">
                        View Profile
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <Link href="/admin/dashboard" className="w-full">
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer">
                      <Heart className="mr-2 h-4 w-4" />
                      <Link href="/saved" className="w-full">
                        Saved Posts
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" passHref>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Layout: Icons with dropdown for extra items */}
          <div className="flex md:hidden items-center gap-2">
            {/* First 4 menu items as icons */}
            <div className="flex items-center gap-1">
              {menuItems.slice(0, 4).map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "p-2 rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-teal-500/20 text-teal-400"
                        : "text-slate-400 hover:text-white hover:bg-slate-800",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>

            {/* Dropdown for remaining menu items */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-slate-900 border-slate-700 min-w-[160px]"
              >
                {menuItems.slice(4).map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <DropdownMenuItem
                      key={item.href}
                      className={cn(
                        "cursor-pointer font-extrabold",
                        isActive && "bg-teal-500/10 text-teal-400",
                      )}
                    >
                      <Link
                        href={item.href}
                        className="w-full flex items-center gap-2"
                      >
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Avatar (if logged in) */}
            {user ? (
              <MobileUserMenu />
            ) : (
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-300 hover:text-white text-xs h-8"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
