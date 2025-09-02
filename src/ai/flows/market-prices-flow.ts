
'use server';

/**
 * @fileOverview A flow to get real-time market prices for agricultural commodities.
 *
 * - getRealTimeMarketPrices - A function that returns a list of live market prices.
 * - MarketPricesOutput - The return type for the getRealTimeMarketPrices function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropPriceSchema = z.object({
  key: z.string().describe("A unique, simple key for the crop, e.g., 'wheat'."),
  name: z
    .string()
    .describe(
      "The common name of the commodity, including the unit, e.g., 'Wheat (Quintal)'."
    ),
  price: z
    .string()
    .describe("The current market price in Indian Rupees, e.g., '₹2,350'."),
  trend: z
    .enum(['up', 'down', 'stable'])
    .describe('The price trend over the last 24 hours.'),
  change: z.string().describe("The percentage change, e.g., '+1.5%'."),
});

const MarketPricesOutputSchema = z.object({
  prices: z
    .array(CropPriceSchema)
    .min(50)
    .describe(
      'A list of at least 50 major agricultural commodities in India with their real-time market prices.'
    ),
});
export type MarketPricesOutput = z.infer<typeof MarketPricesOutputSchema>;

export async function getRealTimeMarketPrices(): Promise<MarketPricesOutput> {
  return marketPricesFlow();
}

const marketPricesPrompt = ai.definePrompt({
  name: 'marketPricesPrompt',
  output: {schema: MarketPricesOutputSchema},
  prompt: `You are a real-time agricultural market data provider for India.
  
  Your task is to provide a comprehensive list of current, real-time market prices for at least 50 major agricultural commodities commonly traded in India.
  
  For each commodity, you MUST provide:
  - A simple, unique key (e.g., 'tomato', 'wheat').
  - The common name and unit (e.g., 'Tomato (Kg)', 'Wheat (Quintal)').
  - The current market price in Indian Rupees (₹).
  - The price trend over the last 24 hours ('up', 'down', or 'stable').
  - The percentage change for the trend.
  
  You must use real, up-to-date market data. Do not invent data. Provide a diverse list covering grains, pulses, oilseeds, cash crops, vegetables, fruits, and spices.
  `,
});

const marketPricesFlow = ai.defineFlow(
  {
    name: 'marketPricesFlow',
    outputSchema: MarketPricesOutputSchema,
  },
  async () => {
    const {output} = await marketPricesPrompt();
    return output!;
  }
);
