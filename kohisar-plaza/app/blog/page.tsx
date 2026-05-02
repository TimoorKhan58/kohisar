import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { BlogCard } from "@/components/ui/BlogCard";
import { JsonLd } from "@/components/schema/JsonLd";
import { blogPosts } from "@/data/blog-posts";
import { getBreadcrumbJsonLd } from "@/lib/schema-builders";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Rental Blog — Multi Gardens B17, MPCHS & FMC Islamabad | Kohisar Plaza",
  description:
    "Guides on average rent Multi Gardens B17, MPCHS leasing paperwork, FMC comparisons and family living.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const crumbs = getBreadcrumbJsonLd([{ name: "Blog", path: "/blog" }]);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <JsonLd data={crumbs} />
      <Breadcrumb items={[{ name: "Blog", path: "/blog" }]} />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        Kohisar Plaza blog — Multi Gardens B17 & MPCHS Islamabad
      </h1>
      <p className="mt-4 max-w-3xl text-muted">
        Deep dives for tenants Googling flat for rent Multi Gardens B17
        Islamabad, FMC comparisons and MPCHS society nuances.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {blogPosts.map((p) => (
          <BlogCard
            key={p.slug}
            title={p.title}
            description={p.description}
            href={`/blog/${p.slug}`}
            meta={`${p.category} · ${p.readingMinutes} min read`}
          />
        ))}
      </div>
    </div>
  );
}
