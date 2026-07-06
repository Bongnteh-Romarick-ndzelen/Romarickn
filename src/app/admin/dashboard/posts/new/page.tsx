"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
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
  ImagePlus,
  Save,
  Eye,
  ArrowLeft,
  Loader2,
  X,
  Plus,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import Link from "next/link";
import { postService } from "@/lib/services/post.service";
import TiptapEditor from "@/components/admin/TiptapEditor";
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

export default function CreatePostPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
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
      reader.onloadend = () => setCoverImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addCategory = () => {
    if (categoryInput.trim() && !categories.includes(categoryInput.trim())) {
      setCategories([...categories, categoryInput.trim()]);
      setCategoryInput("");
    }
  };

  const removeCategory = (category: string) =>
    setCategories(categories.filter((c) => c !== category));

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const handleSubmit = async (e: React.FormEvent, publishNow = false) => {
    e.preventDefault();

    // Validation
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
    if (!content.trim() || content === "<p></p>") {
      toast({
        title: "Content required",
        description: "Please enter post content",
        variant: "destructive",
      });
      return;
    }
    if (!coverImage && !coverImagePreview) {
      toast({
        title: "Cover image required",
        description: "Please select a cover image",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    console.log("Sending post data:");
    console.log("title:", title.trim());
    console.log("excerpt:", excerpt.trim());
    console.log("content:", content);
    console.log("categories:", categories);
    console.log("tags:", tags);
    console.log("featured:", featured);
    console.log("coverImage:", coverImage);

    try {
      const response = await postService.createPost({
        title: title.trim(),
        excerpt: excerpt.trim(),
        content,
        categories,
        tags,
        featured,
        published: publishNow,
        coverImage: coverImage || undefined,
      });
      console.log("Response:", response);

      toast({
        variant: "success",
        title: publishNow ? "Post Published Successfully!" : "Post Created successfully!",
        description: "Success!",
      });
      router.push("/admin/dashboard/posts");
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
        
        /* Fix for dark text visibility */
        .text-visible {
          color: #0f172a !important;
        }
        .text-visible-muted {
          color: #475569 !important;
        }
      `}</style>

      {/* Header */}
      <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/admin/dashboard/posts">
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-600 hover:text-blue-600 font-bold hover:bg-blue-50"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Posts
              </Button>
            </Link>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border-2 border-blue-200 mb-3">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-bold text-blue-700 uppercase tracking-wide">
              Create New Post
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight font-['Radley',serif]">
            Create New Post
          </h1>
          <p className="text-lg text-slate-600 font-bold mt-1 font-['Lato',sans-serif]">
            Write and publish new content for your blog
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={(e) => handleSubmit(e, false)}
            disabled={isLoading}
            className="border-2 border-slate-200 text-slate-700 font-bold rounded-xl px-6 py-2.5 hover:bg-slate-50 hover:border-slate-300 transition-all bg-white"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Draft
          </Button>
          <Button
            onClick={(e) => handleSubmit(e, true)}
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl px-6 py-2.5 shadow-lg shadow-blue-600/25"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Eye className="h-4 w-4 mr-2" />
            )}
            Publish
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div variants={fadeInUp}>
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardContent className="p-6">
                <Input
                  placeholder="Enter post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-2xl font-bold bg-white border-2 border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-slate-800 placeholder:text-slate-400 rounded-xl py-6 font-['Lato',sans-serif]"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Cover Image */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                  Cover Image
                </CardTitle>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Upload a featured image for your post
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                {coverImagePreview ? (
                  <div className="relative">
                    <Image
                      src={coverImagePreview}
                      alt="Cover preview"
                      width={600}
                      height={315}
                      className="w-full rounded-xl object-cover border-2 border-slate-200"
                    />
                    <button
                      onClick={() => {
                        setCoverImage(null);
                        setCoverImagePreview("");
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-all"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-48 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50/50 transition-all"
                  >
                    <ImagePlus className="h-10 w-10 text-slate-400" />
                    <span className="text-base font-bold text-slate-600">
                      Click to upload cover image
                    </span>
                    <span className="text-sm font-semibold text-slate-400">
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
          </motion.div>

          {/* Content Editor */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                  Content
                </CardTitle>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Write your post content using the rich text editor
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <TiptapEditor content={content} onChange={setContent} />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Excerpt */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                  Excerpt
                </CardTitle>
                <CardDescription className="text-base font-bold text-slate-500 font-['Lato',sans-serif]">
                  Short description (max 500 characters)
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <Textarea
                  placeholder="Write a compelling excerpt..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value.slice(0, 500))}
                  rows={4}
                  className="bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
                <p className="text-sm font-bold text-slate-400 mt-2 text-right">
                  {excerpt.length}/500
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Settings */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                  Post Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6 space-y-4">
                <div>
                  <Label className="text-base font-bold text-slate-700 block mb-2 font-['Lato',sans-serif]">
                    Status
                  </Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="bg-white border-2 border-slate-200 text-slate-800 font-semibold rounded-xl focus:border-blue-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-slate-200 rounded-xl shadow-lg">
                      <SelectItem value="draft" className="font-bold text-slate-700">Draft</SelectItem>
                      <SelectItem value="published" className="font-bold text-slate-700">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-base font-bold text-slate-700 font-['Lato',sans-serif]">
                    Featured Post
                  </Label>
                  <Switch 
                    checked={featured} 
                    onCheckedChange={setFeatured}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Categories */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add category..."
                    value={categoryInput}
                    onChange={(e) => setCategoryInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addCategory()}
                    className="bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                  <Button
                    type="button"
                    onClick={addCategory}
                    size="sm"
                    variant="outline"
                    className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 bg-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <Badge key={cat} className="bg-blue-100 text-blue-700 border-2 border-blue-200 font-bold px-3 py-1.5 rounded-xl text-sm">
                      {cat}
                      <button
                        onClick={() => removeCategory(cat)}
                        className="ml-2 hover:text-blue-900 font-bold"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeInUp}>
            <Card className="bg-white border-2 border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-xl font-bold text-slate-900 font-['Radley',serif]">
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-6">
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                    className="bg-white border-2 border-slate-200 text-slate-800 placeholder:text-slate-400 rounded-xl font-semibold focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                  <Button
                    type="button"
                    onClick={addTag}
                    size="sm"
                    variant="outline"
                    className="border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 bg-white"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-2 border-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-sm bg-white">
                      #{tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 hover:text-slate-900 font-bold"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}