"use client";

import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Bot, Calculator, LayoutDashboard, LineChart, User, Users, Map, Tractor, Bell, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/fertilizer-calculator', label: 'Calculator', icon: Calculator },
  { href: '/market-prices', label: 'Market Prices', icon: LineChart },
  { href: '/soil-suitability', label: 'Soil Suitability', icon: Map },
  { href: '/my-fields', label: 'My Fields', icon: Tractor },
  { href: '/reminders', label: 'Reminders', icon: Bell },
  { href: '/sms-reminders', label: 'SMS Reminders', icon: MessageCircle },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/chatbot', label: 'AI Chatbot', icon: Bot },
  { href: '/profile', label: 'Our Profile', icon: User },
];

export function SidebarNav() {
  const pathname = usePathname();

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
