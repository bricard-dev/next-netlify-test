import { Section } from "@/components/ui/section";
import { urlFor } from "@/sanity/image";
import type { AboutPageData } from "@/sanity/queries/about-page";
import Image from "next/image";
import { PortableText } from "next-sanity";

type Props = {
  data: AboutPageData;
};

export function HistoireSection({ data }: Props) {
  const { histoireSurtitle, histoireTitle, histoireContent, histoirePhoto } =
    data;

  if (!histoireTitle && !histoireContent) return null;

  return (
    <Section innerClassName="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      {/* Text */}
      <div className="flex flex-col gap-6">
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
                  em: ({ children }) => <em className="italic">{children}</em>,
                },
              }}
            />
          </div>
        )}
      </div>

      {/* Photo */}
      {histoirePhoto && (
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
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
  );
}
