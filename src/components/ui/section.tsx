import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("py-20 md:py-28", {
  variants: {
    variant: {
      default: "bg-background",
      beige: "bg-[#FAF8F4]",
      dark: "bg-section-dark",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  fullWidth?: boolean;
  innerClassName?: string;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    { className, variant, fullWidth = false, innerClassName, children, ...props },
    ref
  ) => (
    <section
      ref={ref}
      className={cn(sectionVariants({ variant }), className)}
      {...props}
    >
      {fullWidth ? (
        children
      ) : (
        <div className={cn("mx-auto max-w-3xl px-4 md:px-6 lg:max-w-7xl", innerClassName)}>
          {children}
        </div>
      )}
    </section>
  )
);
Section.displayName = "Section";

export { Section, sectionVariants };
export type { SectionProps };
