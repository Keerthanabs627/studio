
"use server";

import { getCropCalendar as getCropCalendarFlow, CropCalendarInput, CropCalendarOutput as CropCalendarOutputFlow } from "@/ai/flows/crop-calendar-flow";
import { z } from 'zod';

const cropCalendarSchema = z.object({
  month: z.string(),
  region: z.string(),
});

export type CropCalendarOutput = CropCalendarOutputFlow;

export async function getCropCalendar(input: CropCalendarInput): Promise<{ data?: CropCalendarOutput; error?: string }> {
  const validatedInput = cropCalendarSchema.safeParse(input);

  if (!validatedInput.success) {
    const errorMessage = validatedInput.error.errors.map((e) => e.message).join(', ');
    return { error: errorMessage };
  }

  try {
    const output = await getCropCalendarFlow(validatedInput.data);
    return { data: output };
  } catch (e) {
    console.error('Crop Calendar Flow Error:', e);
    return { error: 'An unexpected error occurred while fetching the calendar data. Please try again later.' };
  }
}
