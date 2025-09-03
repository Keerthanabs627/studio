
"use client";

import { useI18n } from "@/locales/client";
import type { Profile } from '../../profile/actions';
import { type WeatherData, getWeather } from "../actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { Droplets, Leaf, LineChart, Map, Stethoscope, Users, Wrench, Sun, Cloud, CloudRain, Zap, CloudFog, Landmark, Compass, Code, Bot, MessageCircle, Bell } from "lucide-react";
import { WeatherForecast } from "./weather-forecast";
import { useToast } from "@/hooks/use-toast";
import React, { useState, useEffect, useTransition } from "react";
import { WeatherIcon } from "@/components/icons/weather-icon";

export function DashboardClient({ profile }: { profile: Profile | null }) {
  const t = useI18n();
  const { toast } = useToast();
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [isWeatherPending, startWeatherTransition] = useTransition();
  const [location, setLocation] = useState("Search location");

  useEffect(() => {
    if (location.toLowerCase() !== "search location" && location.trim() !== "") {
        startWeatherTransition(async () => {
        const weatherResult = await getWeather(location);
        if (weatherResult.data) {
            setWeatherData(weatherResult.data);
        }
        if (weatherResult.error) {
            toast({
            variant: "destructive",
            title: "Could not fetch weather",
            description: weatherResult.error,
            });
        }
        });
    }
  }, [toast, location]);
  
  const quickLinks = [
    { href: '/crop-doctor', label: t.sidebar.crop_doctor, icon: Stethoscope },
    { href: '/fertilizer-calculator', label: t.sidebar.fertilizer_calculator, icon: Droplets },
    { href: '/market-prices', label: t.sidebar.market_prices, icon: LineChart },
    { href: '/soil-suitability', label: t.sidebar.soil_suitability, icon: Map },
    { href: '/schemes', label: t.sidebar.schemes, icon: Landmark },
    { href: '/my-fields', label: t.sidebar.my_fields, icon: Leaf },
    { href: '/weather', label: t.dashboard.weather_forecast.title, icon: WeatherIcon },
    { href: '/community', label: t.sidebar.community, icon: MessageCircle },
    { href: '/reminders', label: t.sidebar.reminders, icon: Bell },
    { href: '/chatbot', label: t.sidebar.ai_chatbot, icon: Bot },
    { href: '/guide', label: t.sidebar.guide, icon: Compass },
  ];

  return (
    <div className="space-y-6">
       <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t.dashboard.welcome}</h1>
        <p className="text-muted-foreground">{t.dashboard.description}</p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>{t.sidebar.dashboard}</CardTitle>
            <CardDescription>Quick access to all features.</CardDescription>
        </CardHeader>
        <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
        </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
