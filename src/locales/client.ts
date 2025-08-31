'use client';

import { useContext } from 'react';
import { I18nContext } from './i18n-provider';

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
