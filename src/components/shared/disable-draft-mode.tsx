"use client";

import { useTransition } from "react";
import { useIsPresentationTool } from "next-sanity/hooks";
import { disableDraftMode } from "@/app/actions";

export function DisableDraftMode() {
  const [pending, startTransition] = useTransition();
  const isPresentationTool = useIsPresentationTool();

  // Ne pas afficher hors du contexte Presentation Tool
  if (isPresentationTool === null || isPresentationTool === true) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        type="button"
        onClick={() => startTransition(() => disableDraftMode())}
        className="rounded-full bg-foreground px-4 py-2 font-sans text-sm text-background shadow-lg"
      >
        {pending ? "Désactivation…" : "Quitter le mode brouillon"}
      </button>
    </div>
  );
}
