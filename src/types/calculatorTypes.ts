export type CalculatorInputType =
  | "number"
  | "select"
  | "slider"
  | "date"
  | "datetime"
  | "text"
  | "textarea";

export type CalculatorFormValues = Record<string, string>;

export type CalculatorInputBase = {
  name: string;
  label: string;
  type: CalculatorInputType;
  required?: boolean;
  requiredWhen?: (values: CalculatorFormValues) => boolean;
  showWhen?: (values: CalculatorFormValues) => boolean;
  defaultValue?: string;
  helperText?: string | ((values: CalculatorFormValues) => string);
  min?: number;
  max?: number;
  step?: number;
};

export type NumberInputConfig = CalculatorInputBase & {
  type: "number" | "slider";
};

export type SelectOption = {
  value: string;
  label: string;
};

export type SelectInputConfig = CalculatorInputBase & {
  type: "select";
  options: SelectOption[] | ((values: CalculatorFormValues) => SelectOption[]);
};

export type DateInputConfig = CalculatorInputBase & {
  type: "date";
};

export type DateTimeInputConfig = CalculatorInputBase & {
  type: "datetime";
};

export type TextInputConfig = CalculatorInputBase & {
  type: "text" | "textarea";
};

export type CalculatorInputConfig =
  | NumberInputConfig
  | SelectInputConfig
  | DateInputConfig
  | DateTimeInputConfig
  | TextInputConfig;

export type CalculatorResultShape = Record<string, number | string>;

export type CalculatorConfig = {
  name: string;
  slug: string;
  category: string;
  description: string;
  inputs: CalculatorInputConfig[];
  calculate: (values: Record<string, number | string>) => CalculatorResultShape;
  renderer?: "default" | "scientific" | "amortization";
  resultLabels?: Record<string, string>;
  relatedSlugs?: string[];
};

