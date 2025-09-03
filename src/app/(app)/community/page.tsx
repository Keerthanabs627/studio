
import { getPosts } from "./actions";
import { getProfile } from "../profile/actions";
import { CommunityClient } from "./components/community-client";
import { getDictionary } from "@/locales/dictionaries";
import { getLocaleFromCookie } from "@/lib/utils";


export default async function CommunityPage() {
    const locale = await getLocaleFromCookie();
    const t = await getDictionary(locale);

    const posts = await getPosts();
    const profile = await getProfile();

    return <CommunityClient initialPosts={posts} profile={profile} t={t} />;
}
