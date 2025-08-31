'use server';

/**
 * @fileOverview A flow to calculate fertilizer recommendations.
 *
 * - getFertilizerRecommendation - A function that returns fertilizer recommendations.
 * - FertilizerInput - The input type for the getFertilizerRecommendation function.
 * - FertilizerOutput - The return type for the getFertilizerRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FertilizerInputSchema = z.object({
  cropName: z.string().describe('The name of the crop.'),
  area: z.number().describe('The area of land in acres.'),
});
export type FertilizerInput = z.infer<typeof FertilizerInputSchema>;

const FertilizerOutputSchema = z.object({
  fertilizerRecommendation: z.object({
    name: z.string().describe('The name of the recommended fertilizer mix (e.g., "Urea & DAP Mix").'),
    costPerAcre: z.number().describe('The estimated cost of the fertilizer per acre in Indian Rupees (INR).'),
  }),
  soilSuitability: z.array(z.string()).describe('A list of 2-3 suitable soil types and ideal pH range for the crop (e.g., ["Clayey Loam", "Alluvial", "pH 5.5-7.0"]).'),
  estimatedProfit: z.number().describe('The estimated total profit per acre in Indian Rupees (INR), assuming average yield and market prices.'),
});
export type FertilizerOutput = z.infer<typeof FertilizerOutputSchema>;

export async function getFertilizerRecommendation(input: FertilizerInput): Promise<FertilizerOutput> {
  return fertilizerCalculatorFlow(input);
}

const fertilizerCalculatorPrompt = ai.definePrompt({
  name: 'fertilizerCalculatorPrompt',
  input: {schema: FertilizerInputSchema},
  output: {schema: FertilizerOutputSchema},
  prompt: `You are an agricultural expert providing recommendations for Indian farmers.
  Based on the crop name provided, generate a realistic fertilizer recommendation, soil suitability, and estimated profit per acre in INR.

  Crop: {{{cropName}}}
  Area: {{{area}}} acres

  Provide a common fertilizer mixture name, a realistic cost per acre, a few suitable soil types with a pH range, and a plausible estimated profit per acre. Ensure the currency is in INR.
  `,
});

const fertilizerCalculatorFlow = ai.defineFlow(
  {
    name: 'fertilizerCalculatorFlow',
    inputSchema: FertilizerInputSchema,
    outputSchema: FertilizerOutputSchema,
  },
  async input => {
    const {output} = await fertilizerCalculatorPrompt(input);
    return output!;
  }
);
