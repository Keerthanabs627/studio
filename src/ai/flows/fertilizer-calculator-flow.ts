'use server';

/**
 * @fileOverview A flow to calculate a smart, multi-stage fertilizer plan.
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
  required_fertilizer_kg: z.number().describe('The total required NPK fertilizer in kg for the area.'),
  fertilizer_cost: z.number().describe('The estimated cost of the fertilizer in Indian Rupees (INR).'),
  expected_crop_value: z.number().describe('The estimated total value of the crop yield in Indian Rupees (INR).'),
  total_profit: z.number().describe('The estimated total profit (crop value - fertilizer cost) in Indian Rupees (INR).'),
  status_message: z.string().describe('A status message about the plan, e.g., "Planned fertilizer within safe range."'),
});
export type FertilizerOutput = z.infer<typeof FertilizerOutputSchema>;

export async function getFertilizerRecommendation(input: FertilizerInput): Promise<FertilizerOutput> {
  return fertilizerCalculatorFlow(input);
}

const fertilizerCalculatorPrompt = ai.definePrompt({
  name: 'fertilizerCalculatorPrompt',
  input: {schema: FertilizerInputSchema},
  output: {schema: FertilizerOutputSchema},
  prompt: `You are an agricultural expert creating a "Smart Yield Plan" for an Indian farmer. Your goal is to provide a clear and concise requirement check.
  
  Based on the crop name and area, provide the following estimates in Indian Rupees (INR):
  1.  **Required Fertilizer (kg)**: Calculate the total NPK fertilizer needed.
  2.  **Fertilizer Cost**: Estimate the cost of the required fertilizer.
  3.  **Expected Crop Value**: Estimate the market value of the crop yield from the given area.
  4.  **Total Profit**: Calculate the expected profit.
  5.  **Status Message**: Provide a brief status message, like "Planned fertilizer within safe range."

  Use realistic, current data for Indian agricultural conditions.

  Crop: {{{cropName}}}
  Area: {{{area}}} acres

  Generate the structured output with numerical values for costs, value, and profit.
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
