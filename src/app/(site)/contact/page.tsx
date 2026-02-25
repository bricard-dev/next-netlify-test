import { getContactPageData } from "@/sanity/queries/contact-page";
import { HeroSection } from "@/components/contact/hero-section";
import { ContactInfo } from "@/components/contact/contact-info";
import { Section } from "@/components/ui/section";

export default async function ContactPage() {
  const data = await getContactPageData();

  if (!data) return null;

  return (
    <>
      <HeroSection data={data} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <ContactInfo data={data} />
          {/* Formulaire de contact (BAS-73) */}
        </div>
      </Section>
    </>
  );
}
