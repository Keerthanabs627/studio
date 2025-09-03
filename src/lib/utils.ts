
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { i18n, type Locale } from "@/locales/config"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getLocaleFromCookie(): Promise<Locale> {
    if (typeof window === 'undefined') {
        // Server-side
        try {
            const { cookies } = await import('next/headers');
            const cookieStore = cookies();
            const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
            const locale = localeCookie || i18n.defaultLocale;
            return i18n.locales.includes(locale as Locale) ? (locale as Locale) : i18n.defaultLocale;
        } catch (error) {
            // This can happen during build time when headers are not available.
            return i18n.defaultLocale;
        }
    }

    // Client-side
    const localeCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('NEXT_LOCALE='))
        ?.split('=')[1];
    const locale = localeCookie || i18n.defaultLocale;
    return i18n.locales.includes(locale as Locale) ? (locale as Locale) : i18n.defaultLocale;
}
