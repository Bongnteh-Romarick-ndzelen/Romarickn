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
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/lib/services/auth.service";

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

  // Card background variants
  const cardBgVariants = [
    "bg-slate-800/85",
    "bg-slate-800/80",
    "bg-slate-800/90",
    "bg-slate-800/75",
    "bg-slate-800/85",
  ];

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
      <div className="min-h-screen bg-[#111D3A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-teal-400 mx-auto mb-4" />
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#111D3A] relative overflow-hidden">
      {/* Grid overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(64,224,208,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(64,224,208,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Glow orbs */}
      <div className="absolute top-[-80px] right-[-60px] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto max-w-4xl px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            My Profile
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            View and manage your account information
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar - Profile Info */}
          <div className="lg:col-span-1">
            <Card
              className={`${cardBgVariants[0]} border border-slate-700/40 backdrop-blur-sm rounded-xl`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative group mb-4">
                    <Avatar className="h-28 w-28 border-4 border-teal-500/30">
                      <AvatarImage src={avatarPreview || user.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white text-2xl">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-teal-500 cursor-pointer hover:bg-teal-600 transition-all">
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
                  <h2 className="text-xl font-bold text-white mb-1">
                    {user.name}
                  </h2>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    <p className="text-sm text-slate-400">{user.email}</p>
                  </div>
                  {user.bio && (
                    <p className="text-sm text-slate-300 mt-2">{user.bio}</p>
                  )}

                  {/* Role Badge */}
                  <Badge
                    className={`mt-3 ${
                      user.role === "admin"
                        ? "bg-teal-500/20 text-teal-400"
                        : "bg-cyan-500/20 text-cyan-400"
                    }`}
                  >
                    {user.role === "admin" ? (
                      <>
                        <Shield className="h-3 w-3 mr-1" />
                        Administrator
                      </>
                    ) : (
                      "Member"
                    )}
                  </Badge>

                  {/* Verification Status */}
                  <div className="mt-2 flex items-center gap-1 text-xs">
                    {user.isEmailVerified ? (
                      <>
                        <CheckCircle className="h-3 w-3 text-teal-400" />
                        <span className="text-teal-400">Email verified</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-3 w-3 text-yellow-400" />
                        <span className="text-yellow-400">
                          Email not verified
                        </span>
                      </>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 w-full mt-4 pt-4 border-t border-slate-700/30">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {userStats.postCount}
                      </div>
                      <div className="text-xs text-slate-400">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {userStats.commentCount}
                      </div>
                      <div className="text-xs text-slate-400">Comments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {userStats.totalLikes}
                      </div>
                      <div className="text-xs text-slate-400">Likes</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="w-full mt-4 space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => setEditProfileOpen(true)}
                      className="w-full border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setChangePasswordOpen(true)}
                      className="w-full border-slate-700 text-slate-300 hover:border-teal-500/30 hover:text-teal-400"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => setDeleteDialogOpen(true)}
                      className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>

                  {/* Member Since */}
                  <div className="mt-4 pt-4 border-t border-slate-700/30 w-full">
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                      <Calendar className="h-3 w-3" />
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
          </div>

          {/* Main Content - Account Information */}
          <div className="lg:col-span-2">
            <Card
              className={`${cardBgVariants[1]} border border-slate-700/40 backdrop-blur-sm rounded-xl`}
            >
              <CardHeader>
                <CardTitle className="text-white">
                  Account Information
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Detailed information about your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center py-3 border-b border-slate-700/30">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-teal-400" />
                      <div>
                        <p className="text-xs text-slate-400">Full Name</p>
                        <p className="text-white font-medium">{user.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-slate-700/30">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-teal-400" />
                      <div>
                        <p className="text-xs text-slate-400">Email Address</p>
                        <p className="text-white font-medium">{user.email}</p>
                      </div>
                    </div>
                    {!user.isEmailVerified && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-teal-400 text-xs"
                      >
                        Resend verification
                      </Button>
                    )}
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-slate-700/30">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-teal-400" />
                      <div>
                        <p className="text-xs text-slate-400">Account Role</p>
                        <p className="text-white font-medium capitalize">
                          {user.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-slate-700/30">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-teal-400" />
                      <div>
                        <p className="text-xs text-slate-400">
                          Account Created
                        </p>
                        <p className="text-white font-medium">
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
                      <LogOut className="h-5 w-5 text-teal-400" />
                      <div>
                        <p className="text-xs text-slate-400">Last Login</p>
                        <p className="text-white font-medium">
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
            <Card className="mt-6 border-red-500/30 bg-red-500/5 rounded-xl">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-red-400/70">
                  Irreversible actions for your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Delete Account</p>
                    <p className="text-sm text-slate-400">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteDialogOpen(true)}
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Edit Profile Modal */}
        <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
          <DialogContent className="bg-slate-900 border-slate-700 max-w-md rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-2">
                <Edit className="h-5 w-5 text-teal-400" />
                Edit Profile
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Update your profile information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-4 border-teal-500/30">
                    <AvatarImage src={avatarPreview || user.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-teal-500 to-cyan-500 text-white text-xl">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-teal-500 cursor-pointer hover:bg-teal-600 transition-all">
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
                  <Label htmlFor="edit-name" className="text-slate-300">
                    Full Name
                  </Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your name"
                    className="bg-slate-800/50 border-slate-700 text-white mt-1 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-bio" className="text-slate-300">
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
                    className="bg-slate-800/50 border-slate-700 text-white mt-1 resize-none rounded-lg"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
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
                className="border-slate-700 text-slate-300 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 rounded-lg"
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
          <DialogContent className="bg-slate-900 border-slate-700 max-w-md rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-white flex items-center gap-2">
                <Lock className="h-5 w-5 text-teal-400" />
                Change Password
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Update your account password
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {passwordError && (
                <div className="flex items-center gap-2 text-xs text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">
                  <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}
              <div className="space-y-3">
                <div>
                  <Label htmlFor="current-password" className="text-slate-300">
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
                      className="bg-slate-800/50 border-slate-700 text-white pr-10 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
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
                  <Label htmlFor="new-password" className="text-slate-300">
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
                      className="bg-slate-800/50 border-slate-700 text-white pr-10 rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
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
                  <Label htmlFor="confirm-password" className="text-slate-300">
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
                      className={`bg-slate-800/50 border-slate-700 text-white pr-10 rounded-lg ${
                        passwordData.confirmPassword &&
                        passwordData.newPassword !== passwordData.confirmPassword
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
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
                      <p className="text-[10px] text-red-400 mt-1">
                        Passwords do not match
                      </p>
                    )}
                </div>
              </div>
            </div>
            <DialogFooter>
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
                className="border-slate-700 text-slate-300 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                onClick={handleChangePassword}
                disabled={isChangingPassword}
                className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 rounded-lg"
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
          <AlertDialogContent className="bg-slate-900 border-slate-700 rounded-xl">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                Delete Account
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                Are you absolutely sure? This action cannot be undone. This will
                permanently delete your account and remove all your data from
                our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 rounded-lg">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg"
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
    </div>
  );
}