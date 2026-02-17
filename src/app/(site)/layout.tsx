import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { getSiteSettings } from "@/sanity/queries/settings";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const bakeryName = settings?.bakeryName ?? "Boulangerie";

  return (
    <div className="flex min-h-dvh flex-col">
      <Header bakeryName={bakeryName} settings={settings ?? undefined} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings ?? undefined} />
    </div>
  );
}
