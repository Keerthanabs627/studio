
// @ts-nocheck
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition, useEffect } from "react";
import { Loader2, BellRing } from "lucide-react";
import { updateNotificationPreferences, saveFCMToken } from "../../profile/actions";
import type { Profile } from "../../profile/actions";
import { Separator } from "@/components/ui/separator";
import { getFCMToken } from "@/lib/firebase/client";
import { useI18n } from "@/locales/client";

export function NotificationsClient({ initialPreferences }: { initialPreferences: Profile['notifications'] }) {
    const t = useI18n();
    const { toast } = useToast();
    const [preferences, setPreferences] = useState(initialPreferences);
    const [isSaving, startTransition] = useTransition();
    const [pushStatus, setPushStatus] = useState('default');


    useEffect(() => {
        if ('Notification' in window) {
            setPushStatus(Notification.permission);
        }
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

    const handleEnablePush = async () => {
        if (!('Notification' in window) || !('serviceWorker' in navigator)) {
            toast({
                variant: 'destructive',
                title: 'Unsupported',
                description: "Your browser does not support push notifications."
            });
            return;
        }

        if (Notification.permission === 'granted') {
            toast({ title: 'Already enabled!' });
            return;
        }

        if (Notification.permission === 'denied') {
            toast({ 
                variant: 'destructive',
                title: 'Permission Denied',
                description: 'You have previously blocked notifications. Please enable them in your browser settings.'
            });
            return;
        }
        
        try {
            const permission = await Notification.requestPermission();
            setPushStatus(permission);

            if (permission === 'granted') {
                 toast({
                    title: 'Push Notifications Enabled!',
                    description: 'Attempting to register your device...'
                });

                // Get token and save to DB
                const token = await getFCMToken();
                if (token) {
                    await saveFCMToken(token);
                     toast({
                        title: 'Device Registered!',
                        description: 'You will now receive reminders as push notifications.'
                    });
                } else {
                     toast({
                        variant: 'destructive',
                        title: 'Registration Failed',
                        description: 'Could not get a device token. Please try again.'
                    });
                }
            } else {
                 toast({
                    variant: 'destructive',
                    title: 'Permission Denied',
                    description: 'You will not receive push notifications.'
                });
            }
        } catch (error) {
            console.error("Error enabling push notifications:", error);
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An unexpected error occurred during setup.'
            });
        }
    };

    const getPushStatusText = () => {
        switch(pushStatus) {
            case 'granted': return 'Push notifications are enabled on this device.';
            case 'denied': return 'Push notifications are blocked in your browser settings.';
            default: return 'Enable push notifications to get reminders on your device.';
        }
    }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.notifications.title}</h1>
        <p className="text-muted-foreground">{t.notifications.description}</p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>{getPushStatusText()}</CardDescription>
        </CardHeader>
        <CardContent>
            <Button onClick={handleEnablePush} disabled={pushStatus !== 'default'}>
                <BellRing className="mr-2 h-4 w-4" />
                {pushStatus === 'default' ? 'Enable Push Notifications' : pushStatus === 'granted' ? 'Enabled' : 'Blocked'}
            </Button>
        </CardContent>
        <Separator className="my-4" />
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
