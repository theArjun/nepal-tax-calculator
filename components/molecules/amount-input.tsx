import { cn } from "@/lib/utils";

interface AmountInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  currencyLabel: string;
  placeholder?: string;
  ariaLabel: string;
  error?: boolean;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

// NPR-prefixed numeric field (`.amount-input`). Visual size is governed by the
// parent context (e.g. `.cit-controls .amount-input`), matching the original.
export function AmountInput({
  id,
  value,
  onChange,
  currencyLabel,
  placeholder = "0",
  ariaLabel,
  error,
  onKeyDown,
}: AmountInputProps) {
  return (
    <div className={cn("amount-input", error && "is-error")}>
      <span className="currency">{currencyLabel}</span>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
