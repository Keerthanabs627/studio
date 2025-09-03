import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { i18n, type Locale } from "@/locales/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getLocaleFromCookie(): Promise<Locale> {
    // This is a client-side only function now.
    // The server-side logic is in layout.tsx.
    if (typeof document === 'undefined') {
        return i18n.defaultLocale;
    }
    const localeCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('NEXT_LOCALE='))
        ?.split('=')[1];
    const locale = localeCookie || i18n.defaultLocale;
    return i18n.locales.includes(locale as Locale) ? (locale as Locale) : i18n.defaultLocale;
}
