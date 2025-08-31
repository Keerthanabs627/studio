import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, Calculator, LineChart, Users } from "lucide-react";
import Link from "next/link";
import { WeatherForecast } from "./components/weather-forecast";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to AgriSolutions Hub</h1>
        <p className="text-muted-foreground">Your AI-powered partner in modern agriculture.</p>
      </div>
      
      <WeatherForecast />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Fertilizer Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Calculate optimal fertilizer usage for your crops.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/fertilizer-calculator">
                Calculate Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Community Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Connect with other farmers and experts.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/community">
                Join Discussion <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              Market Prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Get real-time market prices for your crops.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/market-prices">
                View Prices <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Agronomic AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Ask our AI chatbot for expert advice.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/chatbot">
                Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
