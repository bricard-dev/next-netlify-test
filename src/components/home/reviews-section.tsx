import { Section } from "@/components/ui/section";
import { normalizeText } from "@/lib/text";
import { urlFor } from "@/sanity/image";
import type { HomePageData, ReviewItem } from "@/sanity/queries/home-page";
import { Star } from "lucide-react";
import Image from "next/image";

const AVATAR_COLORS = [
  "bg-orange-400",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-violet-500",
  "bg-rose-400",
  "bg-amber-500",
];

function getAvatarColor(name: string): string {
  const hash = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function StarRating({ rating }: { rating: number }) {
  const normalized = Math.round(rating * 10) / 10;
  return (
    <div className="flex shrink-0 gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(1, Math.max(0, normalized - i));
        return (
          <div key={i} className="relative size-4">
            <Star className="absolute inset-0 size-4 text-white/20" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="size-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ReviewCard({ item }: { item: ReviewItem }) {
  return (
    <div className="flex flex-col gap-5 overflow-hidden rounded-2xl bg-white/10 p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {item.avatar ? (
            <div className="relative size-12 shrink-0 overflow-hidden rounded-full">
              <Image
                src={urlFor(item.avatar).width(96).height(96).url()}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div
              className={`flex size-12 shrink-0 items-center justify-center rounded-full font-sans text-base font-semibold text-white ${getAvatarColor(item.name)}`}
            >
              {item.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-white lg:text-base">
              {item.name}
            </p>
            <div className="lg:hidden">
              <StarRating rating={item.rating} />
            </div>
            {item.source && (
              <p className="hidden text-xs text-white/50 lg:block">
                {item.source}
              </p>
            )}
          </div>
        </div>
        <div className="hidden lg:block">
          <StarRating rating={item.rating} />
        </div>
      </div>

      <p className="text-sm text-white/70 lg:text-base">
        &ldquo;{normalizeText(item.text)}&rdquo;
      </p>
    </div>
  );
}

type Props = {
  data: HomePageData;
};

export function ReviewsSection({ data }: Props) {
  const { reviewsSurtitle, reviewsTitle, reviewsItems } = data;

  if (!reviewsItems?.length) return null;

  return (
    <Section variant="dark">
      <div className="mb-12 text-center">
        {reviewsSurtitle && (
          <p className="section-surtitle mb-3">{reviewsSurtitle}</p>
        )}
        {reviewsTitle && (
          <h2 className="section-title text-white">{reviewsTitle}</h2>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-3 lg:gap-6">
        {reviewsItems.map((item) => (
          <ReviewCard key={item._key} item={item} />
        ))}
      </div>
    </Section>
  );
}
