import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { getSiteSettings } from "@/sanity/queries/settings";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const bakeryName = settings?.bakeryName ?? "Boulangerie";

  return (
    <div className="flex min-h-screen flex-col">
      <Header bakeryName={bakeryName} logo={settings?.logo} />
      <main className="flex-1">{children}</main>
      {settings && <Footer settings={settings} />}
    </div>
  );
}
