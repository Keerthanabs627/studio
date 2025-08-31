'use client';

import {useState, useTransition} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Loader2, Save} from 'lucide-react';
import {getCropManagementAdvice} from './actions';
import {useI18n} from '@/locales/client';
import {useToast} from '@/hooks/use-toast';

interface FieldData {
  crop: string;
  stage: string;
  moisture: string;
  n: string;
  p: string;
  k: string;
  ph: string;
}

export default function MyFieldsPage() {
  const t = useI18n();
  const {toast} = useToast();

  const [fieldData, setFieldData] = useState<FieldData>({
    crop: 'Rice',
    stage: 'Vegetative',
    moisture: '25',
    n: '120',
    p: '60',
    k: '40',
    ph: '6.5',
  });

  const [savedFields, setSavedFields] = useState<FieldData[]>([]);
  const [advice, setAdvice] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = e.target;
    setFieldData(prev => ({...prev, [id]: value}));
  };

  const handleGetAdvice = () => {
    startTransition(async () => {
      const {crop, stage, moisture, n, p, k, ph} = fieldData;
      const result = await getCropManagementAdvice({
        crop,
        growth_stage: stage,
        soil_moisture: `${moisture}%`,
        nitrogen_level: `${n} kg/ha`,
        phosphorus_level: `${p} kg/ha`,
        potassium_level: `${k} kg/ha`,
        soil_ph: parseFloat(ph),
      });
      if (result.data) {
        setAdvice(result.data.advice);
      } else {
        console.error(result.error);
        setAdvice(t.my_fields.advice_error);
      }
    });
  };

  const handleSaveField = () => {
    setSavedFields(prev => [...prev, fieldData]);
    toast({
      title: t.my_fields.toast.saved.title,
      description: t.my_fields.toast.saved.description.replace('{crop}', fieldData.crop),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {t.my_fields.title}
        </h1>
        <p className="text-muted-foreground">{t.my_fields.description}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t.my_fields.card1.title}</CardTitle>
            <CardDescription>{t.my_fields.card1.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="crop">{t.my_fields.card1.crop_label}</Label>
                <Input
                  id="crop"
                  value={fieldData.crop}
                  onChange={handleInputChange}
                  placeholder={t.my_fields.card1.crop_placeholder}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stage">{t.my_fields.card1.stage_label}</Label>
                <Input
                  id="stage"
                  value={fieldData.stage}
                  onChange={handleInputChange}
                  placeholder={t.my_fields.card1.stage_placeholder}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="moisture">
                  {t.my_fields.card1.moisture_label}
                </Label>
                <Input
                  id="moisture"
                  type="number"
                  value={fieldData.moisture}
                  onChange={handleInputChange}
                  placeholder="e.g., 25"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ph">{t.my_fields.card1.ph_label}</Label>
                <Input
                  id="ph"
                  type="number"
                  value={fieldData.ph}
                  onChange={handleInputChange}
                  placeholder="e.g., 6.5"
                />
              </div>
            </div>
            <div>
              <Label>{t.my_fields.card1.npk_label}</Label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <Input
                  id="n"
                  type="number"
                  value={fieldData.n}
                  onChange={handleInputChange}
                  placeholder="N (kg/ha)"
                />
                <Input
                  id="p"
                  type="number"
                  value={fieldData.p}
                  onChange={handleInputChange}
                  placeholder="P (kg/ha)"
                />
                <Input
                  id="k"
                  type="number"
                  value={fieldData.k}
                  onChange={handleInputChange}
                  placeholder="K (kg/ha)"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleGetAdvice} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t.my_fields.card1.button}
            </Button>
            <Button variant="outline" onClick={handleSaveField}>
              <Save className="mr-2 h-4 w-4" />
              {t.my_fields.card1.save_button}
            </Button>
          </CardFooter>
        </Card>
        <Card className="bg-secondary/30">
          <CardHeader>
            <CardTitle>{t.my_fields.card2.title}</CardTitle>
            <CardDescription>
              {advice
                ? t.my_fields.card2.description_results
                : t.my_fields.card2.description_initial}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isPending ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : advice ? (
              <div
                className="text-sm whitespace-pre-wrap space-y-4"
                dangerouslySetInnerHTML={{__html: advice.replace(/\n/g, '<br />')}}
              />
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
