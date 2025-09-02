
// @ts-nocheck
"use client";

import { useI18n } from "@/locales/client";
import { type Profile } from '../../profile/actions';
import type { WeatherData } from "../actions";
import type { Reminder } from "../../reminders/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { WeatherForecast } from "./weather-forecast";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Bell, Calculator, Compass, Droplets, Leaf, LineChart, Map, Stethoscope, Users, Wrench } from "lucide-react";

export function DashboardClient({ profile, t, initialWeather, todaysReminders }: { profile: Profile | null, t: any, initialWeather: WeatherData[] | null, todaysReminders: Reminder[] }) {

  const quickLinks = [
    { href: '/crop-doctor', label: t.sidebar.crop_doctor, icon: Stethoscope },
    { href: '/soil-suitability', label: t.sidebar.soil_suitability, icon: Map },
    { href: '/market-prices', label: t.sidebar.market_prices, icon: LineChart },
    { href: '/labor-marketplace', label: t.sidebar.labor_marketplace, icon: Wrench },
    { href: '/community', label: t.sidebar.community, icon: Users },
    { href: '/my-fields', label: t.sidebar.my_fields, icon: Leaf },
    { href: '/fertilizer-calculator', label: t.sidebar.fertilizer_calculator, icon: Droplets },
    { href: '/guide', label: t.sidebar.guide, icon: Compass },
  ];

  return (
    <div className="space-y-6">
       <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Hello, community!</h1>
        <p className="text-muted-foreground">{t.dashboard.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Button key={link.href} variant="outline" className="h-24 flex-col gap-2" asChild>
                  <Link href={link.href}>
                    <Icon className="h-6 w-6 text-primary" />
                    <span>{link.label}</span>
                  </Link>
                </Button>
              )
            })}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Weather Forecast</CardTitle>
                <CardDescription>3-day forecast for your area</CardDescription>
            </CardHeader>
            <CardContent>
                <WeatherForecast weatherData={initialWeather} loading={false} />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Today's Reminders</CardTitle>
                <CardDescription>Tasks scheduled for today</CardDescription>
            </CardHeader>
            <CardContent>
                {todaysReminders.length > 0 ? (
                    <ul className="space-y-3">
                    {todaysReminders.map(reminder => (
                        <li key={reminder.id} className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-primary"/>
                        <div>
                            <p className="font-medium">{reminder.task}</p>
                            <p className="text-sm text-muted-foreground">{reminder.time}</p>
                        </div>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="text-sm text-muted-foreground text-center pt-8">No reminders for today.</p>
                )}
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                    <Link href="/reminders">View All Reminders</Link>
                </Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
