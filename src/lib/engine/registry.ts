import type { ToolDefinition } from "./types";
import { percentageCalculator } from "@/content/tools/percentage-calculator";
import { lengthConverter } from "@/content/tools/length-converter";
import { lifeInWeeks } from "@/content/tools/life-in-weeks";

// Adding tool #4: write the file, import it, add it here. That's the whole step.
export const tools: ToolDefinition[] = [percentageCalculator, lengthConverter, lifeInWeeks];

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
