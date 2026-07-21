"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/engine/types";

export default function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="text-xl leading-none px-1"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full bg-paper border-b border-hairline px-6 py-4 flex flex-col gap-3">
          <Link href={`/${locale}/calculators`} onClick={() => setOpen(false)} className="text-sm">
            {locale === "fr" ? "Calculateurs" : "Calculators"}
          </Link>
          <Link href={`/${locale}/converters`} onClick={() => setOpen(false)} className="text-sm">
            {locale === "fr" ? "Convertisseurs" : "Converters"}
          </Link>
        </div>
      )}
    </div>
  );
}