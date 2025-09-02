
import { getProfile } from "../profile/actions";
import { NotificationsClient } from "./components/notifications-client";
import { getDictionary } from '@/locales/dictionaries';
import { getLocaleFromCookie } from '@/lib/utils';

export default async function NotificationsPage() {
    const locale = getLocaleFromCookie();
    const t = await getDictionary(locale);
    const profile = await getProfile();

    return <NotificationsClient initialPreferences={profile.notifications} t={t} />;
}
