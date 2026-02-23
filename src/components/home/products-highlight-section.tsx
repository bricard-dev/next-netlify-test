import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import type { HomePageData } from "@/sanity/queries/home-page";
import Link from "next/link";
import { ProductCard } from "@/components/ui/product-card";

type Props = {
  data: HomePageData;
};

export function ProductsHighlightSection({ data }: Props) {
  const {
    productsSurtitle,
    productsTitle,
    productsSubtitle,
    featuredProducts,
  } = data;

  if (!featuredProducts?.length) return null;

  return (
    <Section variant="beige">
      {/* Header */}
      <div className="mb-12 text-center">
        {productsSurtitle && (
          <p className="section-surtitle mb-4">
            {productsSurtitle}
          </p>
        )}
        {productsTitle && (
          <h2 className="section-title mb-4">{productsTitle}</h2>
        )}
        {productsSubtitle && (
          <p className="section-subtitle mx-auto max-w-xl">
            {productsSubtitle}
          </p>
        )}
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10 text-center">
        <Button asChild variant="default" size="lg" className="w-full lg:w-auto">
          <Link href="/produits">Voir tous nos produits</Link>
        </Button>
      </div>
    </Section>
  );
}
