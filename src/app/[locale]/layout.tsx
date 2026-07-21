import type { Locale } from "@/lib/engine/types";
import Link from "next/link";
import "../globals.css";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const { locale } = params;
  const otherLocale = locale === "en" ? "fr" : "en";

  return (
    <html lang={locale}>
      <body className="bg-paper text-ink font-body antialiased">
        <header className="border-b border-hairline sticky top-0 bg-paper z-10">
          <div className="max-w-[900px] mx-auto px-6 flex items-center justify-between py-4">
            <Link href={`/${locale}`} className="font-display font-bold text-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber inline-block" />
              RECKON
            </Link>
            <nav className="flex items-center gap-6">
              <Link href={`/${locale}/calculators`} className="text-sm text-ink-soft hidden sm:inline">
                {locale === "fr" ? "Calculateurs" : "Calculators"}
              </Link>
              <Link href={`/${locale}/converters`} className="text-sm text-ink-soft hidden sm:inline">
                {locale === "fr" ? "Convertisseurs" : "Converters"}
              </Link>
              <Link
                href={`/${otherLocale}`}
                className="font-mono text-xs border border-hairline rounded-full px-2.5 py-1 text-ink-soft"
              >
                {otherLocale.toUpperCase()}
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="border-t border-hairline mt-12 py-8 text-sm text-ink-soft">
          <div className="max-w-[900px] mx-auto px-6">
            {locale === "fr"
              ? "Reckon — calculateurs et convertisseurs gratuits."
              : "Reckon — free calculators and converters."}
          </div>
        </footer>
      </body>
    </html>
  );
}
