'use server';

/**
 * @fileOverview A flow to get crop management advice.
 *
 * - getCropManagementAdvice - A function that returns advice for a crop at a specific growth stage.
 * - CropManagementInput - The input type for the getCropManagementAdvice function.
 * - CropManagementOutput - The return type for the getCropManagementAdvice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropManagementInputSchema = z.object({
  crop: z.string().describe('The name of the crop (e.g., "Tomato", "Wheat").'),
  growth_stage: z.string().describe('The current growth stage of the crop (e.g., "Seedling", "Flowering", "Fruiting").'),
  soil_moisture: z.string().describe("The current soil moisture level (e.g., '25%')."),
  nitrogen_level: z.string().describe("The soil nitrogen level (e.g., '120 kg/ha')."),
  phosphorus_level: z.string().describe("The soil phosphorus level (e.g., '60 kg/ha')."),
  potassium_level: z.string().describe("The soil potassium level (e.g., '40 kg/ha')."),
  soil_ph: z.number().describe("The soil pH level (e.g., 6.5)."),
});
export type CropManagementInput = z.infer<typeof CropManagementInputSchema>;

const CropManagementOutputSchema = z.object({
  advice: z.string().describe('Detailed management advice for the specified crop and growth stage, covering watering, nutrients, pest control, and other relevant tasks.'),
});
export type CropManagementOutput = z.infer<typeof CropManagementOutputSchema>;

export async function getCropManagementAdvice(input: CropManagementInput): Promise<CropManagementOutput> {
  return cropManagementFlow(input);
}

const cropManagementPrompt = ai.definePrompt({
  name: 'cropManagementPrompt',
  input: {schema: CropManagementInputSchema},
  output: {schema: CropManagementOutputSchema},
  prompt: `You are an expert agronomist providing detailed and actionable management advice for a farmer in India.
  
  Crop: {{{crop}}}
  Growth Stage: {{{growth_stage}}}
  Soil Moisture: {{{soil_moisture}}}
  Soil NPK Levels: N:{{{nitrogen_level}}}, P:{{{phosphorus_level}}}, K:{{{potassium_level}}}
  Soil pH: {{{soil_ph}}}

  Based on all the provided data for the crop, its growth stage and current soil conditions, provide specific recommendations covering the following areas.
  Format the response as a single block of text with clear headings for each section. Use bold for headings.

  **1. Irrigation/Watering:**
  How much and how often to water based on the moisture level.
  
  **2. Nutrient Management:**
  What fertilizers or nutrients are needed based on the NPK levels and pH. Be specific about quantities.

  **3. Pest & Disease Control:**
  Common threats to look for at this stage and how to manage them (prefer organic or integrated pest management solutions).
  
  **4. General Tasks:**
  Any other important activities like weeding, pruning, or support.
  `,
});

const cropManagementFlow = ai.defineFlow(
  {
    name: 'cropManagementFlow',
    inputSchema: CropManagementInputSchema,
    outputSchema: CropManagementOutputSchema,
  },
  async input => {
    const {output} = await cropManagementPrompt(input);
    return output!;
  }
);
