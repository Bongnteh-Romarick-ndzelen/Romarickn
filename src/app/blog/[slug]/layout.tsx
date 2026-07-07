import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBaseUrl } from "@/lib/utils";

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await postService.getPostBySlug(params.slug);

    // If post doesn't exist, return default metadata
    if (!post) {
      return {
        title: "Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    // Get absolute URL for the image
    const baseUrl = getBaseUrl();
    const imageUrl = post.coverImage?.startsWith("http")
      ? post.coverImage
      : `${baseUrl}${post.coverImage || "/og-image.jpg"}`;

    return {
      title: `${post.title} | Romarick's Blog`,
      description:
        post.excerpt ||
        `Read ${post.title} on Romarick's blog - insights about web development, programming, and technology.`,
      keywords: post.tags?.map((tag) => tag.name).join(", "),
      authors: [{ name: post.author?.name || "Romarick", url: baseUrl }],
      openGraph: {
        title: post.title,
        description: post.excerpt || `Read ${post.title} on Romarick's blog`,
        url: `${baseUrl}/blog/${post.slug}`,
        siteName: "Romarick Portfolio",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        type: "article",
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt || post.publishedAt,
        authors: [post.author?.name || "Romarick"],
        tags: post.tags?.map((tag) => tag.name),
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt || `Read ${post.title} on Romarick's blog`,
        images: [imageUrl],
        creator: "@BongntehNdzelen",
      },
      alternates: {
        canonical: `${baseUrl}/blog/${post.slug}`,
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post | Romarick",
      description:
        "Read this blog post about web development, programming, and technology.",
      robots: {
        index: true,
        follow: true,
      },
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
