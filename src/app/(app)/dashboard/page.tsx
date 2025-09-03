
import { DashboardClient } from "./components/dashboard-client";
import { getDictionary } from '@/locales/dictionaries';
import { getLocaleFromCookie } from '@/lib/utils';
import { getProfile } from "../profile/actions";
import { getWeather, type WeatherData } from "./actions";
import { getReminders } from "../reminders/actions";

export default async function DashboardPage() {
  const locale = await getLocaleFromCookie();
  const t = await getDictionary(locale);

  const profile = await getProfile();
  const weatherResult = await getWeather({ location: 'Belagavi' });
  const reminders = await getReminders();
  
  const todaysReminders = reminders.filter(r => {
      const today = new Date();
      const reminderDate = new Date(r.date);
      // Adjust for timezone differences by comparing date strings
      return today.toISOString().split('T')[0] === reminderDate.toISOString().split('T')[0];
  });

  return (
    <div>
        <DashboardClient 
            t={t} 
            profile={profile} 
            initialWeather={weatherResult.data || null}
            todaysReminders={todaysReminders}
        />
    </div>
  );
}
