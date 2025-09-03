// @ts-nocheck
'use client';

import { useState, useTransition, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { updateProfile, type Profile } from '../actions';
import { Loader2 } from 'lucide-react';
import type { Dictionary } from '@/locales/dictionaries';

export function ProfileClient({ initialProfile, t }: { initialProfile: Profile, t: Dictionary }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [name, setName] = useState(initialProfile.name);
  const [phone, setPhone] = useState(initialProfile.phone);

  const handleSave = () => {
    startTransition(async () => {
      const result = await updateProfile({ name, phone });
      if (result.success) {
        toast({
          title: t.profile.toast.title,
          description: t.profile.toast.description,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Update failed',
          description: result.message,
        });
      }
    });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
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
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t.profile.card1.phone_label}</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isPending}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {t.profile.card1.button}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
