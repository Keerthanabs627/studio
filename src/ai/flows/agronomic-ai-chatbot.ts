'use server';

/**
 * @fileOverview An AI chatbot for answering agricultural questions.
 *
 * - agronomicAIChatbot - A function that handles the chatbot interactions.
 * - AgronomicAIChatbotInput - The input type for the agronomicAIChatbot function.
 * - AgronomicAIChatbotOutput - The return type for the agronomicAIChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AgronomicAIChatbotInputSchema = z.object({
  query: z.string().describe('The user query about crops, fertilizers, soil suitability, or market prices.'),
});
export type AgronomicAIChatbotInput = z.infer<typeof AgronomicAIChatbotInputSchema>;

const AgronomicAIChatbotOutputSchema = z.object({
  answer: z.string().describe('The AI chatbot response to the user query.'),
});
export type AgronomicAIChatbotOutput = z.infer<typeof AgronomicAIChatbotOutputSchema>;

export async function agronomicAIChatbot(input: AgronomicAIChatbotInput): Promise<AgronomicAIChatbotOutput> {
  return agronomicAIChatbotFlow(input);
}

const agronomicAIChatbotPrompt = ai.definePrompt({
  name: 'agronomicAIChatbotPrompt',
  input: {schema: AgronomicAIChatbotInputSchema},
  output: {schema: AgronomicAIChatbotOutputSchema},
  prompt: `You are an AI chatbot expert in agronomy, providing information about crops, fertilizers, soil suitability, and market prices.

  User query: {{{query}}}

  Please provide a concise and informative answer to the user's query.
  If the question is unanswerable, respond that you cannot answer. Do not make up information.`, // Added a system prompt.
});

const agronomicAIChatbotFlow = ai.defineFlow(
  {
    name: 'agronomicAIChatbotFlow',
    inputSchema: AgronomicAIChatbotInputSchema,
    outputSchema: AgronomicAIChatbotOutputSchema,
  },
  async input => {
    const {output} = await agronomicAIChatbotPrompt(input);
    return output!;
  }
);
