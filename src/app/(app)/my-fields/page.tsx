// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getCropManagementAdvice } from "./actions";
import { useI18n } from "@/locales/client";

export default function MyFieldsPage() {
  const t = useI18n();
  const [crop, setCrop] = useState("Rice");
  const [stage, setStage] = useState("Vegetative");
  const [advice, setAdvice] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGetAdvice = () => {
    startTransition(async () => {
      const result = await getCropManagementAdvice({ crop, growth_stage: stage });
      if (result.data) {
        setAdvice(result.data.advice);
      } else {
        console.error(result.error);
        setAdvice(t.my_fields.advice_error);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.my_fields.title}</h1>
        <p className="text-muted-foreground">{t.my_fields.description}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t.my_fields.card1.title}</CardTitle>
            <CardDescription>{t.my_fields.card1.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="crop">{t.my_fields.card1.crop_label}</Label>
              <Input id="crop" value={crop} onChange={(e) => setCrop(e.target.value)} placeholder={t.my_fields.card1.crop_placeholder} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage">{t.my_fields.card1.stage_label}</Label>
              <Input id="stage" value={stage} onChange={(e) => setStage(e.target.value)} placeholder={t.my_fields.card1.stage_placeholder} />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGetAdvice} disabled={isPending || !crop || !stage}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t.my_fields.card1.button}
            </Button>
          </CardFooter>
        </Card>
        <Card className="bg-secondary/30">
          <CardHeader>
            <CardTitle>{t.my_fields.card2.title}</CardTitle>
            <CardDescription>{advice ? t.my_fields.card2.description_results : t.my_fields.card2.description_initial}</CardDescription>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : advice ? (
              <p className="text-sm whitespace-pre-wrap">{advice}</p>
            ) : (
              <div className="text-center text-muted-foreground pt-10">
                {t.my_fields.card2.initial_text}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
