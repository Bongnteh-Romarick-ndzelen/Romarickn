import { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

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
