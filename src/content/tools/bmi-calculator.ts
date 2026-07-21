import type { ToolDefinition } from "@/lib/engine/types";

export const bmiCalculator: ToolDefinition = {
  id: "bmi-calculator",
  category: "calculators",
  subcategory: "health",

  compute: (inputs) => {
    const weight = Number(inputs.weight) || 0;
    const heightCm = Number(inputs.height) || 1;
    const heightM = heightCm / 100;
    const bmi = weight / (heightM * heightM);
    return { bmi: Math.round(bmi * 10) / 10 };
  },

  inputs: [
    {
      key: "weight",
      label: { en: "Weight (kg)", fr: "Poids (kg)" },
      type: "number",
      default: 70,
    },
    {
      key: "height",
      label: { en: "Height (cm)", fr: "Taille (cm)" },
      type: "number",
      default: 170,
    },
  ],

  outputs: [{ key: "bmi", label: { en: "BMI", fr: "IMC" }, format: "number", decimals: 1 }],

  seo: {
    title: {
      en: "BMI Calculator — Body Mass Index",
      fr: "Calculateur d'IMC — Indice de masse corporelle",
    },
    metaDescription: {
      en: "Calculate your Body Mass Index (BMI) from your height and weight.",
      fr: "Calculez votre indice de masse corporelle (IMC) à partir de votre taille et de votre poids.",
    },
    h1: { en: "BMI Calculator", fr: "Calculateur d'IMC" },
  },

  content: {
    intro: {
      en: "BMI is a general screening measure based on height and weight, used as a starting point rather than a diagnosis.",
      fr: "L'IMC est une mesure de dépistage générale basée sur la taille et le poids, utilisée comme point de départ plutôt que comme diagnostic.",
    },
    howItWorks: {
      en: "BMI = weight (kg) ÷ height (m)². The standard WHO ranges are: under 18.5 underweight, 18.5–24.9 normal, 25–29.9 overweight, 30+ obese.",
      fr: "IMC = poids (kg) ÷ taille (m)². Les seuils standards de l'OMS sont : moins de 18,5 insuffisance pondérale, 18,5–24,9 normal, 25–29,9 surpoids, 30+ obésité.",
    },
    examples: {
      en: [
        { input: "70 kg, 170 cm", output: "24.2" },
        { input: "60 kg, 165 cm", output: "22.0" },
        { input: "90 kg, 180 cm", output: "27.8" },
      ],
      fr: [
        { input: "70 kg, 170 cm", output: "24,2" },
        { input: "60 kg, 165 cm", output: "22,0" },
        { input: "90 kg, 180 cm", output: "27,8" },
      ],
    },
    faq: {
      en: [
        {
          q: "Is BMI accurate for everyone?",
          a: "BMI doesn't distinguish muscle from fat, so it can be less accurate for athletes, older adults, or pregnant people. It's a general screening tool, not a diagnosis.",
        },
        {
          q: "What's a healthy BMI range?",
          a: "The WHO defines 18.5–24.9 as the typical healthy range for adults, though individual context matters.",
        },
        {
          q: "Does this calculator work in pounds and inches?",
          a: "Currently it uses kilograms and centimeters. Convert your measurements first using the length or weight converter if needed.",
        },
      ],
      fr: [
        {
          q: "L'IMC est-il précis pour tout le monde ?",
          a: "L'IMC ne distingue pas la masse musculaire de la masse grasse, donc il peut être moins précis pour les athlètes, les personnes âgées ou les femmes enceintes. C'est un outil de dépistage général, pas un diagnostic.",
        },
        {
          q: "Quelle est la plage d'IMC considérée comme saine ?",
          a: "L'OMS définit 18,5–24,9 comme la plage habituelle pour les adultes, même si le contexte individuel compte.",
        },
        {
          q: "Ce calculateur fonctionne-t-il en livres et pouces ?",
          a: "Il utilise actuellement les kilogrammes et centimètres. Convertissez vos mesures au préalable si besoin.",
        },
      ],
    },
  },

  relatedTools: ["age-calculator", "percentage-calculator"],
};