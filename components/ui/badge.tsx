import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md font-mono text-[10px] font-semibold uppercase tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-[#FFF8F0] text-[#C25E00] border border-[#FBE3CC] px-2.5 py-0.5",
        solid:
          "bg-[#C25E00] text-white px-2 py-0.5",
        systems:
          "bg-[#F0FDF4] text-[#16A34A] border border-[#DCFCE7] px-2.5 py-0.5",
        cloud:
          "bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7] px-2.5 py-0.5",
        distributed:
          "bg-[#F0F9FF] text-[#0284C7] border border-[#E0F2FE] px-2.5 py-0.5",
        outline:
          "border border-[#E5E7EB] bg-white text-[#4B5563] px-2 py-0.5",
        pill:
          "bg-[#FDF3E7] text-[#C25E00] border border-[#FBE3CC] rounded-full px-3 py-1 text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
