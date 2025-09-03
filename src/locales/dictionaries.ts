import 'server-only';
import type { Locale } from './config';

import en from './en';
import hi from './hi';
import kn from './kn';
import ta from './ta';
import te from './te';

const dictionaries = {
  en: () => import('./en').then(module => module.default),
  hi: () => import('./hi').then(module => module.default),
  kn: () => import('./kn').then(module => module.default),
  ta: () => import('./ta').then(module => module.default),
  te: () => import('./te').then(module => module.default),
};

export type Dictionary = typeof en;

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};
