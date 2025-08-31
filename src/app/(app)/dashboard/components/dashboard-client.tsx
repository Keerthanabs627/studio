
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
  
  const allCards = [
    { 
        icon: Radio, 
        title: t.sidebar.farm_radio,
        isFarmRadio: true,
        description: t.dashboard.farm_radio.description,
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-2 pt-2">
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
    { href: "/fertilizer-calculator", icon: Calculator, title: t.sidebar.fertilizer_calculator, description: t.dashboard.fertilizer_calculator.description, linkText: t.dashboard.fertilizer_calculator.button },
    { href: "/market-prices", icon: LineChart, title: t.market_prices.title, description: t.dashboard.market_prices.description, linkText: t.dashboard.market_prices.button },
    { href: "/crop-doctor", icon: Stethoscope, title: t.sidebar.crop_doctor, description: t.dashboard.crop_doctor.description, linkText: t.dashboard.crop_doctor.button },
    { href: "/soil-suitability", icon: Map, title: t.sidebar.soil_suitability, description: t.dashboard.soil_suitability.description, linkText: t.dashboard.soil_suitability.button },
    { href: "/my-fields", icon: Tractor, title: t.sidebar.my_fields, description: t.dashboard.my_fields.description, linkText: t.dashboard.my_fields.button },
    { href: "/reminders", icon: Bell, title: t.sidebar.reminders, description: t.dashboard.reminders.description, linkText: t.dashboard.reminders.button },
    { href: "/sms-reminders", icon: MessageCircle, title: t.sidebar.sms_reminders, description: t.dashboard.sms_reminders.description, linkText: t.dashboard.sms_reminders.button },
    { href: "/community", icon: Users, title: t.sidebar.community, description: t.dashboard.community_hub.description, linkText: t.dashboard.community_hub.button },
    { href: "/chatbot", icon: Bot, title: t.sidebar.ai_chatbot, description: t.dashboard.ai_assistant.description, linkText: t.dashboard.ai_assistant.button },
  ];

  const utilityCards = [
    {
      icon: Sun,
      title: t.dashboard.weather_forecast.title,
      content: (
        <div className="space-y-4">
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
  ];

  const orderedCards = [
    allCards.find(c => c.isFarmRadio),
    allCards.find(c => c.title === t.sidebar.fertilizer_calculator),
    allCards.find(c => c.title === t.market_prices.title),
    allCards.find(c => c.title === t.sidebar.crop_doctor),
    ...allCards.filter(c => ![t.sidebar.farm_radio, t.sidebar.fertilizer_calculator, t.market_prices.title, t.sidebar.crop_doctor].includes(c.title) && !c.isFarmRadio),
  ].filter(Boolean);


  return (
    <div className="space-y-8">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t.dashboard.welcome}</h1>
        <p className="text-muted-foreground">{t.dashboard.description}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">

        {orderedCards.map((card, index) => (
          <Card key={index} className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
             <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <card.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-semibold tracking-tight">{card.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow text-sm text-muted-foreground">
              {card.isFarmRadio ? card.content : <p className="min-h-[40px]">{card.description}</p>}
            </CardContent>
            {card.href && (
              <CardFooter>
                <Button asChild variant="secondary" className="w-full">
                  <Link href={card.href}>
                    {card.linkText} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            )}
            {card.isFarmRadio && !card.href && <CardFooter>{card.content}</CardFooter>}
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1">
        {utilityCards.map((card, index) => (
            <Card key={index} className="col-span-1 md:col-span-2 flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <card.icon className="h-5 w-5 text-primary" />
                        {card.title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {card.content}
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
