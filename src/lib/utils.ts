
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { i18n, type Locale } from "@/locales/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocaleFromCookie(): Locale {
    // This function now only runs on the client-side.
    // The server-side logic has been moved to the RootLayout.
    if (typeof window === 'undefined') {
        return i18n.defaultLocale;
    }
    
    const localeCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('NEXT_LOCALE='))
        ?.split('=')[1];
    
    const locale = localeCookie || i18n.defaultLocale;
    
    return i18n.locales.includes(locale as Locale) ? (locale as Locale) : i18n.defaultLocale;
}
