
'use server';

/**
 * @fileOverview An AI chatbot that can use tools to answer agricultural questions.
 *
 * - generalAIChatbot - A function that handles the chatbot interactions.
 * - GeneralAIChatbotInput - The input type for the generalAIChatbot function.
 * - GeneralAIChatbotOutput - The return type for the generalAIChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {
  cropDoctorTool,
  fertilizerCalculatorTool,
  soilSuitabilityTool,
  weatherTool,
} from '../tools/agronomic-tools';
import { generate } from 'genkit';

const GeneralAIChatbotInputSchema = z.object({
  query: z.string().describe('The user query.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo provided by the user if requested, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GeneralAIChatbotInput = z.infer<typeof GeneralAIChatbotInputSchema>;

const GeneralAIChatbotOutputSchema = z.object({
  answer: z.string().describe('The AI chatbot response to the user query.'),
  requires_image: z
    .boolean()
    .describe(
      'Set to true if you need the user to provide an image to answer their query (e.g., for plant disease diagnosis).'
    ),
});
export type GeneralAIChatbotOutput = z.infer<
  typeof GeneralAIChatbotOutputSchema
>;

export async function generalAIChatbot(
  input: GeneralAIChatbotInput
): Promise<GeneralAIChatbotOutput> {
  return generalAIChatbotFlow(input);
}

const prompt = ai.definePrompt({
    name: 'agronomicAIChatbotPrompt',
    input: { schema: GeneralAIChatbotInputSchema },
    output: { schema: GeneralAIChatbotOutputSchema },
    tools: [
        weatherTool,
        soilSuitabilityTool,
        fertilizerCalculatorTool,
        cropDoctorTool,
    ],
    prompt: `You are an expert AI agronomist assistant for Indian farmers. Your primary goal is to be as helpful as possible.
- Your main expertise is agriculture. Use the provided tools to answer user questions comprehensively.
- If a user asks a question that is not related to agriculture, answer it as a general AI assistant.
- If a user asks about something that requires a visual, like a plant disease, you MUST ask the user to upload a photo. Do not try to answer without the image. You should respond by asking for the photo, and you MUST set requires_image to true. If you need to use the diagnoseCrop tool but don't have an image, ask for it.
- If the user provides an image, use the cropDoctorTool to analyze it.
- Combine information from multiple tools if needed to give a complete answer.
- Always be friendly and conversational.
- The user has provided the following query and, optionally, a photo.

User query: {{{query}}}
{{#if photoDataUri}}
Photo: {{media url=photoDataUri}}
{{/if}}
`,
});


const generalAIChatbotFlow = ai.defineFlow(
  {
    name: 'generalAIChatbotFlow',
    inputSchema: GeneralAIChatbotInputSchema,
    outputSchema: GeneralAIChatbotOutputSchema,
  },
  async input => {
    // A specific workaround: if the model might need to use the crop doctor tool,
    // but the user hasn't provided a photo, we interrupt the flow and ask for one.
    const mightNeedImage = /disease|sick|dying|unhealthy|problem|issue|spot|leaf/i.test(input.query);
    if (mightNeedImage && !input.photoDataUri) {
        return {
            answer: "It sounds like you have a question about a plant's health. To help you with that, please upload a photo of the affected plant.",
            requires_image: true,
        };
    }

    const {output} = await prompt(input);
    if (!output) {
        return {
            answer: "Sorry, I encountered an issue and cannot provide a response right now. Please try again.",
            requires_image: false,
        };
    }

    // The 'requires_image' flag from the model is often unreliable.
    // We force it to false here because we've already handled the image request case above.
    // The only time it should be true is in our specific check.
    return {
        ...output,
        requires_image: output.requires_image || false,
    };
  }
);
