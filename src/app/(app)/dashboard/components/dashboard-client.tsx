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
    { href: "/fertilizer-calculator", icon: Calculator, title: t.dashboard.fertilizer_calculator.title, description: t.dashboard.fertilizer_calculator.description, linkText: t.dashboard.fertilizer_calculator.button },
    { href: "/market-prices", icon: LineChart, title: t.dashboard.market_prices.title, description: t.dashboard.market_prices.description, linkText: t.dashboard.market_prices.button },
    { href: "/soil-suitability", icon: Map, title: t.dashboard.soil_suitability.title, description: t.dashboard.soil_suitability.description, linkText: t.dashboard.soil_suitability.button },
    { href: "/my-fields", icon: Tractor, title: t.dashboard.my_fields.title, description: t.dashboard.my_fields.description, linkText: t.dashboard.my_fields.button },
    { href: "/reminders", icon: Bell, title: t.dashboard.reminders.title, description: t.dashboard.reminders.description, linkText: t.dashboard.reminders.button },
    { href: "/sms-reminders", icon: MessageCircle, title: t.dashboard.sms_reminders.title, description: t.dashboard.sms_reminders.description, linkText: t.dashboard.sms_reminders.button },
    { href: "/community", icon: Users, title: t.dashboard.community_hub.title, description: t.dashboard.community_hub.description, linkText: t.dashboard.community_hub.button },
    { href: "/chatbot", icon: Bot, title: t.dashboard.ai_assistant.title, description: t.dashboard.ai_assistant.description, linkText: t.dashboard.ai_assistant.button },
  ];

  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t.dashboard.welcome}</h1>
        <p className="text-muted-foreground">{t.dashboard.description}</p>
      </div>

      <Card>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardCards.map((card) => (
          <Card key={card.href}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <card.icon className="h-5 w-5 text-primary" />
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
              <Button asChild variant="outline" size="sm">
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
