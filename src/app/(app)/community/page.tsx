import { getPosts } from './actions';
import { CommunityClient } from './components/community-client';
import { getDictionary } from '@/locales/dictionaries';
import { i18n, type Locale } from '@/locales/config';
import { cookies } from 'next/headers';

export default async function CommunityPage() {
    const posts = await getPosts();
    const cookieStore = cookies();
    const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
    const locale = i18n.locales.includes(localeCookie as Locale) ? (localeCookie as Locale) : i18n.defaultLocale;
    const t = await getDictionary(locale);
    return <CommunityClient initialPosts={posts} t={t} />;
}
