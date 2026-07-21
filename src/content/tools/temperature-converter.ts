import type { ToolDefinition } from "@/lib/engine/types";

function toCelsius(value: number, unit: string): number {
  if (unit === "f") return ((value - 32) * 5) / 9;
  if (unit === "k") return value - 273.15;
  return value;
}
function fromCelsius(celsius: number, unit: string): number {
  if (unit === "f") return (celsius * 9) / 5 + 32;
  if (unit === "k") return celsius + 273.15;
  return celsius;
}

export const temperatureConverter: ToolDefinition = {
  id: "temperature-converter",
  category: "converters",
  subcategory: "temperature",

  compute: (inputs) => {
    const value = Number(inputs.value) || 0;
    const from = String(inputs.fromUnit);
    const to = String(inputs.toUnit);
    const celsius = toCelsius(value, from);
    const result = fromCelsius(celsius, to);
    return { result: Math.round(result * 100) / 100 };
  },

  inputs: [
    { key: "value", label: { en: "Value", fr: "Valeur" }, type: "number", default: 20 },
    {
      key: "fromUnit",
      label: { en: "From", fr: "De" },
      type: "select",
      default: "c",
      options: [
        { value: "c", label: { en: "Celsius", fr: "Celsius" } },
        { value: "f", label: { en: "Fahrenheit", fr: "Fahrenheit" } },
        { value: "k", label: { en: "Kelvin", fr: "Kelvin" } },
      ],
    },
    {
      key: "toUnit",
      label: { en: "To", fr: "Vers" },
      type: "select",
      default: "f",
      options: [
        { value: "c", label: { en: "Celsius", fr: "Celsius" } },
        { value: "f", label: { en: "Fahrenheit", fr: "Fahrenheit" } },
        { value: "k", label: { en: "Kelvin", fr: "Kelvin" } },
      ],
    },
  ],

  outputs: [{ key: "result", label: { en: "Result", fr: "Résultat" }, format: "number", decimals: 2 }],

  seo: {
    title: {
      en: "Temperature Converter — Celsius, Fahrenheit, Kelvin",
      fr: "Convertisseur de température — Celsius, Fahrenheit, Kelvin",
    },
    metaDescription: {
      en: "Convert between Celsius, Fahrenheit, and Kelvin instantly.",
      fr: "Convertissez instantanément entre Celsius, Fahrenheit et Kelvin.",
    },
    h1: { en: "Temperature Converter", fr: "Convertisseur de température" },
  },

  content: {
    intro: {
      en: "Convert temperatures between Celsius, Fahrenheit, and Kelvin. Updates live as you type.",
      fr: "Convertissez les températures entre Celsius, Fahrenheit et Kelvin. Mise à jour en direct.",
    },
    howItWorks: {
      en: "Every conversion passes through Celsius: °F = °C × 9/5 + 32, and K = °C + 273.15.",
      fr: "Chaque conversion passe par le Celsius : °F = °C × 9/5 + 32, et K = °C + 273,15.",
    },
    examples: {
      en: [
        { input: "0°C", output: "32°F" },
        { input: "100°C", output: "212°F" },
        { input: "20°C", output: "293.15 K" },
      ],
      fr: [
        { input: "0°C", output: "32°F" },
        { input: "100°C", output: "212°F" },
        { input: "20°C", output: "293,15 K" },
      ],
    },
    faq: {
      en: [
        {
          q: "Why does Fahrenheit start at 32 for freezing?",
          a: "Fahrenheit's zero point was originally based on a specific brine mixture, unrelated to water's freezing point — which is why the numbers don't line up neatly with Celsius.",
        },
        {
          q: "What is Kelvin used for?",
          a: "Kelvin is the scientific standard, starting at absolute zero (0 K = -273.15°C), commonly used in physics and chemistry.",
        },
        {
          q: "Can temperature be negative in Kelvin?",
          a: "No — 0 K is absolute zero, the coldest physically possible temperature, so Kelvin values are never negative.",
        },
      ],
      fr: [
        {
          q: "Pourquoi le Fahrenheit commence-t-il à 32 pour le gel ?",
          a: "Le point zéro du Fahrenheit était à l'origine basé sur un mélange de saumure spécifique, sans rapport avec le point de congélation de l'eau — d'où le décalage avec le Celsius.",
        },
        {
          q: "À quoi sert le Kelvin ?",
          a: "Le Kelvin est la référence scientifique, débutant au zéro absolu (0 K = -273,15°C), couramment utilisé en physique et en chimie.",
        },
        {
          q: "La température peut-elle être négative en Kelvin ?",
          a: "Non — 0 K est le zéro absolu, la température la plus froide physiquement possible, donc les valeurs en Kelvin ne sont jamais négatives.",
        },
      ],
    },
  },

  relatedTools: ["length-converter", "percentage-calculator"],
};