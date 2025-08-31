// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Droplets, Thermometer, Wind, Sun } from "lucide-react";
import { getSoilSuitability, SoilSuitabilityOutput } from "./actions";
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

const soilTypes = [
    "Alluvial", "Black", "Red", "Laterite", "Arid", "Forest", "Peaty", "Saline"
];


export default function SoilSuitabilityPage() {
    const t = useI18n();
    const [crop, setCrop] = useState("");
    const [soil, setSoil] = useState("");
    const [results, setResults] = useState<SoilSuitabilityOutput | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleCheckSuitability = () => {
        if (!crop || !soil) return;
        startTransition(async () => {
            const res = await getSoilSuitability({ crop, soil_type: soil });
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
        <h1 className="text-3xl font-bold tracking-tight">{t.soil_suitability.title}</h1>
        <p className="text-muted-foreground">{t.soil_suitability.description}</p>
      </div>
       <div className="grid gap-8 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>{t.soil_suitability.card1.title}</CardTitle>
                    <CardDescription>{t.soil_suitability.card1.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label htmlFor="crop-name">{t.soil_suitability.card1.crop_label}</Label>
                        <Select onValueChange={setCrop} value={crop}>
                            <SelectTrigger id="crop-name">
                                <SelectValue placeholder={t.soil_suitability.card1.crop_placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {crops.map((c) => (
                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="soil-type">{t.soil_suitability.card1.soil_label}</Label>
                        <Select onValueChange={setSoil} value={soil}>
                            <SelectTrigger id="soil-type">
                                <SelectValue placeholder={t.soil_suitability.card1.soil_placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                                {soilTypes.map((s) => (
                                    <SelectItem key={s} value={s}>{s}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleCheckSuitability} disabled={isPending || !crop || !soil}>
                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {t.soil_suitability.card1.button}
                    </Button>
                </CardFooter>
            </Card>
             <Card className="bg-secondary/30">
                <CardHeader>
                    <CardTitle>{t.soil_suitability.card2.title}</CardTitle>
                    <CardDescription>
                         {results ? `${t.soil_suitability.card2.description_results_prefix} ${crop} on ${soil} soil.` : t.soil_suitability.card2.description_initial}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isPending ? (
                         <div className="flex items-center justify-center h-full">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                         </div>
                    ) : results ? (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className={`text-3xl font-bold ${results.is_suitable ? 'text-green-600' : 'text-red-600'}`}>
                                    {results.suitability_score}%
                                </div>
                                <p className="text-sm">{results.analysis}</p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-2">{t.soil_suitability.card2.recommendations_title}</h4>
                                <p className="text-sm text-muted-foreground">{results.recommendations}</p>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold mb-2">{t.soil_suitability.card2.ideal_conditions_title}</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2 p-2 bg-background rounded-md">
                                        <Droplets className="w-5 h-5 text-accent" />
                                        <span>{t.soil_suitability.card2.rainfall}: {results.ideal_conditions.rainfall}</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-background rounded-md">
                                        <Thermometer className="w-5 h-5 text-accent" />
                                        <span>{t.soil_suitability.card2.temp}: {results.ideal_conditions.temperature}</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-background rounded-md">
                                        <Wind className="w-5 h-5 text-accent" />
                                        <span>{t.soil_suitability.card2.ph}: {results.ideal_conditions.ph_range}</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-2 bg-background rounded-md">
                                        <Sun className="w-5 h-5 text-accent" />
                                        <span>{t.soil_suitability.card2.sunlight}: {results.ideal_conditions.sunlight}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground pt-10">
                            {t.soil_suitability.card2.initial_text}
                        </div>
                    )}
                </CardContent>
             </Card>
       </div>
    </div>
  );
}
