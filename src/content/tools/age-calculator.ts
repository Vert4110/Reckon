import type { ToolDefinition } from "@/lib/engine/types";

export const ageCalculator: ToolDefinition = {
  id: "age-calculator",
  category: "calculators",
  subcategory: "date",

  compute: (inputs) => {
    const birth = new Date(String(inputs.birthDate));
    if (isNaN(birth.getTime())) return { years: 0, months: 0, days: 0 };
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    return { years, months, days };
  },

  inputs: [
    {
      key: "birthDate",
      label: { en: "Your birth date", fr: "Votre date de naissance" },
      type: "date",
      default: "2000-01-01",
    },
  ],

  outputs: [
    { key: "years", label: { en: "Years", fr: "Années" }, format: "number", decimals: 0 },
    { key: "months", label: { en: "Months", fr: "Mois" }, format: "number", decimals: 0 },
    { key: "days", label: { en: "Days", fr: "Jours" }, format: "number", decimals: 0 },
  ],

  seo: {
    title: {
      en: "Age Calculator — Find Your Exact Age",
      fr: "Calculateur d'âge — Trouvez votre âge exact",
    },
    metaDescription: {
      en: "Calculate your exact age in years, months, and days from your birth date.",
      fr: "Calculez votre âge exact en années, mois et jours à partir de votre date de naissance.",
    },
    h1: { en: "Age Calculator", fr: "Calculateur d'âge" },
  },

  content: {
    intro: {
      en: "Enter your birth date to see your exact age in years, months, and days as of today.",
      fr: "Saisissez votre date de naissance pour voir votre âge exact en années, mois et jours à ce jour.",
    },
    howItWorks: {
      en: "We calculate the full years, remaining months, and remaining days between your birth date and today's date.",
      fr: "Nous calculons les années complètes, les mois restants et les jours restants entre votre date de naissance et aujourd'hui.",
    },
    examples: {
      en: [
        { input: "Born January 1, 2000", output: "Age depends on today's date" },
        { input: "Born on a leap day (Feb 29)", output: "Still calculated to the exact day" },
      ],
      fr: [
        { input: "Né le 1er janvier 2000", output: "L'âge dépend de la date d'aujourd'hui" },
        { input: "Né un 29 février", output: "Toujours calculé au jour exact" },
      ],
    },
    faq: {
      en: [
        {
          q: "Does this account for leap years?",
          a: "Yes — the calculation is based on actual calendar dates, so leap years are handled automatically.",
        },
        {
          q: "Why do months and days matter, not just years?",
          a: "Many official forms and eligibility checks require your exact age, not just the year, so showing months and days avoids rounding errors.",
        },
        {
          q: "Can I calculate someone else's age?",
          a: "Yes — enter any birth date, past or present, and the calculator works the same way.",
        },
      ],
      fr: [
        {
          q: "Les années bissextiles sont-elles prises en compte ?",
          a: "Oui — le calcul se base sur les dates réelles du calendrier, donc les années bissextiles sont gérées automatiquement.",
        },
        {
          q: "Pourquoi les mois et les jours comptent-ils, pas seulement les années ?",
          a: "De nombreux formulaires officiels exigent l'âge exact, pas seulement l'année, donc afficher mois et jours évite les erreurs d'arrondi.",
        },
        {
          q: "Puis-je calculer l'âge de quelqu'un d'autre ?",
          a: "Oui — saisissez n'importe quelle date de naissance, passée ou présente, le calcul fonctionne de la même façon.",
        },
      ],
    },
  },

  relatedTools: ["life-in-weeks", "bmi-calculator"],
};