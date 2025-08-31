"use client";

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
      <div className="grid gap-2 grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col items-center justify-center gap-1 rounded-lg bg-secondary/30 p-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-5 w-10 mt-1" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-14" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-2 grid-cols-3">
      {dataToDisplay.map(({ day, icon, temp, condition, wind }) => {
        const Icon = iconMap[icon as keyof typeof iconMap] || Sun;
        return (
          <div key={day} className="flex flex-col items-center justify-center gap-0.5 rounded-lg bg-secondary/30 p-2 text-center">
            <Icon className="h-6 w-6 text-accent" />
            <p className="text-lg font-bold">{temp}</p>
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
