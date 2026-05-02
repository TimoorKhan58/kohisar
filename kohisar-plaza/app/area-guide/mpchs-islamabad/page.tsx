import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { RentTable } from "@/components/ui/RentTable";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { JsonLd } from "@/components/schema/JsonLd";
import { homeFaqs } from "@/data/faqs";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
  getFAQPageJsonLd,
} from "@/lib/schema-builders";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "MPCHS Islamabad Guide 2025 | Multi Gardens B17 Rentals",
  description:
    "How MPCHS (Multi Professional Cooperative Housing Society) governs Multi Gardens, B17 and FMC rentals — practical notes for tenants.",
  path: "/area-guide/mpchs-islamabad",
});

export default function MpchsGuidePage() {
  const article = getArticleJsonLd({
    title: "Renting inside MPCHS Multi Gardens — Society Primer",
    description:
      "MPCHS governance, nomenclature and what B17 / FMC mean on the ground.",
    path: "/area-guide/mpchs-islamabad",
    datePublished: "2025-01-08",
  });
  const crumbs = getBreadcrumbJsonLd([
    { name: "MPCHS Islamabad", path: "/area-guide/mpchs-islamabad" },
  ]);
  const faq = getFAQPageJsonLd(homeFaqs.slice(4, 8));

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <JsonLd data={[article, crumbs, faq]} />
      <Breadcrumb
        items={[
          { name: "MPCHS Islamabad guide", path: "/area-guide/mpchs-islamabad" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        MPCHS Multi Gardens: renting in B17 Islamabad explained
      </h1>
      <p className="mt-4 text-lg text-muted">
        Officially MPCHS — Multi Professional Cooperative Housing Society —
        colloquially Multi Gardens. Tenants mash both phrases with B17 and FMC;
        this page ties the language together.
      </p>

      <h2 className="mt-12 text-2xl font-bold text-primary">
        What MPCHS means on ground
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        MPCHS develops and sells allocations, then a secondary rental market
        forms. As a renter you mainly interact with individual owners, building
        management and society offices — keep stamped paperwork for utilities
        and NOCs where applicable.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Multi Gardens B17 vs sector branding
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        CDA labels the broader zone B17 while marketing often says Multi
        Gardens. When you see flat for rent FMC Multi Gardens Islamabad, it is
        still fundamentally an MPCHS-managed context — just a named sub-block.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Rent expectations across MPCHS
      </h2>
      <div className="mt-6">
        <RentTable />
      </div>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Before you sign a lease
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-body">
        <li>Clarify advance, rent indexing and maintenance dues.</li>
        <li>
          Ask about gas cylinder vs pipeline, UPS and water storage — Multi
          Gardens B17 buildings vary by vintage.
        </li>
        <li>Schedule evening visits to gauge noise and traffic.</li>
      </ul>

      <p className="mt-10">
        <Link
          href="/blog/how-to-rent-in-mpchs-islamabad"
          className="font-semibold text-primary underline hover:text-accent"
        >
          Read our how-to rent guide for MPCHS Islamabad
        </Link>
      </p>

      <h2 className="mt-12 text-2xl font-bold text-primary">FAQ</h2>
      <div className="mt-6">
        <FAQAccordion items={homeFaqs.slice(4, 8)} />
      </div>
    </article>
  );
}
