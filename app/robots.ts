import type { MetadataRoute } from "next";

const siteUrl = "https://www.vijayaindustries.in";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  return {
    rules: {
      userAgent: "*",
      allow: isProduction ? "/" : [],
      disallow: isProduction
        ? [
            "/admin/",
            "/dashboard/",
            "/api/",
            "/cart",
            "/checkout",
            "/onboarding",
            "/sign-in/",
            "/sign-up/",
          ]
        : ["/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
