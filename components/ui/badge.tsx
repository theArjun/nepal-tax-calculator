import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Variants map to the bespoke pill styles from the original design.
const badgeVariants = cva("", {
  variants: {
    variant: {
      pill: "fy-pill",
      meta: "meta",
      tag: "tag",
    },
  },
  defaultVariants: { variant: "meta" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
