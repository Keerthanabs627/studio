
import { getPosts } from "./actions";
import { getProfile } from "../profile/actions";
import { CommunityClient } from "./components/community-client";

export default async function CommunityPage() {
    const posts = await getPosts();
    const profile = await getProfile();

    return <CommunityClient initialPosts={posts} profile={profile} />;
}
