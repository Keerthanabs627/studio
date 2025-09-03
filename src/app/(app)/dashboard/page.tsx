
import { DashboardClient } from "./components/dashboard-client";
import { getProfile } from "../profile/actions";
import { getWeather } from "./actions";

export default async function DashboardPage() {
    const profile = await getProfile();
    const weatherResult = await getWeather();

    return (
        <div>
            <DashboardClient
                profile={profile} 
                initialWeather={weatherResult.data || null}
            />
        </div>
    );
}
