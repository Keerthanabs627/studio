// @ts-nocheck
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useI18n } from "@/locales/client";
import { getProfile, updateNotificationPreferences } from "../profile/actions";
import type { Profile } from "../profile/actions";

export default function NotificationsPage() {
    const t = useI18n();
    const { toast } = useToast();
    const [preferences, setPreferences] = useState({ sms: true, whatsapp: false });
    const [isSaving, startTransition] = useTransition();

    useEffect(() => {
        const fetchPrefs = async () => {
            const profile = await getProfile();
            setPreferences(profile.notifications);
        };
        fetchPrefs();
    }, []);


    const handleSaveChanges = () => {
        startTransition(async () => {
            const result = await updateNotificationPreferences(preferences);
             if (result.error) {
                toast({
                    variant: "destructive",
                    title: "Update Failed",
                    description: "Could not save your preferences.",
                });
            } else {
                toast({
                    title: t.notifications.toast.title,
                    description: t.notifications.toast.description,
                });
            }
        });
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
            <Label htmlFor="sms-switch" className="flex flex-col gap-1 cursor-pointer">
                <span className="font-semibold">{t.notifications.card.sms_title}</span>
                <span className="font-normal text-muted-foreground">{t.notifications.card.sms_description}</span>
            </Label>
            <Switch 
                id="sms-switch" 
                checked={preferences.sms} 
                onCheckedChange={(checked) => setPreferences(p => ({ ...p, sms: checked }))} 
                disabled={isSaving}
            />
          </div>
           <div className="flex items-center justify-between p-4 rounded-lg border">
            <Label htmlFor="whatsapp-switch" className="flex flex-col gap-1 cursor-pointer">
                <span className="font-semibold">{t.notifications.card.whatsapp_title}</span>
                <span className="font-normal text-muted-foreground">{t.notifications.card.whatsapp_description}</span>
            </Label>
            <Switch 
                id="whatsapp-switch" 
                checked={preferences.whatsapp} 
                onCheckedChange={(checked) => setPreferences(p => ({ ...p, whatsapp: checked }))} 
                disabled={isSaving}
            />
          </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleSaveChanges} disabled={isSaving}>
                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t.notifications.card.button}
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
