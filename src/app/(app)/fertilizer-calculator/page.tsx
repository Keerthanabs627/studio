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
import { Loader2, Zap, CheckCircle2 } from "lucide-react";
import { useI18n } from "@/locales/client";

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
    
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.fertilizer_calculator.title}</h1>
                <p className="text-muted-foreground">{t.fertilizer_calculator.description}</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                <Card>
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
                        <Button onClick={handleCalculate} disabled={isPending || !crop || !area}>
                            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                            {t.fertilizer_calculator.card1.button}
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="bg-secondary/30">
                    <CardHeader>
                        <CardTitle>{t.fertilizer_calculator.card2.title}</CardTitle>
                        <CardDescription>
                            {results ? `${t.fertilizer_calculator.card2.description_results_prefix} ${crop}` : t.fertilizer_calculator.card2.description_initial}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {isPending ? (
                             <div className="flex items-center justify-center h-full min-h-[200px]">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                             </div>
                        ) : results ? (
                            <div className="space-y-3 text-lg">
                                <p><span className="font-semibold">For {area} acre(s) of {crop}:</span></p>
                                <ul className="space-y-2 pl-2 text-base">
                                    <li><strong>Required fertilizer:</strong> NPK ≈ {results.required_fertilizer_kg} kg</li>
                                    <li><strong>Fertilizer cost:</strong> {formatCurrency(results.fertilizer_cost)}</li>
                                    <li><strong>Expected crop value:</strong> {formatCurrency(results.expected_crop_value)}</li>
                                    <li className="font-bold text-primary"><strong>Total profit:</strong> {formatCurrency(results.total_profit)}</li>
                                </ul>
                                <div className="flex items-center gap-2 pt-2 text-base text-green-400">
                                    <CheckCircle2 className="h-5 w-5"/>
                                    <p>{results.status_message}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground pt-10 flex flex-col items-center">
                                <Zap className="w-12 h-12 text-muted-foreground/50 mb-4" />
                                {t.fertilizer_calculator.card2.initial_text}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
