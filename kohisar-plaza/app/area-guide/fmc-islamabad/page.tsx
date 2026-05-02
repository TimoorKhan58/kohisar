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
  title: "FMC Islamabad Area Guide 2025 | Faisal Margalla City in Multi Gardens",
  description:
    "FMC (Faisal Margalla City) rentals inside MPCHS Multi Gardens B17 — shops, flats and commuter notes.",
  path: "/area-guide/fmc-islamabad",
});

export default function FmcGuidePage() {
  const article = getArticleJsonLd({
    title: "FMC Faisal Margalla City — Multi Gardens renter notes",
    description:
      "Sub-area rental perspective for FMC within MPCHS Multi Gardens.",
    path: "/area-guide/fmc-islamabad",
    datePublished: "2025-01-10",
  });
  const crumbs = getBreadcrumbJsonLd([
    { name: "FMC Islamabad", path: "/area-guide/fmc-islamabad" },
  ]);
  const faq = getFAQPageJsonLd(homeFaqs.slice(2, 6));

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <JsonLd data={[article, crumbs, faq]} />
      <Breadcrumb
        items={[
          { name: "FMC Islamabad guide", path: "/area-guide/fmc-islamabad" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        Renting in FMC (Faisal Margalla City) — Multi Gardens Islamabad
      </h1>
      <p className="mt-4 text-lg text-muted">
        FMC (Faisal Margalla City) is a sub-development within MPCHS Multi
        Gardens, adjacent to wider B17 Islamabad. If you want Margalla-adjacent
        positioning with Multi Gardens pricing mechanics, FMC is the keyword
        owners highlight.
      </p>

      <h2 className="mt-12 text-2xl font-bold text-primary">
        What renters feel on site
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        Streets are newer in many FMC sectors, elevations sometimes catch better
        breeze, and commercial strips are expanding as population grows. Average
        rent Multi Gardens B17 pockets can undersell comparable FMC units —
        compare both columns in the tracker below.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Location & access
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        Same GT Road / M-1 logic as broader B17 MPCHS: plan for peak-hour
        variability into Islamabad city centre. Sangjani remains a reference
        point for rideshare pin drops.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">Rent bands</h2>
      <div className="mt-6">
        <RentTable />
      </div>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Shops for rent in FMC Multi Gardens Islamabad
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        Corner retailers, clinics and cafes cluster along newer boulevards.
        Verify footfall times: weekends differ from weekdays.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Multi Gardens B17 vs FMC snapshot
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        For a full matrix see{" "}
        <Link
          href="/blog/multi-gardens-b17-vs-fmc-islamabad"
          className="font-semibold text-primary underline hover:text-accent"
        >
          Multi Gardens B17 vs FMC Islamabad
        </Link>
        .
      </p>

      <p className="mt-10">
        <Link
          href="/properties?location=FMC"
          className="inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
        >
          Browse FMC listings
        </Link>
      </p>

      <h2 className="mt-12 text-2xl font-bold text-primary">FAQ</h2>
      <div className="mt-6">
        <FAQAccordion items={homeFaqs.slice(2, 6)} />
      </div>
    </article>
  );
}
