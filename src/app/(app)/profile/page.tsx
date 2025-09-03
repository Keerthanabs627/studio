import { getProfile } from './actions';
import { ProfileClient } from './components/profile-client';
import { getDictionary } from '@/locales/dictionaries';
import { i18n, type Locale } from '@/locales/config';
import { cookies } from 'next/headers';

export default async function ProfilePage() {
    const profile = await getProfile();
    const cookieStore = cookies();
    const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
    const locale = i18n.locales.includes(localeCookie as Locale) ? (localeCookie as Locale) : i18n.defaultLocale;
    const t = await getDictionary(locale);
    return <ProfileClient initialProfile={profile} t={t} />;
}
