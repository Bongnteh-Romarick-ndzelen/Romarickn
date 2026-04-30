export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  published: boolean;
  featured: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  readTime: number;
  views: number;
  authorId: string;
  author?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  categories?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  tags?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  _count?: {
    likes: number;
    comments: number;
  };
}

export interface CreatePostData {
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  published?: boolean;
  featured?: boolean;
  categories?: string[];
  tags?: string[];
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id: string;
}
