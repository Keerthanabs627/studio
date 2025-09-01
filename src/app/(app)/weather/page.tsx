
'use client';

import {useState, useEffect, useTransition} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useI18n} from '@/locales/client';
import {useToast} from '@/hooks/use-toast';
import {getWeather, type WeatherData} from '../dashboard/actions';
import {getProfile} from '../profile/actions';
import {WeatherForecast} from '../dashboard/components/weather-forecast';

export default function WeatherPage() {
  const t = useI18n();
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [isWeatherPending, startWeatherTransition] = useTransition();

  const [location, setLocation] = useState('Belagavi');
  const [tempLocation, setTempLocation] = useState('Belagavi');
  const {toast} = useToast();

  const fetchInitialData = async () => {
    const fetchedProfile = await getProfile();
    fetchWeather(fetchedProfile?.location || 'Belagavi');
  };

  const fetchWeather = (loc: string) => {
    if (!loc.trim()) {
      toast({
        variant: 'destructive',
        title: 'Location cannot be empty.',
      });
      return;
    }
    setLocation(loc);
    setTempLocation(loc);

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

  useEffect(() => {
    fetchInitialData();
  }, []);

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
