import { Section } from "@/components/ui/section";
import { urlFor } from "@/sanity/image";
import { getAboutPageData } from "@/sanity/queries/about-page";
import Image from "next/image";
import { PortableText } from "next-sanity";

export default async function AboutPage() {
  const data = await getAboutPageData();

  if (!data) return null;

  const {
    heroSurtitle,
    heroTitle,
    heroSubtitle,
    histoireSurtitle,
    histoireTitle,
    histoireContent,
    histoirePhoto,
  } = data;

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

      {/* Notre Histoire */}
      <Section innerClassName="mx-auto max-w-3xl px-4 md:px-6 lg:max-w-7xl grid items-stretch gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20">
        {/* Text */}
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <div className="flex flex-col gap-4">
            {histoireSurtitle && (
              <p className="section-surtitle">{histoireSurtitle}</p>
            )}
            {histoireTitle && (
              <h2 className="section-title">{histoireTitle}</h2>
            )}
          </div>
          {histoireContent && (
            <div className="section-description">
              <PortableText
                value={histoireContent}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="not-last:mb-4">{children}</p>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-semibold">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic">{children}</em>
                    ),
                  },
                }}
              />
            </div>
          )}
        </div>

        {/* Photo */}
        {histoirePhoto && (
          <div className="relative h-full min-h-80 w-full overflow-hidden rounded-2xl">
            <Image
              src={urlFor(histoirePhoto).width(800).url()}
              alt={histoirePhoto.alt ?? histoireTitle ?? "Notre histoire"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        )}
      </Section>
    </>
  );
}
