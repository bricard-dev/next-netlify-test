import { Section } from "@/components/ui/section";
import type { AboutPageData } from "@/sanity/queries/about-page";

type Props = {
  data: AboutPageData;
};

export function HeroSection({ data }: Props) {
  const { heroSurtitle, heroTitle, heroSubtitle } = data;

  return (
    <Section variant="beige">
      <div className="space-y-4 text-center lg:space-y-6">
        {heroSurtitle && (
          <p className="font-handwritten text-primary text-lg">{heroSurtitle}</p>
        )}
        {heroTitle && (
          <h1 className="mx-auto max-w-3xl font-serif text-4xl font-semibold lg:text-5xl">
            {heroTitle}
          </h1>
        )}
        {heroSubtitle && (
          <p className="text-muted-foreground mx-auto max-w-2xl text-base lg:text-lg">
            {heroSubtitle}
          </p>
        )}
      </div>
    </Section>
  );
}
