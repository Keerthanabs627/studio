
// @ts-nocheck
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useI18n } from "@/locales/client";
import { Stethoscope, Droplets, Tractor, Users, ArrowDown } from "lucide-react";

export default function GuidePage() {
  const t = useI18n();

  const steps = [
    { 
      title: t.guide.step1_title, 
      description: t.guide.step1_desc, 
      icon: Stethoscope, 
      color: "text-indigo-400 bg-indigo-500/10" 
    },
    { 
      title: t.guide.step2_title, 
      description: t.guide.step2_desc, 
      icon: Droplets, 
      color: "text-yellow-400 bg-yellow-500/10"
    },
    { 
      title: t.guide.step3_title, 
      description: t.guide.step3_desc, 
      icon: Tractor, 
      color: "text-red-400 bg-red-500/10"
    },
    { 
      title: t.guide.step4_title, 
      description: t.guide.step4_desc, 
      icon: Users, 
      color: "text-pink-400 bg-pink-500/10"
    },
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.guide.title}</h1>
        <p className="text-muted-foreground">{t.guide.description}</p>
      </div>

      <div className="flex flex-col items-center">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="flex flex-col items-center w-full">
              <Card className="w-full">
                <CardContent className="p-6 flex items-center gap-6">
                  <div className={`flex items-center justify-center h-16 w-16 shrink-0 rounded-full ${step.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  </div>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="h-16 w-px bg-border my-2 relative">
                    <ArrowDown className="h-5 w-5 text-muted-foreground absolute bottom-0 left-1/2 -translate-x-1/2" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
