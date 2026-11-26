import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Building2,
  Home,
  Landmark,
  Store,
  Layers,
} from "lucide-react";
import { JsonLd } from "@/components/schema/JsonLd";
import { SearchBar } from "@/components/property/SearchBar";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { RentTable } from "@/components/ui/RentTable";
import { RentCalculator } from "@/components/ui/RentCalculator";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { AreaGuideCard } from "@/components/ui/AreaGuideCard";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { ContactForm } from "@/components/ui/ContactForm";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { properties } from "@/data/properties";
import { homeFaqs } from "@/data/faqs";
import {
  getOrganizationJsonLd,
  getRealEstateAgentJsonLd,
  getFAQPageJsonLd,
} from "@/lib/schema-builders";
import { getWhatsAppLink, getPhoneDisplay } from "@/lib/seo";

const heroImage =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80";

const typeCards = [
  {
    href: "/flats/1-bedroom",
    title: "1-bed flat",
    from: 18000,
    icon: Home,
  },
  {
    href: "/flats/2-bedroom",
    title: "2-bed flat",
    from: 28000,
    icon: BedDouble,
  },
  {
    href: "/flats/3-bedroom",
    title: "3-bed flat",
    from: 45000,
    icon: Building2,
  },
  {
    href: "/shops",
    title: "Shop for rent",
    from: 25000,
    icon: Store,
  },
  {
    href: "/offices",
    title: "Office / studio",
    from: 20000,
    icon: Landmark,
  },
  {
    href: "/properties?type=furnished",
    title: "Furnished units",
    from: 22000,
    icon: Layers,
  },
];

const whyPoints = [
  {
    title: "MPCHS Multi Gardens — CDA-conscious planning",
    body: "Kohisar Plaza sits in the MPCHS Multi Gardens scheme spanning B17 Islamabad and the FMC (Faisal Margalla City) sub-area.",
  },
  {
    title: "Direct from owner",
    body: "No agent commission on our listed inventory — transparent flat for rent Multi Gardens B17 process.",
  },
  {
    title: "Transparent pricing",
    body: "Cheap flat rent MPCHS Islamabad options still mean clear deposits and utilities in writing.",
  },
  {
    title: "Flats, shops, offices",
    body: "1-bed to 3-bed units plus retail and workspace — FMC Multi Gardens rent alongside core B17 blocks.",
  },
  {
    title: "WhatsApp 9am–9pm",
    body: "Daily support for short listing questions and viewing coordination across MPCHS B17.",
  },
  {
    title: "Flexible leases",
    body: "Monthly or quarterly structures negotiable with owner on many Kohisar Plaza units.",
  },
];

export default function HomePage() {
  const featured = properties.filter((p) => p.isFeatured).slice(0, 6);
  const org = getOrganizationJsonLd();
  const agent = getRealEstateAgentJsonLd();
  const faq = getFAQPageJsonLd(homeFaqs);
  const phone = getPhoneDisplay();

  return (
    <>
      <JsonLd data={[org, agent, faq]} />

      <section className="relative isolate overflow-hidden bg-primary">
        <Image
          src={heroImage}
          alt="Modern residential building representative of Kohisar Plaza and Multi Gardens B17 Islamabad"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/85 to-primary" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 md:px-6 md:pt-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">
            Premium rentals in Multi Gardens B17 — direct from owner
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white text-balance md:text-4xl lg:text-5xl">
            Rent Flats, Shops & Offices in Multi Gardens B17 (MPCHS) Islamabad
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/85">
            Premium flats, shops & offices in Kohisar Plaza, MPCHS Multi Gardens
            and FMC. No agent. No commission. Direct owner listings with
            WhatsApp viewings.
          </p>
          <div className="mt-8">
            <SearchBar />
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-primary hover:bg-surface"
            >
              Browse all properties
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              WhatsApp us now
            </a>
          </div>
          <p className="mt-10 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-wide text-white/70">
            <span>50+ units pipeline</span>
            <span className="text-accent">·</span>
            <span>Multi Gardens B17</span>
            <span className="text-accent">·</span>
            <span>Direct owner</span>
            <span className="text-accent">·</span>
            <span>No commission</span>
            <span className="text-accent">·</span>
            <span>CDA-aware MPCHS blocks</span>
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          Explore property types in Multi Gardens B17 & FMC
        </h2>
        <p className="mt-2 max-w-3xl text-muted">
          MPCHS Multi Gardens spans B17 Islamabad and Faisal Margalla City
          (FMC). Pick a category — every page weaves in B17, Multi Gardens,
          MPCHS and FMC context for SEO and clarity.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {typeCards.map((c) => {
            const Icon = c.icon;
            return (
              <Link
                key={c.href}
                href={c.href}
                className="group flex items-center justify-between rounded-2xl border border-primary/10 bg-white p-5 shadow-sm transition hover:border-accent/40 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-bold text-primary">{c.title}</p>
                    <p className="text-sm text-muted">
                      From Rs. {c.from.toLocaleString("en-PK")}/mo
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-accent transition group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-primary/10 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-bold text-primary md:text-3xl">
                Featured rentals — Kohisar Plaza & MPCHS partners
              </h2>
              <p className="mt-2 text-muted">
                Hand-picked units across B17 and FMC with live WhatsApp
                inquiries.
              </p>
            </div>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 font-semibold text-primary hover:text-accent"
            >
              View all properties
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10">
            <PropertyGrid list={featured} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          Current rent prices in Multi Gardens B17 & FMC Islamabad (2025)
        </h2>
        <p className="mt-2 text-muted">
          MPCHS society · Kohisar Plaza · updated monthly — average rent Multi
          Gardens B17 Islamabad benchmarks for tenants comparing FMC vs core
          B17 pockets.
        </p>
        <div className="mt-8">
          <RentTable id="rent-index" />
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            Why Kohisar Plaza in MPCHS Multi Gardens
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {whyPoints.map((w) => (
              <div
                key={w.title}
                className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"
              >
                <h3 className="font-bold text-primary">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          About Multi Gardens B17 Islamabad (MPCHS)
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-body">
          Multi Gardens B17 Islamabad, developed by MPCHS (Multi Professional
          Cooperative Housing Society), is one of Islamabad&apos;s
          fastest-growing residential corridors. Nestled near the Margalla
          foothills between GT Road and the M-1 Motorway, it balances motorway
          access with more affordable rentals than many central sectors — ideal
          for FMC and wider B17 tenants relocating from Rawalpindi or downtown
          Islamabad.
        </p>
        <Link
          href="/area-guide/multi-gardens-b17"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:text-accent"
        >
          Read full area guide
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="border-t border-primary/10 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-2xl font-bold text-primary md:text-3xl">
            Area guides — B17, MPCHS & FMC
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <AreaGuideCard
              title="Multi Gardens B17 Islamabad"
              description="Renting pulse, commute times to Blue Area, Sangjani interchange notes, and where FMC fits inside MPCHS."
              href="/area-guide/multi-gardens-b17"
            />
            <AreaGuideCard
              title="MPCHS Islamabad overview"
              description="What Multi Professional Cooperative Housing Society buyers and renters should know before signing."
              href="/area-guide/mpchs-islamabad"
            />
            <AreaGuideCard
              title="FMC (Faisal Margalla City)"
              description="Sub-area rental nuances inside Multi Gardens — shops, flats and Margalla-facing blocks."
              href="/area-guide/fmc-islamabad"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          Tenant voices — Multi Gardens & FMC
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <TestimonialCard
            name="Ayesha K."
            unit="2-bed flat, Block C, Multi Gardens B17"
            text="Direct owner process saved us agent fees. The building team knew MPCHS paperwork and we moved in within ten days."
          />
          <TestimonialCard
            name="Bilal R."
            unit="Ground-floor shop, FMC commercial"
            text="Footfall picked up faster than we expected near the FMC loop. Kohisar Plaza coordinated a second viewing overnight."
          />
          <TestimonialCard
            name="Hina & Omar"
            unit="3-bed family flat, B17 MPCHS"
            text="School run is longer than F-8 but rent is sensible. Margalla evenings make Multi Gardens B17 feel worth it."
          />
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <RentCalculator />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <h2 className="text-2xl font-bold text-primary md:text-3xl">
          FAQs — renting in Multi Gardens B17 & MPCHS
        </h2>
        <p className="mt-2 text-muted">
          Structured FAQPage schema helps Google surface answers for average
          rent Multi Gardens B17, FMC shops and MPCHS documentation questions.
        </p>
        <div className="mt-8">
          <FAQAccordion items={homeFaqs} />
        </div>
      </section>

      <section className="border-t border-primary/10 bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="text-2xl font-bold text-primary md:text-3xl">
              Visit Kohisar Plaza — MPCHS Multi Gardens B17
            </h2>
            <p className="mt-2 text-muted">
              Call, WhatsApp or drop a form. We&apos;ll map you to the right B17
              or FMC block.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <span className="font-semibold text-primary">Phone: </span>
                <a className="text-body underline" href={`tel:${phone.replace(/\s/g, "")}`}>
                  {phone}
                </a>
              </li>
              <li>
                <span className="font-semibold text-primary">WhatsApp: </span>
                <a
                  className="text-body underline"
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat now
                </a>
              </li>
            </ul>
            <div className="mt-8">
              <MapEmbed />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
