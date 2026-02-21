import { urlFor } from "@/sanity/image";
import type { Product } from "@/sanity/queries/home-page";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const { name, tagline, price, image, slug } = product;
  const imageUrl = image ? urlFor(image).width(600).height(400).url() : null;

  return (
    <Link
      href={`/produits/${slug?.current ?? ""}`}
      className="group border-border bg-card flex flex-col overflow-hidden rounded-2xl border shadow-xs transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-3/2 overflow-hidden">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={image?.alt ?? name ?? ""}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col items-center gap-1 p-4 text-center">
        <h3 className="text-base font-medium">{name}</h3>
        {tagline && (
          <p className="text-muted-foreground line-clamp-2 font-sans text-sm">
            {tagline}
          </p>
        )}
        {price && (
          <p className="text-primary mt-auto pt-2 font-sans text-sm font-semibold">
            {price} €
          </p>
        )}
      </div>
    </Link>
  );
}
