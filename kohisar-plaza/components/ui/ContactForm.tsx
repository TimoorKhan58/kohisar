"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { getWhatsAppLink } from "@/lib/seo";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(10, "Valid phone required").max(25),
  propertyType: z.enum(["flat", "shop", "office", "other"]),
  message: z.string().trim().min(10, "Tell us what you need").max(2000),
  // Honeypot: hidden from people, bots tend to fill it in.
  website: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm({ id }: { id?: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      propertyType: "flat",
    },
  });

  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  async function onSubmit(data: FormValues) {
    setStatus("idle");
    if (data.website) {
      // Bot filled the hidden field: pretend success, store nothing.
      reset();
      setStatus("sent");
      return;
    }
    let ok = false;
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, page: window.location.pathname }),
      });
      ok = res.ok;
    } catch {
      ok = false;
    }
    if (!ok) {
      setStatus("error");
      return;
    }
    reset();
    setStatus("sent");
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      className="relative grid gap-4 rounded-2xl border border-primary/10 bg-white p-6 shadow-sm md:grid-cols-2"
    >
      <div className="md:col-span-2">
        <h3 className="text-lg font-bold text-primary">Send an inquiry</h3>
        <p className="mt-1 text-sm text-muted">
          MPCHS Multi Gardens B17 & FMC — we reply on WhatsApp and phone the
          same day where possible.
        </p>
      </div>
      <div>
        <label className="text-sm font-medium text-body">Name</label>
        <input
          {...register("name")}
          className="mt-1 w-full rounded-xl border border-primary/15 px-3 py-2.5 outline-none focus:border-accent"
        />
        {errors.name ? (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        ) : null}
      </div>
      <div>
        <label className="text-sm font-medium text-body">Phone</label>
        <input
          {...register("phone")}
          className="mt-1 w-full rounded-xl border border-primary/15 px-3 py-2.5 outline-none focus:border-accent"
        />
        {errors.phone ? (
          <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
        ) : null}
      </div>
      <div className="md:col-span-2">
        <label className="text-sm font-medium text-body">Property type</label>
        <select
          {...register("propertyType")}
          className="mt-1 w-full rounded-xl border border-primary/15 px-3 py-2.5 outline-none focus:border-accent"
        >
          <option value="flat">Flat — Multi Gardens B17</option>
          <option value="shop">Shop — B17 / FMC</option>
          <option value="office">Office / studio</option>
          <option value="other">Other MPCHS rental</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="text-sm font-medium text-body">Message</label>
        <textarea
          {...register("message")}
          rows={4}
          className="mt-1 w-full rounded-xl border border-primary/15 px-3 py-2.5 outline-none focus:border-accent"
          placeholder="Budget, bedrooms, move-in date, B17 vs FMC preference..."
        />
        {errors.message ? (
          <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
        ) : null}
      </div>
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register("website")}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="md:col-span-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? "Sending…" : "Submit inquiry"}
        </button>
        {status === "sent" ? (
          <p className="text-sm text-emerald-700">
            Thanks — we received your inquiry and will contact you about Multi Gardens rentals.
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-600">
            Sorry, your message could not be sent.{" "}
            <a href={getWhatsAppLink()} className="font-semibold underline">
              Message us on WhatsApp
            </a>{" "}
            instead.
          </p>
        ) : null}
      </div>
    </form>
  );
}
