// @ts-nocheck
'use client';

import { DashboardClient } from "./components/dashboard-client";
import { getProfile } from "../profile/actions";
import { getWeather } from "./actions";
import { getReminders } from "../reminders/actions";
import { getDictionary } from "@/locales/dictionaries";
import { useI18n } from "@/locales/client";
import { useState, useEffect } from "react";
import type { Profile } from "../profile/actions";
import type { WeatherData } from "./actions";
import type { Reminder } from "../reminders/actions";
import { Dictionary } from "@/locales/dictionaries";


export default function DashboardPage() {
  const t = useI18n();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [todaysReminders, setTodaysReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    async function fetchData() {
        const profileData = await getProfile();
        setProfile(profileData);

        const weatherResult = await getWeather();
        setWeatherData(weatherResult.data || null);

        const allReminders = await getReminders();
        const today = new Date();
        const filteredReminders = allReminders.filter(r => {
            if (!r.date) return false;
            const reminderDate = new Date(r.date);
            return today.toISOString().split('T')[0] === reminderDate.toISOString().split('T')[0];
        });
        setTodaysReminders(filteredReminders);
    }
    fetchData();
  }, []);

  return (
    <div>
        <DashboardClient
            t={t}
            profile={profile} 
            initialWeather={weatherData}
            todaysReminders={todaysReminders}
        />
    </div>
  );
}
