import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { getDictionary } from '@/locales/dictionaries';
import { i18n, type Locale } from '@/locales/config';
import { cookies } from 'next/headers';
import { I18nProvider } from '@/locales/i18n-provider';
import { AppShell } from '@/components/layout/app-shell';

export const metadata: Metadata = {
  title: 'AgriPulse',
  description: 'An AI-powered tool to detect and reduce fertilizer waste.',
  manifest: '/manifest.json',
};

async function getLocale(): Promise<Locale> {
    const cookieStore = cookies();
    const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
    const locale = localeCookie || i18n.defaultLocale;
    return i18n.locales.includes(locale as Locale) ? (locale as Locale) : i18n.defaultLocale;
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
        <meta name="application-name" content="AgriPulse" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AgriPulse" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#0A0A0A" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="font-body antialiased">
          <I18nProvider dictionary={dictionary} locale={locale}>
            <AppShell>
              {children}
            </AppShell>
          </I18nProvider>
        <Toaster />
      </body>
    </html>
  );
}
