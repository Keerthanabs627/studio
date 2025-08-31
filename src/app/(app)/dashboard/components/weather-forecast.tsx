"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Sun, Cloud, CloudRain, Wind, Snowflake, CloudSun, Zap, CloudFog } from "lucide-react";
import type { WeatherData } from "../actions";

const iconMap = {
  Sunny: Sun,
  "Partly Cloudy": CloudSun,
  Cloudy: Cloud,
  "Light Rain": CloudRain,
  "Heavy Rain": CloudRain,
  Thunderstorm: Zap,
  Snow: Snowflake,
  Fog: CloudFog,
};

const initialWeatherData = [
  { day: 'Today', icon: "Sunny", temp: '28°C', condition: 'Sunny', wind: '12 km/h' },
  { day: 'Tomorrow', icon: "Partly Cloudy", temp: '25°C', condition: 'Partly Cloudy', wind: '15 km/h' },
  { day: 'Day After', icon: "Light Rain", temp: '22°C', condition: 'Light Rain', wind: '18 km/h' },
];

export function WeatherForecast({ weatherData, loading }: { weatherData: WeatherData[] | null, loading: boolean }) {
  const dataToDisplay = weatherData || initialWeatherData;

  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-1 rounded-lg bg-secondary/30 p-3">
            <Skeleton className="h-5 w-16 mb-1" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-12 mt-1" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-3">
      {dataToDisplay.map(({ day, icon, temp, condition, wind }) => {
        const Icon = iconMap[icon as keyof typeof iconMap] || Sun;
        return (
          <div key={day} className="flex flex-col items-center justify-center gap-1 rounded-lg bg-secondary/30 p-3 text-center">
            <p className="font-semibold text-sm">{day}</p>
            <Icon className="h-8 w-8 text-accent" />
            <p className="text-xl font-bold">{temp}</p>
            <p className="text-xs text-muted-foreground">{condition}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Wind className="h-3 w-3" />
              <span>{wind}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
