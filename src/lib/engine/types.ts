// The single schema every tool (calculator or converter) is built from.
// New tool = new object matching this shape. Nothing else has to change.

export type Locale = "en" | "fr";

export type LocalizedString = Partial<Record<Locale, string>>;

export interface FieldOption {
  value: string;
  label: LocalizedString;
}

export interface FieldDefinition {
  key: string;
  label: LocalizedString;
  type: "number" | "select" | "date" | "text";
  unit?: string;
  options?: FieldOption[];
  default?: number | string;
  min?: number;
  max?: number;
  step?: number;
}

export interface OutputFieldDefinition {
  key: string;
  label: LocalizedString;
  unit?: string;
  format?: "number" | "currency" | "percent" | "text";
  decimals?: number;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Example {
  input: string;
  output: string;
}

export interface ToolDefinition {
  id: string; // used as URL slug, e.g. "length-converter"
  category: string; // "calculators" | "converters" | "utilities"
  subcategory?: string;

  // Pure function: inputs in, outputs out. No side effects, easy to unit test.
  compute: (inputs: Record<string, number | string>) => Record<string, number | string>;

  inputs: FieldDefinition[];
  outputs: OutputFieldDefinition[];

  seo: {
    title: LocalizedString;
    metaDescription: LocalizedString;
    h1: LocalizedString;
  };

  content: {
    intro: LocalizedString;
    howItWorks: LocalizedString;
    examples?: Partial<Record<Locale, Example[]>>;
    faq: Partial<Record<Locale, FaqItem[]>>;
  };

  relatedTools: string[]; // ids of other ToolDefinitions
}
