
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


export function DashboardClient() {
  const t = useI18n();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [isWeatherPending, startWeatherTransition] = useTransition();

  const [location, setLocation] = useState('Belagavi');
  const [tempLocation, setTempLocation] = useState('Belagavi');

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
             <Card>
                <CardHeader>
                    <CardTitle>{t.dashboard.welcome}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{t.dashboard.description}</p>
                </CardContent>
             </Card>
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

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {allCards.map((card, index) => (
          <Link href={card.href} key={index} className="block">
            <Card className="flex flex-col items-center justify-center p-4 h-32 hover:bg-card/60 transition-colors duration-200">
                <card.icon className={`h-10 w-10 mb-2 ${card.color}`} />
                <p className="text-center text-sm font-medium">{card.title}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
