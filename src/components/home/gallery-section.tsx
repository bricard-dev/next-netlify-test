import { Section } from "@/components/ui/section";
import { urlFor } from "@/sanity/image";
import type { HomePageData, SanityImageWithAlt } from "@/sanity/queries/home-page";
import type { SiteSettings } from "@/sanity/queries/settings";
import Image from "next/image";
import Link from "next/link";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className ?? "size-9"}
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

const DESKTOP_COLUMNS = [
  ["aspect-4/3", "aspect-3/4"],
  ["aspect-3/4", "aspect-4/3"],
  ["aspect-4/3", "aspect-3/4"],
] as const;

const MOBILE_COLUMNS = [
  ["aspect-4/3", "aspect-3/4", "aspect-square"],
  ["aspect-square", "aspect-4/3", "aspect-3/4"],
] as const;

type TileProps = {
  image: SanityImageWithAlt;
  aspect: string;
  sizes: string;
  width: number;
  instagramUrl?: string;
};

function GalleryTile({ image, aspect, sizes, width, instagramUrl }: TileProps) {
  const img = (
    <Image
      src={urlFor(image).width(width).url()}
      alt={image.alt ?? ""}
      fill
      className={`object-cover${instagramUrl ? " transition-transform duration-500 group-hover:scale-105" : ""}`}
      sizes={sizes}
    />
  );

  if (instagramUrl) {
    return (
      <Link
        href={instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative ${aspect} overflow-hidden rounded-xl`}
      >
        {img}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 backdrop-blur-none transition-all duration-300 group-hover:bg-black/40 group-hover:backdrop-blur-[2px]">
          <InstagramIcon className="size-9 scale-75 text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
        </div>
      </Link>
    );
  }

  return (
    <div className={`relative ${aspect} overflow-hidden rounded-xl`}>
      {img}
    </div>
  );
}

type Props = {
  data: HomePageData;
  settings: SiteSettings | null;
};

export function GallerySection({ data, settings }: Props) {
  const images = data.galleryImages;
  const instagramUrl = settings?.instagramUrl ?? undefined;

  if (!images?.length) return null;

  return (
    <Section variant="beige">
      {/* Mobile: 2 colonnes × 3 images */}
      <div className="flex gap-3 lg:hidden">
        {MOBILE_COLUMNS.map((aspects, colIndex) => (
          <div key={colIndex} className="flex flex-1 flex-col gap-3">
            {aspects.map((aspect, rowIndex) => {
              const image = images[colIndex * 3 + rowIndex];
              if (!image) return null;
              return (
                <GalleryTile
                  key={rowIndex}
                  image={image}
                  aspect={aspect}
                  sizes="50vw"
                  width={600}
                  instagramUrl={instagramUrl}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Desktop: 3 colonnes × 2 images */}
      <div className="hidden gap-3 lg:flex">
        {DESKTOP_COLUMNS.map((aspects, colIndex) => (
          <div key={colIndex} className="flex flex-1 flex-col gap-3">
            {aspects.map((aspect, rowIndex) => {
              const image = images[colIndex * 2 + rowIndex];
              if (!image) return null;
              return (
                <GalleryTile
                  key={rowIndex}
                  image={image}
                  aspect={aspect}
                  sizes="33vw"
                  width={900}
                  instagramUrl={instagramUrl}
                />
              );
            })}
          </div>
        ))}
      </div>
    </Section>
  );
}
