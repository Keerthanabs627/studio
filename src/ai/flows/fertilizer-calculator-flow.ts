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

const StagePlanSchema = z.object({
  stage: z.string().describe('The growth stage (e.g., "Planting", "Vegetative").'),
  recommendation: z.string().describe('The specific fertilizer recommendation for this stage.'),
  reasoning: z.string().describe('A brief explanation for why this recommendation is made.'),
  estimated_cost: z
    .string()
    .describe(
      'An estimated cost for this stage in local currency (e.g., "₹800 - ₹1000 per acre").'
    ),
});

const FertilizerOutputSchema = z.object({
  plan: z.array(StagePlanSchema).describe('A multi-stage fertilization plan for the crop.'),
  waste_savings_alert: z.object({
    notice: z.string().describe('A specific, actionable notice about how to avoid common fertilizer waste for this crop.'),
    savings_estimate: z.string().describe('An estimated cost saving in local currency (e.g., "₹1200 per acre").'),
  }),
});
export type FertilizerOutput = z.infer<typeof FertilizerOutputSchema>;

export async function getFertilizerRecommendation(input: FertilizerInput): Promise<FertilizerOutput> {
  return fertilizerCalculatorFlow(input);
}

const fertilizerCalculatorPrompt = ai.definePrompt({
  name: 'fertilizerCalculatorPrompt',
  input: {schema: FertilizerInputSchema},
  output: {schema: FertilizerOutputSchema},
  prompt: `You are an agricultural expert creating a "Smart Yield Plan" for an Indian farmer. Your goal is to maximize yield while minimizing fertilizer waste.
  
  Based on the crop name, create a realistic, multi-stage fertilization plan. Assume average soil conditions for that crop in India. The plan should have 2-3 key growth stages. For each stage, provide a recommendation, reasoning, AND an estimated cost in Indian Rupees (INR).

  CRUCIALLY, you must also provide a "Waste Savings Alert". This alert must identify a common fertilizer over-application practice for the given crop and advise the farmer on how to avoid it, including a specific estimated cost saving in Indian Rupees (INR).

  Crop: {{{cropName}}}
  Area: {{{area}}} acres

  Generate the structured plan and the waste savings alert.
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
