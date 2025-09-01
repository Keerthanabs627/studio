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

const generalAIChatbotPrompt = ai.definePrompt({
  name: 'generalAIChatbotPrompt',
  input: {schema: GeneralAIChatbotInputSchema},
  output: {schema: GeneralAIChatbotOutputSchema},
  tools: [
    weatherTool,
    soilSuitabilityTool,
    fertilizerCalculatorTool,
    cropDoctorTool,
  ],
  prompt: `You are an expert AI agronomist assistant for Indian farmers. Your primary goal is to be as helpful as possible.

- Your main expertise is agriculture. Use the provided tools to answer user questions comprehensively.
- If a user asks a question that is not related to agriculture, answer it as a general AI assistant.
- If a user asks about something that requires a visual, like a plant disease, you MUST set 'requires_image' to true in your response and ask the user to upload a photo. Do not try to answer without the image.
- If the user provides an image, use the cropDoctorTool to analyze it.
- Combine information from multiple tools if needed to give a complete answer.
- Always be friendly and conversational.

User query: {{{query}}}
{{#if photoDataUri}}
User has provided this image: {{media url=photoDataUri}}
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
    const llm = ai.getGenerator('gemini-1.5-pro-latest');
    const response = await llm.generate({
      prompt: {
        ...generalAIChatbotPrompt.compile(input),
      },
      tools: generalAIChatbotPrompt.config.tools,
    });

    const answer = response.text;
    const requires_image =
      response.content.some(
        part => part.toolRequest?.name === 'diagnoseCrop'
      ) && !input.photoDataUri;
    
    if (requires_image) {
      return {
        answer: "It sounds like you have a question about a plant's health. To help you with that, please upload a photo of the affected plant.",
        requires_image: true,
      };
    }

    return {
      answer,
      requires_image: false,
    };
  }
);
