import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { getGroupedWeekSchedule } from "@/lib/schedule";
import { urlFor } from "@/sanity/image";
import type { HomePageData } from "@/sanity/queries/home-page";
import type { SiteSettings } from "@/sanity/queries/settings";
import { Clock3Icon, MapPinIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: HomePageData;
  settings?: SiteSettings | null;
};

export function LocationSection({ data, settings }: Props) {
  const {
    locationSurtitle,
    locationTitle,
    locationDescription,
    locationPhoto,
    locationCta,
  } = data;

  const hasContent = locationTitle || locationDescription || settings?.address;
  if (!hasContent) return null;

  const schedule = settings ? getGroupedWeekSchedule(settings) : [];

  return (
    <Section innerClassName="grid items-stretch gap-12 lg:grid-cols-[2fr_3fr] lg:gap-20">
      {/* Photo */}
      {locationPhoto && (
        <div className="relative h-full min-h-64 w-full overflow-hidden rounded-2xl">
          <Image
            src={urlFor(locationPhoto).width(800).url()}
            alt={locationPhoto.alt ?? ""}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      )}

      {/* Info */}
      <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:gap-8 lg:text-left">
        {/* Header */}
        <div className="flex flex-col gap-4">
          {locationSurtitle && (
            <p className="section-surtitle">{locationSurtitle}</p>
          )}
          {locationTitle && <h2 className="section-title">{locationTitle}</h2>}
        </div>

        {locationDescription && (
          <p className="section-description">{locationDescription}</p>
        )}

        {/* Practical Informations */}
        <div className="flex flex-col items-center gap-2 lg:items-start lg:gap-4">
          {settings?.address && (
            <a
              href={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-start gap-3 hover:opacity-80"
            >
              <MapPinIcon className="text-primary mt-0.5 hidden size-4 shrink-0 lg:block lg:size-5" />
              <span className="text-muted-foreground text-sm lg:text-base">
                {settings.address}
              </span>
            </a>
          )}

          {settings?.hours && schedule.length > 0 && (
            <div className="flex items-start gap-3">
              <Clock3Icon className="text-primary mt-0.5 hidden size-4 shrink-0 lg:block lg:size-5" />
              <ul className="flex flex-col gap-0.5">
                {schedule.map(({ days, formatted }) => (
                  <li
                    key={days}
                    className="text-muted-foreground text-sm lg:text-base"
                  >
                    <span>{days}</span> : {formatted}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {settings?.phone && (
            <a
              href={`tel:${settings.phone}`}
              className="flex w-fit items-center gap-3 hover:opacity-80"
            >
              <PhoneIcon className="text-primary hidden size-4 shrink-0 lg:block lg:size-5" />
              <span className="text-muted-foreground text-sm lg:text-base">
                {settings.phone}
              </span>
            </a>
          )}
        </div>

        {/* CTA */}
        {locationCta && (
          <div className="w-full lg:w-auto">
            <Button asChild size="lg" className="w-full lg:w-auto">
              <Link href={locationCta.href ?? ""}>{locationCta.label}</Link>
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
}
