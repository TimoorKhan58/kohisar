import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export function AreaGuideCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
      <MapPin className="h-8 w-8 text-accent" aria-hidden />
      <h3 className="mt-4 text-lg font-bold text-primary">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{description}</p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
      >
        Open guide
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
