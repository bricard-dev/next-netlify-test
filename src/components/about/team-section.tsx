import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";
import { urlFor } from "@/sanity/image";
import type { AboutPageData, TeamMember } from "@/sanity/queries/about-page";
import { User } from "lucide-react";
import Image from "next/image";

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {/* Photo */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
        {member.photo ? (
          <Image
            src={urlFor(member.photo).width(400).height(400).url()}
            alt={member.photo.alt ?? member.name ?? ""}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <User className="text-muted-foreground size-12" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <p className="font-medium">{member.name}</p>
        <p className="text-muted-foreground text-sm">{member.role}</p>
      </div>
    </div>
  );
}

type Props = {
  data: AboutPageData;
};

export function TeamSection({ data }: Props) {
  const { equipeSurtitle, equipeTitle, team } = data;

  if (!team?.length) return null;

  return (
    <Section variant="beige" innerClassName="flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        {equipeSurtitle && (
          <p className="section-surtitle">{equipeSurtitle}</p>
        )}
        {equipeTitle && <h2 className="section-title">{equipeTitle}</h2>}
      </div>

      {/* Grid */}
      <div
        className={cn(
          "grid grid-cols-2 gap-8",
          team.length >= 4 ? "lg:grid-cols-4" : "lg:mx-auto lg:max-w-3xl lg:grid-cols-3"
        )}
      >
        {team.map((member) => (
          <MemberCard key={member._key} member={member} />
        ))}
      </div>
    </Section>
  );
}
