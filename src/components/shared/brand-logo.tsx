import { CroissantIcon } from "lucide-react";
import Link from "next/link";

interface BrandLogoProps {
  name: string;
  onClick?: () => void;
}

export function BrandLogo({ name, onClick }: BrandLogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2" onClick={onClick}>
      <CroissantIcon className="text-primary size-5" aria-hidden="true" />
      <span className="font-serif text-lg font-bold">{name}</span>
    </Link>
  );
}
