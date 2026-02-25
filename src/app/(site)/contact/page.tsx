import { getContactPageData } from "@/sanity/queries/contact-page";
import { HeroSection } from "@/components/contact/hero-section";
import { ContactInfo } from "@/components/contact/contact-info";
import { ContactForm } from "@/components/contact/contact-form";
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
          <div className="lg:col-span-2">
            <ContactForm
              formTitle={data.page?.formTitle}
              formSubtitle={data.page?.formSubtitle}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
