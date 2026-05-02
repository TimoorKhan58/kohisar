import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { JsonLd } from "@/components/schema/JsonLd";
import { b17VsFmcFaqs } from "@/data/faqs";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getFAQPageJsonLd,
} from "@/lib/schema-builders";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Multi Gardens B17 vs FMC Islamabad: Which is Better for Renting in 2025? | Kohisar Plaza",
  description:
    "Rent cost, transport, schools and safety: choose between MPCHS Multi Gardens B17 and FMC Faisal Margalla City.",
  path: "/blog/multi-gardens-b17-vs-fmc-islamabad",
});

export default function B17VsFmcBlogPage() {
  const path = "/blog/multi-gardens-b17-vs-fmc-islamabad";
  const article = getArticleJsonLd({
    title: "Multi Gardens B17 vs FMC Islamabad",
    description: "Rental comparison for MPCHS tenants.",
    path,
    datePublished: "2025-01-15",
  });
  const crumbs = getBreadcrumbJsonLd([
    { name: "Blog", path: "/blog" },
    { name: "B17 vs FMC", path },
  ]);
  const faq = getFAQPageJsonLd(b17VsFmcFaqs);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <JsonLd data={[article, crumbs, faq]} />
      <Breadcrumb
        items={[
          { name: "Blog", path: "/blog" },
          { name: "B17 vs FMC", path },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        B17 vs FMC: full rental comparison in MPCHS Multi Gardens
      </h1>
      <p className="mt-4 text-muted">
        Both names sit inside MPCHS Multi Gardens; tenants should compare block
        reality, not just keywords like flat for rent FMC Multi Gardens
        Islamabad.
      </p>

      <div className="prose prose-sm mt-10 max-w-none text-body">
        <h2 className="text-xl font-bold text-primary">Comparison table</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-primary/10">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-3 py-2">Dimension</th>
                <th className="px-3 py-2">Multi Gardens B17 (core)</th>
                <th className="px-3 py-2">FMC (Faisal Margalla City)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              <tr>
                <td className="px-3 py-2 font-medium">Rent cost</td>
                <td className="px-3 py-2">
                  Often wider value band; cheap flat rent MPCHS Islamabad
                  searches land here first.
                </td>
                <td className="px-3 py-2">
                  Margalla-facing premiums possible — check our{" "}
                  <Link href="/blog/average-rent-multi-gardens-b17-islamabad">
                    rent tracker
                  </Link>
                  .
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Location within MPCHS</td>
                <td className="px-3 py-2">
                  Established loops, easier to map on older listings.
                </td>
                <td className="px-3 py-2">
                  Newer plates, developer branding emphasised in ads.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Transport</td>
                <td className="px-3 py-2">
                  GT Road / Sangjani / M-1 — same regional arteries.
                </td>
                <td className="px-3 py-2">
                  Minor internal differences; test your exact tower.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Schools</td>
                <td className="px-3 py-2">
                  Routes toward established sectors remain similar.
                </td>
                <td className="px-3 py-2">
                  Growing resident base ⇒ new academies — verify distance.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Safety perception</td>
                <td className="px-3 py-2">
                  Treat like any expanding Islamabad periphery — visit nights.
                </td>
                <td className="px-3 py-2">
                  New street lighting may feel sharper on fresh phases.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Shops / markets</td>
                <td className="px-3 py-2">
                  More mature corner-store grid in pockets.
                </td>
                <td className="px-3 py-2">
                  Rising commercial strips — FMC Multi Gardens rent comparison
                  favours ground retail experiments.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-10 text-xl font-bold text-primary">Verdict</h2>
        <p className="mt-3 leading-relaxed">
          Choose FMC when Margalla adjacency and newer fit-out matter most;
          choose wider B17 when budget leadership or specific blocks align with
          commute. Kohisar Plaza lists both — WhatsApp with your non-negotiables.
        </p>
      </div>

      <h2 className="mt-12 text-2xl font-bold text-primary">FAQ</h2>
      <div className="mt-6">
        <FAQAccordion items={b17VsFmcFaqs} />
      </div>
    </article>
  );
}
