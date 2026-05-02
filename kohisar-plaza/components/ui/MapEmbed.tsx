export function MapEmbed() {
  const src =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL ??
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320!2d72.95!3d33.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDQ1JzAwLjAiTiA3MsKwNTcnMDAuMCJF!5e0!3m2!1sen!2spk!4v1";

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border border-primary/10 bg-surface shadow-sm">
      <iframe
        title="Kohisar Plaza — MPCHS Multi Gardens B17 map"
        src={src}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
