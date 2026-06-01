import { cn } from "@/lib/utils";

interface SwitchFieldProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelText: string;
  stateText: string;
}

// The bespoke pill toggle (`.ssf-toggle`) used for SSF participation and CIT.
export function SwitchField({
  id,
  checked,
  onChange,
  labelText,
  stateText,
}: SwitchFieldProps) {
  return (
    <label className={cn("ssf-toggle", checked && "is-on")}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="label-text">{labelText}</span>
      <span style={{ display: "flex", alignItems: "center" }}>
        <span className="state">{stateText}</span>
        <span className="knob" aria-hidden="true" />
      </span>
    </label>
  );
}
