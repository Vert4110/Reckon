import type { ToolDefinition } from "@/lib/engine/types";

export const lifeInWeeks: ToolDefinition = {
  id: "life-in-weeks",
  category: "calculators",
  subcategory: "life",

  compute: (inputs) => {
    const birthDate = new Date(String(inputs.birthDate));
    const lifeExpectancy = Number(inputs.lifeExpectancy) || 80;
    if (isNaN(birthDate.getTime())) {
      return { weeksLived: 0, weeksRemaining: 0, percentLived: 0 };
    }
    const msPerWeek = 1000 * 60 * 60 * 24 * 7;
    const weeksLived = Math.max(0, Math.floor((Date.now() - birthDate.getTime()) / msPerWeek));
    const totalWeeks = lifeExpectancy * 52;
    const weeksRemaining = Math.max(0, totalWeeks - weeksLived);
    const percentLived = Math.min(100, Math.round((weeksLived / totalWeeks) * 1000) / 10);
    return { weeksLived, weeksRemaining, percentLived };
  },

  inputs: [
    {
      key: "birthDate",
      label: { en: "Your birth date", fr: "Votre date de naissance" },
      type: "date",
      default: "1995-01-01",
    },
    {
      key: "lifeExpectancy",
      label: { en: "Life expectancy (years)", fr: "Espérance de vie (ans)" },
      type: "number",
      default: 80,
      min: 1,
      max: 120,
    },
  ],

  outputs: [
    { key: "weeksLived", label: { en: "Weeks lived", fr: "Semaines vécues" }, format: "number", decimals: 0 },
    { key: "weeksRemaining", label: { en: "Weeks remaining", fr: "Semaines restantes" }, format: "number", decimals: 0 },
    { key: "percentLived", label: { en: "Life % lived", fr: "% de vie vécu" }, unit: "%", format: "number", decimals: 1 },
  ],

  seo: {
    title: {
      en: "Life in Weeks Calculator — See Your Life as Weeks",
      fr: "Calculateur de vie en semaines",
    },
    metaDescription: {
      en: "See how many weeks you've lived and how many you have left, based on average life expectancy.",
      fr: "Découvrez combien de semaines vous avez vécues et combien il vous en reste.",
    },
    h1: { en: "Life in Weeks", fr: "La vie en semaines" },
  },

  content: {
    intro: {
      en: "A life is about 4,000 weeks long. See how many you've used, and how many are left.",
      fr: "Une vie dure environ 4 000 semaines. Découvrez combien vous en avez utilisées, et combien il en reste.",
    },
    howItWorks: {
      en: "We count the weeks between your birth date and today, then compare that to your chosen life expectancy in weeks.",
      fr: "Nous comptons les semaines entre votre date de naissance et aujourd'hui, puis comparons ce chiffre à votre espérance de vie choisie.",
    },
    faq: {
      en: [
        {
          q: "Where does the default life expectancy come from?",
          a: "80 years is a common global average; adjust it to match your country's actual average or your own estimate.",
        },
      ],
      fr: [
        {
          q: "D'où vient l'espérance de vie par défaut ?",
          a: "80 ans est une moyenne mondiale courante ; ajustez-la selon votre pays ou votre propre estimation.",
        },
      ],
    },
  },

  relatedTools: ["percentage-calculator", "length-converter"],
};
