import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://romarick.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
        "/profile",
        "/settings",
        "/_next/",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
