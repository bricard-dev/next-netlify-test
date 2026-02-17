"use client";

import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/navigation";
import { getGroupedWeekSchedule } from "@/lib/schedule";
import { cn } from "@/lib/utils";
import { SiteSettings } from "@/sanity/queries/settings";
import {
  Clock3Icon,
  CroissantIcon,
  MapPinIcon,
  Menu,
  PhoneIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NavLink } from "./nav-link";

const CTA = { href: "/produits", label: "Voir nos produits" } as const;

// ---------------------------------------------------------------------------
// Sous-composant privé – panneau de navigation mobile
// ---------------------------------------------------------------------------

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  settings?: SiteSettings;
};

function MobileMenu({ open, onClose, settings }: MobileMenuProps) {
  return (
    <div
      className={cn(
        "flex h-[calc(100dvh-4rem)] flex-col gap-6 p-4 transition-opacity duration-300 lg:hidden",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <nav className="flex flex-col">
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            variant="mobile"
            onClick={onClose}
          />
        ))}
      </nav>

      <Button asChild className="w-full" onClick={onClose}>
        <Link href={CTA.href}>{CTA.label}</Link>
      </Button>

      {/* Informations pratiques */}
      <div className="-mx-4 flex flex-col items-center gap-6 bg-[#FAF8F4] px-4 py-8">
        <h3 className="text-primary font-sans text-xs font-semibold tracking-widest uppercase">
          Nous rendre visite
        </h3>
        <div className="flex flex-col gap-3">
          {settings?.address && (
            <a
              href={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3"
            >
              <MapPinIcon className="text-primary size-4 shrink-0" />
              <span className="text-muted-foreground text-sm">
                {settings.address}
              </span>
            </a>
          )}
          {settings?.hours && (
            <div className="flex items-center gap-3">
              <Clock3Icon className="text-primary mt-0.5 size-4 shrink-0" />
              <ul className="flex flex-col gap-0.5">
                {getGroupedWeekSchedule(settings).map(({ days, formatted }) => (
                  <li key={days} className="text-muted-foreground flex text-sm">
                    <span>
                      {days} : {formatted}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {settings?.phone && (
            <a
              href={`tel:${settings.phone}`}
              className="flex items-center gap-3"
            >
              <PhoneIcon className="text-primary size-4 shrink-0" />
              <span className="text-muted-foreground text-sm">
                {settings.phone}
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

type HeaderProps = {
  bakeryName: string;
  settings?: SiteSettings;
};

export function Header({ bakeryName, settings }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={cn(
        "bg-background sticky top-0 z-50 overflow-hidden border-b transition-[height] duration-300 ease-in-out",
        menuOpen ? "min-h-dvh" : "h-16",
      )}
    >
      {/* Barre supérieure */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <CroissantIcon className="size-5" aria-hidden="true" />
          <span className="font-serif text-lg font-bold">{bakeryName}</span>
        </Link>

        {/* Navigation desktop */}
        <div className="hidden items-center gap-8 lg:flex">
          <nav className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>
          <Button asChild size="sm">
            <Link href={CTA.href}>{CTA.label}</Link>
          </Button>
        </div>

        {/* Bouton burger – mobile uniquement */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      <MobileMenu open={menuOpen} onClose={closeMenu} settings={settings} />
    </header>
  );
}
