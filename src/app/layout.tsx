import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { I18nProvider } from '@/locales/i18n-provider';
import { getDictionary } from '@/locales/dictionaries';
import { cookies } from 'next/headers';
import type { Locale } from '@/locales/config';
import { i18n } from '@/locales/config';

export const metadata: Metadata = {
  title: 'AgriSolutions Hub',
  description: 'An AI-powered hub for modern agriculture.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value || i18n.defaultLocale;
  const locale: Locale = i18n.locales.includes(localeCookie as Locale) ? (localeCookie as Locale) : i18n.defaultLocale;
  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <I18nProvider dictionary={dictionary} locale={locale}>
          {children}
        </I18nProvider>
        <Toaster />
      </body>
    </html>
  );
}
