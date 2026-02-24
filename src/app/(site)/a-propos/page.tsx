import { Section } from "@/components/ui/section";
import { getAboutPageData } from "@/sanity/queries/about-page";

export default async function AboutPage() {
  const data = await getAboutPageData();

  if (!data) return null;

  const { heroSurtitle, heroTitle, heroSubtitle } = data;

  return (
    <>
      {/* Hero */}
      <Section variant="beige">
        <div className="space-y-4 text-center lg:space-y-6">
          {heroSurtitle && (
            <p className="font-handwritten text-primary text-lg">
              {heroSurtitle}
            </p>
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
    </>
  );
}
