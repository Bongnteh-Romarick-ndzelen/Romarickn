"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Code,
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
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
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
    <nav className={cn("flex items-center gap-1 md:gap-6", className)}>
      {menuItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-all duration-200 px-3 py-2 rounded-lg text-sm font-medium relative group",
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
            <span>{item.label}</span>
          </div>
          {!mobile && pathname === item.href && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          )}
          {!mobile && (
            <div className="absolute inset-x-3 -bottom-1 h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
          )}
          {mobile && <ChevronRight className="h-4 w-4 text-slate-500" />}
        </Link>
      ))}
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
            className="relative h-9 w-9 rounded-full p-0 hover:bg-slate-800 md:hidden"
          >
            <Avatar className="h-8 w-8 border-2 border-purple-500/30">
              {avatarSrc && <AvatarImage src={avatarSrc} alt={user.name} />}
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
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
          {/* Dashboard only visible to admin */}
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
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative p-1.5 rounded-md bg-gradient-to-br from-slate-800 to-slate-900">
                <Code className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-white text-sm md:text-base leading-tight whitespace-nowrap">
                Bongnteh-Romarick
              </span>
              <span className="text-[11px] text-slate-400 hidden md:block truncate">
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
                      <Avatar className="h-9 w-9 border-2 border-purple-500/30">
                        {avatarSrc && (
                          <AvatarImage src={avatarSrc} alt={user.name} />
                        )}
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm">
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
                    {/* Dashboard only visible to admin */}
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
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile: User Avatar + Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile User Avatar Dropdown (when logged in) */}
            {user && <MobileUserMenu />}

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-slate-900 border-l border-slate-800/50 w-full max-w-[280px] sm:max-w-[320px] p-0"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-5 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900">
                        <Code className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-sm">
                          Bongnteh-Romarick
                        </h3>
                        <p className="text-[10px] text-slate-400">
                          Full-Stack Developer
                        </p>
                      </div>
                    </div>

                    {/* Mobile User Info if logged in */}
                    {user && (
                      <div className="mt-4 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-purple-500/30">
                            {avatarSrc && (
                              <AvatarImage src={avatarSrc} alt={user.name} />
                            )}
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xs">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {user.name}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-4 space-y-1">
                      <NavLinks mobile className="flex-col items-start" />

                      {/* Mobile Auth Links (only when NOT logged in, since logged in users have the avatar dropdown) */}
                      {!user && (
                        <div className="pt-4 mt-2 border-t border-slate-800">
                          <Link
                            href="/login"
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Login
                          </Link>
                          <Link
                            href="/signup"
                            className="w-full flex items-center justify-center px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm mt-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Sign Up
                          </Link>
                        </div>
                      )}

                      {/* Mobile User Links (when logged in) */}
                      {user && (
                        <div className="pt-4 mt-2 border-t border-slate-800 space-y-1">
                          <Link
                            href="/profile"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </Link>
                          {/* Dashboard only visible to admin */}
                          {isAdmin && (
                            <Link
                              href="/admin/dashboard"
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <LayoutDashboard className="h-4 w-4" />
                              Dashboard
                            </Link>
                          )}
                          <Link
                            href="/saved"
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors text-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <Heart className="h-4 w-4" />
                            Saved Posts
                          </Link>
                          <button
                            onClick={() => {
                              handleLogout();
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm mt-3"
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile CTA */}
                  <div className="p-5 border-t border-slate-800">
                    <Link
                      href="/contact"
                      passHref
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm">
                        Contact Me
                      </Button>
                    </Link>
                    <p className="text-[10px] text-slate-500 text-center mt-3">
                      Available for opportunities
                    </p>
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
