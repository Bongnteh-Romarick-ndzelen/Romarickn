"use client";

import { useState } from "react";
import {
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  Check,
  Share2,
  Mail,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface SharePreviewProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

export function SharePreview({
  title,
  description,
  imageUrl,
  url,
}: SharePreviewProps) {
  const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedImageUrl = encodeURIComponent(imageUrl);

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      "_blank",
      "width=600,height=400",
    );
    setIsOpen(false);
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      "_blank",
      "width=600,height=400",
    );
    setIsOpen(false);
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      "_blank",
      "width=600,height=400",
    );
    setIsOpen(false);
  };

  // Updated WhatsApp share with image preview
  const shareOnWhatsApp = () => {
    // Create a rich text message with title, description, image URL, and post URL
    const message = `*${title}*\n\n${description}\n\n📷 Image: ${imageUrl}\n\n🔗 Read more: ${url}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
    setIsOpen(false);
  };

  // Alternative: Try to share image directly (for mobile)
  const shareOnWhatsAppWithImage = async () => {
    if (navigator.share && imageUrl) {
      try {
        // Fetch the image and share it directly
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], "share-image.jpg", { type: blob.type });

        await navigator.share({
          title: title,
          text: `${title}\n\n${description}\n\n${url}`,
          files: [file],
        });
        toast({ title: "Shared on WhatsApp!" });
        setIsOpen(false);
      } catch (error) {
        console.log("Share failed, falling back to text share");
        shareOnWhatsApp();
      }
    } else {
      shareOnWhatsApp();
    }
  };

  const shareOnEmail = () => {
    window.location.href = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`;
    setIsOpen(false);
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast({ title: "Link copied!" });
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setIsOpen(false), 1500);
  };

  // Native share for mobile (includes image)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        // Try to include image if possible
        let shareData: ShareData = {
          title: title,
          text: description,
          url: url,
        };

        // Try to add image for mobile share
        if (
          imageUrl &&
          navigator.canShare &&
          navigator.canShare({ files: [] })
        ) {
          try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], "share-image.jpg", {
              type: blob.type,
            });
            shareData = {
              ...shareData,
              files: [file],
            };
          } catch (error) {
            console.log("Could not load image for sharing");
          }
        }

        await navigator.share(shareData);
        toast({ title: "Shared!" });
        setIsOpen(false);
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      copyLink();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-slate-400 hover:text-white"
        >
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-slate-900 border-slate-700 max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Share2 className="h-5 w-5 text-purple-400" />
            Share this post
          </DialogTitle>
        </DialogHeader>

        {/* Share Preview Card - Shows what will be shared */}
        <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
          {imageUrl && (
            <div className="relative h-48 w-full bg-slate-800">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-white font-semibold text-base line-clamp-2">
              {title}
            </h3>
            <p className="text-slate-400 text-sm mt-1 line-clamp-3">
              {description}
            </p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-700">
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              <p className="text-purple-400 text-xs truncate flex-1">
                {url.replace("https://", "").replace("http://", "")}
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 text-center">
          Share this post on your favorite platform
        </p>

        {/* Share Buttons Grid */}
        <div className="grid grid-cols-4 gap-2 mt-2">
          <button
            onClick={shareOnFacebook}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-[#1877f2]/10 hover:bg-[#1877f2]/20 transition-colors group"
          >
            <Facebook className="h-5 w-5 text-[#1877f2]" />
            <span className="text-[10px] text-slate-400 group-hover:text-white">
              Facebook
            </span>
          </button>

          <button
            onClick={shareOnTwitter}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-[#1da1f2]/10 hover:bg-[#1da1f2]/20 transition-colors group"
          >
            <Twitter className="h-5 w-5 text-[#1da1f2]" />
            <span className="text-[10px] text-slate-400 group-hover:text-white">
              Twitter
            </span>
          </button>

          <button
            onClick={shareOnLinkedIn}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-[#0a66c2]/10 hover:bg-[#0a66c2]/20 transition-colors group"
          >
            <Linkedin className="h-5 w-5 text-[#0a66c2]" />
            <span className="text-[10px] text-slate-400 group-hover:text-white">
              LinkedIn
            </span>
          </button>

          {/* Updated WhatsApp button with image */}
          <button
            onClick={shareOnWhatsAppWithImage}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors group"
          >
            <svg
              className="h-5 w-5 text-[#25D366]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.078 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            <span className="text-[10px] text-slate-400 group-hover:text-white">
              WhatsApp
            </span>
          </button>

          <button
            onClick={shareOnEmail}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors group"
          >
            <Mail className="h-5 w-5 text-slate-400 group-hover:text-white" />
            <span className="text-[10px] text-slate-400 group-hover:text-white">
              Email
            </span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors group"
          >
            <Share2 className="h-5 w-5 text-slate-400 group-hover:text-white" />
            <span className="text-[10px] text-slate-400 group-hover:text-white">
              More
            </span>
          </button>

          <button
            onClick={copyLink}
            className="flex flex-col items-center gap-1 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors group col-span-2"
          >
            {copied ? (
              <Check className="h-5 w-5 text-green-400" />
            ) : (
              <Link2 className="h-5 w-5 text-slate-400 group-hover:text-white" />
            )}
            <span className="text-[10px] text-slate-400 group-hover:text-white">
              {copied ? "Copied!" : "Copy Link"}
            </span>
          </button>
        </div>

        <p className="text-[10px] text-slate-600 text-center mt-2">
          WhatsApp will show the image preview when you share
        </p>
      </DialogContent>
    </Dialog>
  );
}
