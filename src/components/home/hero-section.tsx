import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/image";
import type { HomePageData } from "@/sanity/queries/home-page";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: HomePageData;
};

export function HeroSection({ data }: Props) {
  const {
    heroSurtitle,
    heroTitle,
    heroSubtitle,
    heroImage,
    heroPrimaryCta,
    heroSecondaryCta,
  } = data;

  return (
    <section className="relative flex items-center justify-center overflow-hidden lg:min-h-[calc(100dvh-4rem)]">
      {/* Background image */}
      {heroImage ? (
        <Image
          src={urlFor(heroImage).width(1920).height(1080).url()}
          alt={heroImage.alt ?? heroTitle ?? ""}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-stone-800" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#3E1B09]/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 py-24 text-center text-white max-lg:px-4 lg:gap-8">
        {heroSurtitle && (
          <p className="font-handwritten font-semibold text-white/80 lg:text-xl">
            {heroSurtitle}
          </p>
        )}

        {heroTitle && (
          <h1 className="text-5xl font-semibold lg:text-7xl">{heroTitle}</h1>
        )}

        {heroSubtitle && (
          <p className="text-lg text-white/80 lg:text-xl">{heroSubtitle}</p>
        )}

        {(heroPrimaryCta || heroSecondaryCta) && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {heroPrimaryCta && (
              <Button asChild size="lg">
                <Link href={heroPrimaryCta.href}>{heroPrimaryCta.label}</Link>
              </Button>
            )}
            {heroSecondaryCta && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/70 bg-white/10 text-white hover:bg-white/20 hover:text-white"
              >
                <Link href={heroSecondaryCta.href}>
                  {heroSecondaryCta.label}
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
