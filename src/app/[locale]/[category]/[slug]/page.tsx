import { notFound } from "next/navigation";
import { getAllTools, getToolBySlug, getRelatedTools } from "@/lib/engine/registry";
import type { Locale } from "@/lib/engine/types";
import CalculatorForm from "@/components/CalculatorForm";
import FaqAccordion from "@/components/FaqAccordion";
import RelatedTools from "@/components/RelatedTools";

type Params = { locale: Locale; category: string; slug: string };

// Static generation: every tool page is built at deploy time, not on request.
export function generateStaticParams() {
  return getAllTools().map((t) => ({ category: t.category, slug: t.id }));
}

export function generateMetadata({ params }: { params: Params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};
  return {
    title: tool.seo.title[params.locale] ?? tool.seo.title.en,
    description: tool.seo.metaDescription[params.locale] ?? tool.seo.metaDescription.en,
  };
}

export default function ToolPage({ params }: { params: Params }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) return notFound();

  const { locale } = params;
  const related = getRelatedTools(tool);
  const faq = tool.content.faq[locale] ?? tool.content.faq.en ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.seo.h1[locale] ?? tool.seo.h1.en,
    applicationCategory: "UtilitiesApplication",
    description: tool.seo.metaDescription[locale] ?? tool.seo.metaDescription.en,
  };

  const faqJsonLd = faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  return (
    <main className="max-w-[900px] mx-auto px-6 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <p className="font-mono text-xs text-ink-soft pt-5">
        {locale === "fr" ? "Accueil" : "Home"} › {tool.category}
      </p>

      <h1 className="font-display text-3xl md:text-4xl mt-2.5 mb-1.5">
        {tool.seo.h1[locale] ?? tool.seo.h1.en}
      </h1>
      <p className="text-ink-soft mb-7 max-w-[56ch]">{tool.content.intro[locale] ?? tool.content.intro.en}</p>

      <CalculatorForm toolId={tool.id} locale={locale} />

      <section className="mb-9">
        <h2 className="font-display text-xl mb-3">{locale === "fr" ? "Comment ça marche" : "How it works"}</h2>
        <p className="text-ink-soft max-w-[66ch]">{tool.content.howItWorks[locale] ?? tool.content.howItWorks.en}</p>
      </section>

      <section className="mb-9">
        <h2 className="font-display text-xl mb-3">FAQ</h2>
        <FaqAccordion items={faq} />
      </section>

      <section>
        <h2 className="font-display text-xl mb-3">{locale === "fr" ? "Outils liés" : "Related tools"}</h2>
        <RelatedTools tools={related} locale={locale} />
      </section>
    </main>
  );
}
