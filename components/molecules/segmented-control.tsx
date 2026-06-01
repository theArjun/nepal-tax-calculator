import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: SegmentedOption<T>[];
  ariaLabel: string;
  className?: string;
}

// Radio-group styled as a segmented pill (`.segmented`). Native inputs preserve the
// exact `input:checked + label` styling from the original.
export function SegmentedControl<T extends string>({
  name,
  value,
  onChange,
  options,
  ariaLabel,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div className={cn("segmented", className)} role="radiogroup" aria-label={ariaLabel}>
      {options.map((opt) => {
        const id = `${name}-${opt.value}`;
        return (
          <Fragment key={opt.value}>
            <input
              type="radio"
              id={id}
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <label htmlFor={id}>{opt.label}</label>
          </Fragment>
        );
      })}
    </div>
  );
}
