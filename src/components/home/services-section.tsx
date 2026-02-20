import { Section } from "@/components/ui/section";
import type { HomePageData, ServiceItem } from "@/sanity/queries/home-page";
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

function ServiceIcon({ name }: { name?: string }) {
  if (!name) return null;
  const Icon = ICON_MAP[name];
  if (!Icon) return null;
  return <Icon className="text-primary size-8" />;
}

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <ServiceIcon name={item.iconName} />
      <h3 className="text-lg font-medium">{item.title}</h3>
      <p className="text-muted-foreground font-sans text-sm leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}

type Props = {
  data: HomePageData;
};

export function ServicesSection({ data }: Props) {
  const { servicesItems } = data;

  if (!servicesItems?.length) return null;

  return (
    <Section variant="beige">
      <div className="grid gap-6 lg:grid-cols-3">
        {servicesItems.map((item) => (
          <ServiceCard key={item._key} item={item} />
        ))}
      </div>
    </Section>
  );
}
