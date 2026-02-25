import * as React from "react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import type { ContactPageData } from "@/sanity/queries/contact-page";

interface HeroSectionProps extends React.HTMLAttributes<HTMLElement> {
  data: ContactPageData;
}

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  ({ className, data, ...props }, ref) => {
    const { page } = data;

    return (
      <Section ref={ref} variant="beige" className={cn(className)} {...props}>
        <div className="space-y-4 text-center lg:space-y-6">
          {page?.surtitle && (
            <p className="font-handwritten text-primary text-lg">
              {page.surtitle}
            </p>
          )}
          {page?.title && (
            <h1 className="mx-auto max-w-3xl font-serif text-4xl font-semibold lg:text-5xl">
              {page.title}
            </h1>
          )}
          {page?.subtitle && (
            <p className="text-muted-foreground mx-auto max-w-2xl text-base lg:text-lg">
              {page.subtitle}
            </p>
          )}
        </div>
      </Section>
    );
  }
);
HeroSection.displayName = "HeroSection";

export { HeroSection };
export type { HeroSectionProps };
