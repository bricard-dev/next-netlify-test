import { AwardsSection } from "@/components/about/awards-section";
import { HeroSection } from "@/components/about/hero-section";
import { StorySection } from "@/components/about/story-section";
import { getAboutPageData } from "@/sanity/queries/about-page";

export default async function AboutPage() {
  const data = await getAboutPageData();

  if (!data) return null;

  return (
    <>
      <HeroSection data={data} />
      <StorySection data={data} />
      <AwardsSection data={data} />
    </>
  );
}
