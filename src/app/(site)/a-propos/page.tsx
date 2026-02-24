import { HeroSection } from "@/components/about/hero-section";
import { HistoireSection } from "@/components/about/histoire-section";
import { getAboutPageData } from "@/sanity/queries/about-page";

export default async function AboutPage() {
  const data = await getAboutPageData();

  if (!data) return null;

  return (
    <>
      <HeroSection data={data} />
      <HistoireSection data={data} />
    </>
  );
}
