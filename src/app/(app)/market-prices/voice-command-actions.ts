
'use server';

import {
  handleVoiceCommand,
  type VoiceCommandInput,
  type VoiceCommandOutput,
} from '@/ai/flows/voice-command-flow';
import {z} from 'zod';

const voiceCommandSchema = z.object({
  query: z.string(),
});

export async function getVoiceCommandResponse(
  input: VoiceCommandInput
): Promise<VoiceCommandOutput> {
  const validatedInput = voiceCommandSchema.safeParse(input);

  if (!validatedInput.success) {
    const errorMessage = validatedInput.error.errors
      .map(e => e.message)
      .join(', ');
    throw new Error(`Invalid input: ${errorMessage}`);
  }

  try {
    const output = await handleVoiceCommand(validatedInput.data);
    return output;
  } catch (e) {
    console.error('Voice Command Action Error:', e);
    throw new Error('An unexpected error occurred. Please try again later.');
  }
}
