import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Instrument_Sans, Mansalva } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const mansalva = Mansalva({
  variable: "--font-mansalva",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Boulangerie artisanale",
    template: "%s | Boulangerie artisanale",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${fraunces.variable} ${instrumentSans.variable} ${mansalva.variable} antialiased`}
      >
        {children}
        <Script src="https://mcp.figma.com/mcp/html-to-design/capture.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
