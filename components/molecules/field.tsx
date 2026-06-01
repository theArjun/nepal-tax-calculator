import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  hint?: string;
  /** Tailwind/legacy column class, e.g. "col-7", "col-12". */
  col?: string;
  id?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

// A labelled form field on the 12-col grid (matches the original `.field` markup).
export function Field({ label, hint, col, id, style, children }: FieldProps) {
  return (
    <div className={cn("field", col)} id={id} style={style}>
      <div className="field-label">
        <span className="lbl">{label}</span>
        {hint ? <span className="hint">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}
