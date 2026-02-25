import { getContactPageData } from "@/sanity/queries/contact-page";
import { ContactInfo } from "@/components/contact/contact-info";
import { Section } from "@/components/ui/section";

export default async function ContactPage() {
  const data = await getContactPageData();

  if (!data) return null;

  const { page } = data;

  return (
    <>
      {/* Hero */}
      <Section variant="beige">
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

      {/* Infos boulangerie */}
      <ContactInfo data={data} />
    </>
  );
}
