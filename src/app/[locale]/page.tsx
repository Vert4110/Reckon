import Link from "next/link";
import { getAllTools } from "@/lib/engine/registry";
import type { Locale } from "@/lib/engine/types";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const tools = getAllTools();

  return (
    <main className="max-w-[900px] mx-auto px-6 py-10">
      <h1 className="font-display text-3xl md:text-4xl mb-2">
        {locale === "fr" ? "Calculateurs et convertisseurs gratuits" : "Free calculators and converters"}
      </h1>
      <p className="text-ink-soft mb-8 max-w-[56ch]">
        {locale === "fr"
          ? "Aucune inscription. Aucun rechargement de page. Juste des outils rapides et précis."
          : "No sign-up. No page reloads. Just fast, accurate tools."}
      </p>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/${locale}/${tool.category}/${tool.id}`}
            className="block rounded-lg border border-hairline bg-paper-raised p-4 hover:border-teal transition-colors"
          >
            <div className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">{tool.category}</div>
            <div className="font-semibold mt-1">{tool.seo.h1[locale] ?? tool.seo.h1.en}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
