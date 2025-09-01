// @ts-nocheck
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Loader2, ExternalLink, CheckCircle } from 'lucide-react';
import { useI18n } from '@/locales/client';
import { getSchemes, type Scheme } from './actions';
import Link from 'next/link';

export default function SchemesPage() {
  const t = useI18n();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSchemes = async () => {
      setIsLoading(true);
      const fetchedSchemes = await getSchemes();
      setSchemes(fetchedSchemes);
      setIsLoading(false);
    };
    fetchSchemes();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.sidebar.schemes}</h1>
        <p className="text-muted-foreground">{t.schemes.description}</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              {schemes.map((scheme) => (
                <AccordionItem value={`item-${scheme.id}`} key={scheme.id}>
                  <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline">
                    {scheme.title}
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

                      <Button asChild>
                        <Link href={scheme.link} target="_blank" rel="noopener noreferrer">
                           {t.schemes.official_site}
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>

                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
