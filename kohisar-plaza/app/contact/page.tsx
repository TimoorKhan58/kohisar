import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ContactForm } from "@/components/ui/ContactForm";
import { MapEmbed } from "@/components/ui/MapEmbed";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { JsonLd } from "@/components/schema/JsonLd";
import { homeFaqs } from "@/data/faqs";
import {
  getBreadcrumbJsonLd,
  getFAQPageJsonLd,
  getRealEstateAgentJsonLd,
} from "@/lib/schema-builders";
import { buildMetadata, getWhatsAppLink } from "@/lib/seo";

export const metadata = buildMetadata({
  title:
    "Contact Kohisar Plaza — Rent in Multi Gardens B17 Islamabad | MPCHS",
  description:
    "WhatsApp, phone or form — reach Kohisar Plaza for MPCHS Multi Gardens B17 and FMC apartment, shop or office rentals.",
  path: "/contact",
});

export default function ContactPage() {
  const path = "/contact";
  const crumbs = getBreadcrumbJsonLd([{ name: "Contact", path }]);
  const agent = getRealEstateAgentJsonLd();
  const faq = getFAQPageJsonLd(homeFaqs.slice(0, 3));
  const phone =
    process.env.NEXT_PUBLIC_PHONE ?? "+92-300-0000000";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <JsonLd data={[agent, crumbs, faq]} />
      <Breadcrumb items={[{ name: "Contact", path }]} />
      <h1 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        Contact Kohisar Plaza — Multi Gardens B17 Islamabad
      </h1>
      <p className="mt-4 max-w-3xl text-muted">
        MPCHS Multi Gardens spans both B17 and FMC — tell us your budget,
        bedroom count and whether you need furnished flat Multi Gardens B17 or
        commercial space.
      </p>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <ul className="space-y-3 text-body">
            <li>
              <span className="font-semibold text-primary">Phone: </span>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="underline">
                {phone}
              </a>
            </li>
            <li>
              <span className="font-semibold text-primary">WhatsApp: </span>
              <a
                href={getWhatsAppLink()}
                className="underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start chat
              </a>
            </li>
          </ul>
          <div className="mt-8">
            <MapEmbed />
          </div>
        </div>
        <ContactForm />
      </div>
      <h2 className="mt-16 text-2xl font-bold text-primary">Quick FAQ</h2>
      <div className="mt-6 max-w-3xl">
        <FAQAccordion items={homeFaqs.slice(0, 3)} />
      </div>
    </div>
  );
}
