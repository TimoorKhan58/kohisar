import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BlogCard({
  title,
  description,
  href,
  meta,
}: {
  title: string;
  description: string;
  href: string;
  meta: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-sm transition hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
        {meta}
      </p>
      <h3 className="mt-2 text-lg font-bold text-primary leading-snug">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{description}</p>
      <Link
        href={href}
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
      >
        Read article
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
