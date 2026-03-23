import { CalculatorSearchBox } from "@/components/search/CalculatorSearchBox";

type SearchInputProps = {
  placeholder?: string;
  defaultValue?: string;
  autoFocus?: boolean;
};

export function SearchInput({
  placeholder,
  defaultValue,
  autoFocus
}: SearchInputProps) {
  return (
    <CalculatorSearchBox
      placeholder={placeholder}
      defaultValue={defaultValue}
      autoFocus={autoFocus}
      showSuggestions
    />
  );
}

