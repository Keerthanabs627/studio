// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getFertilizerRecommendation } from "./actions";
import type { FertilizerRecommendation } from "./actions";
import { Loader2, Zap, AlertTriangle, Leaf } from "lucide-react";
import { useI18n } from "@/locales/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const crops = [
    "Rice", "Wheat", "Maize", "Barley", "Oats", "Sorghum", "Millet", "Rye",
    "Sugarcane", "Cotton", "Jute", "Soybean", "Groundnut", "Sunflower",
    "Mustard", "Rapeseed", "Safflower", "Linseed", "Castor", "Sesame",
    "Potato", "Onion", "Tomato", "Brinjal", "Cabbage", "Cauliflower",
    "Okra", "Chilli", "Capsicum", "Ginger", "Turmeric", "Garlic",
    "Coriander", "Cumin", "Fennel", "Fenugreek", "Lentil", "Chickpea",
    "Pigeonpea", "Blackgram", "Greengram", "Peas", "Apple", "Banana",
    "Mango", "Grapes", "Orange", "Pomegranate", "Guava", "Papaya"
];


export default function SmartYieldOptimizerPage() {
    const t = useI18n();
    const [crop, setCrop] = useState<string>("");
    const [area, setArea] = useState<string>("");
    const [results, setResults] = useState<FertilizerRecommendation | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleCalculate = () => {
        if (!crop || !area) return;

        startTransition(async () => {
            const areaNumber = parseFloat(area);
            if (isNaN(areaNumber)) return;
            const res = await getFertilizerRecommendation({ cropName: crop, area: areaNumber });
            if (res.data) {
                setResults(res.data);
            } else {
                console.error(res.error);
                setResults(null);
            }
        });
    };
    
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.fertilizer_calculator.title}</h1>
                <p className="text-muted-foreground">{t.fertilizer_calculator.description}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>{t.fertilizer_calculator.card1.title}</CardTitle>
                        <CardDescription>{t.fertilizer_calculator.card1.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="crop-name">{t.fertilizer_calculator.card1.crop_label}</Label>
                            <Select onValueChange={setCrop} value={crop}>
                                <SelectTrigger id="crop-name">
                                    <SelectValue placeholder={t.fertilizer_calculator.card1.crop_placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {crops.map((c) => (
                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="area">{t.fertilizer_calculator.card1.area_label}</Label>
                            <Input id="area" type="number" placeholder="e.g., 5" value={area} onChange={(e) => setArea(e.target.value)} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleCalculate} disabled={isPending || !crop || !area} className="w-full">
                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                            {t.fertilizer_calculator.card1.button}
                        </Button>
                    </CardFooter>
                </Card>

                <div className="md:col-span-2 space-y-6">
                     {isPending ? (
                         <div className="flex items-center justify-center h-full min-h-[300px] bg-card rounded-lg border">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                         </div>
                    ) : results ? (
                        <div>
                             <div className="mb-4">
                                <h2 className="text-2xl font-bold">{t.fertilizer_calculator.card2.title}</h2>
                                <p className="text-muted-foreground">{`${t.fertilizer_calculator.card2.description_results_prefix} ${crop}`}</p>
                            </div>
                            <div className="space-y-4">
                                {results.plan.map((stage, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-lg">{stage.stage}</CardTitle>
                                                <div className="text-right font-semibold text-primary">{stage.estimated_cost}</div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="font-semibold mb-2">{stage.recommendation}</p>
                                            <p className="text-sm text-muted-foreground">{stage.reasoning}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                                {results.waste_savings_alert && (
                                    <Alert>
                                        <AlertTriangle className="h-4 w-4" />
                                        <AlertTitle className="font-bold">{t.fertilizer_calculator.card2.waste_alert_title}</AlertTitle>
                                        <AlertDescription>
                                            {results.waste_savings_alert.notice}
                                            <span className="block font-semibold mt-2">{t.fertilizer_calculator.card2.savings_estimate_label} {results.waste_savings_alert.savings_estimate}</span>
                                        </AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground h-full flex flex-col justify-center items-center bg-card rounded-lg border min-h-[300px]">
                            <Leaf className="w-12 h-12 text-muted-foreground/50 mb-4" />
                            <p className="font-semibold">{t.fertilizer_calculator.card2.description_initial}</p>
                            <p className="text-sm">{t.fertilizer_calculator.card2.initial_text}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
