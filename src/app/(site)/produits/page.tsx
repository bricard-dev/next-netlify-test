import { ProductCard } from "@/components/ui/product-card";
import { Section } from "@/components/ui/section";
import {
  getProductsPageData,
  type CatalogueProduct,
  type CategorySection,
} from "@/sanity/queries/products-page";

export default async function ProductsPage() {
  const data = await getProductsPageData();

  if (!data) return null;

  const { surtitle, title, subtitle, categorySections } = data;

  return (
    <>
      {/* Hero */}
      <Section variant="beige">
        <div className="flex flex-col gap-4 py-4 text-center lg:gap-6">
          {surtitle && (
            <p className="font-handwritten text-primary text-lg">{surtitle}</p>
          )}
          {title && (
            <h1 className="font-serif text-4xl font-semibold lg:text-5xl">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-muted-foreground mx-auto max-w-2xl text-base lg:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </Section>

      {/* Category sections */}
      {categorySections?.map((category: CategorySection, index: number) => (
        <Section
          key={category._id}
          variant={index % 2 === 0 ? "default" : "beige"}
          className="py-10 lg:py-15"
        >
          <div className="mb-10 flex items-center justify-between gap-10">
            <div className="flex flex-col gap-2">
              <h2 className="font-serif text-xl font-semibold lg:text-3xl">
                {category.name}
              </h2>
              {category.tagline && (
                <p className="text-muted-foreground text-sm lg:text-base">
                  {category.tagline}
                </p>
              )}
            </div>
            <p className="text-muted-foreground shrink-0 font-sans text-sm font-medium">
              {category.products.length} produit
              {category.products.length > 1 ? "s" : ""}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {category.products.map((product: CatalogueProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}
