'use server';

import { generalAIChatbot, GeneralAIChatbotInput, GeneralAIChatbotOutput } from '@/ai/flows/agronomic-ai-chatbot';
import { z } from 'zod';

const chatSchema = z.object({
  query: z.string().min(1, 'Query cannot be empty.'),
  photoDataUri: z.string().optional(),
});

export async function getAIResponse(input: GeneralAIChatbotInput): Promise<{ answer?: string; error?: string, requires_image?: boolean }> {
  const validatedInput = chatSchema.safeParse(input);

  if (!validatedInput.success) {
    const errorMessage = validatedInput.error.errors.map((e) => e.message).join(', ');
    return { error: errorMessage };
  }

  try {
    const output: GeneralAIChatbotOutput = await generalAIChatbot(validatedInput.data);
    return { answer: output.answer, requires_image: output.requires_image };
  } catch (e) {
    console.error('AI Chatbot Error:', e);
    return { error: 'An unexpected error occurred while communicating with the AI. Please try again later.' };
  }
}
