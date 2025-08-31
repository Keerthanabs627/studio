"use server";

import { getSoilSuitability as getSoilSuitabilityFlow, SoilSuitabilityInput, SoilSuitabilityOutput as SoilSuitabilityOutputFlow } from "@/ai/flows/soil-suitability-flow";
import { z } from 'zod';

const soilSuitabilitySchema = z.object({
  crop: z.string().min(1, 'Crop name cannot be empty.'),
  soil_type: z.string().min(1, 'Soil type cannot be empty.'),
});

export type SoilSuitabilityOutput = SoilSuitabilityOutputFlow;

export async function getSoilSuitability(input: SoilSuitabilityInput): Promise<{ data?: SoilSuitabilityOutput; error?: string }> {
  const validatedInput = soilSuitabilitySchema.safeParse(input);

  if (!validatedInput.success) {
    const errorMessage = validatedInput.error.errors.map((e) => e.message).join(', ');
    return { error: errorMessage };
  }

  try {
    const output = await getSoilSuitabilityFlow(validatedInput.data);
    return { data: output };
  } catch (e) {
    console.error('Soil Suitability Flow Error:', e);
    return { error: 'An unexpected error occurred while fetching the suitability report. Please try again later.' };
  }
}
