import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import type { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/image";
import {
  getProductBySlug,
  getProductSlugs,
  type ProductSlugsData,
} from "@/sanity/queries/product";

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return (slugs as ProductSlugsData)
    .filter((item) => item.slug !== null)
    .map((item) => ({ slug: item.slug as string }));
}

// ─── Portable Text components ─────────────────────────────────────────────────

const descriptionComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-foreground leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-2xl font-semibold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-xl font-semibold">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-primary text-muted-foreground border-l-2 pl-4 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-1 pl-5">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-1 pl-5">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-primary underline underline-offset-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const { name, price, tagline, description, image, category } = product;
  const imageUrl = image
    ? urlFor(image).width(900).height(900).url()
    : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#FAF8F4]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={image?.alt ?? name ?? ""}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="bg-muted h-full w-full" />
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-5">
          {/* Breadcrumb */}
          <div className="text-muted-foreground flex items-center gap-2 font-sans text-sm">
            <Link
              href="/produits"
              className="hover:text-foreground transition-colors"
            >
              Produits
            </Link>
            {category?.name && (
              <>
                <span>/</span>
                <span>{category.name}</span>
              </>
            )}
          </div>

          {/* Name */}
          <h1 className="font-serif text-4xl font-semibold leading-tight lg:text-5xl">
            {name}
          </h1>

          {/* Price */}
          {price != null && (
            <p className="text-primary font-sans text-3xl font-semibold">
              {price.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
          )}

          {/* Tagline */}
          {tagline && (
            <p className="text-muted-foreground font-sans text-base italic lg:text-lg">
              {tagline}
            </p>
          )}

          {/* Description */}
          {description && description.length > 0 && (
            <div className="border-border mt-2 flex flex-col gap-4 border-t pt-6 font-sans text-base">
              <PortableText
                value={description}
                components={descriptionComponents}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
