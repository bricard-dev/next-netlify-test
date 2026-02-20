import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { urlFor } from "@/sanity/image";
import type { HomePageData } from "@/sanity/queries/home-page";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: HomePageData;
};

export function AboutSection({ data }: Props) {
  const { aboutSurtitle, aboutTitle, aboutDescription, aboutCta, aboutPhoto } =
    data;

  if (!aboutTitle && !aboutDescription) return null;

  return (
    <Section
      variant="dark"
      innerClassName="grid items-stretch gap-12 lg:grid-cols-[3fr_2fr] lg:gap-20"
    >
      {/* Text */}
      <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
        {/* Header */}
        <div className="flex flex-col gap-4">
          {aboutSurtitle && <p className="section-surtitle">{aboutSurtitle}</p>}
          {aboutTitle && (
            <h2 className="section-title whitespace-pre-line text-white">{aboutTitle}</h2>
          )}
        </div>

        {/* Content */}
        <div>
          {aboutDescription && (
            <PortableText
              value={aboutDescription}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="section-description text-white/70 not-last:mb-4">
                      {children}
                    </p>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                  ),
                  em: ({ children }) => <em className="italic">{children}</em>,
                },
              }}
            />
          )}
        </div>

        {/* CTA */}
        {aboutCta && (
          <div className="w-full lg:w-auto">
            <Button variant="secondary" size="lg" asChild className="w-full lg:w-auto">
              <Link href={aboutCta.href}>{aboutCta.label}</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Photo */}
      {aboutPhoto && (
        <div className="relative h-full min-h-80 w-full overflow-hidden rounded-2xl">
          <Image
            src={urlFor(aboutPhoto).width(800).url()}
            alt={aboutPhoto.alt ?? aboutTitle ?? ""}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      )}
    </Section>
  );
}
