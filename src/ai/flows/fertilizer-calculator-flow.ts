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
      'An estimated cost for this stage in Indian Rupees (e.g., "₹800 - ₹1000 per acre").'
    ),
});

const OverallSummarySchema = z.object({
    required_fertilizer_kg: z.number().describe("The total required fertilizer in kilograms for the entire season."),
    fertilizer_cost: z.string().describe("The total estimated fertilizer cost in Indian Rupees (e.g., '₹560.00')."),
    expected_crop_value: z.string().describe("The total expected value of the crop yield in Indian Rupees (e.g., '₹15000.00')."),
    total_profit: z.string().describe("The total estimated profit in Indian Rupees (e.g., '₹14440.00')."),
    is_safe: z.boolean().describe("Whether the planned fertilizer usage is within a safe range."),
    safety_message: z.string().describe("A brief message about the safety of the fertilizer plan."),
});

const FertilizerOutputSchema = z.object({
  summary: OverallSummarySchema.describe("A high-level summary of costs, yield, and profit."),
  plan: z.array(StagePlanSchema).describe('A multi-stage fertilization plan for the crop.'),
  waste_savings_alert: z.object({
    notice: z.string().describe('A specific, actionable notice about how to avoid common fertilizer waste for this crop.'),
    savings_estimate: z.string().describe('An estimated cost saving in Indian Rupees (e.g., "₹1200 per acre").'),
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
  
  Based on the crop name and area, create two things:
  1.  A high-level **Summary** including: total required fertilizer (kg), total fertilizer cost, expected crop value, and total profit. All monetary values must be in Indian Rupees (INR). Also include a boolean and a message indicating if the plan is within a safe range.
  2.  A realistic, multi-stage **Plan** for fertilization. Assume average soil conditions for that crop in India. The plan should have 2-3 key growth stages. For each stage, provide a recommendation, reasoning, AND an estimated cost in Indian Rupees (INR).

  CRUCIALLY, you must also provide a "Waste Savings Alert". This alert must identify a common fertilizer over-application practice for the given crop and advise the farmer on how to avoid it, including a specific estimated cost saving in Indian Rupees (INR).

  Crop: {{{cropName}}}
  Area: {{{area}}} acres

  Generate the structured summary, the plan, and the waste savings alert.
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
