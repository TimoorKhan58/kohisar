import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RentTable } from "@/components/ui/RentTable";
import { JsonLd } from "@/components/schema/JsonLd";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getDatasetJsonLd,
} from "@/lib/schema-builders";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Average Rent in Multi Gardens B17 Islamabad 2025 — Monthly Price Tracker | Kohisar Plaza",
  description:
    "Monthly Multi Gardens B17 rent index for flats, shops and offices — MPCHS vs FMC column comparison.",
  path: "/blog/average-rent-multi-gardens-b17-islamabad",
});

export default function AverageRentBlogPage() {
  const path = "/blog/average-rent-multi-gardens-b17-islamabad";
  const article = getArticleJsonLd({
    title: "Average Rent in MPCHS Multi Gardens B17 (Monthly)",
    description: "Monthly rent tracker dataset for Multi Gardens B17.",
    path,
    datePublished: "2025-02-01",
  });
  const dataset = getDatasetJsonLd({
    name: "Average rent Multi Gardens B17 Islamabad 2025",
    description:
      "Indicative ranges for studios through offices across B17 and FMC columns.",
    path,
  });
  const crumbs = getBreadcrumbJsonLd([
    { name: "Blog", path: "/blog" },
    { name: "Average rent tracker", path },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <JsonLd data={[article, dataset, crumbs]} />
      <Breadcrumb
        items={[
          { name: "Blog", path: "/blog" },
          { name: "Average rent tracker", path },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        Average rent in MPCHS Multi Gardens B17 (updated monthly)
      </h1>
      <p className="mt-4 text-muted">
        We refresh this index alongside tenant enquiries at Kohisar Plaza —
        average rent MPCHS Islamabad 2025 figures remain directional, not legal
        quotes.
      </p>
      <div className="mt-8">
        <RentTable />
      </div>
      <h2 className="mt-10 text-2xl font-bold text-primary">
        Historical trend (commentary)
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        Post-2023 infrastructure familiarity boosted Multi Gardens rental
        velocity; FMC’s share of premium listings rose as roads matured.
        MPCHS flat rent below 30000 is increasingly competitive for renovated
        1-bed units — inspect quality in person.
      </p>
    </article>
  );
}
