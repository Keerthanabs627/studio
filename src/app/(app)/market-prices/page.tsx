import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";

const cropPrices = [
  { name: "Wheat (Quintal)", price: "₹2,275", trend: "up", change: "+1.2%" },
  { name: "Paddy (Quintal)", price: "₹2,183", trend: "up", change: "+0.8%" },
  { name: "Maize (Quintal)", price: "₹2,090", trend: "down", change: "-0.5%" },
  { name: "Sugarcane (Tonne)", price: "₹3,500", trend: "up", change: "+2.1%" },
  { name: "Cotton (Quintal)", price: "₹7,020", trend: "down", change: "-1.8%" },
  { name: "Soybean (Quintal)", price: "₹4,650", trend: "up", change: "+3.0%" },
  { name: "Tomato (Kg)", price: "₹45", trend: "up", change: "+5.2%" },
  { name: "Onion (Kg)", price: "₹30", trend: "down", change: "-2.4%" },
];

export default function MarketPricesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Market Prices</h1>
        <p className="text-muted-foreground">Live commodity prices from your local market (Data is for demonstration).</p>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop Name</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Trend (24h)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cropPrices.map((crop) => (
              <TableRow key={crop.name}>
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
