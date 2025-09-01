
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Sun, Cloud, CloudRain, Wind, Snowflake, CloudSun, Zap, CloudFog } from "lucide-react";
import type { WeatherData } from "../actions";

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

const initialWeatherData = [
  { day: 'Today', icon: "Sunny", temp: '28°C', condition: 'Sunny', wind: '12 km/h' },
  { day: 'Tomorrow', icon: "Partly Cloudy", temp: '25°C', condition: 'Partly Cloudy', wind: '15 km/h' },
  { day: 'Day After', icon: "Light Rain", temp: '22°C', condition: 'Light Rain', wind: '18 km/h' },
];

export function WeatherForecast({ weatherData, loading }: { weatherData: WeatherData[] | null, loading: boolean }) {
  
  const dataToDisplay = weatherData && weatherData.length === 3 ? weatherData : initialWeatherData;

  return (
    <div className="grid gap-4 grid-cols-3">
      {dataToDisplay.map(({ day, icon, temp, condition, wind }, index) => {
        const Icon = iconMap[icon as keyof typeof iconMap] || Sun;
        const showSkeleton = loading && (!weatherData || weatherData.length === 0);
        
        return (
          <div key={day} className="flex flex-col items-center justify-between gap-1 rounded-lg bg-secondary/30 p-4 text-center h-full">
            {showSkeleton ? <Skeleton className="h-5 w-16 mb-2" /> : <p className="font-bold text-sm">{day}</p>}
            {showSkeleton ? <Skeleton className="h-8 w-8 rounded-full my-2" /> : <Icon className="h-8 w-8 text-accent my-2" />}
            {showSkeleton ? <Skeleton className="h-6 w-12" /> : <p className="text-xl font-bold">{temp}</p>}
            {showSkeleton ? <Skeleton className="h-4 w-20 mt-1" /> : <p className="text-xs text-muted-foreground capitalize">{condition}</p>}
            {showSkeleton ? <Skeleton className="h-4 w-16 mt-1" /> : (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Wind className="h-3 w-3" />
                <span>{wind}</span>
                </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
