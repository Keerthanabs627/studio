// @ts-nocheck
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useI18n } from "@/locales/client";

const cropPriceData = [
  { key: "wheat", price: "₹2,275", trend: "up", change: "+1.2%" },
  { key: "paddy", price: "₹2,183", trend: "up", change: "+0.8%" },
  { key: "maize", price: "₹2,090", trend: "down", change: "-0.5%" },
  { key: "sugarcane", price: "₹3,500", trend: "up", change: "+2.1%" },
  { key: "cotton", price: "₹7,020", trend: "down", change: "-1.8%" },
  { key: "soybean", price: "₹4,650", trend: "up", change: "+3.0%" },
  { key: "tomato", price: "₹45", trend: "up", change: "+5.2%" },
  { key: "onion", price: "₹30", trend: "down", change: "-2.4%" },
  { key: "mustard", price: "₹5,450", trend: "up", change: "+1.5%" },
  { key: "gram", price: "₹5,100", trend: "down", change: "-0.8%" },
  { key: "lentil", price: "₹6,600", trend: "up", change: "+2.3%" },
  { key: "turmeric", price: "₹7,500", trend: "up", change: "+4.1%" },
];

export default function MarketPricesPage() {
  const t = useI18n();
  const cropPrices = cropPriceData.map(crop => ({
      ...crop,
      name: t.market_prices.crops[crop.key as keyof typeof t.market_prices.crops]
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.market_prices.title}</h1>
        <p className="text-muted-foreground">{t.market_prices.description}</p>
      </div>
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
            {cropPrices.map((crop) => (
              <TableRow key={crop.key}>
                <TableCell className="font-medium">{crop.name}</TableCell>
                <TableCell className="text-right font-mono">{crop.price}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={crop.trend === "up" ? "secondary" : "destructive"} className={`flex items-center justify-center gap-1 w-20 ml-auto ${crop.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {crop.trend === 'up' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                    {crop.change}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
