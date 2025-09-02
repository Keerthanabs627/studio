
'use client';

import {useState, useTransition} from 'react';
import {Card, CardContent, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useToast} from '@/hooks/use-toast';
import {getWeather, type WeatherData} from '../../dashboard/actions';
import {WeatherForecast} from '../../dashboard/components/weather-forecast';

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
    setLocation(loc);

    startWeatherTransition(async () => {
      const weatherResult = await getWeather({location: loc});
      if (weatherResult.data) {
        setWeatherData(weatherResult.data);
      } else {
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
          <WeatherForecast
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
