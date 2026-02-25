import { getContactPageData } from "@/sanity/queries/contact-page";
import { HeroSection } from "@/components/contact/hero-section";
import { ContactInfo } from "@/components/contact/contact-info";

export default async function ContactPage() {
  const data = await getContactPageData();

  if (!data) return null;

  return (
    <>
      <HeroSection data={data} />
      <ContactInfo data={data} />
    </>
  );
}
