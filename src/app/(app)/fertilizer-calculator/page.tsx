import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function FertilizerCalculatorPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fertilizer Calculator</h1>
        <p className="text-muted-foreground">Estimate your fertilizer needs and potential profits.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Crop & Area</CardTitle>
            <CardDescription>Select your crop and enter the area you are planting.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="crop-name">Crop Name</Label>
              <Select>
                <SelectTrigger id="crop-name">
                  <SelectValue placeholder="Select a crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="maize">Maize</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Area (in acres)</Label>
              <Input id="area" type="number" placeholder="e.g., 5" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Calculate</Button>
          </CardFooter>
        </Card>

        <Card className="bg-secondary/30">
          <CardHeader>
            <CardTitle>Results & Recommendations</CardTitle>
            <CardDescription>Based on your selection (e.g., Rice, 1 acre).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Recommended Fertilizer</h3>
              <div className="flex items-center justify-between p-3 rounded-md bg-background">
                <span>Urea & DAP Mix</span>
                <span className="font-mono font-semibold">₹2,500 / acre</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Soil Suitability</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Clayey Loam</Badge>
                <Badge variant="secondary">Alluvial</Badge>
                <Badge variant="outline">pH 5.5-7.0</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Estimated Profit</h3>
              <div className="flex items-center justify-between p-3 rounded-md bg-background">
                <span>Total Profit / Acre</span>
                <span className="font-mono font-semibold text-green-600">~ ₹30,000</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
