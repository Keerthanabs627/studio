'use client';

import { createContext, useState, ReactNode, useCallback, startTransition, useContext } from 'react';
import { useRouter } from 'next/navigation';
import type { Locale } from './config';
import type { Dictionary } from './dictionaries';

interface II18nContext {
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  locale: Locale;
}

export const I18nContext = createContext<II18nContext | undefined>(undefined);

export function I18nProvider({
  children,
  dictionary,
  locale: initialLocale,
}: {
  children: ReactNode;
  dictionary: Dictionary;
  locale: Locale;
}) {
  const router = useRouter();
  const [locale, setLocale] = useState(initialLocale);

  const handleSetLocale = useCallback((newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    setLocale(newLocale);
    startTransition(() => {
      router.refresh();
    });
  }, [router]);

  return (
    <I18nContext.Provider value={{ t: dictionary, setLocale: handleSetLocale, locale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context.t;
}

export function useLocale() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error('useLocale must be used within an I18nProvider');
    }
    return {
        locale: context.locale,
        setLocale: context.setLocale,
    };
}
