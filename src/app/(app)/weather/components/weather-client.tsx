
'use client';

import {useState, useTransition} from 'react';
import {Card, CardContent, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useToast} from '@/hooks/use-toast';
import {getWeather, type WeatherData} from '../../dashboard/actions';
import {WeatherForecast} from '../../dashboard/components/weather-forecast';
import { Skeleton } from "@/components/ui/skeleton";
import { Sun, Cloud, CloudRain, Wind, Snowflake, CloudSun, Zap, CloudFog } from "lucide-react";

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

function ForecastDisplay({ weatherData, loading }: { weatherData: WeatherData[] | null, loading: boolean }) {
  
  const dataToDisplay = weatherData && weatherData.length === 3 ? weatherData : initialWeatherData;

  if (loading) {
      return (
          <div className="grid gap-4 grid-cols-3">
              {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex flex-col items-center justify-between gap-1 rounded-lg bg-secondary/30 p-4 text-center h-full">
                      <Skeleton className="h-5 w-16 mb-2" />
                      <Skeleton className="h-8 w-8 rounded-full my-2" />
                      <Skeleton className="h-6 w-12" />
                      <Skeleton className="h-4 w-20 mt-1" />
                      <Skeleton className="h-4 w-16 mt-1" />
                  </div>
              ))}
          </div>
      )
  }

  return (
    <div className="grid gap-4 grid-cols-3">
      {dataToDisplay.map(({ day, icon, temp, condition, wind }) => {
        const Icon = iconMap[icon as keyof typeof iconMap] || Sun;
        return (
          <div key={day} className="flex flex-col items-center justify-between gap-1 rounded-lg bg-secondary/30 p-4 text-center h-full">
            <p className="font-bold text-sm">{day}</p>
            <Icon className="h-8 w-8 text-accent my-2" />
            <p className="text-xl font-bold">{temp}</p>
            <p className="text-xs text-muted-foreground capitalize">{condition}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Wind className="h-3 w-3" />
                <span>{wind}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function WeatherClient({ t, initialWeatherData, initialLocation }: { t: any, initialWeatherData: WeatherData[] | null, initialLocation: string }) {
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(initialWeatherData);
  const [isWeatherPending, startWeatherTransition] = useTransition();

  const [location, setLocation] = useState(initialLocation);
  const [tempLocation, setTempLocation] = useState(initialLocation);
  const {toast} = useToast();

  const fetchWeather = (loc: string) => {
    if (!loc.trim()) {
      toast({
        variant: 'destructive',
        title: 'Location cannot be empty.',
      });
      return;
    }
    
    startWeatherTransition(async () => {
      setLocation(loc);
      const weatherResult = await getWeather({location: loc});
      if (weatherResult.data) {
        setWeatherData(weatherResult.data);
      } else {
        setWeatherData(null);
        toast({
          variant: 'destructive',
          title: 'Failed to get weather',
          description: weatherResult.error || 'Could not fetch weather data.',
        });
      }
    });
  };

  const handleLocationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchWeather(tempLocation);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">{t.dashboard.weather_forecast.title}</h1>
            <p className="text-muted-foreground">Get a 3-day forecast for your location.</p>
        </div>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>3-Day Forecast for {location}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <ForecastDisplay
            weatherData={weatherData}
            loading={isWeatherPending}
          />
        </CardContent>
        <CardFooter>
          <form
            onSubmit={handleLocationSubmit}
            className="flex w-full items-center gap-2"
          >
            <Input
              placeholder={t.dashboard.weather_forecast.placeholder}
              value={tempLocation}
              onChange={e => setTempLocation(e.target.value)}
              disabled={isWeatherPending}
            />
            <Button type="submit" disabled={isWeatherPending}>
              {t.dashboard.weather_forecast.button}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
