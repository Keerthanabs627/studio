
import { getProfile } from "../profile/actions";
import { NotificationsClient } from "./components/notifications-client";

export default async function NotificationsPage() {
    const profile = await getProfile();

    return <NotificationsClient initialPreferences={profile.notifications} />;
}
