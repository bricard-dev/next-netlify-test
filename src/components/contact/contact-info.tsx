import * as React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { getGroupedWeekSchedule } from "@/lib/schedule";
import type { SiteSettings } from "@/sanity/queries/settings";
import type { ContactPageData } from "@/sanity/queries/contact-page";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ContactInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  data: ContactPageData;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function InfoItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-primary/10 text-primary mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        {children}
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

const ContactInfo = React.forwardRef<HTMLDivElement, ContactInfoProps>(
  ({ className, data, ...props }, ref) => {
    const { settings } = data;
    const groupedHours = getGroupedWeekSchedule(
      settings as unknown as SiteSettings
    );

    return (
      <div ref={ref} className={cn("space-y-6", className)} {...props}>
        <h2 className="font-serif text-2xl font-semibold">Nous trouver</h2>
        <div className="space-y-5">
          {settings?.address && (
            <InfoItem icon={MapPin} label="Adresse">
              <p className="text-muted-foreground">{settings.address}</p>
            </InfoItem>
          )}

          {settings?.phone && (
            <InfoItem icon={Phone} label="Téléphone">
              <p className="text-muted-foreground">{settings.phone}</p>
            </InfoItem>
          )}

          {groupedHours.length > 0 && (
            <InfoItem icon={Clock} label="Horaires">
              <div>
                {groupedHours.map(({ days, formatted }) => (
                  <p key={days} className="text-muted-foreground">
                    {days} : {formatted}
                  </p>
                ))}
              </div>
            </InfoItem>
          )}

          {settings?.email && (
            <InfoItem icon={Mail} label="Email">
              <p className="text-muted-foreground">{settings.email}</p>
            </InfoItem>
          )}
        </div>
      </div>
    );
  }
);
ContactInfo.displayName = "ContactInfo";

export { ContactInfo };
export type { ContactInfoProps };
