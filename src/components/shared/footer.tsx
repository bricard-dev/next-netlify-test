import { BrandLogo } from "@/components/shared/brand-logo";
import { NAV_LINKS } from "@/lib/navigation";
import { getGroupedWeekSchedule } from "@/lib/schedule";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/sanity/queries/settings";
import { Clock3Icon, MapPinIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PAYMENT_METHODS = [
  { src: "/icons/payment/Visa.svg", alt: "Visa" },
  { src: "/icons/payment/Mastercard.svg", alt: "Mastercard" },
  { src: "/icons/payment/ApplePay.svg", alt: "Apple Pay" },
  { src: "/icons/payment/GooglePay.svg", alt: "Google Pay" },
] as const;

const LEGAL_LINKS = [
  {
    href: "/politique-de-confidentialite",
    label: "Politique de confidentialité",
  },
  { href: "/mentions-legales", label: "Mentions légales" },
] as const;

// ---------------------------------------------------------------------------
// Private sub-components
// ---------------------------------------------------------------------------

function FooterSection({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h3 className="hidden font-semibold lg:block">{title}</h3>
      {children}
    </div>
  );
}

function FooterSchedule({ settings }: { settings: SiteSettings }) {
  const schedule = getGroupedWeekSchedule(settings);

  return (
    <div className="flex items-start gap-3">
      <Clock3Icon className="text-primary hidden size-4 shrink-0 lg:mt-0.5 lg:block" />
      <p className="opacity-60 lg:hidden">
        {schedule
          .map(({ days, formatted }) => `${days} : ${formatted}`)
          .join(" · ")}
      </p>
      <ul className="hidden flex-col gap-0.5 opacity-60 lg:flex">
        {schedule.map(({ days, formatted }) => (
          <li key={days}>
            {days} : {formatted}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const bakeryName = settings?.bakeryName ?? "Boulangerie";

  return (
    <footer className="bg-section-dark text-footer-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:pt-24 md:pb-12">
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
          {/* Presentation */}
          <div className="flex w-full max-w-80 flex-col items-center gap-4 lg:items-start">
            <BrandLogo name={bakeryName} />
            <p className="text-center text-xs leading-[150%] opacity-60 lg:text-left lg:text-sm">
              Pain artisanal et pâtisseries cuits chaque jour avec amour et
              tradition depuis 1952.
            </p>
          </div>

          {/* Navigation */}
          <FooterSection title="Navigation">
            <nav className="flex gap-6 lg:flex-col lg:gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm opacity-80 transition-opacity hover:opacity-100 lg:opacity-60 lg:hover:opacity-80"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </FooterSection>

          {/* Informations pratiques */}
          <FooterSection title="Informations pratiques">
            <div className="flex flex-col items-center gap-2 text-xs lg:items-start lg:gap-3 lg:text-sm">
              {settings?.address && (
                <a
                  href={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <MapPinIcon className="text-primary hidden size-4 shrink-0 lg:block" />
                  <span className="opacity-60 transition-opacity hover:opacity-80">
                    {settings.address}
                  </span>
                </a>
              )}
              {settings?.hours && <FooterSchedule settings={settings} />}
              {settings?.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="flex items-center gap-3"
                >
                  <PhoneIcon className="text-primary hidden size-4 shrink-0 lg:block" />
                  <span className="opacity-60 transition-opacity hover:opacity-80">
                    {settings.phone}
                  </span>
                </a>
              )}
            </div>
          </FooterSection>

          {/* Moyens de paiement */}
          <FooterSection
            title="Nous acceptons"
            className="items-center lg:items-start"
          >
            <div className="flex flex-wrap gap-2">
              {PAYMENT_METHODS.map(({ src, alt }) => (
                <Image
                  key={alt}
                  src={src}
                  alt={alt}
                  width={35}
                  height={24}
                  className="rounded"
                  unoptimized
                />
              ))}
            </div>
          </FooterSection>
        </div>

        {/* Copyright & liens légaux */}
        <div className="border-footer-foreground/20 mt-10 flex flex-col items-center gap-6 border-t pt-6 text-xs sm:flex-row sm:justify-between lg:text-sm">
          <span className="opacity-60">
            © {currentYear} {bakeryName}. Tous droits réservés.
          </span>
          <nav className="flex gap-5 lg:gap-4">
            {LEGAL_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="opacity-60 transition-opacity hover:opacity-80"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
