
// @ts-nocheck
"use client";

import { useState, useTransition, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Calculator, LineChart, Loader2, Search, Users, Map, Tractor, Bell, MessageCircle, Sun, Stethoscope, Radio, Play, Pause } from "lucide-react";
import Link from "next/link";
import { WeatherForecast } from "./weather-forecast";
import { Input } from "@/components/ui/input";
import { getWeather, getFarmRadioBroadcast } from "../actions";
import type { WeatherData } from "../actions";
import { useI18n, useLocale } from "@/locales/client";
import { useToast } from "@/hooks/use-toast";

export function DashboardClient() {
  const t = useI18n();
  const { toast } = useToast();
  const { locale } = useLocale();
  const [location, setLocation] = useState("Belagavi");
  const [weatherData, setWeatherData] = useState<WeatherData[] | null>(null);
  const [isWeatherPending, startWeatherTransition] = useTransition();
  const [isRadioPending, startRadioTransition] = useTransition();
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);


  const handleWeatherSearch = () => {
    if (!location) return;
    startWeatherTransition(async () => {
      const result = await getWeather({ location });
      if (result.data) {
        setWeatherData(result.data);
      } else {
        console.error(result.error);
        setWeatherData(null);
      }
    });
  };

  const handlePlayRadio = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (audioDataUri && audioRef.current) {
        audioRef.current.play();
        setIsPlaying(true)
        return;
    }

    startRadioTransition(async () => {
        const result = await getFarmRadioBroadcast({ location, locale });
        if (result.data) {
            setAudioDataUri(result.data.audioDataUri);
            // The audio element will play automatically via the `onLoadedData` event
        } else {
            toast({
                variant: 'destructive',
                title: t.dashboard.farm_radio.toast.error_title,
                description: result.error,
            })
        }
    })
  }

  const onAudioEnded = () => {
    setIsPlaying(false);
    setAudioDataUri(null); // Reset to allow fetching a new one
  }
  
  const dashboardCards = [
    { href: "/fertilizer-calculator", icon: Calculator, title: t.dashboard.fertilizer_calculator.title, description: t.dashboard.fertilizer_calculator.description, linkText: t.dashboard.fertilizer_calculator.button },
    { href: "/market-prices", icon: LineChart, title: t.dashboard.market_prices.title, description: t.dashboard.market_prices.description, linkText: t.dashboard.market_prices.button },
    { href: "/soil-suitability", icon: Map, title: t.dashboard.soil_suitability.title, description: t.dashboard.soil_suitability.description, linkText: t.dashboard.soil_suitability.button },
    { href: "/crop-doctor", icon: Stethoscope, title: t.dashboard.crop_doctor.title, description: t.dashboard.crop_doctor.description, linkText: t.dashboard.crop_doctor.button },
    { href: "/my-fields", icon: Tractor, title: t.dashboard.my_fields.title, description: t.dashboard.my_fields.description, linkText: t.dashboard.my_fields.button },
    { href: "/reminders", icon: Bell, title: t.dashboard.reminders.title, description: t.dashboard.reminders.description, linkText: t.dashboard.reminders.button },
    { href: "/sms-reminders", icon: MessageCircle, title: t.dashboard.sms_reminders.title, description: t.dashboard.sms_reminders.description, linkText: t.dashboard.sms_reminders.button },
    { href: "/community", icon: Users, title: t.dashboard.community_hub.title, description: t.dashboard.community_hub.description, linkText: t.dashboard.community_hub.button },
    { href: "/chatbot", icon: Bot, title: t.dashboard.ai_assistant.title, description: t.dashboard.ai_assistant.description, linkText: t.dashboard.ai_assistant.button },
  ];

  const utilityCards = [
    { 
        icon: Radio, 
        title: t.dashboard.farm_radio.title,
        description: (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
                <p className="text-xs text-muted-foreground">{t.dashboard.farm_radio.description}</p>
                <Button onClick={handlePlayRadio} disabled={isRadioPending} size="sm">
                    {isRadioPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : isPlaying ? <Pause className="mr-2 h-4 w-4"/> : <Play className="mr-2 h-4 w-4" />}
                    {isRadioPending ? t.dashboard.farm_radio.loading_button : isPlaying ? t.dashboard.farm_radio.pause_button : t.dashboard.farm_radio.play_button}
                </Button>
                {audioDataUri && (
                    <audio
                        ref={audioRef}
                        src={audioDataUri}
                        onLoadedData={() => {
                            if (audioRef.current) {
                                audioRef.current.play();
                                setIsPlaying(true);
                            }
                        }}
                        onEnded={onAudioEnded}
                        className="hidden"
                    />
                )}
            </div>
        )
    },
    {
      icon: Sun,
      title: t.dashboard.weather_forecast.title,
      description: (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t.dashboard.weather_forecast.placeholder}
                className="flex-1"
                disabled={isWeatherPending}
                onKeyDown={(e) => e.key === 'Enter' && handleWeatherSearch()}
              />
              <Button onClick={handleWeatherSearch} size="icon" disabled={isWeatherPending || !location.trim()}>
                {isWeatherPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span className="sr-only">{t.dashboard.weather_forecast.button}</span>
              </Button>
            </div>
            <WeatherForecast weatherData={weatherData} loading={isWeatherPending} />
          </div>
      )
  }
  ]

  const allCards = [...dashboardCards, ...utilityCards];


  return (
    <div className="space-y-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t.dashboard.welcome}</h1>
        <p className="text-muted-foreground">{t.dashboard.description}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        
        {allCards.map((card, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <card.icon className="h-5 w-5 text-primary" />
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow space-y-2 flex flex-col justify-center items-center text-center p-4 min-h-32">
                {typeof card.description === 'string' ? (
                     <>
                        <div className="flex items-center justify-center p-2 rounded-lg bg-secondary/20 h-14 w-14">
                            <card.icon className="h-8 w-8 text-primary" />
                        </div>
                        <p className="text-xs text-muted-foreground h-8">{card.description}</p>
                    </>
                ) : (
                    <div className="w-full">{card.description}</div>
                )}
            </CardContent>
            {card.href && (
                <CardFooter className="pt-2">
                <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={card.href}>
                    {card.linkText} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
