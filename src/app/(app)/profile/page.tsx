// @ts-nocheck
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/locales/client";

export default function ProfilePage() {
  const t = useI18n();
  const [name, setName] = useState("Rakesh Sharma");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: t('profile.toast.title'),
        description: t('profile.toast.description'),
      });
    }, 1500);
  };


  return (
    <div className="max-w-2xl mx-auto space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('profile.title')}</h1>
        <p className="text-muted-foreground">{t('profile.description')}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('profile.card1.title')}</CardTitle>
          <CardDescription>{t('profile.card1.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('profile.card1.name_label')}</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isSaving} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t('profile.card1.phone_label')}</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isSaving}/>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t('profile.card1.button')}
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>{t('profile.card2.title')}</CardTitle>
            <CardDescription>{t('profile.card2.description')}</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-primary"/>
                    <div>
                        <p className="font-medium">{t('profile.card2.sms_title')}</p>
                        <p className="text-sm text-muted-foreground">{t('profile.card2.sms_description')}</p>
                    </div>
                </div>
                <Switch defaultChecked />
           </div>
        </CardContent>
      </Card>
    </div>
  );
}
