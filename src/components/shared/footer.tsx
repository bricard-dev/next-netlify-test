import { NAV_LINKS } from "@/lib/navigation";
import type { SiteSettings } from "@/sanity/queries/settings";
import Link from "next/link";

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const bakeryName = settings?.bakeryName ?? "Boulangerie";

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1: Info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">{bakeryName}</h3>
            <p className="text-sm opacity-80">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Temporibus, cum!
            </p>
            {/* {settings?.address && (
              <p className="text-sm opacity-80">{settings.address}</p>
            )}
            {settings.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="text-sm opacity-80 transition-opacity hover:opacity-100"
              >
                {settings.phone}
              </a>
            )}
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="text-sm opacity-80 transition-opacity hover:opacity-100"
              >
                {settings.email}
              </a>
            )} */}
          </div>

          {/* Column 2: Schedule */}
          {/* <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Horaires</h3>
            <ul className="flex flex-col gap-1.5">
              {getGroupedWeekSchedule(settings).map(
                ({ days, formatted }, index) => (
                  <li
                    key={`${days}-${index}`}
                    className="flex justify-between gap-4 text-sm opacity-80"
                  >
                    <span>{days}</span>
                    <span>{formatted}</span>
                  </li>
                ),
              )}
            </ul>
          </div> */}

          {/* Column 3: Nav + Social */}
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <nav className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm opacity-80 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            {/* {settings.socialLinks && (
              <div className="mt-2 flex gap-4">
                {settings.socialLinks.instagram && (
                  <a
                    href={settings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-80 transition-opacity hover:opacity-100"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {settings.socialLinks.facebook && (
                  <a
                    href={settings.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-80 transition-opacity hover:opacity-100"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
              </div>
            )} */}
          </div>
        </div>

        <div className="border-primary-foreground/20 mt-10 border-t pt-6 text-center text-sm opacity-60">
          &copy; {currentYear} {bakeryName}. Tous droits r&eacute;serv&eacute;s.
        </div>
      </div>
    </footer>
  );
}
