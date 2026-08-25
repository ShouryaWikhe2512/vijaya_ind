import type { MetadataRoute } from "next";

import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/models/Product";

const siteUrl = "https://www.vijayaindustries.in";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/contact-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  await connectToDatabase();
  const products = await ProductModel.find({ isActive: true })
    .select({ _id: 1, updatedAt: 1 })
    .lean();

  return [
    ...staticPages,
    ...products.map((product) => ({
      url: `${siteUrl}/products/${product._id}`,
      lastModified: product.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
