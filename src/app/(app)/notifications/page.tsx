
// @ts-nocheck
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useI18n } from "@/locales/client";

export default function NotificationsPage() {
    const t = useI18n();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [smsEnabled, setSmsEnabled] = useState(true);
    const [whatsAppEnabled, setWhatsAppEnabled] = useState(false);


    const handleSaveChanges = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: t.notifications.toast.title,
                description: t.notifications.toast.description,
            });
        }, 1000);
    }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.notifications.title}</h1>
        <p className="text-muted-foreground">{t.notifications.description}</p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>{t.notifications.card.title}</CardTitle>
          <CardDescription>{t.notifications.card.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <Label htmlFor="sms-switch" className="flex flex-col gap-1">
                <span className="font-semibold">{t.notifications.card.sms_title}</span>
                <span className="font-normal text-muted-foreground">{t.notifications.card.sms_description}</span>
            </Label>
            <Switch id="sms-switch" checked={smsEnabled} onCheckedChange={setSmsEnabled} />
          </div>
           <div className="flex items-center justify-between p-4 rounded-lg border">
            <Label htmlFor="whatsapp-switch" className="flex flex-col gap-1">
                <span className="font-semibold">{t.notifications.card.whatsapp_title}</span>
                <span className="font-normal text-muted-foreground">{t.notifications.card.whatsapp_description}</span>
            </Label>
            <Switch id="whatsapp-switch" checked={whatsAppEnabled} onCheckedChange={setWhatsAppEnabled} />
          </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleSaveChanges} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.notifications.card.button}
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
