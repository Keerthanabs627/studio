
// @ts-nocheck
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Stethoscope, Users, Bot, Landmark, Wrench, Compass, LineChart, Droplets, Map, Bell, AlertTriangle, Sun, Cloud, CloudRain, Wind, Snowflake, CloudSun, Zap, CloudFog } from "lucide-react";
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
    { href: "/guide", icon: Compass, title: t.sidebar.guide, color: "text-orange-400" },
  ];

  const iconMap: { [key: string]: React.ElementType } = {
    Sunny: Sun,
    "Partly Cloudy": CloudSun,
    Cloudy: Cloud,
    "Light Rain": CloudRain,
    "Heavy Rain": CloudRain,
    Thunderstorm: Zap,
    Snow: Snowflake,
    Fog: CloudFog,
  };

  const TodayIcon = iconMap[initialWeather?.[0]?.icon as keyof typeof iconMap] || Sun;

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
          <CardContent className="grid grid-cols-3 md:grid-cols-4 gap-4">
              {quickLinks.map((card) => {
              const Icon = card.icon;
              return (
              <Link href={card.href} key={card.href} className="block">
                  <div className="flex flex-col items-center justify-center text-center p-4 h-full rounded-lg hover:bg-secondary transition-colors duration-200 aspect-square">
                      <Icon className={cn("h-7 w-7 mb-2", card.color)} />
                      <p className="text-center text-sm font-medium">{card.title}</p>
                  </div>
              </Link>
              )})}
               <Link href="/weather" className="block">
                  <div className="flex flex-col items-center justify-center text-center p-4 h-full rounded-lg hover:bg-secondary transition-colors duration-200 aspect-square">
                      <TodayIcon className={cn("h-7 w-7 mb-2", "text-blue-400")} />
                      <p className="text-center text-sm font-medium">{t.dashboard.weather_forecast.title}</p>
                  </div>
              </Link>
              <Link href="/reminders" className="block">
                  <div className="relative flex flex-col items-center justify-center text-center p-4 h-full rounded-lg hover:bg-secondary transition-colors duration-200 aspect-square">
                      <Bell className={cn("h-7 w-7 mb-2", "text-orange-400")} />
                      {todaysReminders.length > 0 && (
                          <div className="absolute top-2 right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                              {todaysReminders.length}
                          </div>
                      )}
                      <p className="text-center text-sm font-medium">{t.sidebar.reminders}</p>
                  </div>
              </Link>
          </CardContent>
      </Card>
      
    </div>
  );
}
