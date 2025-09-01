
// @ts-nocheck
"use client";

import { Card } from "@/components/ui/card";
import { Bot, Calculator, LineChart, Users, Map, Tractor, Bell, MessageCircle, Sun, Stethoscope, User, Droplets } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/locales/client";

export function DashboardClient() {
  const t = useI18n();
  
  const allCards = [
    { href: "/dashboard", icon: Sun, title: t.dashboard.weather_forecast.title, color: "text-blue-400" },
    { href: "/fertilizer-calculator", icon: Droplets, title: t.fertilizer_calculator.title, color: "text-yellow-400" },
    { href: "/market-prices", icon: LineChart, title: t.market_prices.title, color: "text-green-400" },
    { href: "/soil-suitability", icon: Map, title: t.sidebar.soil_suitability, color: "text-purple-400" },
    { href: "/my-fields", icon: Tractor, title: t.sidebar.my_fields, color: "text-red-400" },
    { href: "/reminders", icon: Bell, title: t.sidebar.reminders, color: "text-orange-400" },
    { href: "/sms-reminders", icon: MessageCircle, title: t.sidebar.sms_reminders, color: "text-teal-400" },
    { href: "/community", icon: Users, title: t.sidebar.community, color: "text-pink-400" },
    { href: "/profile", icon: User, title: t.sidebar.our_profile, color: "text-yellow-300" },
    { href: "/crop-doctor", icon: Stethoscope, title: t.sidebar.crop_doctor, color: "text-indigo-400" },
    { href: "/chatbot", icon: Bot, title: t.sidebar.ai_chatbot, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {allCards.map((card, index) => (
          <Link href={card.href} key={index}>
            <Card className="flex flex-col items-center justify-center p-4 h-32 aspect-square hover:bg-card/60 transition-colors duration-200">
                <card.icon className={`h-10 w-10 mb-2 ${card.color}`} />
                <p className="text-center text-sm font-medium">{card.title}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
