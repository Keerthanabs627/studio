
import { getProfile } from "./actions";
import { ProfileClient } from "./components/profile-client";
import { getDictionary } from '@/locales/dictionaries';
import { getLocaleFromCookie } from '@/lib/utils';

export default async function ProfilePage() {
    const locale = getLocaleFromCookie();
    const t = await getDictionary(locale);
    const profile = await getProfile();

    return <ProfileClient initialProfile={profile} t={t} />;
}
