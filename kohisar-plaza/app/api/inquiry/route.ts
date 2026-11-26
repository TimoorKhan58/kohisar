import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const TYPES = ["flat", "shop", "office", "other"] as const;
const TYPE_LABEL: Record<(typeof TYPES)[number], string> = {
  flat: "Flat",
  shop: "Shop",
  office: "Office / studio",
  other: "Other",
};

function clean(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/**
 * Saves a contact-form inquiry, then emails the owner.
 * The email is best-effort: if it fails, the inquiry is still saved in the admin.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 25);
  const message = clean(body.message, 2000);
  const page = clean(body.page, 200) || null;
  const type = (TYPES as readonly string[]).includes(String(body.propertyType))
    ? (body.propertyType as (typeof TYPES)[number])
    : "other";

  if (name.length < 2 || phone.length < 7 || message.length < 10) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return NextResponse.json({ ok: false }, { status: 500 });

  const supabase = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { error } = await supabase
    .from("inquiries")
    .insert({ name, phone, property_type: type, message, page });
  if (error) {
    console.error("[inquiry] save failed:", error.message);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const email = await sendEmail({ name, phone, type: TYPE_LABEL[type], message, page });
  // `email` says only whether the alert went out ("sent" | "skipped" | "failed"); no details are exposed.
  return NextResponse.json({ ok: true, email });
}

async function sendEmail(i: {
  name: string;
  phone: string;
  type: string;
  message: string;
  page: string | null;
}): Promise<"sent" | "skipped" | "failed"> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("[inquiry] RESEND_API_KEY is not set; email alert skipped");
    return "skipped"; // The inquiry is still saved in the admin.
  }

  const to = process.env.INQUIRY_NOTIFY_EMAIL ?? "timoor.khan.global@gmail.com";
  // onboarding@resend.dev works without a verified domain, but only delivers to the Resend account's own email.
  const from = process.env.INQUIRY_FROM_EMAIL ?? "Kohisar Plaza <onboarding@resend.dev>";
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kohisar.vercel.app";
  const digits = i.phone.replace(/\D/g, "");
  const wa = `https://wa.me/${digits.startsWith("0") ? `92${digits.slice(1)}` : digits}`;

  const text = [
    `New inquiry from the Kohisar Plaza website`,
    ``,
    `Name:    ${i.name}`,
    `Phone:   ${i.phone}`,
    `Type:    ${i.type}`,
    `Page:    ${i.page ?? "-"}`,
    ``,
    i.message,
    ``,
    `Reply on WhatsApp: ${wa}`,
    `All inquiries: ${site}/admin/inquiries`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New inquiry: ${i.type} — ${i.name}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[inquiry] email failed:", res.status, await res.text());
      return "failed";
    }
    return "sent";
  } catch (err) {
    console.error("[inquiry] email error:", (err as Error).message);
    return "failed";
  }
}
