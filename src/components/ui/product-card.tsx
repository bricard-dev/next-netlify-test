import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/image";

type ProductCardItem = {
  name?: string | null;
  slug?: { current?: string | null } | null;
  tagline?: string | null;
  price?: number | null;
  image?: ({
    asset?: unknown;
    hotspot?: unknown;
    crop?: unknown;
    alt?: string | null;
  } & object) | null;
};

interface ProductCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  product: ProductCardItem;
}

const ProductCard = React.forwardRef<HTMLAnchorElement, ProductCardProps>(
  ({ product, className, ...props }, ref) => {
    const { name, tagline, price, image, slug } = product;
    const imageUrl = image
      ? urlFor(image).width(600).height(400).url()
      : null;

    return (
      <Link
        ref={ref}
        href={`/produits/${slug?.current ?? ""}`}
        className={cn(
          "group border-border bg-card flex flex-col overflow-hidden rounded-2xl border shadow-xs transition-shadow hover:shadow-md",
          className
        )}
        {...props}
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
          {price != null && (
            <p className="text-primary mt-auto pt-2 font-sans text-sm font-semibold">
              {price.toLocaleString("fr-FR", {
                style: "currency",
                currency: "EUR",
              })}
            </p>
          )}
        </div>
      </Link>
    );
  }
);
ProductCard.displayName = "ProductCard";

export { ProductCard };
export type { ProductCardItem, ProductCardProps };
