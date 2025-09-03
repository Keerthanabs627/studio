
// @ts-nocheck
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { ExternalLink, CheckCircle } from 'lucide-react';
import type { Scheme } from '../actions';
import Link from 'next/link';
import type { Dictionary } from '@/locales/dictionaries';

export function SchemesClient({ schemes, t }: { schemes: Scheme[], t: Dictionary }) {
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.sidebar.schemes}</h1>
        <p className="text-muted-foreground">{t.schemes.description}</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full">
            {schemes.map((scheme) => (
              <AccordionItem value={`item-${scheme.id}`} key={scheme.id}>
                <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline">
                    <Link href={scheme.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                        {scheme.title}
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </Link>
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0">
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{scheme.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">{t.schemes.eligibility}</h4>
                      <p className="text-sm">{scheme.eligibility}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">{t.schemes.benefits}</h4>
                      <ul className="space-y-2">
                        {scheme.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                            <span className="text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
