import type { Metadata } from "next";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { getSiteSettings } from "@/sanity/queries/settings";

const FALLBACK_TITLE = "Boulangerie artisanale";
const FALLBACK_DESCRIPTION =
  "Boulangerie artisanale française - Pain frais et pâtisseries fait maison";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title = settings?.seo?.title ?? settings?.bakeryName ?? FALLBACK_TITLE;
  const description = settings?.seo?.description ?? FALLBACK_DESCRIPTION;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const bakeryName = settings?.bakeryName ?? "Boulangerie";

  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main-content" className="skip-to-content">
        Aller au contenu principal
      </a>
      <Header bakeryName={bakeryName} settings={settings ?? undefined} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer settings={settings ?? undefined} />
    </div>
  );
}
