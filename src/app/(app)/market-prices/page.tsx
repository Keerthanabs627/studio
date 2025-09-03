
// @ts-nocheck
"use client";

import { useState, useEffect, useTransition } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Minus, Info, Loader2, ServerCrash, Mic } from "lucide-react";
import { useI18n } from "@/locales/client";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getMarketPrices, getVoiceCommandResponseHandler } from './actions';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { PriceData } from './actions';


const getTrendProps = (trend: string) => {
    switch (trend) {
        case 'up':
            return { icon: ArrowUp, className: 'bg-green-100 text-green-800' };
        case 'down':
            return { icon: ArrowDown, className: 'bg-red-100 text-red-800' };
        default:
            return { icon: Minus, className: 'bg-gray-100 text-gray-800' };
    }
};

const CACHE_KEY = 'market-prices-cache';

export default function MarketPricesPage() {
  const t = useI18n();
  const [isOnline, setIsOnline] = useState(true);
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const fetchAndSetPrices = () => {
    startTransition(async () => {
        if (navigator.onLine) {
            setError(null);
            const { data, error: apiError } = await getMarketPrices();
            if (apiError) {
                setError(apiError);
                // Don't clear prices, keep showing cached data if available
            } else if (data && data.length > 0) {
                setPrices(data);
                if (typeof window !== 'undefined') {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
                }
            }
        } else {
            setError("You are offline. Showing last saved data.");
        }
    });
  }

  useEffect(() => {
    // Initial load from cache
    if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            setPrices(JSON.parse(cached));
        }
        setIsOnline(navigator.onLine);
    }
    
    // Fetch fresh data
    fetchAndSetPrices();

    const handleOnline = () => {
        setIsOnline(true);
        setError(null);
        fetchAndSetPrices();
    };
    const handleOffline = () => {
        setIsOnline(false);
        setError("You are offline. Showing last saved data.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    }
  }, []);

  const renderContent = () => {
    if (isPending && prices.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }
    
    if (prices.length === 0) {
         return (
            <div className="text-center py-10">
                <ServerCrash className="mx-auto h-12 w-12 text-destructive" />
                <h3 className="mt-4 text-lg font-medium">No Data Available</h3>
                <p className="mt-2 text-sm text-muted-foreground">{error || "Could not fetch market prices."}</p>
            </div>
         );
    }

    return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.market_prices.table.crop_name}</TableHead>
              <TableHead className="text-right">{t.market_prices.table.price}</TableHead>
              <TableHead className="text-right">{t.market_prices.table.trend}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices.map((crop) => {
              const { icon: TrendIcon, className: badgeClassName } = getTrendProps(crop.trend);
              return (
              <TableRow key={crop.key}>
                <TableCell className="font-medium">{crop.name}</TableCell>
                <TableCell className="text-right font-mono">{crop.price}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={crop.trend === "up" ? "secondary" : crop.trend === 'down' ? "destructive" : "outline"} className={`flex items-center justify-center gap-1 w-20 ml-auto ${badgeClassName}`}>
                    <TrendIcon className="h-3 w-3" />
                    {crop.change}
                  </Badge>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">{t.market_prices.title}</h1>
            <p className="text-muted-foreground">{t.market_prices.description}</p>
        </div>
      </div>

       {(error || !isOnline) && (
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle>{isOnline ? "Service Issue" : "You are Offline"}</AlertTitle>
          <AlertDescription>
            {error || "Showing last available data. Prices may be outdated."}
          </AlertDescription>
        </Alert>
      )}

      <div className="border rounded-lg">
        {renderContent()}
      </div>
    </div>
  );
}
