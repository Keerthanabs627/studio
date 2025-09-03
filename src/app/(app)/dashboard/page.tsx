
import { DashboardClient } from "./components/dashboard-client";
import { getProfile } from "../profile/actions";
import { getWeather } from "./actions";
import { getReminders } from "../reminders/actions";

export default async function DashboardPage() {
    const profile = await getProfile();
    const weatherResult = await getWeather();
    const allReminders = await getReminders();

    const today = new Date();
    const todaysReminders = allReminders.filter(r => {
        if (!r.date) return false;
        const reminderDate = new Date(r.date);
        return today.toISOString().split('T')[0] === reminderDate.toISOString().split('T')[0];
    });

    return (
        <div>
            <DashboardClient
                profile={profile} 
                initialWeather={weatherResult.data || null}
                todaysReminders={todaysReminders}
            />
        </div>
    );
}
