// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Calculator, LineChart, Loader2, Search, Users, Map, Tractor, Bell, MessageCircle } from "lucide-react";
import Link from "next/link";
import { WeatherForecast } from "./weather-forecast";
import { Input } from "@/components/ui/input";
import { getWeather } from "../actions";
import type { WeatherData } from "../actions";
import { useI18n } from "@/locales/client";
import Image from "next/image";


export function DashboardClient() {
  const t = useI18n();
  const [location, setLocation] = useState("Belagavi");
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleWeatherSearch = () => {
    if (!location) return;
    startTransition(async () => {
      const result = await getWeather({ location });
      if (result.data) {
        setWeatherData(result.data);
      } else {
        console.error(result.error);
        setWeatherData(null);
      }
    });
  };

  const dashboardCards = [
    { href: "/fertilizer-calculator", icon: Calculator, title: t.dashboard.fertilizer_calculator.title, description: t.dashboard.fertilizer_calculator.description, linkText: t.dashboard.fertilizer_calculator.button, image: "https://picsum.photos/600/400?random=1", hint: "calculator" },
    { href: "/market-prices", icon: LineChart, title: t.dashboard.market_prices.title, description: t.dashboard.market_prices.description, linkText: t.dashboard.market_prices.button, image: "https://picsum.photos/600/400?random=2", hint: "market chart" },
    { href: "/soil-suitability", icon: Map, title: t.dashboard.soil_suitability.title, description: t.dashboard.soil_suitability.description, linkText: t.dashboard.soil_suitability.button, image: "https://picsum.photos/600/400?random=3", hint: "soil map" },
    { href: "/my-fields", icon: Tractor, title: t.dashboard.my_fields.title, description: t.dashboard.my_fields.description, linkText: t.dashboard.my_fields.button, image: "https://picsum.photos/600/400?random=4", hint: "tractor field" },
    { href: "/reminders", icon: Bell, title: t.dashboard.reminders.title, description: t.dashboard.reminders.description, linkText: t.dashboard.reminders.button, image: "https://picsum.photos/600/400?random=5", hint: "bell notification" },
    { href: "/sms-reminders", icon: MessageCircle, title: t.dashboard.sms_reminders.title, description: t.dashboard.sms_reminders.description, linkText: t.dashboard.sms_reminders.button, image: "https://picsum.photos/600/400?random=6", hint: "phone message" },
    { href: "/community", icon: Users, title: t.dashboard.community_hub.title, description: t.dashboard.community_hub.description, linkText: t.dashboard.community_hub.button, image: "https://picsum.photos/600/400?random=7", hint: "community people" },
    { href: "/chatbot", icon: Bot, title: t.dashboard.ai_assistant.title, description: t.dashboard.ai_assistant.description, linkText: t.dashboard.ai_assistant.button, image: "https://picsum.photos/600/400?random=8", hint: "robot ai" },
  ];

  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t.dashboard.welcome}</h1>
        <p className="text-muted-foreground">{t.dashboard.description}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>{t.dashboard.weather_forecast.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t.dashboard.weather_forecast.placeholder}
                className="flex-1"
                disabled={isPending}
                onKeyDown={(e) => e.key === 'Enter' && handleWeatherSearch()}
              />
              <Button onClick={handleWeatherSearch} disabled={isPending || !location.trim()}>
                {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span className="ml-2 hidden sm:inline">{t.dashboard.weather_forecast.button}</span>
              </Button>
            </div>
            <WeatherForecast weatherData={weatherData} loading={isPending} />
          </CardContent>
        </Card>

        {dashboardCards.map((card) => (
          <Card key={card.href} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <card.icon className="h-5 w-5 text-primary" />
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <div className="aspect-video w-full overflow-hidden rounded-md">
                    <Image src={card.image} alt={card.title} width={600} height={400} className="w-full h-full object-cover" data-ai-hint={card.hint} />
                </div>
              <p className="text-sm text-muted-foreground h-12">{card.description}</p>
            </CardContent>
            <CardContent>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={card.href}>
                  {card.linkText} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
