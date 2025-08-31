'use server';
/**
 * @fileOverview An AI agent for diagnosing plant diseases from images.
 *
 * - diagnoseCrop - A function that handles the plant diagnosis process.
 * - CropDoctorInput - The input type for the diagnoseCrop function.
 * - CropDoctorOutput - The return type for the diagnoseCrop function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CropDoctorInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of an unhealthy plant leaf, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type CropDoctorInput = z.infer<typeof CropDoctorInputSchema>;

const CropDoctorOutputSchema = z.object({
  is_plant: z.boolean().describe('Whether the image appears to contain a plant or not.'),
  disease: z.string().describe('The common name of the identified plant disease (e.g., "Powdery Mildew", "Black Spot", "Healthy").'),
  confidence: z.number().min(0).max(100).describe('A confidence score (0-100) for the diagnosis.'),
  diagnosis: z.string().describe('A detailed explanation of the symptoms and the reasoning behind the diagnosis.'),
  recommendation: z.string().describe('Actionable steps and recommendations for treating the identified disease or maintaining plant health.'),
});
export type CropDoctorOutput = z.infer<typeof CropDoctorOutputSchema>;

export async function diagnoseCrop(input: CropDoctorInput): Promise<CropDoctorOutput> {
  return cropDoctorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cropDoctorPrompt',
  input: {schema: CropDoctorInputSchema},
  output: {schema: CropDoctorOutputSchema},
  prompt: `You are an expert plant pathologist and agronomist specializing in diagnosing plant diseases from images for an Indian farmer.

Analyze the provided image of a plant leaf. Based on the visual evidence, provide a comprehensive diagnosis.

- First, confirm if the image contains a plant.
- If it is a plant, identify any visible diseases. If the plant appears healthy, state "Healthy".
- Provide a confidence score (0-100) for your diagnosis.
- Write a detailed diagnosis explaining the symptoms you see and how they relate to the disease.
- Provide a clear, actionable recommendation for treatment or prevention. Suggest organic or readily available solutions where possible.

If the image is not a plant, set the is_plant flag to false and provide appropriate feedback in the diagnosis and recommendation fields.

Image: {{media url=photoDataUri}}`,
});

const cropDoctorFlow = ai.defineFlow(
  {
    name: 'cropDoctorFlow',
    inputSchema: CropDoctorInputSchema,
    outputSchema: CropDoctorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
