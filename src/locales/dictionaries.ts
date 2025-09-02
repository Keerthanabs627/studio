import 'server-only';
import type { Locale } from './config';

import en from './en';
import hi from './hi';
import kn from './kn';
import ta from './ta';
import te from './te';

const dictionaries = {
  en,
  hi,
  kn,
  ta,
  te,
};

export type Dictionary = typeof en;

export const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale] ?? dictionaries.en;
};
