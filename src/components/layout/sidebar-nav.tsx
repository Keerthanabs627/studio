"use client";

import { usePathname } from 'next/navigation';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Bot, Calculator, LayoutDashboard, LineChart, User, Users } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/fertilizer-calculator', label: 'Calculator', icon: Calculator },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/market-prices', label: 'Market Prices', icon: LineChart },
  { href: '/chatbot', label: 'AI Chatbot', icon: Bot },
  { href: '/profile', label: 'Profile', icon: User },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
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
