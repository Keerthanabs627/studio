"use server";

import { getFertilizerRecommendation as getFertilizerRecommendationFlow } from "@/ai/flows/fertilizer-calculator-flow";
import { z } from 'zod';

const fertilizerSchema = z.object({
  cropName: z.string().min(1, 'Crop name cannot be empty.'),
  area: z.number().min(0.1, 'Area must be greater than 0.'),
});

const FertilizerOutputSchema = z.object({
  required_fertilizer_kg: z.number(),
  fertilizer_cost: z.number(),
  expected_crop_value: z.number(),
  total_profit: z.number(),
  status_message: z.string(),
});

export type FertilizerRecommendation = z.infer<typeof FertilizerOutputSchema>;

export async function getFertilizerRecommendation(input: { cropName: string, area: number }): Promise<{ data?: FertilizerRecommendation; error?: string }> {
  const validatedInput = fertilizerSchema.safeParse(input);

  if (!validatedInput.success) {
    const errorMessage = validatedInput.error.errors.map((e) => e.message).join(', ');
    return { error: errorMessage };
  }

  try {
    const output = await getFertilizerRecommendationFlow(validatedInput.data);
    return { data: output };
  } catch (e) {
    console.error('Fertilizer Calculator Flow Error:', e);
    return { error: 'An unexpected error occurred while fetching recommendations. Please try again later.' };
  }
}
