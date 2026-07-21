"use client";

import { useMemo, useState } from "react";
import { getToolBySlug } from "@/lib/engine/registry";
import type { Locale, OutputFieldDefinition } from "@/lib/engine/types";

export default function CalculatorForm({
  toolId,
  locale,
}: {
  toolId: string;
  locale: Locale;
}) {
  const tool = getToolBySlug(toolId);
  if (!tool) return null;

  const [values, setValues] = useState<Record<string, number | string>>(() => {
    const initial: Record<string, number | string> = {};
    tool.inputs.forEach((f) => {
      initial[f.key] = f.default ?? (f.type === "number" ? 0 : "");
    });
    return initial;
  });

  const result = useMemo(() => {
    try {
      return tool.compute(values);
    } catch {
      return {};
    }
  }, [values, tool]);

  function update(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="rounded-xl border border-hairline bg-paper-raised p-6 md:p-7 mb-9">
      <div className="grid gap-4 md:grid-cols-2">
        {tool.inputs.map((field) => (
          <div key={field.key}>
            <label className="block font-mono text-[11px] uppercase tracking-wider text-ink-soft mb-2">
              {field.label[locale] ?? field.label.en}
            </label>

            {field.type === "select" ? (
              <select
                className="w-full rounded-lg border border-hairline bg-paper-raised px-3 py-3 font-body text-sm"
                value={String(values[field.key])}
                onChange={(e) => update(field.key, e.target.value)}
              >
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label[locale] ?? opt.label.en}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="w-full rounded-lg border border-hairline bg-paper px-3 py-3 font-mono text-lg"
                type={field.type === "date" ? "date" : field.type === "number" ? "number" : "text"}
                value={values[field.key] as string | number}
                min={field.min}
                max={field.max}
                step={field.step ?? "any"}
                onChange={(e) => update(field.key, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {tool.outputs.map((out) => (
          <ReadoutPanel key={out.key} label={out.label[locale] ?? out.label.en ?? out.key} value={result[out.key]} out={out} />
        ))}
      </div>
    </div>
  );
}

function ReadoutPanel({
  label,
  value,
  out,
}: {
  label: string;
  value: number | string | undefined;
  out: OutputFieldDefinition;
}) {
  const display =
    value === undefined
      ? "—"
      : typeof value === "number"
      ? value.toLocaleString(undefined, { maximumFractionDigits: out.decimals ?? 2 })
      : value;

  return (
    <div className="rounded-lg bg-ink px-5 py-4 text-amber">
      <div className="font-mono text-[11px] uppercase tracking-wider text-[#7f9e93] mb-1">{label}</div>
      <div className="font-mono text-3xl md:text-4xl font-semibold drop-shadow-[0_0_18px_rgba(255,179,67,0.35)]">
        {display}
        {out.unit && <span className="text-base ml-1.5 text-[#c98a3a]">{out.unit}</span>}
      </div>
    </div>
  );
}
