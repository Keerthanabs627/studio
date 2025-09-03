
// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { updateProfile } from "../actions";
import type { Profile } from "../actions";
import { useRouter } from "next/navigation";
import { useI18n } from "@/locales/client";

export function ProfileClient({ initialProfile }: { initialProfile: Profile }) {
  const t = useI18n();
  const router = useRouter();
  const [name, setName] = useState(initialProfile.name);
  const [phone, setPhone] = useState(initialProfile.phone);
  const [isSaving, startTransition] = useTransition();
  const { toast } = useToast();

  const handleSaveChanges = () => {
    startTransition(async () => {
      const result = await updateProfile({ name, phone });
      if (result.error) {
         toast({
            variant: "destructive",
            title: "Update Failed",
            description: Object.values(result.error).flat().join(', ') || "Please check your inputs and try again.",
         });
      } else {
        toast({
          title: t.profile.toast.title,
          description: t.profile.toast.description,
        });
        // Optimistically update state, though revalidatePath will handle it
        if(result.data){
            setName(result.data.name);
            setPhone(result.data.phone);
        }
        router.refresh();
      }
    });
  };


  return (
    <div className="max-w-2xl mx-auto space-y-6">
       <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.profile.title}</h1>
        <p className="text-muted-foreground">{t.profile.description}</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{t.profile.card1.title}</CardTitle>
          <CardDescription>{t.profile.card1.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t.profile.card1.name_label}</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isSaving} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t.profile.card1.phone_label}</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isSaving}/>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t.profile.card1.button}
          </Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
            <CardTitle>{t.profile.card2.title}</CardTitle>
            <CardDescription>{t.profile.card2.description}</CardDescription>
        </CardHeader>
        <CardContent>
           <button
             onClick={() => router.push('/notifications')}
             className="w-full flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
           >
                <div className="flex items-center gap-3 text-left">
                    <Bell className="h-5 w-5 text-primary"/>
                    <div>
                        <p className="font-medium">{t.profile.card2.manage_title}</p>
                        <p className="text-sm text-muted-foreground">{t.profile.card2.manage_description}</p>
                    </div>
                </div>
           </button>
        </CardContent>
      </Card>
    </div>
  );
}
