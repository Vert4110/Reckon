import type { ToolDefinition } from "@/lib/engine/types";

// factor = how many of this unit fit in one kilometer
const UNITS: Record<string, string> = {
  "1": "km",
  "1000": "m",
  "100000": "cm",
  "1.609344": "mi",
  "0.0009144": "yd",
  "0.0003048": "ft",
};

export const lengthConverter: ToolDefinition = {
  id: "length-converter",
  category: "converters",
  subcategory: "length",

  compute: (inputs) => {
    const value = Number(inputs.value) || 0;
    const fromFactor = Number(inputs.fromUnit) || 1;
    const toFactor = Number(inputs.toUnit) || 1;
    const km = value / fromFactor;
    const result = km * toFactor;
    return { result: Math.round(result * 1e6) / 1e6 };
  },

  inputs: [
    {
      key: "value",
      label: { en: "Value", fr: "Valeur" },
      type: "number",
      default: 1,
    },
    {
      key: "fromUnit",
      label: { en: "From", fr: "De" },
      type: "select",
      default: "1",
      options: Object.entries(UNITS).map(([value, code]) => ({
        value,
        label: { en: unitName(code, "en"), fr: unitName(code, "fr") },
      })),
    },
    {
      key: "toUnit",
      label: { en: "To", fr: "Vers" },
      type: "select",
      default: "1.609344",
      options: Object.entries(UNITS).map(([value, code]) => ({
        value,
        label: { en: unitName(code, "en"), fr: unitName(code, "fr") },
      })),
    },
  ],

  outputs: [
    {
      key: "result",
      label: { en: "Result", fr: "Résultat" },
      format: "number",
      decimals: 6,
    },
  ],

  seo: {
    title: {
      en: "Length Converter — km, miles, meters, feet",
      fr: "Convertisseur de longueur — km, miles, mètres, pieds",
    },
    metaDescription: {
      en: "Convert between kilometers, miles, meters, feet, yards and centimeters instantly.",
      fr: "Convertissez instantanément entre kilomètres, miles, mètres, pieds, yards et centimètres.",
    },
    h1: { en: "Length Converter", fr: "Convertisseur de longueur" },
  },

  content: {
    intro: {
      en: "Convert between metric and imperial length units. Results update as you type.",
      fr: "Convertissez entre unités métriques et impériales. Les résultats se mettent à jour en direct.",
    },
    howItWorks: {
      en: "Every unit converts through kilometers as a common base, using each unit's exact internationally agreed definition.",
      fr: "Chaque unité est convertie via le kilomètre comme base commune, selon la définition internationale exacte de chaque unité.",
    },
    faq: {
      en: [
        {
          q: "Is a mile longer than a kilometer?",
          a: "Yes. One mile is about 1.609 kilometers, making it the longer unit.",
        },
      ],
      fr: [
        {
          q: "Un mile est-il plus long qu'un kilomètre ?",
          a: "Oui. Un mile équivaut à environ 1,609 kilomètre.",
        },
      ],
    },
  },

  relatedTools: ["percentage-calculator", "life-in-weeks"],
};

function unitName(code: string, locale: "en" | "fr"): string {
  const names: Record<string, { en: string; fr: string }> = {
    km: { en: "Kilometers", fr: "Kilomètres" },
    m: { en: "Meters", fr: "Mètres" },
    cm: { en: "Centimeters", fr: "Centimètres" },
    mi: { en: "Miles", fr: "Miles" },
    yd: { en: "Yards", fr: "Yards" },
    ft: { en: "Feet", fr: "Pieds" },
  };
  return names[code][locale];
}
