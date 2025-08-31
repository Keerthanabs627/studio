import type { ReactNode } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { getDictionary } from '@/locales/dictionaries';
import { cookies } from 'next/headers';
import type { Locale } from '@/locales/config';
import { i18n } from '@/locales/config';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value || i18n.defaultLocale;
  const locale: Locale = i18n.locales.includes(localeCookie as Locale) ? (localeCookie as Locale) : i18n.defaultLocale;
  const dictionary = await getDictionary(locale);
  
  return <AppShell dictionary={dictionary} locale={locale}>{children}</AppShell>;
}
