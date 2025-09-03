
// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Phone } from "lucide-react";
import { getEquipment, addEquipment, type Equipment } from "../actions";
import { useToast } from "@/hooks/use-toast";
import type { Profile } from "../../profile/actions";
import { useI18n } from "@/locales/client";

export function EquipmentRentalClient({ initialEquipment, profile }: { initialEquipment: Equipment[], profile: Profile | null }) {
  const t = useI18n();
  const [equipment, setEquipment] = useState<Equipment[]>(initialEquipment);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  // Form state
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [location, setLocation] = useState("");

  const handleListEquipment = () => {
    if (!name.trim() || !rate.trim() || !location.trim()) {
        toast({
            variant: 'destructive',
            title: t.equipment_rental.toast.missing_info_title,
            description: t.equipment_rental.toast.missing_info_desc,
        });
        return;
    }

    startTransition(async () => {
        try {
            const newEquipment = await addEquipment({
                name,
                rate,
                location,
            });
            setEquipment(prev => [newEquipment, ...prev]);

            setName("");
            setRate("");
            setLocation("");
            toast({
                title: t.equipment_rental.toast.add_success_title,
                description: t.equipment_rental.toast.add_success_desc,
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: t.equipment_rental.toast.add_error_title,
                description: t.equipment_rental.toast.add_error_desc,
            })
        }
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.equipment_rental.title}</h1>
        <p className="text-muted-foreground">{t.equipment_rental.description}</p>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">{t.equipment_rental.available_title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {equipment.map((item) => (
                <Card key={item.id} className="overflow-hidden flex flex-col">
                    <CardContent className="p-4 space-y-3 flex-1">
                        <CardTitle className="text-xl">{item.name}</CardTitle>
                         <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={item.avatar} alt={item.owner} data-ai-hint="person" />
                                <AvatarFallback>{item.owner.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{t.equipment_rental.listed_by} {item.owner}</span>
                        </div>
                        <div className="font-bold text-lg text-primary">{item.rate}</div>
                        <p className="text-sm text-muted-foreground">{t.equipment_rental.location}: {item.location}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>{t.equipment_rental.list_card.title}</CardTitle>
                    <CardDescription>{t.equipment_rental.list_card.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="equipment-name">{t.equipment_rental.list_card.name_label}</Label>
                        <Input id="equipment-name" placeholder={t.equipment_rental.list_card.name_placeholder} value={name} onChange={(e) => setName(e.target.value)} disabled={isPending} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="rental-rate">{t.equipment_rental.list_card.rate_label}</Label>
                        <Input id="rental-rate" placeholder={t.equipment_rental.list_card.rate_placeholder} value={rate} onChange={(e) => setRate(e.target.value)} disabled={isPending} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="location">{t.equipment_rental.list_card.location_label}</Label>
                        <Input id="location" placeholder={t.equipment_rental.list_card.location_placeholder} value={location} onChange={(e) => setLocation(e.target.value)} disabled={isPending} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleListEquipment} disabled={isPending}>
                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t.equipment_rental.list_card.button}
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
