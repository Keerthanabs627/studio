
// @ts-nocheck
"use client";

import { useState, useEffect, useTransition } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Minus, Mic, Loader2, Info } from "lucide-react";
import { useI18n } from "@/locales/client";
import { Button } from '@/components/ui/button';
import { getVoiceCommandResponse } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const cropPriceData = [
    // Grains
    { key: "wheat", price: "₹2,350", trend: "up", change: "+1.5%" },
    { key: "paddy", price: "₹2,200", trend: "up", change: "+0.9%" },
    { key: "maize", price: "₹2,150", trend: "down", change: "-1.2%" },
    { key: "barley", price: "₹1,800", trend: "stable", change: "0.0%" },
    { key: "sorghum", price: "₹2,900", trend: "up", change: "+2.0%" },
    { key: "pearl_millet", price: "₹2,400", trend: "down", change: "-0.8%" },
    { key: "finger_millet", price: "₹3,800", trend: "up", change: "+3.5%" },

    // Pulses
    { key: "chickpea", price: "₹5,400", trend: "up", change: "+1.8%" },
    { key: "pigeon_pea", price: "₹9,500", trend: "down", change: "-2.5%" },
    { key: "lentil", price: "₹6,800", trend: "up", change: "+1.1%" },
    { key: "green_gram", price: "₹8,500", trend: "stable", change: "0.0%" },
    { key: "black_gram", price: "₹7,800", trend: "up", change: "+2.3%" },
    { key: "kidney_bean", price: "₹12,000", trend: "up", change: "+4.0%" },

    // Oilseeds
    { key: "soybean", price: "₹4,800", trend: "down", change: "-3.1%" },
    { key: "groundnut", price: "₹6,500", trend: "up", change: "+2.8%" },
    { key: "mustard", price: "₹5,600", trend: "up", change: "+1.9%" },
    { key: "sunflower", price: "₹5,200", trend: "stable", change: "0.0%" },
    { key: "sesame", price: "₹14,000", trend: "down", change: "-1.5%" },
    { key: "castor_seed", price: "₹5,800", trend: "up", change: "+2.1%" },

    // Cash Crops
    { key: "sugarcane", price: "₹3,600", trend: "stable", change: "+0.5%" },
    { key: "cotton", price: "₹7,200", trend: "down", change: "-2.0%" },
    { key: "jute", price: "₹5,000", trend: "up", change: "+1.0%" },
    { key: "turmeric", price: "₹8,000", trend: "up", change: "+4.5%" },

    // Vegetables (per Kg)
    { key: "tomato", price: "₹35", trend: "down", change: "-8.0%" },
    { key: "onion", price: "₹25", trend: "up", change: "+5.0%" },
    { key: "potato", price: "₹20", trend: "stable", change: "0.0%" },
    { key: "brinjal", price: "₹30", trend: "up", change: "+3.0%" },
    { key: "cauliflower", price: "₹40", trend: "down", change: "-5.0%" },
    { key: "cabbage", price: "₹25", trend: "stable", change: "0.0%" },
    { key: "okra", price: "₹45", trend: "up", change: "+2.2%" },
    { key: "chilli", price: "₹60", trend: "up", change: "+10.0%" },
    { key: "capsicum", price: "₹70", trend: "down", change: "-4.0%" },
    { key: "ginger", price: "₹120", trend: "up", change: "+6.0%" },
    { key: "garlic", price: "₹150", trend: "up", change: "+8.0%" },
    { key: "peas", price: "₹50", trend: "stable", change: "0.0%" },
    { key: "cucumber", price: "₹30", trend: "down", change: "-3.0%" },
    { key: "carrot", price: "₹40", trend: "up", change: "+1.5%" },
    { key: "radish", price: "₹25", trend: "stable", change: "0.0%" },

    // Fruits (per Kg or Dozen)
    { key: "mango", price: "₹80", trend: "up", change: "+12.0%" },
    { key: "banana", price: "₹50", trend: "stable", change: "0.0%" },
    { key: "apple", price: "₹150", trend: "down", change: "-5.0%" },
    { key: "orange", price: "₹70", trend: "up", change: "+3.0%" },
    { key: "grapes", price: "₹90", trend: "up", change: "+4.0%" },
    { key: "guava", price: "₹60", trend: "stable", change: "0.0%" },
    { key: "papaya", price: "₹40", trend: "down", change: "-2.0%" },
    { key: "pomegranate", price: "₹130", trend: "up", change: "+7.0%" },
    { key: "lemon", price: "₹50", trend: "up", change: "+10.0%" },

    // Spices (per Kg)
    { key: "coriander", price: "₹100", trend: "stable", change: "0.0%" },
    { key: "cumin", price: "₹250", trend: "down", change: "-5.0%" },
    { key: "fennel", price: "₹180", trend: "up", change: "+2.0%" },
    { key: "fenugreek", price: "₹80", trend: "stable", change: "0.0%" },
    { key: "black_pepper", price: "₹500", trend: "up", change: "+3.0%" },
    { key: "cardamom", price: "₹1,500", trend: "down", change: "-2.0%" },
    { key: "clove", price: "₹900", trend: "up", change: "+1.0%" },
];


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
  const [isListening, setIsListening] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  
  const [prices, setPrices] = useState(() => {
    if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) return JSON.parse(cached);
    }
    return cropPriceData;
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    if (typeof navigator !== 'undefined') {
        setIsOnline(navigator.onLine);
    }
    
    // On mount, if online, "fetch" and cache new data
    if (isOnline) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(cropPriceData));
        setPrices(cropPriceData);
    }

    return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    }
  }, [isOnline]);

  const handleVoiceCommand = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast({
        variant: 'destructive',
        title: 'Voice recognition not supported',
        description: 'Your browser does not support the Web Speech API.',
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      toast({
          variant: 'destructive',
          title: 'Speech recognition error',
          description: event.error === 'not-allowed' ? 'Microphone access denied.' : 'An error occurred during speech recognition.',
      })
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const query = event.results[0][0].transcript;
      toast({
          title: 'Heard you say:',
          description: `"${query}"`,
      });

      startTransition(async () => {
        try {
          const response = await getVoiceCommandResponse({ query });
          const audio = new Audio(response.audio_response_data_uri);
          audio.play();
          toast({
              title: 'AI Response',
              description: response.text_response,
          })
        } catch (error) {
          console.error("Error processing voice command:", error);
          toast({
              variant: 'destructive',
              title: 'Error processing command',
              description: 'Could not get a response from the AI.',
          })
        }
      });
    };

    recognition.start();
  };

  const cropPrices = prices.map(crop => ({
      ...crop,
      name: t.market_prices.crops[crop.key as keyof typeof t.market_prices.crops] || crop.key
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">{t.market_prices.title}</h1>
            <p className="text-muted-foreground">{t.market_prices.description}</p>
        </div>
         <Button onClick={handleVoiceCommand} size="icon" disabled={isListening || isPending}>
            {isListening || isPending ? <Loader2 className="animate-spin" /> : <Mic />}
            <span className="sr-only">Use voice command</span>
         </Button>
      </div>

       {!isOnline && (
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle>You are offline</AlertTitle>
          <AlertDescription>
            Showing last available data. Prices may be outdated.
          </AlertDescription>
        </Alert>
      )}

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.market_prices.table.crop_name}</TableHead>
              <TableHead className="text-right">{t.market_prices.table.price}</TableHead>
              <TableHead className="text-right">{t.market_prices.table.trend}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cropPrices.map((crop) => {
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
      </div>
    </div>
  );
}
