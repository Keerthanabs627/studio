// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Upload, Microscope, Leaf, HelpCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { useI18n } from "@/locales/client";
import { useToast } from "@/hooks/use-toast";
import { diagnoseCrop, type CropDoctorOutput } from "./actions";

export default function CropDoctorPage() {
  const t = useI18n();
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [results, setResults] = useState<CropDoctorOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResults(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAnalysis = () => {
    if (!preview) return;

    startTransition(async () => {
      try {
        const res = await diagnoseCrop({ photoDataUri: preview });
        if (res.data) {
          setResults(res.data);
        } else {
          toast({
            variant: "destructive",
            title: t.crop_doctor.toast.error_title,
            description: res.error || t.crop_doctor.toast.error_description,
          });
          setResults(null);
        }
      } catch (error) {
        toast({
            variant: "destructive",
            title: t.crop_doctor.toast.error_title,
            description: t.crop_doctor.toast.error_description,
          });
        setResults(null);
      }
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 75) return "text-green-600";
    if (confidence > 50) return "text-yellow-600";
    return "text-red-600";
  };
  
  const ResultIcon = results?.is_plant ? (results.disease.toLowerCase() === 'healthy' ? CheckCircle2 : AlertCircle) : HelpCircle;


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.crop_doctor.title}</h1>
        <p className="text-muted-foreground">{t.crop_doctor.description}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t.crop_doctor.card1.title}</CardTitle>
            <CardDescription>{t.crop_doctor.card1.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plant-image">{t.crop_doctor.card1.image_label}</Label>
              <Input id="plant-image" type="file" accept="image/*" onChange={handleFileChange} disabled={isPending} />
            </div>
            {preview && (
              <div className="relative w-full aspect-video rounded-md overflow-hidden border">
                <Image src={preview} alt="Plant preview" layout="fill" objectFit="cover" />
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleAnalysis} disabled={isPending || !file}>
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Microscope className="mr-2 h-4 w-4" />}
              {t.crop_doctor.card1.button}
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-secondary/30">
          <CardHeader>
            <CardTitle>{t.crop_doctor.card2.title}</CardTitle>
            <CardDescription>
                {results ? t.crop_doctor.card2.description_results : t.crop_doctor.card2.description_initial}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                <p className="font-semibold">{t.crop_doctor.card2.loading_title}</p>
                <p className="text-sm text-muted-foreground">{t.crop_doctor.card2.loading_description}</p>
              </div>
            ) : results ? (
              <div className="space-y-4">
                <Alert variant={results.is_plant ? (results.disease.toLowerCase() === 'healthy' ? "default" : "destructive") : "default"}>
                    <ResultIcon className="h-4 w-4" />
                    <AlertTitle className="flex items-center gap-2">
                        {results.is_plant ? results.disease : t.crop_doctor.card2.not_plant_title}
                    </AlertTitle>
                    <AlertDescription>
                        {results.diagnosis}
                    </AlertDescription>
                </Alert>

                {results.is_plant && results.disease.toLowerCase() !== 'healthy' && (
                    <div>
                        <Label className="text-sm font-medium">{t.crop_doctor.card2.confidence_label}</Label>
                        <div className="flex items-center gap-2 mt-1">
                            <Progress value={results.confidence} className="w-full" />
                            <span className={`font-bold ${getConfidenceColor(results.confidence)}`}>
                                {results.confidence}%
                            </span>
                        </div>
                    </div>
                )}
                
                <div>
                    <h4 className="font-semibold mb-2">{t.crop_doctor.card2.recommendations_title}</h4>
                    <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-md">{results.recommendation}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground pt-10 flex flex-col items-center">
                <Leaf className="w-12 h-12 text-muted-foreground/50 mb-4" />
                {t.crop_doctor.card2.initial_text}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
