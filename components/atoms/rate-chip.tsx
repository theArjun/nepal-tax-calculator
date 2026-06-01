interface RateChipProps {
  /** Rate value, or "ssf" / "credit" for the special chips. */
  rate: number | "ssf" | "credit";
  children: React.ReactNode;
}

// The pill that shows a slab's marginal rate; colour comes from [data-rate] in globals.css.
export function RateChip({ rate, children }: RateChipProps) {
  return (
    <span className="rate-chip" data-rate={String(rate)}>
      {children}
    </span>
  );
}
