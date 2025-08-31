"use server";

import { diagnoseCrop as diagnoseCropFlow, CropDoctorInput, CropDoctorOutput as CropDoctorOutputFlow } from "@/ai/flows/crop-doctor-flow";
import { z } from 'zod';

const cropDoctorSchema = z.object({
  photoDataUri: z.string().min(1, 'Image data cannot be empty.'),
});

export type CropDoctorOutput = CropDoctorOutputFlow;

export async function diagnoseCrop(input: CropDoctorInput): Promise<{ data?: CropDoctorOutput; error?: string }> {
  const validatedInput = cropDoctorSchema.safeParse(input);

  if (!validatedInput.success) {
    const errorMessage = validatedInput.error.errors.map((e) => e.message).join(', ');
    return { error: errorMessage };
  }

  try {
    const output = await diagnoseCropFlow(validatedInput.data);
    return { data: output };
  } catch (e) {
    console.error('Crop Doctor Flow Error:', e);
    return { error: 'An unexpected error occurred while analyzing the image. Please try again later.' };
  }
}
