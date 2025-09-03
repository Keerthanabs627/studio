
import { getProfile } from "./actions";
import { ProfileClient } from "./components/profile-client";

export default async function ProfilePage() {
    const profile = await getProfile();

    return <ProfileClient initialProfile={profile} />;
}
