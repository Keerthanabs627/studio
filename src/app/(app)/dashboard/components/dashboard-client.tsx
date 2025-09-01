
// @ts-nocheck
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Droplets, Stethoscope, LineChart, Map, Tractor, Bell, Users, Bot, Landmark, Wrench } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/locales/client";
import { useState, useEffect, useTransition } from "react";
import { getProfile, type Profile } from '../../profile/actions';
import { cn } from "@/lib/utils";
import { WeatherIcon } from "@/components/icons/weather-icon";


export function DashboardClient() {
  const t = useI18n();
  const [profile, setProfile] = useState<Profile | null>(null);

  const fetchInitialData = async () => {
      const fetchedProfile = await getProfile();
      setProfile(fetchedProfile);
    };

  useEffect(() => {
    fetchInitialData();
  }, []);


  const allCards = [
    { href: "/crop-doctor", icon: Stethoscope, title: t.sidebar.crop_doctor, color: "text-indigo-400" },
    { href: "/fertilizer-calculator", icon: Droplets, title: t.fertilizer_calculator.title, color: "text-yellow-400" },
    { href: "/market-prices", icon: LineChart, title: t.market_prices.title, color: "text-green-400" },
    { href: "/soil-suitability", icon: Map, title: t.sidebar.soil_suitability, color: "text-purple-400" },
    { href: "/my-fields", icon: Tractor, title: t.sidebar.my_fields, color: "text-red-400" },
    { href: "/reminders", icon: Bell, title: t.sidebar.reminders, color: "text-orange-400" },
    { href: "/community", icon: Users, title: t.sidebar.community, color: "text-pink-400" },
    { href: "/chatbot", icon: Bot, title: t.sidebar.ai_chatbot, color: "text-purple-500" },
    { href: "/weather", icon: WeatherIcon, title: t.dashboard.weather_forecast.title, color: "text-blue-400" },
    { href: "/schemes", icon: Landmark, title: t.sidebar.schemes, color: "text-teal-400" },
    { href: "/equipment-rental", icon: Wrench, title: t.sidebar.equipment_rental, color: "text-lime-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5">
        {allCards.map((card, index) => {
          const Icon = card.icon;
          return (
          <Link href={card.href} key={card.href} className="block">
            <Card className="flex flex-col items-center justify-center p-1 h-20 hover:bg-card/60 transition-colors duration-200">
                <Icon className={cn("h-6 w-6 mb-1", card.color)} />
                <p className="text-center text-xs font-medium">{card.title}</p>
            </Card>
          </Link>
        )})}
      </div>
    </div>
  );
}
