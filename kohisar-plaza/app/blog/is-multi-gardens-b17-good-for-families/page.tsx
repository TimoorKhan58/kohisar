import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { JsonLd } from "@/components/schema/JsonLd";
import { familiesFaqs, homeFaqs } from "@/data/faqs";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getFAQPageJsonLd,
} from "@/lib/schema-builders";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Is Multi Gardens B17 Islamabad Good for Families? Honest 2025 Review | Kohisar Plaza",
  description:
    "Honest MPCHS Multi Gardens B17 family guide — safety cues, schools, parks, CDA reassurance and everyday life.",
  path: "/blog/is-multi-gardens-b17-good-for-families",
});

export default function FamiliesBlogPage() {
  const path = "/blog/is-multi-gardens-b17-good-for-families";
  const article = getArticleJsonLd({
    title: "Is Multi Gardens B17 good for families?",
    description:
      "Family-focused review of MPCHS Multi Gardens B17 and FMC living.",
    path,
    datePublished: "2025-03-01",
  });
  const crumbs = getBreadcrumbJsonLd([
    { name: "Blog", path: "/blog" },
    { name: "Families in B17", path },
  ]);
  const faqItems = [
    homeFaqs[5],
    homeFaqs[8],
    familiesFaqs[0],
    familiesFaqs[1],
  ];
  const faq = getFAQPageJsonLd(faqItems);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <JsonLd data={[article, crumbs, faq]} />
      <Breadcrumb
        items={[
          { name: "Blog", path: "/blog" },
          { name: "Families in B17", path },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        Is MPCHS Multi Gardens B17 safe and good for families?
      </h1>
      <p className="mt-4 text-muted">
        This article targets parents asking is Multi Gardens B17 good for
        families — we blend MPCHS society realities with practical visit tips,
        not hype.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Safety & community cadence
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        Evening walks, mosque congregation sizes and neighbourly eyes on street
        life often matter more than brochures. FMC pockets and mature B17 courts
        can both feel calm — pick your lane after chatting with existing
        tenants, not only agents.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Schools & extracurriculars
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        You may commute outward for legacy schools — budget time, not just
        rent. Local campuses keep emerging as MPCHS enrollment climbs.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Parks, mosques, everyday joy
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        Kids need spillover space: check playgrounds within 5–10 minutes of your
        shortlisted flat for rent Multi Gardens B17 listings. Mosques anchor
        daily rhythm — proximity eases salah logistics for working parents.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        CDA / planning reassurance
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        Is MPCHS B17 CDA approved safe is a layered question — verify documents
        with counsel, but recognise that tens of thousands already call Multi
        Gardens home, with FMC as a growth front.
      </p>

      <h2 className="mt-12 text-2xl font-bold text-primary">FAQ</h2>
      <div className="mt-6">
        <FAQAccordion items={faqItems} />
      </div>
    </article>
  );
}
