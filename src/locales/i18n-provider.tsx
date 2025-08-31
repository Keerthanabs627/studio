'use client';

import { createContext, useState, ReactNode, useCallback } from 'react';
import type { Locale } from './config';
import type { Dictionary } from './dictionaries';
import { getDictionary } from './dictionaries';

interface II18nContext {
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  locale: Locale;
}

export const I18nContext = createContext<II18nContext | undefined>(undefined);

export function I18nProvider({
  children,
  initialLocale = 'en',
  initialDictionary,
}: {
  children: ReactNode;
  initialLocale?: Locale;
  initialDictionary: Dictionary;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [t, setT] = useState<Dictionary>(initialDictionary);

  const handleSetLocale = useCallback(async (newLocale: Locale) => {
    setLocale(newLocale);
    const newDict = await getDictionary(newLocale);
    setT(newDict);
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
  }, []);

  return (
    <I18nContext.Provider value={{ t, setLocale: handleSetLocale, locale }}>
      {children}
    </I18nContext.Provider>
  );
}
