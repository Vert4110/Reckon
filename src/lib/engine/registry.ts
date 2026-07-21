import type { ToolDefinition } from "./types";
import { percentageCalculator } from "@/content/tools/percentage-calculator";
import { lengthConverter } from "@/content/tools/length-converter";
import { lifeInWeeks } from "@/content/tools/life-in-weeks";
import { ageCalculator } from "@/content/tools/age-calculator";
import { bmiCalculator } from "@/content/tools/bmi-calculator";
import { temperatureConverter } from "@/content/tools/temperature-converter";

export const tools: ToolDefinition[] = [
  percentageCalculator,
  lengthConverter,
  lifeInWeeks,
  ageCalculator,
  bmiCalculator,
  temperatureConverter,
];

export function getAllTools(): ToolDefinition[] {
  return tools;
}

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return tools.find((t) => t.id === slug);
}

export function getToolsByCategory(category: string): ToolDefinition[] {
  return tools.filter((t) => t.category === category);
}

export function getRelatedTools(tool: ToolDefinition): ToolDefinition[] {
  return tool.relatedTools
    .map((id) => tools.find((t) => t.id === id))
    .filter((t): t is ToolDefinition => Boolean(t));
}

export function getAllCategories(): string[] {
  return Array.from(new Set(tools.map((t) => t.category)));
}