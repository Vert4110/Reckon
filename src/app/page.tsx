import Link from "next/link";
import { getAllTools } from "@/lib/engine/registry";
import { getCategoryLabel } from "@/lib/engine/categoryLabels";
import type { Locale } from "@/lib/engine/types";

export default function HomePage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const tools = getAllTools();
  const categories = Array.from(new Set(tools.map((t) => t.category)));

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

      {categories.map((category) => (
        <section key={category} className="mb-9">
          <h2 className="font-display text-xl mb-3">{getCategoryLabel(category, locale)}</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {tools
              .filter((t) => t.category === category)
              .map((tool) => (
                <Link
                  key={tool.id}
                  href={`/${locale}/${tool.category}/${tool.id}`}
                  className="block rounded-lg border border-hairline bg-paper-raised p-4 hover:border-teal transition-colors"
                >
                  <div className="font-semibold">{tool.seo.h1[locale] ?? tool.seo.h1.en}</div>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}