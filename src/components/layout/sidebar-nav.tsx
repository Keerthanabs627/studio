// @ts-nocheck
"use client";

import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Bot, Calculator, LayoutDashboard, LineChart, User, Users, Map, Tractor, Bell, MessageCircle, Stethoscope, Radio, Landmark, Wrench, Compass, Code } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/locales/client';
import { WeatherIcon } from '../icons/weather-icon';

export function SidebarNav() {
  const pathname = usePathname();
  const t = useI18n();

  const navItems = [
    { href: '/dashboard', label: t.sidebar.dashboard, icon: LayoutDashboard },
    { href: '/guide', label: t.sidebar.guide, icon: Compass },
    { href: '/crop-doctor', label: t.sidebar.crop_doctor, icon: Stethoscope },
    { href: '/fertilizer-calculator', label: t.sidebar.fertilizer_calculator, icon: Calculator },
    { href: '/market-prices', label: t.sidebar.market_prices, icon: LineChart },
    { href: '/soil-suitability', label: t.sidebar.soil_suitability, icon: Map },
    { href: '/schemes', label: t.sidebar.schemes, icon: Landmark },
    { href: '/labor-marketplace', label: t.sidebar.labor_marketplace, icon: Wrench },
    { href: '/my-fields', label: t.sidebar.my_fields, icon: Tractor },
    { href: '/weather', label: t.dashboard.weather_forecast.title, icon: WeatherIcon },
    { href: '/community', label: t.sidebar.community, icon: Users },
    { href: '/chatbot', label: t.sidebar.ai_chatbot, icon: Bot },
    { href: '/profile', label: t.sidebar.our_profile, icon: User },
    { href: '/codes', label: t.sidebar.codes, icon: Code },
  ];

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')}
            tooltip={item.label}
          >
            <Link href={item.href}>
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
