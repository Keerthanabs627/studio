'use server';

/**
 * @fileOverview An AI chatbot for answering questions.
 *
 * - generalAIChatbot - A function that handles the chatbot interactions.
 * - GeneralAIChatbotInput - The input type for the generalAIChatbot function.
 * - GeneralAIChatbotOutput - The return type for the generalAIChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneralAIChatbotInputSchema = z.object({
  query: z.string().describe('The user query.'),
});
export type GeneralAIChatbotInput = z.infer<typeof GeneralAIChatbotInputSchema>;

const GeneralAIChatbotOutputSchema = z.object({
  answer: z.string().describe('The AI chatbot response to the user query.'),
});
export type GeneralAIChatbotOutput = z.infer<typeof GeneralAIChatbotOutputSchema>;

export async function generalAIChatbot(input: GeneralAIChatbotInput): Promise<GeneralAIChatbotOutput> {
  return generalAIChatbotFlow(input);
}

const generalAIChatbotPrompt = ai.definePrompt({
  name: 'generalAIChatbotPrompt',
  input: {schema: GeneralAIChatbotInputSchema},
  output: {schema: GeneralAIChatbotOutputSchema},
  prompt: `You are a helpful AI assistant.

  User query: {{{query}}}

  Please provide a concise and informative answer to the user's query.
  If the question is unanswerable, respond that you cannot answer. Do not make up information.`,
});

const generalAIChatbotFlow = ai.defineFlow(
  {
    name: 'generalAIChatbotFlow',
    inputSchema: GeneralAIChatbotInputSchema,
    outputSchema: GeneralAIChatbotOutputSchema,
  },
  async input => {
    const {output} = await generalAIChatbotPrompt(input);
    return output!;
  }
);
