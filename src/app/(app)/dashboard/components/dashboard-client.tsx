
// @ts-nocheck
"use client";

import { useI18n } from "@/locales/client";
import { type Profile } from '../../profile/actions';
import type { WeatherData } from "../actions";
import type { Reminder } from "../../reminders/actions";

export function DashboardClient({ profile, t, initialWeather, todaysReminders }: { profile: Profile | null, t: any, initialWeather: WeatherData[] | null, todaysReminders: Reminder[] }) {

  return (
    <div className="space-y-6">
       <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Hello, community!</h1>
        <p className="text-muted-foreground">{t.dashboard.description}</p>
      </div>
      
    </div>
  );
}
