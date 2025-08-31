"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getCropManagementAdvice } from "./actions";

export default function MyFieldsPage() {
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
        setAdvice("Could not retrieve advice at this time.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Fields</h1>
        <p className="text-muted-foreground">Get AI-powered advice for your crops at every stage.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Crop Details</CardTitle>
            <CardDescription>Enter your crop and its current growth stage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="crop">Crop Name</Label>
              <Input id="crop" value={crop} onChange={(e) => setCrop(e.target.value)} placeholder="e.g., Wheat" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stage">Growth Stage</Label>
              <Input id="stage" value={stage} onChange={(e) => setStage(e.target.value)} placeholder="e.g., Flowering" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGetAdvice} disabled={isPending || !crop || !stage}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Get Advice
            </Button>
          </CardFooter>
        </Card>
        <Card className="bg-secondary/30">
          <CardHeader>
            <CardTitle>Management Advice</CardTitle>
            <CardDescription>{advice ? "Here is your personalized advice:" : "Advice will appear here."}</CardDescription>
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
                Enter your crop details to get management advice.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
