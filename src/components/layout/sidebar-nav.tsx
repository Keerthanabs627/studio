
// @ts-nocheck
"use client";

import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Bot, Calculator, LayoutDashboard, LineChart, User, Users, Map, Tractor, Bell, MessageCircle, Stethoscope } from 'lucide-react';
import Link from 'next/link';
import { useI18n } from '@/locales/client';

export function SidebarNav() {
  const pathname = usePathname();
  const t = useI18n();

  const navItems = [
    { href: '/dashboard', label: t.sidebar.dashboard, icon: LayoutDashboard },
    { href: '/crop-doctor', label: t.sidebar.crop_doctor, icon: Stethoscope },
    { href: '/fertilizer-calculator', label: t.sidebar.fertilizer_calculator, icon: Calculator },
    { href: '/market-prices', label: t.sidebar.market_prices, icon: LineChart },
    { href: '/soil-suitability', label: t.sidebar.soil_suitability, icon: Map },
    { href: '/my-fields', label: t.sidebar.my_fields, icon: Tractor },
    { href: '/reminders', label: t.sidebar.reminders, icon: Bell },
    { href: '/sms-reminders', label: t.sidebar.sms_reminders, icon: MessageCircle },
    { href: '/community', label: t.sidebar.community, icon: Users },
    { href: '/chatbot', label: t.sidebar.ai_chatbot, icon: Bot },
    { href: '/profile', label: t.sidebar.our_profile, icon: User },
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
