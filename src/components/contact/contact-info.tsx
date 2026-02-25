import * as React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { WEEKDAY_KEYS, WEEKDAY_NAMES, formatDaySchedule } from "@/lib/schedule";
import type { ContactPageData } from "@/sanity/queries/contact-page";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ContactInfoProps extends React.HTMLAttributes<HTMLElement> {
  data: ContactPageData;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="bg-primary/10 text-primary mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

const ContactInfo = React.forwardRef<HTMLElement, ContactInfoProps>(
  ({ className, data, ...props }, ref) => {
    const { settings } = data;
    const hours = settings?.hours ?? null;

    return (
      <Section ref={ref} variant="beige" className={cn(className)} {...props}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Coordonnées ── */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-semibold lg:text-3xl">
                Nous trouver
              </h2>
              <p className="text-muted-foreground">
                Venez nous rendre visite ou contactez-nous directement.
              </p>
            </div>
            <div className="space-y-5">
              <InfoItem
                icon={MapPin}
                label="Adresse"
                value={settings?.address ?? null}
              />
              <InfoItem
                icon={Phone}
                label="Téléphone"
                value={settings?.phone ?? null}
              />
              <InfoItem
                icon={Mail}
                label="Email"
                value={settings?.email ?? null}
              />
            </div>
          </div>

          {/* ── Horaires ── */}
          {hours && (
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl font-semibold lg:text-3xl">
                  Horaires d&apos;ouverture
                </h2>
                <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Horaires susceptibles de changer les jours fériés</span>
                </div>
              </div>
              <dl className="divide-border divide-y">
                {WEEKDAY_KEYS.map((key, index) => {
                  const dayHours = hours[key] ?? null;
                  const formatted = formatDaySchedule(dayHours);
                  const isOpen = dayHours?.isOpen ?? false;
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between py-3"
                    >
                      <dt className="font-medium">{WEEKDAY_NAMES[index]}</dt>
                      <dd
                        className={cn(
                          "text-sm",
                          isOpen
                            ? "text-foreground"
                            : "text-muted-foreground italic"
                        )}
                      >
                        {formatted}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          )}
        </div>
      </Section>
    );
  }
);
ContactInfo.displayName = "ContactInfo";

export { ContactInfo };
export type { ContactInfoProps };
