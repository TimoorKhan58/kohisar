import Link from "next/link";
import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { getPhoneDisplay, getWhatsAppLink } from "@/lib/seo";

const phone = getPhoneDisplay();
const email = process.env.NEXT_PUBLIC_EMAIL ?? "timoor.khan.global@gmail.com";

export function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-primary text-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-white">Kohisar Plaza</p>
          <p className="mt-2 text-sm text-white/80">
            Multi Gardens B17 Islamabad — MPCHS (Multi Professional
            Cooperative Housing Society). Premium rentals direct from owner in
            FMC and B17.
          </p>
        </div>
        <div>
          <p className="font-semibold text-accent">Properties</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/flats/1-bedroom" className="hover:text-accent">
                1-bed flat for rent Multi Gardens B17
              </Link>
            </li>
            <li>
              <Link href="/flats/2-bedroom" className="hover:text-accent">
                2-bed flat for rent MPCHS Islamabad
              </Link>
            </li>
            <li>
              <Link href="/flats/3-bedroom" className="hover:text-accent">
                3-bedroom flats B17
              </Link>
            </li>
            <li>
              <Link href="/shops" className="hover:text-accent">
                Shop for rent Multi Gardens B17
              </Link>
            </li>
            <li>
              <Link href="/offices" className="hover:text-accent">
                Office for rent Multi Gardens B17
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-accent">Area & blog</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/area-guide/multi-gardens-b17"
                className="hover:text-accent"
              >
                Multi Gardens B17 guide
              </Link>
            </li>
            <li>
              <Link
                href="/area-guide/mpchs-islamabad"
                className="hover:text-accent"
              >
                MPCHS society overview
              </Link>
            </li>
            <li>
              <Link
                href="/area-guide/fmc-islamabad"
                className="hover:text-accent"
              >
                FMC Islamabad guide
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-accent">
                Rental blog
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-accent">Contact</p>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
              <span>
                Kohisar Plaza, MPCHS Multi Gardens, B17, Islamabad (FMC
                blocks nearby)
              </span>
            </li>
            <li>
              <a
                href={getWhatsAppLink()}
                className="inline-flex items-center gap-2 hover:text-accent"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </li>
            <li>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 hover:text-accent">
                <Phone className="h-4 w-4" />
                {phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:text-accent">
                <Mail className="h-4 w-4" />
                {email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-white/70 md:flex-row md:px-6">
          <p>© {new Date().getFullYear()} Kohisar Plaza · MPCHS Multi Gardens B17</p>
          <Link href="/sitemap.xml" className="hover:text-accent">
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
