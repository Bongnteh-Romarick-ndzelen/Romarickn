"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
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
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  ImagePlus,
  Save,
  Eye,
  ArrowLeft,
  Loader2,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { postService } from "@/lib/services/post.service";
import TiptapEditor from "@/components/admin/TiptapEditor";

interface PostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImagePublicId: string;
  categories: string[];
  tags: string[];
  featured: boolean;
  status: string;
  publishedAt?: string;
}

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formData, setFormData] = useState<PostData | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [status, setStatus] = useState("draft");
  const [featured, setFeatured] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    setIsLoading(true);
    try {
      const post = await postService.getPostById(id as string);
      setFormData(post);
      setTitle(post.title);
      setExcerpt(post.excerpt);
      setContent(post.content);
      setCoverImagePreview(post.coverImage);
      setCategories(post.categories || []);
      setTags(post.tags || []);
      setStatus(post.status);
      setFeatured(post.featured);
    } catch (error) {
      console.error("Error fetching post:", error);
      toast({
        title: "Error",
        description: "Failed to load post",
        variant: "destructive",
      });
      router.push("/admin/dashboard/posts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addCategory = () => {
    if (categoryInput.trim() && !categories.includes(categoryInput.trim())) {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput("");
    }
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = async (publishNow = false) => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a post title",
        variant: "destructive",
      });
      return;
    }
    if (!excerpt.trim()) {
      toast({
        title: "Excerpt required",
        description: "Please enter a post excerpt",
        variant: "destructive",
      });
      return;
    }
    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please enter post content",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    const updateData: any = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content,
      categories: categories,
      tags: tags,
      featured: featured,
      status: publishNow ? "published" : status,
    };

    if (coverImage) {
      updateData.coverImage = coverImage;
    }

    try {
      const response = await postService.updatePost(id as string, updateData);

      if (response.success) {
        toast({
          variant: "success",
          title: publishNow ? "Post Published!" : "Changes Saved!",
          description: publishNow
            ? "Your post has been published."
            : "Your changes have been saved.",
        });
        router.push("/admin/dashboard/posts");
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to update post",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await postService.deletePost(id as string);
      toast({
        title: "Post Deleted",
        description: "Your post has been deleted successfully",
      });
      router.push("/admin/dashboard/posts");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-slate-800 rounded mb-4"></div>
          <div className="h-4 w-64 bg-slate-800 rounded mb-8"></div>
          <div className="h-96 bg-slate-800 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin/dashboard/posts">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Posts
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Edit Post
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Edit your blog post content and settings
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setDeleteDialogOpen(true)}
            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isSaving}
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={isSaving}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            {status === "published" ? "Update & Publish" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <Card className="bg-slate-800/30 border border-slate-700/50">
            <CardContent className="p-6">
              <Input
                placeholder="Enter post title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl font-bold bg-transparent border-slate-700 focus:border-purple-500 text-white placeholder-slate-500"
              />
            </CardContent>
          </Card>

          {/* Cover Image */}
          <Card className="bg-slate-800/30 border border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Cover Image</CardTitle>
              <CardDescription className="text-slate-400">
                Update the featured image for your post
              </CardDescription>
            </CardHeader>
            <CardContent>
              {coverImagePreview ? (
                <div className="relative">
                  <Image
                    src={coverImagePreview}
                    alt="Cover preview"
                    width={600}
                    height={315}
                    className="w-full rounded-lg object-cover"
                  />
                  <button
                    onClick={() => {
                      setCoverImage(null);
                      setCoverImagePreview("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-48 border-2 border-dashed border-slate-700 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-purple-500 transition-colors"
                >
                  <ImagePlus className="h-8 w-8 text-slate-500" />
                  <span className="text-sm text-slate-400">
                    Click to upload cover image
                  </span>
                  <span className="text-xs text-slate-500">
                    PNG, JPG, WEBP up to 5MB
                  </span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card className="bg-slate-800/30 border border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Content</CardTitle>
              <CardDescription className="text-slate-400">
                Edit your post content using the rich text editor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TiptapEditor content={content} onChange={setContent} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Excerpt */}
          <Card className="bg-slate-800/30 border border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Excerpt</CardTitle>
              <CardDescription className="text-slate-400">
                Short description (max 500 characters)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Write a compelling excerpt..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value.slice(0, 500))}
                rows={4}
                className="bg-slate-800/50 border-slate-700 text-white placeholder-slate-500"
              />
              <p className="text-xs text-slate-500 mt-2 text-right">
                {excerpt.length}/500
              </p>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="bg-slate-800/30 border border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-slate-300 text-sm mb-2 block">
                  Status
                </Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-slate-300 text-sm">Featured Post</Label>
                <Switch checked={featured} onCheckedChange={setFeatured} />
              </div>
            </CardContent>
          </Card>

          {/* Categories */}
          <Card className="bg-slate-800/30 border border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-3">
                <Input
                  placeholder="Add category..."
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCategory()}
                  className="bg-slate-800/50 border-slate-700 text-white"
                />
                <Button
                  type="button"
                  onClick={addCategory}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge key={cat} className="bg-purple-500/20 text-purple-400">
                    {cat}
                    <button
                      onClick={() => removeCategory(cat)}
                      className="ml-2 hover:text-purple-200"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                {categories.length === 0 && (
                  <p className="text-xs text-slate-500">No categories added</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-slate-800/30 border border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-3">
                <Input
                  placeholder="Add tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  className="bg-slate-800/50 border-slate-700 text-white"
                />
                <Button
                  type="button"
                  onClick={addTag}
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-slate-300">
                    #{tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-slate-200"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                {tags.length === 0 && (
                  <p className="text-xs text-slate-500">No tags added</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          {formData && (
            <Card className="bg-slate-800/30 border border-slate-700/50">
              <CardContent className="p-4 space-y-2">
                <p className="text-xs text-slate-400">
                  <span className="font-medium">Slug:</span> {formData.slug}
                </p>
                {formData.publishedAt && (
                  <p className="text-xs text-slate-400">
                    <span className="font-medium">Published:</span>{" "}
                    {new Date(formData.publishedAt).toLocaleDateString()}
                  </p>
                )}
                <p className="text-xs text-slate-400">
                  <span className="font-medium">Post ID:</span> {formData.id}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-900 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Delete Post
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to delete "{title}"? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
