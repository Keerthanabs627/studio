import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { i18n, type Locale } from "@/locales/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocaleFromCookie(): Locale {
    if (typeof window === 'undefined') {
        // This will only run on the server.
        try {
            const { cookies } = require('next/headers');
            const localeCookie = cookies().get('NEXT_LOCALE')?.value;
            const locale = localeCookie || i18n.defaultLocale;
            return i18n.locales.includes(locale as Locale) ? (locale as Locale) : i18n.defaultLocale;
        } catch (error) {
            // This will happen during client-side navigation, which is expected.
            // We'll fall through to the client-side implementation.
        }
    }

    // Client-side implementation
    const localeCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('NEXT_LOCALE='))
        ?.split('=')[1];
    const locale = localeCookie || i18n.defaultLocale;
    return i18n.locales.includes(locale as Locale) ? (locale as Locale) : i18n.defaultLocale;
}
