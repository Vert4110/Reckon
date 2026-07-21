import Link from "next/link";
import { getToolsByCategory, getAllCategories } from "@/lib/engine/registry";
import { getCategoryLabel } from "@/lib/engine/categoryLabels";
import type { Locale } from "@/lib/engine/types";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

export default function CategoryPage({ params }: { params: { locale: Locale; category: string } }) {
  const { locale, category } = params;
  const tools = getToolsByCategory(category);

  return (
    <main className="max-w-[900px] mx-auto px-6 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-ink-soft">{getCategoryLabel(category, locale)}</p>
          <h1 className="font-display text-3xl md:text-4xl mt-2">{locale === "fr" ? "Choisissez un outil" : "Choose a tool"}</h1>
        </div>
        <Link
          href={`/${locale}`}
          className="text-sm font-mono border border-hairline rounded-full px-3 py-2 text-ink-soft hover:border-teal transition-colors"
        >
          {locale === "fr" ? "Retour à l'accueil" : "Back to home"}
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/${locale}/${tool.category}/${tool.id}`}
            className="block rounded-lg border border-hairline bg-paper-raised p-4 hover:border-teal transition-colors"
          >
            <div className="font-semibold mb-2">{tool.seo.h1[locale] ?? tool.seo.h1.en}</div>
            <p className="text-sm text-ink-soft">{tool.seo.metaDescription[locale] ?? tool.seo.metaDescription.en}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
