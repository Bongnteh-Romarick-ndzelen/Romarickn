"use client";

import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ChevronRight, Calendar, Heart, X, Reply } from "lucide-react";
import { formatDate } from "@/lib/utils";
import CommentForm from "./CommentForm";

interface User {
  name: string | null;
  avatar: string | null;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  authorName: string;
  user: User | null;
  replies: Comment[];
  likes?: number;
  postId: string;
  userId?: string;
  parentCommentId?: string;
}

interface CommentListProps {
  comments: Comment[];
  currentUserId?: string;
}

function CommentItem({
  comment,
  isReply = false,
  onReplySubmitted,
  currentUserId,
}: {
  comment: Comment;
  isReply?: boolean;
  onReplySubmitted?: (newReply: Comment) => void;
  currentUserId?: string;
}) {
  const authorName = comment.user?.name || comment.authorName || "Anonymous";
  const authorAvatar = comment.user?.avatar;
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comment.likes || 0);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
      setLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setLiked(true);
    }
  };

  const handleReplySubmitted = (newReply: Comment) => {
    setShowReplyForm(false);
    if (onReplySubmitted) {
      onReplySubmitted(newReply);
    }
  };

  return (
    <div
      className={`flex gap-3 ${!isReply ? "p-4 bg-slate-800/30 rounded-xl border border-slate-700/50" : ""}`}
    >
      <Avatar className="h-10 w-10 ring-2 ring-purple-500/20 flex-shrink-0">
        <AvatarImage
          src={
            authorAvatar ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${authorName}`
          }
          alt={authorName}
        />
        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          {authorName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="font-semibold text-white text-sm">{authorName}</span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Calendar className="h-2.5 w-2.5" />
            {formatDate(comment.createdAt)}
          </span>
          <button
            onClick={handleLike}
            className="text-xs text-slate-500 hover:text-pink-400 transition-colors flex items-center gap-1 ml-2"
          >
            <Heart
              className={`h-3 w-3 ${liked ? "fill-pink-400 text-pink-400" : ""}`}
            />
            <span>{likesCount}</span>
          </button>
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="text-xs text-slate-400 hover:text-purple-400 transition-colors flex items-center gap-1 ml-2"
          >
            <Reply className="h-3 w-3" />
            <span>Reply</span>
          </button>
        </div>

        <p className="text-slate-300 text-sm leading-relaxed break-words">
          {comment.content}
        </p>

        {/* Reply Form */}
        {showReplyForm && (
          <div className="mt-3">
          <CommentForm
            postId={comment.postId}
            parentId={comment.id}
            onCommentSubmitted={handleReplySubmitted}
            userId={currentUserId}
          />
          </div>
        )}

        {/* Render replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3 pl-4 border-l-2 border-purple-500/30">
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                isReply={true}
                onReplySubmitted={onReplySubmitted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Modal for viewing all comments - Fixed scrolling
function AllCommentsModal({
  comments,
  isOpen,
  onClose,
  onReplySubmitted,
  currentUserId,
}: {
  comments: Comment[];
  isOpen: boolean;
  onClose: () => void;
  onReplySubmitted?: (parentCommentId: string, newReply: Comment) => void;
  currentUserId?: string;
}) {
  const totalComments = comments.reduce(
    (acc, comment) => acc + 1 + (comment.replies?.length || 0),
    0,
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl w-[90vw] max-h-[85vh] p-0 flex flex-col rounded-2xl">
        <DialogHeader className="px-6 py-4 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-purple-400" />
              <DialogTitle className="text-white">All Comments</DialogTitle>
              <Badge className="bg-purple-500/20 text-purple-300">
                {totalComments} {totalComments === 1 ? "comment" : "comments"}
              </Badge>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </DialogHeader>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReplySubmitted={(newReply) =>
                onReplySubmitted && onReplySubmitted(newReply.parentCommentId || '', newReply)
              }
              currentUserId={currentUserId}
            />
          ))}
        </div>
        </div>

        {/* Footer with close button */}
        <div className="px-6 py-3 border-t border-slate-800 flex-shrink-0">
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full border-slate-700 text-slate-300 hover:text-white"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function CommentList({ comments: initialComments, currentUserId }: CommentListProps) {
  const [showAllComments, setShowAllComments] = useState(false);
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const handleReplySubmitted = (parentCommentId: string, newReply: Comment) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        // If the parent comment is at the root level
        if (comment.id === parentCommentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        // Check if parent is in replies
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: comment.replies.map((reply) =>
              reply.id === parentCommentId
                ? {
                    ...reply,
                    replies: [...(reply.replies || []), newReply],
                  }
                : reply,
            ),
          };
        }
        return comment;
      }),
    );
  };

  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-800/50 flex items-center justify-center">
          <MessageCircle className="h-8 w-8 text-slate-500" />
        </div>
        <p className="text-slate-400">Be the first to comment!</p>
        <p className="text-xs text-slate-500 mt-1">Start the conversation</p>
      </div>
    );
  }

  // Get only the 5 latest comments
  const latestComments = comments.slice(0, 5);
  const hasMoreComments = comments.length > 5;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Comments</h3>
          <Badge variant="secondary" className="bg-slate-800 text-slate-300">
            {comments.length}
          </Badge>
        </div>
      </div>

      {/* Latest Comments */}
      <div className="space-y-4">
        {latestComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
             onReplySubmitted={(newReply) =>
               handleReplySubmitted(newReply.parentCommentId || '', newReply)
             }
            currentUserId={currentUserId}
          />
        ))}
      </div>

      {/* View All Button */}
      {hasMoreComments && (
        <div className="pt-2">
          <Button
            onClick={() => setShowAllComments(true)}
            variant="ghost"
            className="w-full gap-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 border border-purple-500/30 rounded-xl"
          >
            View all {comments.length} comments
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Modal with all comments */}
      <AllCommentsModal
        comments={comments}
        isOpen={showAllComments}
        onClose={() => setShowAllComments(false)}
        onReplySubmitted={handleReplySubmitted}
        currentUserId={currentUserId}
      />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(51, 65, 85, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
}
