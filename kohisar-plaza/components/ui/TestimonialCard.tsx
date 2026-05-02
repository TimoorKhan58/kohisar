import { Star } from "lucide-react";

export function TestimonialCard({
  name,
  unit,
  text,
  rating = 5,
}: {
  name: string;
  unit: string;
  text: string;
  rating?: number;
}) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
      <div className="flex gap-1 text-accent" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-body">
        &ldquo;{text}&rdquo;
      </blockquote>
      <figcaption className="mt-4 border-t border-primary/10 pt-4">
        <p className="font-semibold text-primary">{name}</p>
        <p className="text-xs text-muted">{unit}</p>
      </figcaption>
    </figure>
  );
}
