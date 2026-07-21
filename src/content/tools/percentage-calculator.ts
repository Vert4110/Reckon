import type { ToolDefinition } from "@/lib/engine/types";

export const percentageCalculator: ToolDefinition = {
  id: "percentage-calculator",
  category: "calculators",
  subcategory: "math",

  compute: (inputs) => {
    const value = Number(inputs.value) || 0;
    const percent = Number(inputs.percent) || 0;
    return { result: (value * percent) / 100 };
  },

  inputs: [
    {
      key: "percent",
      label: { en: "Percentage", fr: "Pourcentage" },
      type: "number",
      default: 20,
      unit: "%",
    },
    {
      key: "value",
      label: { en: "Of number", fr: "De" },
      type: "number",
      default: 150,
    },
  ],

  outputs: [
    {
      key: "result",
      label: { en: "Result", fr: "Résultat" },
      format: "number",
      decimals: 2,
    },
  ],

  seo: {
    title: {
      en: "Percentage Calculator — Find X% of a Number",
      fr: "Calculateur de pourcentage — Trouver X% d'un nombre",
    },
    metaDescription: {
      en: "Instantly calculate any percentage of a number. Free, accurate, no sign-up.",
      fr: "Calculez instantanément un pourcentage d'un nombre. Gratuit, précis, sans inscription.",
    },
    h1: {
      en: "Percentage Calculator",
      fr: "Calculateur de pourcentage",
    },
  },

  content: {
    intro: {
      en: "Find what X% of a number is. Type a percentage and a number, get the answer instantly.",
      fr: "Trouvez ce que représente X% d'un nombre. Saisissez un pourcentage et un nombre, obtenez la réponse instantanément.",
    },
    howItWorks: {
      en: "Multiply the number by the percentage, then divide by 100. For example, 20% of 150 is (150 × 20) ÷ 100 = 30.",
      fr: "Multipliez le nombre par le pourcentage, puis divisez par 100. Par exemple, 20% de 150 est (150 × 20) ÷ 100 = 30.",
    },
    examples: {
      en: [
        { input: "20% of 150", output: "30" },
        { input: "8% of 250", output: "20" },
        { input: "50% of 84", output: "42" },
        { input: "12.5% of 400", output: "50" },
      ],
      fr: [
        { input: "20% de 150", output: "30" },
        { input: "8% de 250", output: "20" },
        { input: "50% de 84", output: "42" },
        { input: "12,5% de 400", output: "50" },
      ],
    },
    faq: {
      en: [
        {
          q: "How do I calculate a percentage by hand?",
          a: "Multiply the number by the percentage value, then divide by 100. 20% of 150 = 150 × 0.20 = 30.",
        },
        {
          q: "Can I use this for percentage increase or decrease?",
          a: "This tool finds X% of a number. For increases or decreases over time, use the percentage change calculator instead.",
        },
        {
          q: "What does 'percent' actually mean?",
          a: "Percent means 'per hundred' — 20% is 20 out of every 100, or 0.20 written as a decimal.",
        },
        {
          q: "How do I calculate a percentage on a phone calculator?",
          a: "Type the number, multiply by the percentage, then divide by 100 — most calculator apps also have a % button that does this automatically when pressed after multiplying.",
        },
      ],
      fr: [
        {
          q: "Comment calculer un pourcentage à la main ?",
          a: "Multipliez le nombre par la valeur du pourcentage, puis divisez par 100. 20% de 150 = 150 × 0,20 = 30.",
        },
        {
          q: "Puis-je l'utiliser pour une augmentation ou une baisse en pourcentage ?",
          a: "Cet outil calcule X% d'un nombre. Pour une variation dans le temps, utilisez le calculateur de variation en pourcentage.",
        },
        {
          q: "Que signifie « pourcentage » ?",
          a: "Pourcentage signifie « pour cent » — 20% représente 20 sur 100, soit 0,20 en écriture décimale.",
        },
        {
          q: "Comment calculer un pourcentage sur une calculatrice de téléphone ?",
          a: "Saisissez le nombre, multipliez par le pourcentage, puis divisez par 100 — la plupart des calculatrices ont aussi une touche % qui fait ce calcul automatiquement.",
        },
      ],
    },
  },

  relatedTools: ["length-converter"],
};