import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { blogPosts } from "@/data/blog-posts";

const staticPaths = [
  "/",
  "/properties",
  "/flats/1-bedroom",
  "/flats/2-bedroom",
  "/flats/3-bedroom",
  "/shops",
  "/offices",
  "/about",
  "/contact",
  "/blog",
  "/area-guide/multi-gardens-b17",
  "/area-guide/mpchs-islamabad",
  "/area-guide/fmc-islamabad",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const lastMod = new Date();

  const routes: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: lastMod,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.datePublished),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}
