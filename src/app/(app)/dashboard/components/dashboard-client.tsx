
// @ts-nocheck
"use client";

import { useI18n } from "@/locales/client";
import { type Profile } from '../../profile/actions';
import type { WeatherData } from "../actions";
import type { Reminder } from "../../reminders/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Bell, Calculator, Compass, Droplets, Leaf, LineChart, Map, Stethoscope, Users, Wrench, Sun, Cloud, CloudRain, Wind, Snowflake, CloudSun, Zap, CloudFog, Landmark, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dictionary } from "@/locales/dictionaries";

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


export function DashboardClient({ t, profile, initialWeather, todaysReminders }: { t: Dictionary, profile: Profile | null, initialWeather: WeatherData[] | null, todaysReminders: Reminder[] }) {

  const quickLinks = [
    { href: '/fertilizer-calculator', label: t.sidebar.fertilizer_calculator, icon: Droplets },
    { href: '/crop-doctor', label: t.sidebar.crop_doctor, icon: Stethoscope },
    { href: '/soil-suitability', label: t.sidebar.soil_suitability, icon: Map },
    { href: '/market-prices', label: t.sidebar.market_prices, icon: LineChart },
    { href: '/labor-marketplace', label: t.sidebar.labor_marketplace, icon: Wrench },
    { href: '/community', label: t.sidebar.community, icon: Users },
    { href: '/my-fields', label: t.sidebar.my_fields, icon: Leaf },
    { href: '/schemes', label: t.sidebar.schemes, icon: Landmark },
    { href: '/guide', label: t.sidebar.guide, icon: Compass },
    { href: '/chatbot', label: t.sidebar.ai_chatbot, icon: Bot },
  ];

  const CurrentWeatherIcon = initialWeather ? iconMap[initialWeather[0].icon] || Sun : Sun;

  return (
    <div className="space-y-6">
       <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t.dashboard.welcome}</h1>
        <p className="text-muted-foreground">{t.dashboard.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Button key={link.href} variant="outline" className="h-24 flex-col gap-2 p-2" asChild>
                  <Link href={link.href}>
                    <Icon className="h-6 w-6 text-primary" />
                    <span className="text-xs text-center">{link.label}</span>
                  </Link>
                </Button>
              )
            })}
             <Button variant="outline" className="h-24 flex-col gap-2 p-2" asChild>
                <Link href="/weather">
                    <div className="flex flex-col items-center gap-1">
                        <CurrentWeatherIcon className="h-6 w-6 text-accent" />
                        <span className="font-bold text-sm">{initialWeather ? initialWeather[0].temp : 'N/A'}</span>
                    </div>
                    <span className="text-xs text-center mt-1">{t.dashboard.weather_forecast.title}</span>
                </Link>
            </Button>
            <Button variant="outline" className="h-24 flex-col gap-2 p-2 relative" asChild>
                <Link href="/reminders">
                    {todaysReminders.length > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{todaysReminders.length}</Badge>
                    )}
                    <Bell className="h-6 w-6 text-primary" />
                    <span className="text-xs text-center">{t.sidebar.reminders}</span>
                </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
