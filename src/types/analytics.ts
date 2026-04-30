export interface DashboardAnalytics {
  overview: {
    totalUsers: number;
    totalPosts: number;
    totalComments: number;
    totalSubscribers: number;
    totalViews: number;
    totalLikes: number;
  };
  today: {
    newUsers: number;
    newPosts: number;
    newComments: number;
    newSubscribers: number;
  };
  posts: {
    published: number;
    draft: number;
    pendingComments: number;
  };
  subscribers: {
    total: number;
    active: number;
  };
  weeklyData: Array<{
    date: string;
    newUsers: number;
    newPosts: number;
    newComments: number;
    views: number;
  }>;
  topPosts: Array<{
    title: string;
    views: number;
    likesCount: number;
    publishedAt: string;
  }>;
  popularCategories: Array<{
    _id: string;
    count: number;
  }>;
  recentActivity: {
    users: Array<{
      id: string;
      name: string;
      email: string;
      createdAt: string;
      role: string;
    }>;
    posts: Array<{
      id: string;
      title: string;
      status: string;
      views: number;
      createdAt: string;
    }>;
    comments: Array<{
      id: string;
      content: string;
      author: {
        name: string;
      };
      post: {
        title: string;
      };
    }>;
  };
}

export interface TrafficStats {
  period: string;
  pageViews: Array<{
    _id: {
      year: number;
      month: number;
      day: number;
    };
    views: number;
  }>;
  activeUsers: Array<{
    date: Date;
    activeCount: number;
  }>;
  topReferrers: Array<{
    source: string;
    count: number;
  }>;
  summary: {
    totalPageViews: number;
    avgDailyViews: number;
  };
}
