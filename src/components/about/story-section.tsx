import { Section } from "@/components/ui/section";
import { urlFor } from "@/sanity/image";
import type { AboutPageData } from "@/sanity/queries/about-page";
import { PortableText, type PortableTextComponents } from "next-sanity";
import Image from "next/image";

type Props = {
  data: AboutPageData;
};

type StoryContent = NonNullable<AboutPageData["storyContent"]>;

// U+00A0 (non-breaking space) prevents text from wrapping — normalize to regular spaces.
function normalizeNbsp(content: StoryContent): StoryContent {
  return content.map((block) => ({
    ...block,
    children: block.children?.map((child) => ({
      ...child,
      text: child.text?.replace(/\u00A0/g, " "),
    })),
  }));
}

const portableTextComponents: PortableTextComponents = {
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export function StorySection({ data }: Props) {
  const { storySurtitle, storyTitle, storyContent, storyPhoto } = data;

  if (!storyTitle && !storyContent) return null;

  return (
    <Section innerClassName="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      {/* Text */}
      <div className="flex min-w-0 flex-col gap-6">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          {storySurtitle && <p className="section-surtitle">{storySurtitle}</p>}
          {storyTitle && <h2 className="section-title">{storyTitle}</h2>}
        </div>
        {storyContent && (
          <div className="prose prose-sm lg:prose-base prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
            <PortableText
              value={normalizeNbsp(storyContent)}
              components={portableTextComponents}
            />
          </div>
        )}
      </div>

      {/* Photo */}
      {storyPhoto && (
        <div className="relative h-full min-h-80 w-full overflow-hidden rounded-2xl">
          <Image
            src={urlFor(storyPhoto).width(1980).url()}
            alt={storyPhoto.alt ?? storyTitle ?? "Notre histoire"}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      )}
    </Section>
  );
}
