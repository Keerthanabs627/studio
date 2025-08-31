"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function SmsRemindersPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [smsEnabled, setSmsEnabled] = useState(true);
    const [whatsAppEnabled, setWhatsAppEnabled] = useState(false);


    const handleSaveChanges = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast({
                title: "Preferences Saved",
                description: "Your notification settings have been updated.",
            });
        }, 1000);
    }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SMS Reminders</h1>
        <p className="text-muted-foreground">Manage your SMS and WhatsApp reminder preferences.</p>
      </div>
       <Card>
        <CardHeader>
          <CardTitle>Notification Channels</CardTitle>
          <CardDescription>Choose how you want to receive reminders.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <Label htmlFor="sms-switch" className="flex flex-col gap-1">
                <span className="font-semibold">SMS Reminders</span>
                <span className="font-normal text-muted-foreground">Receive reminders via standard text messages.</span>
            </Label>
            <Switch id="sms-switch" checked={smsEnabled} onCheckedChange={setSmsEnabled} />
          </div>
           <div className="flex items-center justify-between p-4 rounded-lg border">
            <Label htmlFor="whatsapp-switch" className="flex flex-col gap-1">
                <span className="font-semibold">WhatsApp Reminders</span>
                <span className="font-normal text-muted-foreground">Receive reminders on WhatsApp.</span>
            </Label>
            <Switch id="whatsapp-switch" checked={whatsAppEnabled} onCheckedChange={setWhatsAppEnabled} />
          </div>
        </CardContent>
        <CardFooter>
            <Button onClick={handleSaveChanges} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Preferences
            </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
