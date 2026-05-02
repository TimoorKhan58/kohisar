import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/schema/JsonLd";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
} from "@/lib/schema-builders";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "How to Rent in MPCHS Islamabad — Multi Gardens Renter's Guide | Kohisar Plaza",
  description:
    "Step-by-step: documents, viewings, deposits and agreements for MPCHS Multi Gardens B17 & FMC tenants.",
  path: "/blog/how-to-rent-in-mpchs-islamabad",
});

export default function HowToRentBlogPage() {
  const path = "/blog/how-to-rent-in-mpchs-islamabad";
  const article = getArticleJsonLd({
    title: "How to rent in MPCHS Islamabad",
    description: "Practical leasing checklist for Multi Gardens renters.",
    path,
    datePublished: "2025-02-10",
  });
  const crumbs = getBreadcrumbJsonLd([
    { name: "Blog", path: "/blog" },
    { name: "How to rent in MPCHS", path },
  ]);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <JsonLd data={[article, crumbs]} />
      <Breadcrumb
        items={[
          { name: "Blog", path: "/blog" },
          { name: "How to rent in MPCHS", path },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        How to rent in MPCHS Islamabad — Multi Gardens B17 playbook
      </h1>
      <ol className="mt-8 list-decimal space-y-4 pl-5 text-body">
        <li>
          <strong className="text-primary">Shortlist realistically.</strong>{" "}
          Anchor on 30% salary for rent, then browse{" "}
          <Link href="/properties" className="underline hover:text-accent">
            Kohisar Plaza listings
          </Link>{" "}
          across B17 and FMC.
        </li>
        <li>
          <strong className="text-primary">WhatsApp first, call second.</strong>{" "}
          Ask for exact building name, floor, meter photos and society dues.
        </li>
        <li>
          <strong className="text-primary">Visit twice.</strong> Daylight for
          sun orientation; evening for noise and lighting — critical for Multi
          Gardens B17 commute fatigue decisions.
        </li>
        <li>
          <strong className="text-primary">Paperwork pack.</strong> CNIC copies,
          employment evidences, emergency contacts. Owners may request police
          verification depending on house rules.
        </li>
        <li>
          <strong className="text-primary">Agreement clarity.</strong> Advance
          months, notice period, annual escalation and who pays maintenance —
          write it in the deed, not voice notes alone.
        </li>
        <li>
          <strong className="text-primary">Move-in punch list.</strong> Note
          paint chips, breakers, leakage — keeps deposit disputes fair.
        </li>
      </ol>
      <p className="mt-8 text-muted">
        Need a map-first overview? Return to the{" "}
        <Link href="/area-guide/multi-gardens-b17" className="underline">
          Multi Gardens B17 area guide
        </Link>
        .
      </p>
    </article>
  );
}
