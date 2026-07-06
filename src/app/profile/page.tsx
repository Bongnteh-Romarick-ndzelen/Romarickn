"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Calendar,
  Edit,
  Save,
  Camera,
  Trash2,
  AlertTriangle,
  Loader2,
  Shield,
  CheckCircle,
  LogOut,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/lib/services/auth.service";
import { motion } from "framer-motion";

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

export default function ProfilePage() {
  const { user, logout, updateUser, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [userStats, setUserStats] = useState({
    postCount: 0,
    commentCount: 0,
    totalLikes: 0,
  });

  // Redirect if not logged in - wait for auth to load first
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        bio: (user as any).bio || "",
      });
      setAvatarPreview(user.avatar || "");
      fetchUserStats();
    }
  }, [user]);

  // Reset form when edit modal opens
  useEffect(() => {
    if (editProfileOpen && user) {
      setFormData({
        name: user.name || "",
        bio: (user as any).bio || "",
      });
      setAvatarPreview(user.avatar || "");
      setAvatarFile(null);
    }
  }, [editProfileOpen, user]);

  const fetchUserStats = async () => {
    if (!user?._id) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/users/${user._id}/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUserStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Avatar must be less than 2MB",
        });
        return;
      }
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let avatarUrl = user?.avatar;

      if (avatarFile) {
        const avatarFormData = new FormData();
        avatarFormData.append("avatar", avatarFile);
        const avatarResponse = await fetch("/api/users/avatar", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: avatarFormData,
        });
        const avatarData = await avatarResponse.json();
        if (avatarData.success) {
          avatarUrl = avatarData.data.url;
        }
      }

      const response = await authService.updateProfile({
        name: formData.name,
        bio: formData.bio,
        avatar: avatarUrl,
      });

      if (response.success) {
        updateUser({
          name: formData.name,
          bio: formData.bio,
          avatar: avatarUrl,
        });
        toast({
          variant: 'success',
          title: "Profile updated",
          description: "Your profile has been successfully updated.",
        });
        setEditProfileOpen(false);
        setAvatarFile(null);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message || "Failed to update profile",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setIsChangingPassword(true);
    setPasswordError("");

    try {
      const response = await authService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword,
      );

      if (response.success) {
        toast({
          variant: "success",
          title: "Password changed",
          description: "Your password has been successfully updated.",
        });
        setChangePasswordOpen(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setPasswordError(response.message || "Failed to change password");
      }
    } catch (error) {
      setPasswordError("Failed to change password. Please try again.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const response = await authService.deleteAccount();

      if (response.success) {
        toast({
          variant: 'success',
          title: "Account deleted",
          description: "Your account has been permanently deleted.",
        });
        logout();
        router.push("/");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: response.message || "Failed to delete account",
        });
      }
    } catch (error) {
      ({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-base font-bold text-slate-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="min-h-screen bg-slate-50/50 selection:bg-blue-500 selection:text-white overflow-x-hidden"
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

      <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
        {/* Header */}
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border-2 border-blue-200 mb-3">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">
              My Profile
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-['Radley',serif]">
            My Profile
          </h1>
          <p className="text-lg text-slate-600 font-bold mt-1 font-['Lato',sans-serif]">
            View and manage your account information
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar - Profile Info */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative group mb-4">
                    <Avatar className="h-32 w-32 border-4 border-blue-200">
                      <AvatarImage src={avatarPreview || user.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-3xl font-bold">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <label className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-600 cursor-pointer hover:bg-blue-700 transition-all shadow-lg">
                      <Camera className="h-4 w-4 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>

                  {/* User Info */}
                  <h2 className="text-2xl font-bold text-slate-900 mb-1 font-['Radley',serif]">
                    {user.name}
                  </h2>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <p className="text-base font-bold text-slate-500">{user.email}</p>
                  </div>
                  {user.bio && (
                    <p className="text-base font-semibold text-slate-600 mt-2">
                      {user.bio}
                    </p>
                  )}

                  {/* Role Badge */}
                  <Badge
                    className={`mt-3 text-sm font-bold px-4 py-1.5 rounded-xl border-2 ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700 border-purple-200"
                        : "bg-blue-100 text-blue-700 border-blue-200"
                    }`}
                  >
                    {user.role === "admin" ? (
                      <>
                        <Shield className="h-4 w-4 mr-1.5" />
                        Administrator
                      </>
                    ) : (
                      "Member"
                    )}
                  </Badge>

                  {/* Verification Status */}
                  <div className="mt-2 flex items-center gap-1.5 text-sm font-bold">
                    {user.isEmailVerified ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-emerald-600">Email verified</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                        <span className="text-amber-600">Email not verified</span>
                      </>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 w-full mt-4 pt-4 border-t-2 border-slate-200">
                    <div className="text-center">
                      <div className="text-2xl font-black text-slate-900">
                        {userStats.postCount}
                      </div>
                      <div className="text-sm font-bold text-slate-500">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-slate-900">
                        {userStats.commentCount}
                      </div>
                      <div className="text-sm font-bold text-slate-500">Comments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-black text-slate-900">
                        {userStats.totalLikes}
                      </div>
                      <div className="text-sm font-bold text-slate-500">Likes</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="w-full mt-4 space-y-2.5">
                    <Button
                      variant="outline"
                      onClick={() => setEditProfileOpen(true)}
                      className="w-full border-2 border-blue-200 text-blue-600 font-bold rounded-xl hover:bg-blue-50 hover:border-blue-300 bg-white"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setChangePasswordOpen(true)}
                      className="w-full border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 bg-white"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setDeleteDialogOpen(true)}
                      className="w-full border-2 border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 hover:border-red-300 bg-white"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>

                  {/* Member Since */}
                  <div className="mt-4 pt-4 border-t-2 border-slate-200 w-full">
                    <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-500">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Joined{" "}
                        {new Date(
                          user.createdAt || Date.now(),
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content - Account Information */}
          <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-6">
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-2xl font-bold text-slate-900 font-['Radley',serif]">
                  Account Information
                </CardTitle>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Detailed information about your account
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center py-3 border-b-2 border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-50">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Full Name</p>
                        <p className="text-base font-bold text-slate-900">{user.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b-2 border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-blue-50">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Email Address</p>
                        <p className="text-base font-bold text-slate-900">{user.email}</p>
                      </div>
                    </div>
                    {!user.isEmailVerified && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-blue-600 font-bold text-sm"
                      >
                        Resend verification
                      </Button>
                    )}
                  </div>

                  <div className="flex justify-between items-center py-3 border-b-2 border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-purple-50">
                        <Shield className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Account Role</p>
                        <p className="text-base font-bold text-slate-900 capitalize">
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b-2 border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-emerald-50">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Account Created</p>
                        <p className="text-base font-bold text-slate-900">
                          {new Date(
                            user.createdAt || Date.now(),
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-50">
                        <LogOut className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-500 font-['Lato',sans-serif]">Last Login</p>
                        <p className="text-base font-bold text-slate-900">
                          {user.lastLogin
                            ? new Date(user.lastLogin).toLocaleString()
                            : "Never"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-2 border-red-200/80 bg-red-50/30 rounded-2xl shadow-sm">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-xl font-bold text-red-600 flex items-center gap-2 font-['Lato',sans-serif]">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-base font-bold text-red-500/80 font-['Lato',sans-serif]">
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-base font-bold text-slate-900">Delete Account</p>
                    <p className="text-sm font-semibold text-slate-500">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteDialogOpen(true)}
                    className="border-2 border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 hover:border-red-300 bg-white"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Edit Profile Modal */}
        <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
          <DialogContent className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl max-w-md">
            <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2 font-['Radley',serif]">
                <Edit className="h-5 w-5 text-blue-600" />
                Edit Profile
              </DialogTitle>
              <DialogDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                Update your profile information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <div className="relative group">
                  <Avatar className="h-28 w-28 border-4 border-blue-200">
                    <AvatarImage src={avatarPreview || user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-2xl font-bold">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <label className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-600 cursor-pointer hover:bg-blue-700 transition-all shadow-lg">
                    <Camera className="h-4 w-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="edit-name" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                    Full Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your name"
                    className="bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11 mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-bio" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                    Bio
                  </Label>
                  <Textarea
                    id="edit-bio"
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    placeholder="Tell us about yourself..."
                    rows={3}
                    className="bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 resize-none mt-1"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setEditProfileOpen(false);
                  setFormData({
                    name: user.name || "",
                    bio: (user as any).bio || "",
                  });
                  setAvatarPreview(user.avatar || "");
                  setAvatarFile(null);
                }}
                className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 shadow-lg shadow-blue-600/25"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Change Password Modal */}
        <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
          <DialogContent className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2 font-['Radley',serif]">
                <Lock className="h-5 w-5 text-blue-600" />
                Change Password
              </DialogTitle>
              <DialogDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                Update your account password
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {passwordError && (
                <div className="flex items-center gap-2 text-sm font-bold text-red-700 bg-red-50 p-3 rounded-xl border-2 border-red-200">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="current-password" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                    Current Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value,
                        })
                      }
                      placeholder="Enter current password"
                      className="bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="new-password" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                    New Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Enter new password"
                      className="bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirm-password" className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                    Confirm New Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm new password"
                      className={`bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100 h-11 pr-10 ${
                        passwordData.confirmPassword &&
                        passwordData.newPassword !== passwordData.confirmPassword
                          ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {passwordData.confirmPassword &&
                    passwordData.newPassword !== passwordData.confirmPassword && (
                      <p className="text-sm font-bold text-red-600 mt-1">
                        Passwords do not match
                      </p>
                    )}
                </div>
              </div>
            </div>
            <DialogFooter className="gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setChangePasswordOpen(false);
                  setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                  setPasswordError("");
                }}
                className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleChangePassword}
                disabled={isChangingPassword}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 shadow-lg shadow-blue-600/25"
              >
                {isChangingPassword ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Lock className="h-4 w-4 mr-2" />
                )}
                Change Password
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Account Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold text-slate-900 flex items-center gap-2 font-['Radley',serif]">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Delete Account
              </AlertDialogTitle>
              <AlertDialogDescription className="text-base font-bold text-slate-600 font-['Lato',sans-serif]">
                Are you absolutely sure? This action cannot be undone. This will
                permanently delete your account and remove all your data from
                our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="gap-3">
              <AlertDialogCancel className="border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 bg-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl px-6"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                Yes, delete my account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  );
}