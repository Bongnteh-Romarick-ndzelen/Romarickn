'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";

interface User {
  name: string | null;
  avatar: string | null;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  authorName: string; // Guest name
  user: User | null; // Logged-in user
  replies: Comment[];
}

interface CommentListProps {
  comments: Comment[];
}

function CommentItem({ comment }: { comment: Comment }) {
  const authorName = comment.user?.name || comment.authorName;
  const authorAvatar = comment.user?.avatar;

  return (
    <div className="flex items-start gap-4">
      <Avatar>
        <AvatarImage src={authorAvatar || `https://api.dicebear.com/7.x/initials/svg?seed=${authorName}`} alt={authorName} />
        <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <p className="font-semibold text-white">{authorName}</p>
          <span className="text-xs text-slate-400">{formatDate(comment.createdAt)}</span>
        </div>
        <p className="text-slate-300">{comment.content}</p>
        
        {/* Render replies if they exist */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4 pl-6 border-l border-slate-700">
            {comment.replies.map(reply => (
              <CommentItem key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CommentList({ comments }: CommentListProps) {
  if (!comments || comments.length === 0) {
    return <p className="text-slate-400 text-center py-4">Be the first to comment!</p>;
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
