"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Calculator, LineChart, Loader2, Search, Users, Map, Tractor, Bell, MessageCircle } from "lucide-react";
import Link from "next/link";
import { WeatherForecast } from "./weather-forecast";
import { Input } from "@/components/ui/input";
import { getWeather } from "../actions";
import type { WeatherData } from "../actions";

export function DashboardClient() {
  const [location, setLocation] = useState("Belagavi");
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleWeatherSearch = () => {
    startTransition(async () => {
      const result = await getWeather({ location });
      if (result.data) {
        setWeatherData(result.data);
      } else {
        // Handle error case, maybe show a toast
        console.error(result.error);
        setWeatherData(null);
      }
    });
  };

  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to AgriSolutions Hub</h1>
        <p className="text-muted-foreground">Your AI-powered partner in modern agriculture.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weather Forecast</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
              className="flex-1"
              disabled={isPending}
              onKeyDown={(e) => e.key === 'Enter' && handleWeatherSearch()}
            />
            <Button onClick={handleWeatherSearch} disabled={isPending}>
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span className="ml-2 hidden sm:inline">Search</span>
            </Button>
          </div>
          <WeatherForecast weatherData={weatherData} loading={isPending} />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Fertilizer Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Calculate optimal fertilizer usage for your crops.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/fertilizer-calculator">
                Calculate Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              Market Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Get real-time market prices for your crops.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/market-prices">
                View Prices <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              Soil Suitability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Check soil suitability for your crops.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/soil-suitability">
                Check Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tractor className="h-5 w-5 text-primary" />
              My Fields
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Manage your fields and track crops.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/my-fields">
                Manage Fields <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Set and manage your farming reminders.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/reminders">
                Set Reminders <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              SMS Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Manage your SMS reminder preferences.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/sms-reminders">
                Manage SMS <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Community Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Connect with other farmers and experts.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/community">
                Join Discussion <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Ask our AI for expert advice on any topic.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/chatbot">
                Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
