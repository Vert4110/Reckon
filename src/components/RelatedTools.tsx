import Link from "next/link";
import type { Locale, ToolDefinition } from "@/lib/engine/types";

export default function RelatedTools({ tools, locale }: { tools: ToolDefinition[]; locale: Locale }) {
  if (!tools.length) return null;
  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
      {tools.map((tool) => (
        <Link
          key={tool.id}
          href={`/${locale}/${tool.category}/${tool.id}`}
          className="block rounded-lg border border-hairline bg-paper-raised p-3.5 hover:border-teal transition-colors"
        >
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-soft">{tool.category}</div>
          <div className="font-semibold mt-1">{tool.seo.h1[locale] ?? tool.seo.h1.en}</div>
        </Link>
      ))}
    </div>
  );
}
