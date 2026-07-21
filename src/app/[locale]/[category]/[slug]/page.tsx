import Link from "next/link";
import { notFound } from "next/navigation";
import CalculatorForm from "@/components/CalculatorForm";
import RelatedTools from "@/components/RelatedTools";
import { getAllTools, getToolBySlug, getRelatedTools } from "@/lib/engine/registry";
import { getCategoryLabel } from "@/lib/engine/categoryLabels";
import type { Locale } from "@/lib/engine/types";

export function generateStaticParams() {
  return getAllTools().map((tool) => ({ category: tool.category, slug: tool.id }));
}

export default function ToolPage({ params }: { params: { locale: Locale; category: string; slug: string } }) {
  const { locale, category, slug } = params;
  const tool = getToolBySlug(slug);

  if (!tool || tool.category !== category) {
    notFound();
  }

  const relatedTools = getRelatedTools(tool);

  return (
    <main className="max-w-[900px] mx-auto px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-ink-soft">{getCategoryLabel(category, locale)}</p>
          <h1 className="font-display text-3xl md:text-4xl mt-3">{tool.seo.h1[locale] ?? tool.seo.h1.en}</h1>
          <p className="mt-4 text-ink-soft max-w-[60ch]">{tool.seo.metaDescription[locale] ?? tool.seo.metaDescription.en}</p>
        </div>
        <Link
          href={`/${locale}/${category}`}
          className="text-sm font-mono border border-hairline rounded-full px-3 py-2 text-ink-soft hover:border-teal transition-colors"
        >
          {locale === "fr" ? "Retour à la catégorie" : "Back to category"}
        </Link>
      </div>

      <CalculatorForm toolId={slug} locale={locale} />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-8">
          <section className="rounded-xl border border-hairline bg-paper-raised p-6 md:p-7">
            <h2 className="font-display text-2xl mb-4">{locale === "fr" ? "Comment ça marche" : "How it works"}</h2>
            <p className="text-ink-soft leading-7">{tool.content.howItWorks[locale] ?? tool.content.howItWorks.en}</p>
          </section>

          {(tool.content.examples?.[locale] ?? tool.content.examples?.en)?.length ? (
            <section className="rounded-xl border border-hairline bg-paper-raised p-6 md:p-7">
              <h2 className="font-display text-2xl mb-4">{locale === "fr" ? "Exemples" : "Examples"}</h2>
              <div className="space-y-4">
                {(tool.content.examples?.[locale] ?? tool.content.examples?.en ?? []).map((example, index) => (
                  <div key={index}>
                    <p className="font-mono text-sm text-ink-soft">{example.input}</p>
                    <p className="mt-1 text-ink">{example.output}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {(tool.content.faq?.[locale] ?? tool.content.faq?.en)?.length ? (
            <section className="rounded-xl border border-hairline bg-paper-raised p-6 md:p-7">
              <h2 className="font-display text-2xl mb-4">FAQ</h2>
              <div className="space-y-5">
                {(tool.content.faq?.[locale] ?? tool.content.faq?.en ?? []).map((faq, index) => (
                  <div key={index}>
                    <p className="font-semibold">{faq.q}</p>
                    <p className="mt-2 text-ink-soft leading-7">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <aside className="space-y-6">
          <section className="rounded-xl border border-hairline bg-paper-raised p-6 md:p-7">
            <h2 className="font-display text-xl mb-4">{locale === "fr" ? "À propos" : "About this tool"}</h2>
            <p className="text-ink-soft leading-7">{tool.content.intro[locale] ?? tool.content.intro.en}</p>
          </section>

          {relatedTools.length ? (
            <section className="rounded-xl border border-hairline bg-paper-raised p-6 md:p-7">
              <h2 className="font-display text-xl mb-4">{locale === "fr" ? "Outils liés" : "Related tools"}</h2>
              <RelatedTools tools={relatedTools} locale={locale} />
            </section>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
