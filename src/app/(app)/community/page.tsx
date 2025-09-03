
import { getPosts, type Post } from "./actions";
import { getProfile, type Profile } from "../profile/actions";
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
