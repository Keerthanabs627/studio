
// @ts-nocheck
'use server';

import { generalAIChatbot, GeneralAIChatbotInput, GeneralAIChatbotOutput } from '@/ai/flows/agronomic-ai-chatbot';
import { z } from 'zod';

const chatbotSchema = z.object({
  query: z.string(),
  photoDataUri: z.string().optional(),
});

export async function getAIResponse(input: GeneralAIChatbotInput): Promise<GeneralAIChatbotOutput> {
  const validatedInput = chatbotSchema.safeParse(input);

  if (!validatedInput.success) {
    const errorMessage = validatedInput.error.errors.map((e) => e.message).join(', ');
    return {
        answer: `Invalid input: ${errorMessage}`,
        requires_image: false,
    }
  }

  try {
    const output = await generalAIChatbot(validatedInput.data);
    return output;
  } catch (e) {
    console.error('Chatbot Action Error:', e);
    return {
        answer: 'An unexpected error occurred. Please try again later.',
        requires_image: false,
    }
  }
}
