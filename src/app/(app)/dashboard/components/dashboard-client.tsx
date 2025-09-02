
// @ts-nocheck
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Users, Bot, Landmark, Wrench, Compass, LineChart, Droplets, Map, Bell, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/locales/client";
import { type Profile } from '../../profile/actions';
import { cn } from "@/lib/utils";
import { WeatherForecast } from "./weather-forecast";
import type { WeatherData } from "../actions";
import type { Reminder } from "../../reminders/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardClient({ profile, t, initialWeather, todaysReminders }: { profile: Profile | null, t: any, initialWeather: WeatherData[] | null, todaysReminders: Reminder[] }) {

  const quickLinks = [
    { href: "/crop-doctor", icon: Stethoscope, title: t.sidebar.crop_doctor, color: "text-indigo-400" },
    { href: "/fertilizer-calculator", icon: Droplets, title: t.fertilizer_calculator.title, color: "text-yellow-400" },
    { href: "/market-prices", icon: LineChart, title: t.market_prices.title, color: "text-green-400" },
    { href: "/soil-suitability", icon: Map, title: t.sidebar.soil_suitability, color: "text-purple-400" },
    { href: "/labor-marketplace", icon: Wrench, title: t.sidebar.labor_marketplace, color: "text-cyan-400" },
    { href: "/schemes", icon: Landmark, title: t.sidebar.schemes, color: "text-teal-400" },
    { href: "/community", icon: Users, title: t.sidebar.community, color: "text-pink-400" },
    { href: "/chatbot", icon: Bot, title: t.sidebar.ai_chatbot, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
       <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Hello, {profile?.name || "Farmer"}!</h1>
        <p className="text-muted-foreground">{t.dashboard.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader>
                <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 md:grid-cols-4 gap-4">
                {quickLinks.map((card) => {
                const Icon = card.icon;
                return (
                <Link href={card.href} key={card.href} className="block">
                    <div className="flex flex-col items-center justify-center text-center p-4 h-full rounded-lg hover:bg-secondary transition-colors duration-200">
                        <Icon className={cn("h-7 w-7 mb-2", card.color)} />
                        <p className="text-center text-sm font-medium">{card.title}</p>
                    </div>
                </Link>
                )})}
            </CardContent>
        </Card>

        <Card className="lg:col-start-2">
            <CardHeader>
                <CardTitle>{t.dashboard.weather_forecast.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <WeatherForecast weatherData={initialWeather} loading={false} />
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Today's Reminders</CardTitle>
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
                    <div className="text-center text-muted-foreground py-4">
                        <p>No reminders for today.</p>
                    </div>
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
