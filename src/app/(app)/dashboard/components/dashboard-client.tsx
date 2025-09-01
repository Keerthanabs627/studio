
// @ts-nocheck
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Droplets, Stethoscope, LineChart, Map, Tractor, Bell, Users, Bot, User, Radio } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/locales/client";
import { WeatherForecast } from "./weather-forecast";
import { useState, useEffect, useTransition } from "react";
import { getWeather, type WeatherData } from '../actions';
import { getProfile, type Profile } from '../../profile/actions';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";


export function DashboardClient() {
  const t = useI18n();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [isWeatherPending, startWeatherTransition] = useTransition();

  const [location, setLocation] = useState('Belagavi');
  const [tempLocation, setTempLocation] = useState('Belagavi');
  const {toast} = useToast();

  const fetchInitialData = async () => {
      const fetchedProfile = await getProfile();
      setProfile(fetchedProfile);
      fetchWeather(fetchedProfile?.location || 'Belagavi');
    };

  const fetchWeather = (loc: string) => {
    if (!loc.trim()) {
        toast({
            variant: "destructive",
            title: "Location cannot be empty.",
        })
        return;
    };
    setLocation(loc);
    setTempLocation(loc);

    startWeatherTransition(async () => {
        const weatherResult = await getWeather({ location: loc });
        if (weatherResult.data) {
          setWeatherData(weatherResult.data);
        } else {
          toast({
            variant: "destructive",
            title: "Failed to get weather",
            description: weatherResult.error || "Could not fetch weather data.",
          })
        }
    });
  }

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleLocationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeather(tempLocation);
  }

  const allCards = [
    { href: "/crop-doctor", icon: Stethoscope, title: t.sidebar.crop_doctor, color: "text-indigo-400" },
    { href: "/fertilizer-calculator", icon: Droplets, title: t.fertilizer_calculator.title, color: "text-yellow-400" },
    { href: "/market-prices", icon: LineChart, title: t.market_prices.title, color: "text-green-400" },
    { href: "/soil-suitability", icon: Map, title: t.sidebar.soil_suitability, color: "text-purple-400" },
    { href: "/my-fields", icon: Tractor, title: t.sidebar.my_fields, color: "text-red-400" },
    { href: "/reminders", icon: Bell, title: t.sidebar.reminders, color: "text-orange-400" },
    { href: "/community", icon: Users, title: t.sidebar.community, color: "text-pink-400" },
    { href: "/chatbot", icon: Bot, title: t.sidebar.ai_chatbot, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
            <Card className="flex flex-col">
                <CardHeader>
                    <CardTitle>{t.dashboard.weather_forecast.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                    <WeatherForecast weatherData={weatherData} loading={isWeatherPending} />
                </CardContent>
                <CardFooter>
                    <form onSubmit={handleLocationSubmit} className="flex w-full items-center gap-2">
                        <Input 
                            placeholder={t.dashboard.weather_forecast.placeholder} 
                            value={tempLocation}
                            onChange={(e) => setTempLocation(e.target.value)}
                            disabled={isWeatherPending}
                        />
                        <Button type="submit" disabled={isWeatherPending}>
                            {t.dashboard.weather_forecast.button}
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {allCards.map((card, index) => {
          const span =
            (index >= 0 && index <= 2) ? 'col-span-1' :
            (index >= 3 && index <= 4) ? 'col-span-1 md:col-span-3' :
            'col-span-1';

          return (
          <Link href={card.href} key={index} className={cn("block", span)}>
            <Card className="flex flex-col items-center justify-center p-1 h-24 hover:bg-card/60 transition-colors duration-200">
                <card.icon className={`h-6 w-6 mb-1 ${card.color}`} />
                <p className="text-center text-xs font-medium">{card.title}</p>
            </Card>
          </Link>
        )})}
      </div>
    </div>
  );
}
