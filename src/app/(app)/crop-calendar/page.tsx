
// @ts-nocheck
"use client";

import { useState, useEffect, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Wheat, Tractor, Bug } from "lucide-react";
import { useI18n } from "@/locales/client";
import { useToast } from "@/hooks/use-toast";
import { getCropCalendar, type CropCalendarOutput } from "./actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const regions = [
    "North India", "South India", "East India", "West India", "Central India"
]

export default function CropCalendarPage() {
  const t = useI18n();
  const { toast } = useToast();
  const [calendarData, setCalendarData] = useState<CropCalendarOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  const [month, setMonth] = useState<string>(new Date().toLocaleString('default', { month: 'long' }));
  const [region, setRegion] = useState<string>("South India");

  const fetchCalendarData = () => {
    startTransition(async () => {
      try {
        const result = await getCropCalendar({ month, region });
        if (result.data) {
          setCalendarData(result.data);
        } else {
          toast({
            variant: "destructive",
            title: t.crop_calendar.toast.error_title,
            description: result.error || t.crop_calendar.toast.error_desc,
          });
          setCalendarData(null);
        }
      } catch (error) {
        toast({
            variant: "destructive",
            title: t.crop_calendar.toast.error_title,
            description: t.crop_calendar.toast.error_desc,
        });
        setCalendarData(null);
      }
    });
  }

  useEffect(() => {
    fetchCalendarData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.sidebar.crop_calendar}</h1>
        <p className="text-muted-foreground">{t.crop_calendar.description}</p>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
            <div className="space-y-1.5">
                <CardTitle>{t.crop_calendar.title.replace('{month}', month)}</CardTitle>
                <CardDescription>{t.crop_calendar.subtitle.replace('{region}', region)}</CardDescription>
            </div>
             <div className="flex items-center gap-2">
                <Select value={region} onValueChange={setRegion}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                        {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Button onClick={fetchCalendarData} disabled={isPending}>
                    {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {t.crop_calendar.button}
                </Button>
            </div>
        </CardHeader>
      </Card>
      
      {isPending ? (
         <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
         </div>
      ) : calendarData ? (
        <div className="grid gap-8 md:grid-cols-3">
            {/* Sowing */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wheat className="h-6 w-6 text-primary" />
                        {t.crop_calendar.sowing_title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                    {calendarData.sowing.map((crop) => (
                        <li key={crop.name} className="flex items-center gap-3">
                            <span className="text-2xl">{crop.icon}</span>
                            <span className="font-medium">{crop.name}</span>
                        </li>
                    ))}
                    </ul>
                </CardContent>
            </Card>
            {/* Harvesting */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Tractor className="h-6 w-6 text-primary" />
                        {t.crop_calendar.harvesting_title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                    {calendarData.harvesting.map((crop) => (
                        <li key={crop.name} className="flex items-center gap-3">
                            <span className="text-2xl">{crop.icon}</span>
                            <span className="font-medium">{crop.name}</span>
                        </li>
                    ))}
                    </ul>
                </CardContent>
            </Card>
             {/* Alerts */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bug className="h-6 w-6 text-destructive" />
                        {t.crop_calendar.alerts_title}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="space-y-4">
                        {calendarData.alerts.map((alert) => (
                            <Alert key={alert.name} variant="destructive">
                                <AlertTitle>{alert.name}</AlertTitle>
                                <AlertDescription>
                                    <p className="text-xs"><strong>{t.crop_calendar.affected_crops}:</strong> {alert.affected_crops.join(', ')}</p>
                                    <p className="text-xs mt-1"><strong>{t.crop_calendar.symptoms}:</strong> {alert.symptoms}</p>
                                    <p className="text-xs mt-1"><strong>{t.crop_calendar.prevention}:</strong> {alert.prevention}</p>
                                </AlertDescription>
                            </Alert>
                        ))}
                   </div>
                </CardContent>
            </Card>
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
            <p>{t.crop_calendar.no_data}</p>
        </div>
      )}
    </div>
  );
}
