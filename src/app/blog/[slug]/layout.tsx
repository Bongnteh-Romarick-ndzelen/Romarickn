import { Metadata } from "next";
import { postService } from "@/lib/services/post.service";

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await postService.getPostBySlug(params.slug);

    // Get absolute URL for the image
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yourdomain.com";
    const imageUrl = post.coverImage.startsWith("http")
      ? post.coverImage
      : `${baseUrl}${post.coverImage}`;

    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `${baseUrl}/blog/${post.slug}`,
        siteName: "Romarick Portfolio",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
            type: "image/jpeg",
          },
        ],
        type: "article",
        publishedTime: post.publishedAt,
        authors: [post.author?.name || "Romarick"],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
      description: "Read this blog post",
    };
  }
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
