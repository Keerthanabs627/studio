
// @ts-nocheck
'use client';

import { DashboardClient } from "./components/dashboard-client";
import { useI18n } from "@/locales/client";


export default function DashboardPage() {
  const t = useI18n();
  return (
    <div className="space-y-12">
       <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight">{t.sidebar.dashboard}</h1>
        <p className="text-muted-foreground">{t.dashboard.description}</p>
      </div>
      <DashboardClient />
    </div>
  )
}
