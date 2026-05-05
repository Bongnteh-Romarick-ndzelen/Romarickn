export interface Comment {
  id: string;
  content: string;
  authorName: string;
  authorEmail: string;
  authorWebsite?: string;
  authorIp: string;
  userId?: string;
  user?: {
    id: string;
    name: string;
    avatar: string;
  };
  postId: string;
  parentCommentId?: string;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  likes: number;
  userHasLiked?: boolean;
}

export interface CreateCommentData {
  content: string;
  authorName?: string;
  authorEmail?: string;
  authorWebsite?: string;
  postId: string;
  parentCommentId?: string;
  userId?: string;
}
