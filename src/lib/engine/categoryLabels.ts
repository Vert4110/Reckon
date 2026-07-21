import type { Locale } from "./types";

const LABELS: Record<string, Record<Locale, string>> = {
  calculators: { en: "Calculators", fr: "Calculateurs" },
  converters: { en: "Converters", fr: "Convertisseurs" },
  utilities: { en: "Utilities", fr: "Utilitaires" },
};

export function getCategoryLabel(category: string, locale: Locale): string {
  return LABELS[category]?.[locale] ?? category;
}