import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { JsonLd } from "@/components/schema/JsonLd";
import {
  getArticleJsonLd,
  getBreadcrumbJsonLd,
} from "@/lib/schema-builders";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "About Kohisar Plaza — Multi Gardens B17 Islamabad | MPCHS Rentals",
  description:
    "Learn about Kohisar Plaza, direct-owner rentals across MPCHS Multi Gardens B17 and FMC Islamabad.",
  path: "/about",
});

export default function AboutPage() {
  const path = "/about";
  const article = getArticleJsonLd({
    title: "About Kohisar Plaza",
    description: "Building story and rental ethos for Kohisar Plaza.",
    path,
    datePublished: "2025-01-01",
  });
  const crumbs = getBreadcrumbJsonLd([{ name: "About", path }]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <JsonLd data={[article, crumbs]} />
      <Breadcrumb items={[{ name: "About", path }]} />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        About Kohisar Plaza — Multi Gardens B17 & FMC
      </h1>
      <p className="mt-4 leading-relaxed text-body">
        Kohisar Plaza is a rental-first address inside MPCHS Multi Gardens,
        straddling conversations about B17 Islamabad and the FMC (Faisal
        Margalla City) sub-scheme. We consolidate direct-owner stock so tenants
        who search flat for rent Multi Gardens B17 Islamabad land on accurate
        options without brokerage markups.
      </p>
      <p className="mt-4 leading-relaxed text-body">
        Our team lives the commute, understands Sangjani interchange quirks,
        and speaks the MPCHS acronyms fluently — Multi Professional Cooperative
        Housing Society is more than a letterhead here, it is the social fabric
        binding landlord and tenant expectations.
      </p>
      <p className="mt-4 leading-relaxed text-body">
        Whether you need a 1 bed flat Multi Gardens direct owner no commission,
        short term flat rent MPCHS Islamabad clarity or shop exposure in FMC, we
        route you swiftly through WhatsApp, phone and on-site viewings.
      </p>
    </div>
  );
}
