import { getPosts } from './actions';
import { CommunityClient } from './components/community-client';

export default async function CommunityPage() {
    const posts = await getPosts();
    return <CommunityClient initialPosts={posts} />;
}
