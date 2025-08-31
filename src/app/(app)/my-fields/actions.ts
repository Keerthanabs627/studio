"use server";

import { getCropManagementAdvice as getCropManagementAdviceFlow, CropManagementInput } from "@/ai/flows/crop-management-flow";
import { z } from 'zod';

const cropManagementSchema = z.object({
  crop: z.string().min(1, 'Crop name cannot be empty.'),
  growth_stage: z.string().min(1, 'Growth stage cannot be empty.'),
  soil_moisture: z.string().min(1, "Soil moisture cannot be empty."),
  nitrogen_level: z.string().min(1, "Nitrogen level cannot be empty."),
  phosphorus_level: z.string().min(1, "Phosphorus level cannot be empty."),
  potassium_level: z.string().min(1, "Potassium level cannot be empty."),
  soil_ph: z.number()
});

export type CropManagementAdvice = {
  advice: string;
};

export async function getCropManagementAdvice(input: CropManagementInput): Promise<{ data?: CropManagementAdvice; error?: string }> {
  const validatedInput = cropManagementSchema.safeParse(input);

  if (!validatedInput.success) {
    const errorMessage = validatedInput.error.errors.map((e) => e.message).join(', ');
    return { error: errorMessage };
  }

  try {
    const output = await getCropManagementAdviceFlow(validatedInput.data);
    return { data: output };
  } catch (e) {
    console.error('Crop Management Flow Error:', e);
    return { error: 'An unexpected error occurred while fetching advice. Please try again later.' };
  }
}
