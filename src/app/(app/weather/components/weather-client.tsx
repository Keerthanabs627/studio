
// @ts-nocheck
'use client';

import {useState, useTransition, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useToast} from '@/hooks/use-toast';
import {getWeather, type WeatherData} from '../../dashboard/actions';
import { Skeleton } from "@/components/ui/skeleton";
import { Sun, Cloud, CloudRain, Wind, Snowflake, CloudSun, Zap, CloudFog, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useI18n } from '@/locales/client';

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

const CACHE_KEY = 'weather-forecast-cache';

function ForecastDisplay({ weatherData, loading, isOnline }: { weatherData: WeatherData[] | null, loading: boolean, isOnline: boolean }) {
  
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

  if (!weatherData || weatherData.length !== 3) {
      return (
        <div className="text-center py-10 text-muted-foreground">
           <p>{isOnline ? "Could not fetch weather data." : "No cached weather data available."}</p>
        </div>
      )
  }

  return (
    <div className="grid gap-4 grid-cols-3">
      {weatherData.map(({ day, icon, temp, condition, wind }) => {
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

export function WeatherClient({ initialWeatherData, initialLocation }: { initialWeatherData: WeatherData[] | null, initialLocation: string }) {
  const t = useI18n();
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(initialWeatherData);
  const [isWeatherPending, startWeatherTransition] = useTransition();
  const [isOnline, setIsOnline] = useState(true);

  const [location, setLocation] = useState(initialLocation);
  const [tempLocation, setTempLocation] = useState(initialLocation);
  const {toast} = useToast();

   useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

     if (typeof navigator !== 'undefined') {
        setIsOnline(navigator.onLine);
    }

    // Load from cache on initial mount if offline
    if (typeof window !== 'undefined' && !navigator.onLine) {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            setWeatherData(JSON.parse(cachedData));
        }
    } else if (initialWeatherData) {
        // If online and have initial data, cache it
        localStorage.setItem(CACHE_KEY, JSON.stringify(initialWeatherData));
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [initialWeatherData]);

  const fetchWeather = (loc: string) => {
    if (!loc.trim() || loc.toLowerCase() === "search location") {
      toast({
        variant: 'destructive',
        title: 'Please enter a valid location.',
      });
      return;
    }
    
    startWeatherTransition(async () => {
      const weatherResult = await getWeather(loc);
      if (weatherResult.data) {
        setWeatherData(weatherResult.data);
        setLocation(loc);
        if (typeof window !== 'undefined') {
            localStorage.setItem(CACHE_KEY, JSON.stringify(weatherResult.data));
        }
      } else {
        // Don't clear data if fetch fails, keep showing cached data
        toast({
          variant: 'destructive',
          title: 'Failed to get weather',
          description: weatherResult.error || 'Could not fetch weather data. Showing last available data.',
        });
      }
    });
  };

  const handleLocationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isOnline) {
        toast({ variant: 'destructive', title: 'You are offline', description: 'Cannot fetch new weather data.'})
        return;
    }
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
          {!isOnline && (
            <Alert variant="destructive" className="mb-4">
              <Info className="h-4 w-4" />
              <AlertTitle>You are offline</AlertTitle>
              <AlertDescription>
                Showing last available data.
              </AlertDescription>
            </Alert>
          )}
          <ForecastDisplay
            weatherData={weatherData}
            loading={isWeatherPending}
            isOnline={isOnline}
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
              onFocus={() => { if(tempLocation.toLowerCase() === 'search location') setTempLocation('') }}
              disabled={isWeatherPending || !isOnline}
            />
            <Button type="submit" disabled={isWeatherPending || !isOnline}>
              {t.dashboard.weather_forecast.button}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
