import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function WhatsAppFloat() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition hover:brightness-110",
        "animate-whatsapp-pulse"
      )}
      aria-label="Chat on WhatsApp — Kohisar Plaza Multi Gardens B17"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
