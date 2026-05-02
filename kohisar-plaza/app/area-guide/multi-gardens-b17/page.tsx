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
  title: "Multi Gardens B17 Islamabad Area Guide 2025 | Renting in MPCHS",
  description:
    "Liveability, commute, schools and rent bands for MPCHS Multi Gardens B17 and FMC Islamabad — renter-focused field notes.",
  path: "/area-guide/multi-gardens-b17",
});

export default function MultiGardensB17GuidePage() {
  const article = getArticleJsonLd({
    title: "Living in Multi Gardens B17 Islamabad: Complete Renter's Guide",
    description:
      "Comprehensive renter guide to Multi Gardens B17, MPCHS and FMC pockets.",
    path: "/area-guide/multi-gardens-b17",
    datePublished: "2025-01-05",
  });
  const crumbs = getBreadcrumbJsonLd([
    { name: "Multi Gardens B17 guide", path: "/area-guide/multi-gardens-b17" },
  ]);
  const faq = getFAQPageJsonLd(homeFaqs.slice(0, 4));

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <JsonLd data={[article, crumbs, faq]} />
      <Breadcrumb
        items={[
          { name: "Multi Gardens B17 guide", path: "/area-guide/multi-gardens-b17" },
        ]}
      />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        Living in Multi Gardens B17 Islamabad: Complete Renter&apos;s Guide
      </h1>
      <p className="mt-4 text-lg text-muted">
        B17, Multi Gardens, MPCHS and FMC names appear together because tenants
        actually search that way — this guide mirrors real queries like flat
        for rent Multi Gardens B17 Islamabad.
      </p>

      <h2 className="mt-12 text-2xl font-bold text-primary">
        What is Multi Gardens B17?
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        Multi Gardens is the colloquial name for the MPCHS (Multi Professional
        Cooperative Housing Society) layout occupying the CDA sector commonly
        labelled B17. FMC (Faisal Margalla City) is a premium-feel sub-area
        inside the same masterplan — not a separate city, but a wing many
        listings highlight for clarity.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Location & how to get there
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        GT Road, Sangjani interchange and M-1 Motorway feed Multi Gardens B17
        traffic. Commute to Islamabad city centre (Blue Area / Jinnah Avenue)
        often lands in the 25–45 minute band depending on time of day —
        quicker runs when Kashmir Highway is clear.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Rent prices in Multi Gardens B17
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        For average rent Multi Gardens B17 Islamabad planning, start with live
        ranges — then WhatsApp Kohisar Plaza for today&apos;s exact keys.
      </p>
      <div className="mt-6">
        <RentTable />
      </div>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Schools near MPCHS B17
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-body">
        <li>Ongoing new campuses — verify distance to your specific block.</li>
        <li>
          Commutes toward E-11 / H-11 school clusters remain common for
          families who want established names.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Hospitals & healthcare
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        Local clinics serve daily care; major hospitals often mean a run
        toward PIMS corridor or private facilities in central Islamabad /
        Rawalpindi — map your emergency plan before signing.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Daily amenities — markets, mosques, parks
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        Corner stores, masajid and small greens grow block by block —
        Multi Gardens B17 water electricity gas availability generally mirrors
        Islamabad norms but always test meters during your viewing.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Is Multi Gardens B17 safe for families?
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        Many families appreciate quieter outer sectors versus inner-city noise.
        Validate building access control, CCTV and neighbour mix — same as
        any MPCHS rental.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Pros and cons of renting in MPCHS B17
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-body">
        <li>
          Pros: relative value vs core sectors, motorway-friendly, expanding
          FMC commerce.
        </li>
        <li>
          Cons: some inner-city trips remain long; school choice may involve
          shuttles.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-bold text-primary">
        Multi Gardens B17 vs FMC — quick comparison
      </h2>
      <p className="mt-3 leading-relaxed text-body">
        Need a side-by-side? Read{" "}
        <Link
          href="/blog/multi-gardens-b17-vs-fmc-islamabad"
          className="font-semibold text-primary underline hover:text-accent"
        >
          Multi Gardens B17 vs FMC Islamabad
        </Link>{" "}
        on our blog — it expands rent cost, transport and shopping contrasts.
      </p>

      <p className="mt-10">
        <Link
          href="/properties?location=B17"
          className="inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
        >
          View available rentals at Kohisar Plaza
        </Link>
      </p>

      <h2 className="mt-12 text-2xl font-bold text-primary">FAQ</h2>
      <div className="mt-6">
        <FAQAccordion items={homeFaqs.slice(0, 4)} />
      </div>

      <p className="mt-10 text-sm text-muted">
        More questions?{" "}
        <Link href="/contact" className="underline hover:text-primary">
          Contact Kohisar Plaza
        </Link>
        .
      </p>
    </article>
  );
}
