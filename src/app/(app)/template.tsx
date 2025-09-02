
'use client';

import type { ReactNode } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { I18nProvider } from '@/locales/i18n-provider';
import type { Dictionary } from '@/locales/dictionaries';
import { i18n } from '@/locales/config';
import type { Locale } from '@/locales/config';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import en from '@/locales/en';
import hi from '@/locales/hi';
import kn from '@/locales/kn';
import ta from '@/locales/ta';
import te from '@/locales/te';

const dictionaries: Record<Locale, Dictionary> = {
  en,
  hi,
  kn,
  ta,
  te,
};

function getLocaleFromCookie(): Locale {
    if (typeof window === 'undefined') return i18n.defaultLocale;
    const localeCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('NEXT_LOCALE='))
        ?.split('=')[1];
    const locale = localeCookie || i18n.defaultLocale;
    return i18n.locales.includes(locale as Locale) ? (locale as Locale) : i18n.defaultLocale;
}


export default function AppTemplate({ children }: { children: ReactNode }) {
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const [locale, setLocale] = useState<Locale>(i18n.defaultLocale);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const currentLocale = getLocaleFromCookie();
      setLocale(currentLocale);
      setDictionary(dictionaries[currentLocale] || en);
    } catch (error) {
      console.error("Failed to load dictionary:", error);
      toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load language settings. Defaulting to English."
      })
      // Fallback to English in case of any error
      setLocale('en');
      setDictionary(en);
    }
  }, [toast]);
  

  if (!dictionary) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
    );
  }

  return (
    <I18nProvider dictionary={dictionary} locale={locale}>
        <AppShell>
            {children}
        </AppShell>
    </I18nProvider>
  );
}
