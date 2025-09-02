
import { DashboardClient } from "./components/dashboard-client";
import { getDictionary } from '@/locales/dictionaries';
import { getLocaleFromCookie } from '@/lib/utils';
import { getProfile, type Profile } from "../profile/actions";
import { getWeather, type WeatherData } from "./actions";
import { getReminders, type Reminder } from "../reminders/actions";

export default async function DashboardPage() {
  const locale = getLocaleFromCookie();
  const t = await getDictionary(locale);

  const profile = await getProfile();
  const weatherResult = await getWeather({ location: 'Belagavi' });
  const reminders = await getReminders();
  
  const todaysReminders = reminders.filter(r => {
      const today = new Date();
      const reminderDate = new Date(r.date);
      return today.toDateString() === reminderDate.toDateString();
  });

  return (
    <DashboardClient 
        t={t} 
        profile={profile} 
        initialWeather={weatherResult.data || null}
        todaysReminders={todaysReminders}
    />
  );
}
