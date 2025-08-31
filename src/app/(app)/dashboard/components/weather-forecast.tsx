import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, Thermometer, Wind } from "lucide-react";

const weatherData = [
  { day: 'Today', Icon: Sun, temp: '28°C', condition: 'Sunny', wind: '12 km/h' },
  { day: 'Tomorrow', Icon: Cloud, temp: '25°C', condition: 'Partly Cloudy', wind: '15 km/h' },
  { day: 'Day After', Icon: CloudRain, temp: '22°C', condition: 'Light Rain', wind: '18 km/h' },
];

export function WeatherForecast() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>3-Day Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-3">
          {weatherData.map(({ day, Icon, temp, condition, wind }) => (
            <div key={day} className="flex flex-col items-center justify-center gap-2 rounded-lg bg-secondary/30 p-4">
              <p className="font-semibold">{day}</p>
              <Icon className="h-12 w-12 text-accent" />
              <p className="text-2xl font-bold">{temp}</p>
              <p className="text-sm text-muted-foreground">{condition}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Wind className="h-3 w-3" />
                <span>{wind}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
