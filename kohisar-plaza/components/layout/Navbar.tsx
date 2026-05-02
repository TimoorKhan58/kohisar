"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Menu,
  X,
  MessageCircle,
  ChevronDown,
} from "lucide-react";
import { getWhatsAppLink } from "@/lib/seo";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/properties", label: "Properties" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const propertyLinks = [
  { href: "/properties", label: "All Properties" },
  { href: "/flats/1-bedroom", label: "1-Bed Flats" },
  { href: "/flats/2-bedroom", label: "2-Bed Flats" },
  { href: "/flats/3-bedroom", label: "3-Bed Flats" },
  { href: "/shops", label: "Shops" },
  { href: "/offices", label: "Offices & Studios" },
];

const areaLinks = [
  { href: "/area-guide/multi-gardens-b17", label: "Multi Gardens B17" },
  { href: "/area-guide/mpchs-islamabad", label: "MPCHS Islamabad" },
  { href: "/area-guide/fmc-islamabad", label: "FMC Islamabad" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [areaOpen, setAreaOpen] = useState(false);
  const [propsOpen, setPropsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-primary">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
            <Building2 className="h-6 w-6 text-accent" aria-hidden />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-bold tracking-tight">Kohisar Plaza</span>
            <span className="text-xs font-medium text-muted">
              Multi Gardens B17 · MPCHS
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setPropsOpen(true)}
            onMouseLeave={() => setPropsOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium hover:bg-primary/5",
                propsOpen && "bg-primary/5"
              )}
              aria-expanded={propsOpen}
            >
              Properties
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  propsOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence>
              {propsOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full min-w-[220px] rounded-xl border border-primary/10 bg-white py-2 shadow-lg"
                >
                  {propertyLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block px-4 py-2 text-sm text-body hover:bg-surface"
                    >
                      {l.label}
                    </Link>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div
            className="relative"
            onMouseEnter={() => setAreaOpen(true)}
            onMouseLeave={() => setAreaOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium hover:bg-primary/5",
                areaOpen && "bg-primary/5"
              )}
              aria-expanded={areaOpen}
            >
              Area Guide
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  areaOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence>
              {areaOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full min-w-[220px] rounded-xl border border-primary/10 bg-white py-2 shadow-lg"
                >
                  {areaLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block px-4 py-2 text-sm text-body hover:bg-surface"
                    >
                      {l.label}
                    </Link>
                  ))}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          {nav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-body hover:bg-primary/5"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-primary md:hidden"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100vw-3rem,20rem)] flex-col bg-white shadow-xl md:hidden"
            >
              <div className="flex items-center justify-between border-b px-4 py-3">
                <span className="font-semibold text-primary">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-primary"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
                <p className="px-3 pt-2 text-xs font-bold uppercase tracking-wide text-muted">
                  Properties
                </p>
                {propertyLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-lg px-3 py-2 text-sm"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                <p className="px-3 pt-2 text-xs font-bold uppercase tracking-wide text-muted">
                  Area guide
                </p>
                {areaLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-lg px-3 py-2 text-sm"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                {nav.slice(1).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-3 font-medium"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-accent py-3 font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
