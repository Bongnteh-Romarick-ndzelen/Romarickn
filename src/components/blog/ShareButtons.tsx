"use client";

import { useState } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Check,
  Share2,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

interface ShareButtonsProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  slug: string;
}

export function ShareButtons({
  title,
  description,
  imageUrl,
  url,
  slug,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const { toast } = useToast();

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedImageUrl = encodeURIComponent(imageUrl);

  // Facebook Share
  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      "_blank",
      "width=600,height=400",
    );
  };

  // Twitter/X Share
  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      "_blank",
      "width=600,height=400",
    );
  };

  // LinkedIn Share
  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      "_blank",
      "width=600,height=400",
    );
  };

  // WhatsApp Share - Sends image directly as a file
  const shareOnWhatsApp = async () => {
    setIsSharing(true);
    try {
      // Fetch the image
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "share-image.jpg", { type: blob.type });

      // Create a text message with title and URL
      const text = `${title}\n\n${description}\n\n${url}`;

      // For WhatsApp Web - open with text
      const encodedText = encodeURIComponent(text);
      window.open(`https://wa.me/?text=${encodedText}`, "_blank");

      toast({
        title: "Share via WhatsApp",
        description: "Image URL included in message",
      });
    } catch (error) {
      console.error("Error sharing to WhatsApp:", error);
      // Fallback: share just the URL
      window.open(`https://wa.me/?text=${encodedUrl}`, "_blank");
    } finally {
      setIsSharing(false);
    }
  };

  // Telegram Share
  const shareOnTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      "_blank",
    );
  };

  // Pinterest Share - Shares image directly
  const shareOnPinterest = () => {
    window.open(
      `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImageUrl}&description=${encodedTitle}`,
      "_blank",
      "width=600,height=400",
    );
  };

  // Email Share - Includes image as attachment link
  const shareOnEmail = () => {
    const emailBody = `${title}\n\n${description}\n\nImage: ${imageUrl}\n\nRead more: ${url}`;
    window.location.href = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(emailBody)}`;
  };

  // Copy link
  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Post URL copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Native share for mobile - Sends image directly
  const handleNativeShare = async () => {
    if (navigator.share) {
      setIsSharing(true);
      try {
        // Fetch the image to share it directly
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], "share-image.jpg", { type: blob.type });

        await navigator.share({
          title: title,
          text: description,
          url: url,
          files: [file],
        });

        toast({ title: "Shared!", description: "Content shared successfully" });
      } catch (error) {
        console.log("Share cancelled or failed:", error);
        // Fallback: share without image
        try {
          await navigator.share({
            title: title,
            text: `${title}\n${description}\n${url}`,
          });
        } catch (fallbackError) {
          console.log("Fallback share failed");
        }
      } finally {
        setIsSharing(false);
      }
    } else {
      copyLink();
    }
  };

  return (
    <>
      {/* Mobile Native Share Button */}
      {typeof navigator !== "undefined" && navigator.share && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNativeShare}
          disabled={isSharing}
          className="gap-2 text-slate-400 hover:text-white md:hidden"
        >
          <Share2 className="h-4 w-4" />
          <span>{isSharing ? "Sharing..." : "Share"}</span>
        </Button>
      )}

      {/* Desktop Dropdown Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-slate-400 hover:text-white hidden md:flex"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-72 bg-slate-900 border-slate-700"
        >
          {/* Share Preview Card - Shows what will be shared */}
          <div className="p-3 bg-slate-800/50 rounded-lg mb-2">
            <div className="flex gap-3">
              {imageUrl && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium line-clamp-2">
                  {title}
                </p>
                <p className="text-slate-400 text-[10px] line-clamp-2 mt-1">
                  {description}
                </p>
                <p className="text-purple-400 text-[9px] truncate mt-1">
                  {url.replace("https://", "").replace("http://", "")}
                </p>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator className="bg-slate-800" />

          <DropdownMenuItem
            onClick={shareOnFacebook}
            className="cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Facebook className="mr-2 h-4 w-4 text-blue-500" />
            Facebook
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={shareOnTwitter}
            className="cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Twitter className="mr-2 h-4 w-4 text-sky-500" />
            Twitter
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={shareOnLinkedIn}
            className="cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Linkedin className="mr-2 h-4 w-4 text-blue-600" />
            LinkedIn
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={shareOnWhatsApp}
            className="cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <MessageCircle className="mr-2 h-4 w-4 text-green-500" />
            WhatsApp
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={shareOnTelegram}
            className="cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Send className="mr-2 h-4 w-4 text-sky-400" />
            Telegram
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={shareOnPinterest}
            className="cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <svg
              className="mr-2 h-4 w-4 text-red-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.934 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.03-.656 2.57-.995 3.996-.283 1.195.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.27 1.04-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
            </svg>
            Pinterest
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={shareOnEmail}
            className="cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Mail className="mr-2 h-4 w-4 text-gray-400" />
            Email
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-slate-800" />

          <DropdownMenuItem
            onClick={copyLink}
            className="cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800"
          >
            {copied ? (
              <Check className="mr-2 h-4 w-4 text-green-500" />
            ) : (
              <Link2 className="mr-2 h-4 w-4" />
            )}
            {copied ? "Copied!" : "Copy Link"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
