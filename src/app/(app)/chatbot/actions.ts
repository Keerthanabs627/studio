'use server';

import { generalAIChatbot } from '@/ai/flows/agronomic-ai-chatbot';
import { z } from 'zod';

const chatSchema = z.object({
  query: z.string().min(1, 'Query cannot be empty.'),
});

export async function getAIResponse(input: { query: string }): Promise<{ answer?: string; error?: string }> {
  const validatedInput = chatSchema.safeParse(input);

  if (!validatedInput.success) {
    const errorMessage = validatedInput.error.errors.map((e) => e.message).join(', ');
    return { error: errorMessage };
  }

  try {
    const output = await generalAIChatbot({ query: validatedInput.data.query });
    return { answer: output.answer };
  } catch (e) {
    console.error('AI Chatbot Error:', e);
    return { error: 'An unexpected error occurred while communicating with the AI. Please try again later.' };
  }
}
