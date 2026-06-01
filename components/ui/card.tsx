import * as React from "react";
import { cn } from "@/lib/utils";

// Maps to the original `.card` / `.card-pad` look (see globals.css).
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { pad?: boolean }
>(({ className, pad = true, ...props }, ref) => (
  <div ref={ref} className={cn("card", pad && "card-pad", className)} {...props} />
));
Card.displayName = "Card";

export { Card };
