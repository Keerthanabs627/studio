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
  prompt: `You are an expert agronomist. Provide detailed and actionable management advice for a farmer in India.
  
  Crop: {{{crop}}}
  Growth Stage: {{{growth_stage}}}

  Based on the crop and its growth stage, provide specific recommendations covering the following areas:
  1.  **Irrigation/Watering:** How much and how often to water.
  2.  **Nutrient Management:** What fertilizers or nutrients are needed.
  3.  **Pest & Disease Control:** Common threats to look for and how to manage them (prefer organic or integrated pest management solutions).
  4.  **General Tasks:** Any other important activities like weeding, pruning, or support.
  
  Format the advice in a clear, easy-to-read manner.
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
