"use client";

import { sendContactEmail } from "@/app/(site)/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import { useForm } from "@tanstack/react-form";
import * as React from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ContactFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formTitle?: string | null;
  formSubtitle?: string | null;
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function FieldError({ errors }: { errors: string[] }) {
  if (!errors.length) return null;
  return (
    <p className="text-destructive text-sm" role="alert">
      {errors[0]}
    </p>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

const ContactForm = React.forwardRef<HTMLDivElement, ContactFormProps>(
  ({ className, formTitle, formSubtitle, ...props }, ref) => {
    const [submitState, setSubmitState] = React.useState<
      "idle" | "success" | "error"
    >("idle");
    const [errorMessage, setErrorMessage] = React.useState("");

    const form = useForm({
      defaultValues: { name: "", email: "", subject: "", message: "" },
      onSubmit: async ({ value }) => {
        setSubmitState("idle");
        const result = await sendContactEmail(value);
        if (result.success) {
          setSubmitState("success");
          form.reset();
        } else {
          setSubmitState("error");
          setErrorMessage(result.error ?? "Une erreur s'est produite.");
        }
      },
    });

    return (
      <div
        ref={ref}
        className={cn(
          "space-y-8 rounded-2xl bg-[#FAF8F4] p-8 lg:p-10",
          className,
        )}
        {...props}
      >
        {/* ── Header ── */}
        {(formTitle || formSubtitle) && (
          <div className="space-y-2">
            {formTitle && (
              <h2 className="font-serif text-2xl font-semibold">{formTitle}</h2>
            )}
            {formSubtitle && (
              <p className="text-muted-foreground">{formSubtitle}</p>
            )}
          </div>
        )}

        {/* ── Success ── */}
        {submitState === "success" && (
          <div className="bg-primary/10 text-primary rounded-lg p-4 text-sm font-medium">
            Message envoyé avec succès. Nous vous répondrons dans les plus brefs
            délais.
          </div>
        )}

        {/* ── Error ── */}
        {submitState === "error" && (
          <div className="bg-destructive/10 text-destructive rounded-lg p-4 text-sm font-medium">
            {errorMessage}
          </div>
        )}

        {/* ── Form ── */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          noValidate
          className="space-y-5"
        >
          {/* Nom */}
          <form.Field
            name="name"
            validators={{
              onBlur: ({ value }) => {
                const result = contactSchema.shape.name.safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2.5">
                <Label htmlFor={field.name}>Nom</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Votre nom"
                  aria-invalid={field.state.meta.errors.length > 0}
                  aria-describedby={`${field.name}-error`}
                />
                <FieldError errors={field.state.meta.errors as string[]} />
              </div>
            )}
          </form.Field>

          {/* Email */}
          <form.Field
            name="email"
            validators={{
              onBlur: ({ value }) => {
                const result = contactSchema.shape.email.safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2.5">
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="votre@email.fr"
                  aria-invalid={field.state.meta.errors.length > 0}
                  aria-describedby={`${field.name}-error`}
                />
                <FieldError errors={field.state.meta.errors as string[]} />
              </div>
            )}
          </form.Field>

          {/* Objet */}
          <form.Field
            name="subject"
            validators={{
              onBlur: ({ value }) => {
                const result = contactSchema.shape.subject.safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2.5">
                <Label htmlFor={field.name}>Objet</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Objet de votre message"
                  aria-invalid={field.state.meta.errors.length > 0}
                  aria-describedby={`${field.name}-error`}
                />
                <FieldError errors={field.state.meta.errors as string[]} />
              </div>
            )}
          </form.Field>

          {/* Message */}
          <form.Field
            name="message"
            validators={{
              onBlur: ({ value }) => {
                const result = contactSchema.shape.message.safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2.5">
                <Label htmlFor={field.name}>Message</Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Votre message…"
                  rows={8}
                  aria-invalid={field.state.meta.errors.length > 0}
                  aria-describedby={`${field.name}-error`}
                />
                <FieldError errors={field.state.meta.errors as string[]} />
              </div>
            )}
          </form.Field>

          <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => (
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Envoi en cours…" : "Envoyer le message"}
              </Button>
            )}
          </form.Subscribe>
        </form>
      </div>
    );
  },
);
ContactForm.displayName = "ContactForm";

export { ContactForm };
export type { ContactFormProps };
