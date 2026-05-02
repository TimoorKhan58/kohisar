import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kohisarplaza.com";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Kohisar Plaza";
const waRaw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923309089380";

export function getSiteUrl() {
  return siteUrl.replace(/\/$/, "");
}

export function getWhatsAppDigits(): string {
  return waRaw.replace(/\D/g, "");
}

export function getWhatsAppLink(encodedMessage?: string): string {
  const num = getWhatsAppDigits();
  const base = `https://wa.me/${num}`;
  if (!encodedMessage) {
    return `${base}?text=Hi%20Kohisar%20Plaza%2C%20I%20am%20interested%20in%20renting%20a%20property%20in%20Multi%20Gardens%20B17%20Islamabad.`;
  }
  return `${base}?text=${encodedMessage}`;
}

export function getWhatsAppPropertyLink(title: string, price: number): string {
  const msg = encodeURIComponent(
    `Hi Kohisar Plaza, I am interested in ${title} in Multi Gardens B17 — Rs.${price.toLocaleString("en-PK")}/month.`
  );
  return getWhatsAppLink(msg);
}

export function buildMetadata({
  title,
  description,
  path = "",
  ogImage,
}: {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}): Metadata {
  const canonical = `${getSiteUrl()}${path}`;
  return {
    title,
    description,
    metadataBase: new URL(getSiteUrl()),
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: "en_PK",
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
