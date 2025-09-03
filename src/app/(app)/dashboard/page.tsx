
import { DashboardClient } from "./components/dashboard-client";
import { getProfile } from "../profile/actions";
import { getWeather } from "./actions";
import { getReminders } from "../reminders/actions";
import { getDictionary } from "@/locales/dictionaries";
import { cookies } from "next/headers";
import { i18n, type Locale } from "@/locales/config";

async function getLocale(): Promise<Locale> {
    const cookieStore = cookies();
    const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
    const locale = localeCookie || i18n.defaultLocale;
    return i18n.locales.includes(locale as Locale) ? (locale as Locale) : i18n.defaultLocale;
}

export default async function DashboardPage() {
  const profile = await getProfile();
  const weatherResult = await getWeather();
  const reminders = await getReminders();
  const locale = await getLocale();
  const t = await getDictionary(locale);
  
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
