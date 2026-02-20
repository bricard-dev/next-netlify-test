import { AboutSection } from "@/components/home/about-section";
import { GallerySection } from "@/components/home/gallery-section";
import { HeroSection } from "@/components/home/hero-section";
import { LocationSection } from "@/components/home/location-section";
import { ProductsHighlightSection } from "@/components/home/products-highlight-section";
import { ReviewsSection } from "@/components/home/reviews-section";
import { ServicesSection } from "@/components/home/services-section";
import { getHomePageData } from "@/sanity/queries/home-page";
import { getSiteSettings } from "@/sanity/queries/settings";

export default async function Home() {
  const [data, settings] = await Promise.all([
    getHomePageData(),
    getSiteSettings(),
  ]);

  if (!data) return null;

  return (
    <>
      <HeroSection data={data} />
      <ProductsHighlightSection data={data} />
      <AboutSection data={data} />
      <LocationSection data={data} settings={settings} />
      <ServicesSection data={data} />
      <ReviewsSection data={data} />
      <GallerySection data={data} settings={settings} />
    </>
  );
}
