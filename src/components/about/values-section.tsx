import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import type { AboutPageData, ValueItem } from "@/sanity/queries/about-page";
import {
  Award,
  Cake,
  CakeSlice,
  ChefHat,
  Clock,
  Heart,
  Leaf,
  Package,
  Sandwich,
  Star,
  Truck,
  Wheat,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Wheat,
  ChefHat,
  Heart,
  Truck,
  Clock,
  Award,
  Leaf,
  Star,
  Package,
  Cake,
  CakeSlice,
  Sandwich,
};

function ValueIcon({ name }: { name?: string | null }) {
  if (!name) return null;
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className="text-primary size-8" />;
}

function ValueCard({ item }: { item: ValueItem }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <ValueIcon name={item.iconName} />
      <h3 className="text-lg font-medium">{item.title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}

type Props = {
  data: AboutPageData;
};

export function ValuesSection({ data }: Props) {
  const { valeursSurtitle, valeursTitle, values } = data;

  if (!values?.length) return null;

  return (
    <Section innerClassName="flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 text-center">
        {valeursSurtitle && (
          <p className="section-surtitle">{valeursSurtitle}</p>
        )}
        {valeursTitle && <h2 className="section-title">{valeursTitle}</h2>}
      </div>

      {/* Grid — centré si moins de 4 valeurs */}
      <div
        className={cn(
          "grid gap-8",
          values.length >= 4
            ? "lg:grid-cols-4"
            : "lg:mx-auto lg:max-w-3xl lg:grid-cols-3",
        )}
      >
        {values.map((item) => (
          <ValueCard key={item._key} item={item} />
        ))}
      </div>
    </Section>
  );
}
