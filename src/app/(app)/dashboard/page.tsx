
import { DashboardClient } from "./components/dashboard-client";
import { getWeather } from "./actions";

export default async function DashboardPage() {
    const weatherResult = await getWeather();

    return (
        <div>
            <DashboardClient
                profile={null} 
                initialWeather={weatherResult.data || null}
            />
        </div>
    );
}
