
'use server';

/**
 * @fileOverview A flow to generate a crop calendar with sowing, harvesting, and pest alerts for a given month.
 *
 * - getCropCalendar - A function that returns the calendar data.
 * - CropCalendarInput - The input type for the getCropCalendar function.
 * - CropCalendarOutput - The return type for the getCropCalendar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropCalendarInputSchema = z.object({
  month: z.string().describe('The month to generate the calendar for (e.g., "January", "February").'),
  region: z.string().describe('The region in India to generate the calendar for (e.g., "Karnataka", "Punjab", "South India").'),
});
export type CropCalendarInput = z.infer<typeof CropCalendarInputSchema>;

const CropInfoSchema = z.object({
    name: z.string().describe("The name of the crop."),
    icon: z.string().describe("An emoji representing the crop."),
});

const PestAlertSchema = z.object({
    name: z.string().describe("The name of the pest or disease."),
    affected_crops: z.array(z.string()).describe("A list of crops commonly affected."),
    symptoms: z.string().describe("A brief description of the symptoms to look for."),
    prevention: z.string().describe("A brief prevention tip."),
});

const CropCalendarOutputSchema = z.object({
  sowing: z.array(CropInfoSchema).describe('A list of crops that are ideal for sowing in the specified month and region.'),
  harvesting: z.array(CropInfoSchema).describe('A list of crops that are typically ready for harvesting in the specified month and region.'),
  alerts: z.array(PestAlertSchema).describe('A list of common pest and disease alerts for the specified month and region.'),
});
export type CropCalendarOutput = z.infer<typeof CropCalendarOutputSchema>;

export async function getCropCalendar(input: CropCalendarInput): Promise<CropCalendarOutput> {
  return cropCalendarFlow(input);
}

const cropCalendarPrompt = ai.definePrompt({
  name: 'cropCalendarPrompt',
  input: {schema: CropCalendarInputSchema},
  output: {schema: CropCalendarOutputSchema},
  prompt: `You are an expert Indian agronomist. Your task is to generate a crop calendar for a specific month and region in India.
  
  Provide a list of crops suitable for sowing, a list of crops ready for harvesting, and a list of potential pest and disease alerts relevant to the given month and region.
  
  - For sowing and harvesting, provide the crop name and a relevant emoji icon.
  - For alerts, provide the pest/disease name, the crops it affects, its symptoms, and a key prevention tip.
  - Base your recommendations on typical climatic conditions for that time of year in the specified region.

  Month: {{{month}}}
  Region: {{{region}}}
  `,
});

const cropCalendarFlow = ai.defineFlow(
  {
    name: 'cropCalendarFlow',
    inputSchema: CropCalendarInputSchema,
    outputSchema: CropCalendarOutputSchema,
  },
  async input => {
    const {output} = await cropCalendarPrompt(input);
    return output!;
  }
);
