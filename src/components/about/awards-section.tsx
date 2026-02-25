import { Section } from "@/components/ui/section";
import type { AboutPageData, AwardItem } from "@/sanity/queries/about-page";
import { Medal } from "lucide-react";

type Props = {
  data: AboutPageData;
};

function FeaturedAwardCard({ award }: { award: AwardItem }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-[#FAF8F4] p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <Medal className="h-6 w-6 text-primary" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-handwritten text-primary text-lg">{award.year}</p>
        <h3 className="font-serif text-xl font-semibold leading-tight">
          {award.title}
        </h3>
        <p className="text-muted-foreground text-sm">{award.competition}</p>
      </div>
    </div>
  );
}

function AwardRow({ award }: { award: AwardItem }) {
  return (
    <div className="flex items-baseline gap-4 border-t border-border py-4 first:border-t-0">
      <span className="font-handwritten text-primary w-12 shrink-0 text-sm">
        {award.year}
      </span>
      <span className="text-muted-foreground grow text-sm">
        {award.competition}
      </span>
      <span className="text-sm font-medium">{award.title}</span>
    </div>
  );
}

export function AwardsSection({ data }: Props) {
  const { recompensesSurtitle, recompensesTitle, awards } = data;

  if (!awards || awards.length === 0) return null;

  const featured = awards.slice(0, 3);
  const rest = awards.slice(3);

  return (
    <Section variant="beige" innerClassName="flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        {recompensesSurtitle && (
          <p className="section-surtitle">{recompensesSurtitle}</p>
        )}
        {recompensesTitle && (
          <h2 className="section-title">{recompensesTitle}</h2>
        )}
      </div>

      {/* Featured awards — 3 colonnes */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((award) => (
          <FeaturedAwardCard key={award._key} award={award} />
        ))}
      </div>

      {/* Remaining awards — liste */}
      {rest.length > 0 && (
        <div className="mx-auto w-full max-w-2xl">
          {rest.map((award) => (
            <AwardRow key={award._key} award={award} />
          ))}
        </div>
      )}
    </Section>
  );
}
