"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
  variant?: "desktop" | "mobile";
  onClick?: () => void;
};

export function NavLink({
  href,
  label,
  variant = "desktop",
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (variant === "mobile") {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "border-b py-4 text-base font-medium transition-colors last:border-none",
          isActive ? "text-foreground" : "text-muted-foreground",
        )}
      >
        {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "hover:text-foreground text-sm font-medium transition-colors",
        isActive ? "text-foreground" : "text-muted-foreground",
      )}
    >
      {label}
    </Link>
  );
}
