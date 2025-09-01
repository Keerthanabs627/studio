
// @ts-nocheck
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useI18n } from "@/locales/client";
import { Stethoscope, Droplets, Tractor, Users, ArrowRight } from "lucide-react";

export default function GuidePage() {
  const t = useI18n();

  const steps = [
    { 
      title: t.guide.step1_title, 
      description: t.guide.step1_desc, 
      icon: Stethoscope, 
      color: "text-indigo-400" 
    },
    { 
      title: t.guide.step2_title, 
      description: t.guide.step2_desc, 
      icon: Droplets, 
      color: "text-yellow-400" 
    },
    { 
      title: t.guide.step3_title, 
      description: t.guide.step3_desc, 
      icon: Tractor, 
      color: "text-red-400" 
    },
    { 
      title: t.guide.step4_title, 
      description: t.guide.step4_desc, 
      icon: Users, 
      color: "text-pink-400" 
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.guide.title}</h1>
        <p className="text-muted-foreground">{t.guide.description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t.guide.app_flow}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-4">
             {/* Dashed line for larger screens */}
            <div className="absolute top-0 left-9 md:left-0 md:top-1/2 w-0.5 md:w-full h-full md:h-0.5 border-dashed border-l-2 md:border-l-0 md:border-t-2 border-border -z-10" />

            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex-1 flex items-start md:flex-col md:items-center gap-6 md:gap-4 md:text-center z-10">
                   <div className={`relative flex items-center justify-center h-20 w-20 shrink-0 rounded-full bg-secondary ${step.color}`}>
                       <div className="absolute h-full w-full bg-current opacity-10 rounded-full" />
                       <Icon className="h-8 w-8" />
                   </div>
                   <div className="md:mt-4">
                       <h3 className="text-lg font-semibold">{step.title}</h3>
                       <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                   </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
