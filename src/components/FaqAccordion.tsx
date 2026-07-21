import type { FaqItem } from "@/lib/engine/types";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;
  return (
    <div>
      {items.map((item, i) => (
        <details key={i} className="border-b border-hairline py-3.5 group" open={i === 0}>
          <summary className="cursor-pointer font-medium flex justify-between items-center list-none">
            {item.q}
            <span className="font-mono text-teal text-lg group-open:hidden">+</span>
            <span className="font-mono text-teal text-lg hidden group-open:inline">–</span>
          </summary>
          <p className="text-ink-soft mt-2.5 max-w-[66ch]">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
