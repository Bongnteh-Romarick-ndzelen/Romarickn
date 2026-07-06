"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Edit,
  Trash2,
  Shield,
  UserX,
  UserCheck,
  Mail,
  Users,
  Sparkles,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import { adminService } from "@/lib/services/admin.service";
import { useToast } from "@/hooks/use-toast";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  createdAt: string;
  avatar?: string;
}

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

export default function DashboardUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, [page, roleFilter, searchTerm]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await adminService.getAllUsers(page, 20);
      console.log("Users response:", response);

      let usersData: User[] = [];
      let paginationData = null;

      if (response && response.success && response.data) {
        if (Array.isArray(response.data)) {
          usersData = response.data;
          paginationData = response.pagination;
        } else if (response.data.users && Array.isArray(response.data.users)) {
          usersData = response.data.users;
          paginationData = response.data.pagination;
        } else {
          usersData = [];
        }
      } else if (response && Array.isArray(response)) {
        usersData = response;
      } else if (response && response.users && Array.isArray(response.users)) {
        usersData = response.users;
        paginationData = response.pagination;
      } else {
        usersData = [];
      }

      setUsers(usersData);
      if (paginationData) {
        setTotalPages(paginationData.pages || 1);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUserId) return;

    try {
      await adminService.deleteUser(selectedUserId);
      toast({
        variant: "success",
        title: "Success",
        description: "User deleted successfully",
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedUserId(null);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await adminService.updateUserRole(userId, newRole);
      toast({
        variant: "success",
        title: "Success",
        description: `User role updated to ${newRole}`,
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    }
  };

  const handleToggleActive = async (userId: string, isActive: boolean) => {
    try {
      await adminService.toggleUserActive(userId);
      toast({
        variant: "success",
        title: "Success",
        description: isActive ? "User deactivated" : "User activated",
      });
      fetchUsers();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }
  };

  const getRoleBadge = (role: string) => {
    if (role === "admin") {
      return (
        <Badge className="bg-purple-100 text-purple-700 border-2 border-purple-200 font-bold px-3 py-1 rounded-xl text-sm">
          <Shield className="h-3 w-3 mr-1" />
          Admin
        </Badge>
      );
    }
    return (
      <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-200 font-bold px-3 py-1 rounded-xl text-sm">
        User
      </Badge>
    );
  };

  const getStatusBadge = (isActive: boolean, isEmailVerified: boolean) => {
    if (!isActive) {
      return (
        <Badge className="bg-red-100 text-red-700 border-2 border-red-200 font-bold px-3 py-1 rounded-xl text-sm">
          <UserX className="h-3 w-3 mr-1" />
          Inactive
        </Badge>
      );
    }
    if (!isEmailVerified) {
      return (
        <Badge className="bg-amber-100 text-amber-700 border-2 border-amber-200 font-bold px-3 py-1 rounded-xl text-sm">
          <Mail className="h-3 w-3 mr-1" />
          Unverified
        </Badge>
      );
    }
    return (
      <Badge className="bg-emerald-100 text-emerald-700 border-2 border-emerald-200 font-bold px-3 py-1 rounded-xl text-sm">
        <UserCheck className="h-3 w-3 mr-1" />
        Active
      </Badge>
    );
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-10 w-48 bg-slate-200" />
            <Skeleton className="h-5 w-64 mt-2 bg-slate-200" />
          </div>
        </div>
        <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full bg-slate-100 rounded-xl" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="space-y-6 pb-10"
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

      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border-2 border-blue-200 mb-3">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">
              User Management
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-['Radley',serif]">
            Users
          </h1>
          <p className="text-lg text-slate-600 font-bold mt-1 font-['Lato',sans-serif]">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Button
          onClick={fetchUsers}
          variant="outline"
          className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl px-5 py-2.5 hover:bg-slate-50 hover:border-slate-300 bg-white"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold h-11 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-40 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl h-11">
            <SelectValue placeholder="All roles" />
          </SelectTrigger>
          <SelectContent className="bg-white border-2 border-slate-200 rounded-xl shadow-lg">
            <SelectItem value="all" className="font-bold">All roles</SelectItem>
            <SelectItem value="user" className="font-bold">Users</SelectItem>
            <SelectItem value="admin" className="font-bold">Admins</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {/* Users Table */}
      <motion.div variants={fadeInUp}>
        <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <CardHeader className="px-6 pt-6 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                  All Users
                </CardTitle>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Total {filteredUsers.length} users found
                </CardDescription>
              </div>
              <Badge className="bg-blue-100 text-blue-700 border-2 border-blue-200 font-bold px-4 py-1.5 rounded-xl text-sm">
                <Users className="h-4 w-4 mr-1.5" />
                {filteredUsers.length} Users
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <p className="text-xl font-bold text-slate-600">No users found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-slate-200 hover:bg-transparent">
                      <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">User</TableHead>
                      <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Email</TableHead>
                      <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Role</TableHead>
                      <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Status</TableHead>
                      <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif]">Joined</TableHead>
                      <TableHead className="text-sm font-black text-slate-600 font-['Lato',sans-serif] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-slate-100 hover:bg-slate-50/50 transition-all"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border-2 border-blue-200">
                              {user.avatar && (
                                <AvatarImage src={user.avatar} alt={user.name} />
                              )}
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white text-sm font-bold">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-bold text-slate-900 font-['Lato',sans-serif]">
                              {user.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-slate-600">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <Select
                            defaultValue={user.role}
                            onValueChange={(value) =>
                              handleRoleChange(user._id, value)
                            }
                          >
                            <SelectTrigger className="w-28 h-9 text-sm font-bold bg-white border-2 border-slate-200 text-slate-700 rounded-xl focus:border-blue-400">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-2 border-slate-200 rounded-xl shadow-lg">
                              <SelectItem value="user" className="font-bold">User</SelectItem>
                              <SelectItem value="admin" className="font-bold">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(user.isActive, user.isEmailVerified)}
                        </TableCell>
                        <TableCell className="font-bold text-slate-500 text-sm">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                              onClick={() => {
                                setSelectedUserId(user._id);
                                setDeleteDialogOpen(true);
                              }}
                              title="Delete user"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-slate-200">
                <div className="text-sm font-bold text-slate-500">
                  Page {page} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 disabled:opacity-50"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-slate-900 font-['Radley',serif]">
              Delete User
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base font-bold text-slate-600 font-['Lato',sans-serif]">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel className="border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 bg-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl px-6"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}