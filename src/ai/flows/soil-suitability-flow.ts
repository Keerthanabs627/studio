'use server';

/**
 * @fileOverview A flow to check soil suitability for a crop.
 *
 * - getSoilSuitability - A function that returns a soil suitability analysis.
 * - SoilSuitabilityInput - The input type for the getSoilSuitability function.
 * - SoilSuitabilityOutput - The return type for the getSoilSuitability function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SoilSuitabilityInputSchema = z.object({
  crop: z.string().describe('The name of the crop being considered.'),
  soil_type: z.string().describe('The type of soil in the field (e.g., "Clay", "Sandy Loam", "Alluvial").'),
});
export type SoilSuitabilityInput = z.infer<typeof SoilSuitabilityInputSchema>;

const SoilSuitabilityOutputSchema = z.object({
  is_suitable: z.boolean().describe('Whether the soil is considered suitable for the crop.'),
  suitability_score: z.number().min(0).max(100).describe('A score from 0 to 100 indicating the degree of suitability.'),
  analysis: z.string().describe('A brief analysis explaining the suitability score and key factors.'),
  recommendations: z.string().describe('Recommendations for improving soil or alternative crop suggestions if not suitable.'),
  ideal_conditions: z.object({
      rainfall: z.string().describe("Ideal annual rainfall range, e.g., '1000-1500 mm'"),
      temperature: z.string().describe("Ideal temperature range, e.g., '25-35°C'"),
      ph_range: z.string().describe("Ideal soil pH range, e.g., '6.0-7.5'"),
      sunlight: z.string().describe("Ideal sunlight requirements, e.g., '6-8 hours/day'"),
  }),
});
export type SoilSuitabilityOutput = z.infer<typeof SoilSuitabilityOutputSchema>;

export async function getSoilSuitability(input: SoilSuitabilityInput): Promise<SoilSuitabilityOutput> {
  return soilSuitabilityFlow(input);
}

const soilSuitabilityPrompt = ai.definePrompt({
  name: 'soilSuitabilityPrompt',
  input: {schema: SoilSuitabilityInputSchema},
  output: {schema: SoilSuitabilityOutputSchema},
  prompt: `You are an expert soil scientist and agronomist providing advice for Indian agricultural conditions.
  Analyze the suitability of a given soil type for a specific crop.

  Crop: {{{crop}}}
  Soil Type: {{{soil_type}}}

  - Determine if the soil is suitable.
  - Provide a suitability score from 0 to 100.
  - Give a brief analysis explaining the score.
  - Offer recommendations: if suitable, suggest any amendments; if not, explain why and suggest alternative crops suitable for that soil.
  - List the ideal conditions (rainfall, temperature, pH, sunlight) for the selected crop.
  `,
});

const soilSuitabilityFlow = ai.defineFlow(
  {
    name: 'soilSuitabilityFlow',
    inputSchema: SoilSuitabilityInputSchema,
    outputSchema: SoilSuitabilityOutputSchema,
  },
  async input => {
    const {output} = await soilSuitabilityPrompt(input);
    return output!;
  }
);
