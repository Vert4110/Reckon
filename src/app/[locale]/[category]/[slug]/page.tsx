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
      <h1 className="font-display text-3xl mb-6">{getCategoryLabel(category, locale)}</h1>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/${locale}/${tool.category}/${tool.id}`}
            className="block rounded-lg border border-hairline bg-paper-raised p-4 hover:border-teal transition-colors"
          >
            <div className="font-semibold">{tool.seo.h1[locale] ?? tool.seo.h1.en}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}